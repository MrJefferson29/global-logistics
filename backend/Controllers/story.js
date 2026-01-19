const asyncErrorWrapper = require("express-async-handler")
const Story = require("../Models/story");
// const deleteImageFile = require("../Helpers/Libraries/deleteImageFile");
const {searchHelper, paginateHelper} =require("../Helpers/query/queryHelpers")



const addStory = async (req, res, next) => {
    const {
        // Legacy fields (for backward compatibility)
        title, content, address, status, time, packageName, location, weight, carrier, long, lat,
        // New Shipper fields
        shipperName, shipperAddress, shipperPhone, shipperEmail,
        // New Receiver fields
        receiverName, receiverAddress, receiverPhone, receiverEmail,
        // New Shipment fields
        origin, destination, shipmentMode, quantity, paymentMethod, totalFreight,
        expectedDeliveryDate, departureTime, pickupDate, pickupTime, shipmentComments, comments,
        // Package dimensions
        packageLength, packageWidth, packageHeight, pieces, description,
        // Barcode
        barcodeUrl
    } = req.body;

    // Calculate readtime if content exists
    const contentText = receiverName || content || "";
    const wordCount = contentText.trim().split(/\s+/).length;
    const readtime = Math.floor(wordCount / 200) || 3;

    try {
        // Create initial shipment history entry
        const initialHistory = [{
            date: new Date().toISOString().split('T')[0],
            time: new Date().toTimeString().split(' ')[0].slice(0, 5) + (parseInt(new Date().toTimeString().split(' ')[0].slice(0, 2)) >= 12 ? ' pm' : ' am'),
            location: location || "Origin",
            status: status || "Pending",
            updatedBy: req.user._id,
            remarks: shipmentComments || comments || ""
        }];

        const newStory = await Story.create({
            // Tracking ID will be auto-generated if not provided
            title: title || undefined, // Let schema generate if not provided
            barcodeUrl: barcodeUrl || undefined,
            // Shipper Information
            shipperName: shipperName || "",
            shipperAddress: shipperAddress || "",
            shipperPhone: shipperPhone || "",
            shipperEmail: shipperEmail || "",
            // Receiver Information
            receiverName: receiverName || content || "",
            receiverAddress: receiverAddress || address || "",
            receiverPhone: receiverPhone || "",
            receiverEmail: receiverEmail || "",
            // Shipment Information
            origin: origin || "",
            packageName: packageName || "",
            status: status || "Pending",
            destination: destination || "",
            carrier: carrier || "",
            shipmentMode: shipmentMode || "",
            weight: weight || "",
            quantity: quantity || "1",
            paymentMethod: paymentMethod || "",
            totalFreight: totalFreight || "",
            expectedDeliveryDate: expectedDeliveryDate || "",
            departureTime: departureTime || "",
            pickupDate: pickupDate || "",
            pickupTime: pickupTime || "",
            shipmentComments: shipmentComments || comments || "",
            // Package Dimensions
            packageLength: packageLength || "",
            packageWidth: packageWidth || "",
            packageHeight: packageHeight || "",
            pieces: pieces || "1",
            description: description || "",
            // Location
            location: location || "",
            long: long || "",
            lat: lat || "",
            time: time || "",
            // Shipment History
            shipmentHistory: initialHistory,
            // Legacy fields for backward compatibility
            content: receiverName || content || "",
            address: receiverAddress || address || "",
            // Author and metadata
            author: req.user._id,
            readtime,
        });

        return res.status(200).json({
            success: true,
            message: "Story added successfully",
            data: newStory,
        });
    } catch (error) {
        console.error("Error adding story:", error);
        return next(error);
    }
};

const getAllStories = asyncErrorWrapper( async (req,res,next) =>{

    let query = Story.find();

    query =searchHelper("title",query,req)

    const paginationResult =await paginateHelper(Story , query ,req)

    query = paginationResult.query  ;

    query = query.sort("-likeCount -commentCount -createdAt")

    const stories = await query
    
    return res.status(200).json(
        {
            success:true,
            count : stories.length,
            data : stories ,
            page : paginationResult.page ,
            pages : paginationResult.pages
        })

})

const detailStory =asyncErrorWrapper(async(req,res,next)=>{

    const {slug}=req.params ;
    const {activeUser} =req.body 

    const story = await Story.findOne({
        slug: slug 
    }).populate("author likes")

    const storyLikeUserIds = story.likes.map(json => json.id)
    const likeStatus = storyLikeUserIds.includes(activeUser._id)


    return res.status(200).
        json({
            success:true,
            data : story,
            likeStatus:likeStatus
        })

})

const likeStory =asyncErrorWrapper(async(req,res,next)=>{

    const {activeUser} =req.body 
    const {slug} = req.params ;

    const story = await Story.findOne({
        slug: slug 
    }).populate("author likes")
   
    const storyLikeUserIds = story.likes.map(json => json._id.toString())
   
    if (! storyLikeUserIds.includes(activeUser._id)){

        story.likes.push(activeUser)
        story.likeCount = story.likes.length
        await story.save() ; 
    }
    else {

        const index = storyLikeUserIds.indexOf(activeUser._id)
        story.likes.splice(index,1)
        story.likeCount = story.likes.length

        await story.save() ; 
    }
 
    return res.status(200).
    json({
        success:true,
        data : story
    })

})

const editStoryPage  =asyncErrorWrapper(async(req,res,next)=>{
    const {slug } = req.params ; 
   
    const story = await Story.findOne({
        slug: slug 
    }).populate("author likes")

    return res.status(200).
        json({
            success:true,
            data : story
    })

})


const editStory  =asyncErrorWrapper(async(req,res,next)=>{
    const {slug } = req.params ; 
    const {
        // Legacy fields
        title, content, address, status, time, packageName, location, weight, carrier, long, lat,
        // New fields
        shipperName, shipperAddress, shipperPhone, shipperEmail,
        receiverName, receiverAddress, receiverPhone, receiverEmail,
        origin, destination, shipmentMode, quantity, paymentMethod, totalFreight,
        expectedDeliveryDate, departureTime, pickupDate, pickupTime, shipmentComments, comments,
        packageLength, packageWidth, packageHeight, pieces, description,
        barcodeUrl
    } = req.body;

    const story = await Story.findOne({slug : slug })
    
    if (!story) {
        return res.status(404).json({
            success: false,
            error: "Story not found"
        });
    }

    // Update all fields if provided
    if (title !== undefined) story.title = title;
    if (content !== undefined) story.content = content;
    if (address !== undefined) story.address = address;
    if (status !== undefined) story.status = status;
    if (time !== undefined) story.time = time;
    if (packageName !== undefined) story.packageName = packageName;
    if (location !== undefined) story.location = location;
    if (weight !== undefined) story.weight = weight;
    if (carrier !== undefined) story.carrier = carrier;
    if (long !== undefined) story.long = long;
    if (lat !== undefined) story.lat = lat;
    
    // Update new fields
    if (shipperName !== undefined) story.shipperName = shipperName;
    if (shipperAddress !== undefined) story.shipperAddress = shipperAddress;
    if (shipperPhone !== undefined) story.shipperPhone = shipperPhone;
    if (shipperEmail !== undefined) story.shipperEmail = shipperEmail;
    if (receiverName !== undefined) story.receiverName = receiverName;
    if (receiverAddress !== undefined) story.receiverAddress = receiverAddress;
    if (receiverPhone !== undefined) story.receiverPhone = receiverPhone;
    if (receiverEmail !== undefined) story.receiverEmail = receiverEmail;
    if (origin !== undefined) story.origin = origin;
    if (destination !== undefined) story.destination = destination;
    if (shipmentMode !== undefined) story.shipmentMode = shipmentMode;
    if (quantity !== undefined) story.quantity = quantity;
    if (paymentMethod !== undefined) story.paymentMethod = paymentMethod;
    if (totalFreight !== undefined) story.totalFreight = totalFreight;
    if (expectedDeliveryDate !== undefined) story.expectedDeliveryDate = expectedDeliveryDate;
    if (departureTime !== undefined) story.departureTime = departureTime;
    if (pickupDate !== undefined) story.pickupDate = pickupDate;
    if (pickupTime !== undefined) story.pickupTime = pickupTime;
    if (shipmentComments !== undefined) story.shipmentComments = shipmentComments;
    if (comments !== undefined) story.shipmentComments = comments; // For backward compatibility
    if (packageLength !== undefined) story.packageLength = packageLength;
    if (packageWidth !== undefined) story.packageWidth = packageWidth;
    if (packageHeight !== undefined) story.packageHeight = packageHeight;
    if (pieces !== undefined) story.pieces = pieces;
    if (description !== undefined) story.description = description;
    if (barcodeUrl !== undefined) story.barcodeUrl = barcodeUrl;
    
    // Sync legacy fields for backward compatibility
    if (receiverName !== undefined) {
        story.content = receiverName;
    }
    if (receiverAddress !== undefined) {
        story.address = receiverAddress;
    }
    
    // Add shipment history entry if status or location changed
    const statusChanged = status !== undefined && story.status !== status;
    const locationChanged = location !== undefined && story.location !== location;
    
    if (statusChanged || locationChanged) {
        if (!story.shipmentHistory) {
            story.shipmentHistory = [];
        }
        
        const historyEntry = {
            date: new Date().toISOString().split('T')[0],
            time: new Date().toTimeString().split(' ')[0].slice(0, 5) + (parseInt(new Date().toTimeString().split(' ')[0].slice(0, 2)) >= 12 ? ' pm' : ' am'),
            location: location !== undefined ? location : story.location,
            status: status !== undefined ? status : story.status,
            updatedBy: req.user._id,
            remarks: shipmentComments || comments || ""
        };
        
        story.shipmentHistory.push(historyEntry);
    }

    await story.save();

    return res.status(200).json({
        success: true,
        data: story
    });
})

const deleteStory  =asyncErrorWrapper(async(req,res,next)=>{

    const {slug} = req.params  ;

    const story = await Story.findOne({slug : slug }) 

    await story.remove()

    return res.status(200).
        json({
            success:true,
            message : "Story delete succesfully "
    })

})


module.exports ={
    addStory,
    getAllStories,
    detailStory,
    likeStory,
    editStoryPage,
    editStory ,
    deleteStory
}