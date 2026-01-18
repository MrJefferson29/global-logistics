
const mongoose = require("mongoose")
const Comment = require("./comment")
const slugify = require("slugify")

const StorySchema = new mongoose.Schema({

    author: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    slug: String,
    // Auto-generated Tracking ID (e.g., WPC055117639553-CARGO)
    title: {
        type: String,
        unique: true,
    },
    // Barcode image URL
    barcodeUrl: {
        type: String,
        default: "https://via.placeholder.com/300x100?text=Barcode"
    },
    
    // Shipper Information
    shipperName: {
        type: String,
        required: false
    },
    shipperAddress: {
        type: String,
        required: false
    },
    shipperPhone: {
        type: String,
        required: false
    },
    shipperEmail: {
        type: String,
        required: false
    },
    
    // Receiver Information
    receiverName: {
        type: String,
        required: [true, "Please provide receiver's name"]
    },
    receiverAddress: {
        type: String,
        required: [true, "Please provide receiver's address"]
    },
    receiverPhone: {
        type: String,
        required: false
    },
    receiverEmail: {
        type: String,
        required: false
    },
    
    // Shipment Information
    origin: {
        type: String,
        required: false
    },
    packageName: {
        type: String,
        required: [true, 'Provide a package name']
    },
    status: {
        type: String,
        required: [true, "Please provide the package's Status"],
    },
    destination: {
        type: String,
        required: false
    },
    carrier: {
        type: String,
        required: [true, 'who is the package carrier']
    },
    shipmentMode: {
        type: String,
        required: false
    },
    weight: {
        type: String,
        required: [true, 'what is package weight']
    },
    quantity: {
        type: String,
        default: "1"
    },
    paymentMethod: {
        type: String,
        required: false
    },
    totalFreight: {
        type: String,
        required: false
    },
    expectedDeliveryDate: {
        type: String,
        required: false
    },
    departureTime: {
        type: String,
        required: false
    },
    pickupDate: {
        type: String,
        required: false
    },
    pickupTime: {
        type: String,
        required: false
    },
    shipmentComments: {
        type: String,
        default: ""
    },
    
    // Package Dimensions
    packageLength: {
        type: String,
        required: false
    },
    packageWidth: {
        type: String,
        required: false
    },
    packageHeight: {
        type: String,
        required: false
    },
    pieces: {
        type: String,
        default: "1"
    },
    description: {
        type: String,
        required: false
    },
    
    // Location tracking
    location: {
        type: String,
        required: [true, 'When last was the package seen']
    },
    long: {
        type: String,
    },
    lat: {
        type: String,
    },
    time: {
        type: String,
        required: [true, "Please provide the time left to delivery"],
    },
    
    // Shipment History
    shipmentHistory: [{
        date: String,
        time: String,
        location: String,
        status: String,
        updatedBy: {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        },
        remarks: String
    }],
    
    // Legacy fields for backward compatibility
    content: {
        type: String, // Keeping for backward compatibility (receiver name)
    },
    address: {
        type: String, // Keeping for backward compatibility (receiver address)
    },
    
    imageUrl: {
        type: String,
        default: "default.jpg"
    },
    readtime: {
        type: Number,
        default: 3
    },
    likes: [{
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }],
    likeCount: {
        type: Number,
        default: 0
    },
    commentsRef: [{
            type: mongoose.Schema.ObjectId,
            ref: "Comment"
    }],
    commentCount: {
        type: Number,
        default: 0
    }


}, { timestamps: true })

// Generate unique tracking ID format: WPC + timestamp + random + -CARGO
StorySchema.methods.generateTrackingId = function() {
    const timestamp = Date.now().toString().slice(-9); // Last 9 digits of timestamp
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0'); // 3 digit random
    return `WPC${timestamp}${random}-CARGO`;
}

StorySchema.pre("save", async function (next) {
    // Auto-generate tracking ID if not provided
    if (!this.title) {
        let trackingId;
        let isUnique = false;
        
        // Ensure uniqueness
        while (!isUnique) {
            trackingId = this.generateTrackingId();
            const existing = await mongoose.model("Story").findOne({ title: trackingId });
            if (!existing) {
                isUnique = true;
            }
        }
        
        this.title = trackingId;
    }

    // Set slug from title
    this.slug = this.makeSlug();
    
    // Sync legacy fields for backward compatibility
    if (this.receiverName && !this.content) {
        this.content = this.receiverName;
    }
    if (this.receiverAddress && !this.address) {
        this.address = this.receiverAddress;
    }

    next();
})

StorySchema.pre("remove", async function (next) {
    const story = await Story.findById(this._id);
    if (story) {
        await Comment.deleteMany({
            story: story 
        });
    }
    next();
})

StorySchema.methods.makeSlug = function () {
    return slugify(this.title, {
        replacement: '-',
        remove: /[*+~.()'"!:@/?]/g,
        lower: true,
        strict: false,
        locale: 'tr',
        trim: true
    })

}

const Story = mongoose.model("Story", StorySchema)

module.exports = Story;