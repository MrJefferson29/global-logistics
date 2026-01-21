import React, { useContext } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { FiArrowLeft, FiCopy, FiCheck } from "react-icons/fi";
import "../../Css/AddStory.css";
import { Row, Col } from "react-bootstrap";
import styled from "styled-components";

const AddStory = () => {
  const { config } = useContext(AuthContext);
  
  // Tracking (auto-generated, but keeping for backward compatibility)
  const [title, setTitle] = useState("");
  
  // Shipper Information
  const [shipperName, setShipperName] = useState("");
  const [shipperAddress, setShipperAddress] = useState("");
  const [shipperPhone, setShipperPhone] = useState("");
  const [shipperEmail, setShipperEmail] = useState("");
  
  // Receiver Information
  const [receiverName, setReceiverName] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");
  const [receiverPhone, setReceiverPhone] = useState("");
  const [receiverEmail, setReceiverEmail] = useState("");
  
  // Shipment Information
  const [origin, setOrigin] = useState("");
  const [packageName, setPackageName] = useState("");
  const [status, setStatus] = useState("");
  const [destination, setDestination] = useState("");
  const [carrier, setCarrier] = useState("");
  const [shipmentMode, setShipmentMode] = useState("");
  const [weight, setWeight] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [totalFreight, setTotalFreight] = useState("");
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [comments, setComments] = useState("");
  const [shipmentComments, setShipmentComments] = useState("");
  
  // Package Dimensions
  const [packageLength, setPackageLength] = useState("");
  const [packageWidth, setPackageWidth] = useState("");
  const [packageHeight, setPackageHeight] = useState("");
  const [pieces, setPieces] = useState("1");
  const [description, setDescription] = useState("");
  
  // Location
  const [location, setLocation] = useState("");
  const [long, setLong] = useState("");
  const [lat, setLat] = useState("");
  const [time, setTime] = useState("");
  
  // Legacy fields for backward compatibility
  const [content, setContent] = useState("");
  const [address, setAddress] = useState("");
  
  // UI State
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [generatedTrackingId, setGeneratedTrackingId] = useState("");
  const [copied, setCopied] = useState(false);

  const clearInputs = () => {
    setTitle("");
    setShipperName("");
    setShipperAddress("");
    setShipperPhone("");
    setShipperEmail("");
    setReceiverName("");
    setReceiverAddress("");
    setReceiverPhone("");
    setReceiverEmail("");
    setOrigin("");
    setPackageName("");
    setStatus("");
    setDestination("");
    setCarrier("");
    setShipmentMode("");
    setWeight("");
    setQuantity("1");
    setPaymentMethod("");
    setTotalFreight("");
    setExpectedDeliveryDate("");
    setDepartureTime("");
    setPickupDate("");
    setPickupTime("");
    setComments("");
    setPackageLength("");
    setPackageWidth("");
    setPackageHeight("");
    setPieces("1");
    setDescription("");
    setLocation("");
    setLong("");
    setLat("");
    setTime("");
    setContent("");
    setAddress("");
  };

  const copyToClipboard = async () => {
    if (generatedTrackingId) {
      try {
        await navigator.clipboard.writeText(generatedTrackingId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      // Legacy fields (mapped to new fields)
      title: title || undefined, // Let backend auto-generate if empty
      content: receiverName || content,
      address: receiverAddress || address,
      // Shipper Information
      shipperName,
      shipperAddress,
      shipperPhone,
      shipperEmail,
      // Receiver Information
      receiverName: receiverName || content,
      receiverAddress: receiverAddress || address,
      receiverPhone,
      receiverEmail,
      // Shipment Information
      origin,
      packageName,
      status,
      destination,
      carrier,
      shipmentMode,
      weight,
      quantity,
      paymentMethod,
      totalFreight,
      expectedDeliveryDate,
      departureTime,
      pickupDate,
      pickupTime,
      shipmentComments: shipmentComments || comments,
      comments: shipmentComments || comments, // For backward compatibility
      // Package Dimensions
      packageLength,
      packageWidth,
      packageHeight,
      pieces,
      description,
      // Location
      location,
      long,
      lat,
      time,
    };

    try {
      const { data } = await axios.post(
        "https://global-logistics-isu8.onrender.com/story/addstory",
        formData,
        config
      );
      
      // Get the generated tracking ID
      const trackingId = data.data?.title || "";
      setGeneratedTrackingId(trackingId);
      setSuccess("Package added successfully");
      clearInputs();

      // Don't auto-hide success message for dialog
    } catch (error) {
      setError(error.response?.data?.error || "An error occurred");
      setTimeout(() => {
        setError("");
      }, 7000);
    }
  };

  return (
    <AddStoryContainer>
      <Link to={"/"}>
        <BackButton>
          <FiArrowLeft /> Back
        </BackButton>
      </Link>
      
      <FormContainer>
        <FormTitle>Add New Package</FormTitle>
        <form onSubmit={handleSubmit}>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          
          {/* Shipper Information Section */}
          <SectionGroup>
            <SectionTitle>Shipper Information (Optional)</SectionTitle>
            <Row>
              <Col md="6">
                <FormInput
                  type="text"
                  placeholder="Shipper Name (Ex: John Doe)"
                  value={shipperName}
                  onChange={(e) => setShipperName(e.target.value)}
                />
              </Col>
              <Col md="6">
                <FormInput
                  type="text"
                  placeholder="Shipper Address (Ex: 1000 Vin Scully Avenue, Los Angeles, CA)"
                  value={shipperAddress}
                  onChange={(e) => setShipperAddress(e.target.value)}
                />
              </Col>
              <Col md="6">
                <FormInput
                  type="tel"
                  placeholder="Shipper Phone (Ex: +1 805-918-4919)"
                  value={shipperPhone}
                  onChange={(e) => setShipperPhone(e.target.value)}
                />
              </Col>
              <Col md="6">
                <FormInput
                  type="email"
                  placeholder="Shipper Email (Ex: shipper@example.com)"
                  value={shipperEmail}
                  onChange={(e) => setShipperEmail(e.target.value)}
                />
              </Col>
            </Row>
          </SectionGroup>

          {/* Receiver Information Section */}
          <SectionGroup>
            <SectionTitle>Receiver Information *</SectionTitle>
            <Row>
              <Col md="6">
                <FormInput
                  type="text"
                  required
                  placeholder="Receiver Name (Ex: Josh Vitek)"
                  value={receiverName}
                  onChange={(e) => {
                    setReceiverName(e.target.value);
                    setContent(e.target.value); // Legacy field
                  }}
                />
              </Col>
              <Col md="6">
                <FormInput
                  type="text"
                  required
                  placeholder="Receiver Address (Ex: 2726 Haw creek rd Fayetteville Tx 78940)"
                  value={receiverAddress}
                  onChange={(e) => {
                    setReceiverAddress(e.target.value);
                    setAddress(e.target.value); // Legacy field
                  }}
                />
              </Col>
              <Col md="6">
                <FormInput
                  type="tel"
                  placeholder="Receiver Phone (Ex: 979-966-7331)"
                  value={receiverPhone}
                  onChange={(e) => setReceiverPhone(e.target.value)}
                />
              </Col>
              <Col md="6">
                <FormInput
                  type="email"
                  placeholder="Receiver Email (Ex: receiver@example.com)"
                  value={receiverEmail}
                  onChange={(e) => setReceiverEmail(e.target.value)}
                />
              </Col>
            </Row>
          </SectionGroup>

          {/* Shipment Information Section */}
          <SectionGroup>
            <SectionTitle>Shipment Information *</SectionTitle>
            <Row>
              <Col md="6">
                <FormInput
                  type="text"
                  placeholder="Origin (Ex: United States)"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                />
              </Col>
              <Col md="6">
                <FormInput
                  type="text"
                  required
                  placeholder="Package Name (Ex: 300MLB baseballs)"
                  value={packageName}
                  onChange={(e) => setPackageName(e.target.value)}
                />
              </Col>
              <Col md="6">
                <FormSelect
                  required
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="" disabled>Select Status</option>
                  <option value="On Hold">On Hold</option>
                  <option value="On Transit">On Transit</option>
                  <option value="In Transit">In Transit</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Delayed">Delayed</option>
                  <option value="Denied">Denied</option>
                </FormSelect>
              </Col>
              <Col md="6">
                <FormInput
                  type="text"
                  placeholder="Destination (Ex: United States)"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </Col>
              <Col md="6">
                <FormSelect
                  required
                  value={carrier}
                  onChange={(e) => setCarrier(e.target.value)}
                >
                  <option value="" disabled>Select Carrier</option>
                  <option value="USPS">USPS</option>
                  <option value="UPS">UPS</option>
                  <option value="FedEx">FedEx</option>
                  <option value="DHL">DHL</option>
                  <option value="UShip">UShip</option>
                </FormSelect>
              </Col>
              <Col md="6">
                <FormSelect
                  value={shipmentMode}
                  onChange={(e) => setShipmentMode(e.target.value)}
                >
                  <option value="" disabled>Select Shipment Mode</option>
                  <option value="Air Freight">Air Freight</option>
                  <option value="Sea Freight">Sea Freight</option>
                  <option value="Road Freight">Road Freight</option>
                  <option value="Express">Express</option>
                </FormSelect>
              </Col>
              <Col md="6">
                <FormInput
                  type="text"
                  required
                  placeholder="Weight (Ex: 2.67kg)"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </Col>
              <Col md="6">
                <FormInput
                  type="text"
                  placeholder="Quantity (Ex: 1)"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </Col>
              <Col md="6">
                <FormInput
                  type="text"
                  placeholder="Payment Method (Ex: ZELLE)"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
              </Col>
              <Col md="6">
                <FormInput
                  type="text"
                  placeholder="Total Freight (Ex: 1)"
                  value={totalFreight}
                  onChange={(e) => setTotalFreight(e.target.value)}
                />
              </Col>
              <Col md="6">
                <FormInput
                  type="date"
                  placeholder="Expected Delivery Date"
                  value={expectedDeliveryDate}
                  onChange={(e) => setExpectedDeliveryDate(e.target.value)}
                />
              </Col>
              <Col md="6">
                <FormInput
                  type="time"
                  placeholder="Departure Time"
                  value={departureTime}
                  onChange={(e) => setDepartureTime(e.target.value)}
                />
              </Col>
              <Col md="6">
                <FormInput
                  type="date"
                  placeholder="Pick-up Date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                />
              </Col>
              <Col md="6">
                <FormInput
                  type="time"
                  placeholder="Pick-up Time"
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                />
              </Col>
              <Col md="12">
                <FormTextarea
                  placeholder="Comments (Optional)"
                  rows="3"
                  value={shipmentComments || comments}
                  onChange={(e) => {
                    setShipmentComments(e.target.value);
                    setComments(e.target.value); // For backward compatibility
                  }}
                />
              </Col>
            </Row>
          </SectionGroup>
          {/* Location Information Section */}
          <SectionGroup>
            <SectionTitle>Location Information</SectionTitle>
            <Row>
              <Col md="6">
                <FormInput
                  type="text"
                  required
                  placeholder="Last Recorded Location (Ex: Los Angeles)"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </Col>
              <Col md="3">
                <FormInput
                  type="text"
                  placeholder="Latitude (Ex: 34.0522)"
                  value={lat}
                  onChange={(e) => setLat(e.target.value)}
                />
              </Col>
              <Col md="3">
                <FormInput
                  type="text"
                  placeholder="Longitude (Ex: -118.2437)"
                  value={long}
                  onChange={(e) => setLong(e.target.value)}
                />
              </Col>
              <Col md="12">
                <FormInput
                  type="text"
                  required
                  placeholder="Expected Delivery Time (Ex: 2025-11-24 or 3 days)"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </Col>
            </Row>
          </SectionGroup>

          <SubmitButton type="submit">Add Package</SubmitButton>
        </form>
      </FormContainer>

      {/* Success Dialog */}
      {success && generatedTrackingId && (
        <SuccessDialog>
          <SuccessDialogContent>
            <SuccessIcon>✓</SuccessIcon>
            <SuccessTitle>Package Added Successfully!</SuccessTitle>
            <SuccessMessage>Your tracking number has been generated:</SuccessMessage>
            <TrackingIdDisplay>
              <TrackingId>{generatedTrackingId}</TrackingId>
              <CopyButton onClick={copyToClipboard}>
                {copied ? <FiCheck /> : <FiCopy />}
                {copied ? "Copied!" : "Copy"}
              </CopyButton>
            </TrackingIdDisplay>
            <DialogButtons>
              <DialogButton onClick={() => {
                setSuccess("");
                setGeneratedTrackingId("");
              }}>
                Close
              </DialogButton>
              <DialogLink to="/">
                Go Home
              </DialogLink>
            </DialogButtons>
          </SuccessDialogContent>
        </SuccessDialog>
      )}
    </AddStoryContainer>
  );
};

export default AddStory;

const AddStoryContainer = styled.div`
  min-height: 100vh;
  background-color: #f5f7fa;
  padding: 2rem 1rem;
  position: relative;
`;

const BackButton = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #333;
  text-decoration: none;
  margin-bottom: 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  transition: color 0.3s ease;
  
  &:hover {
    color: #2d8659;
  }
`;

const FormContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  padding: 2.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #222f3e;
  margin-bottom: 2rem;
  text-align: center;
`;

const SectionGroup = styled.div`
  margin-bottom: 2.5rem;
  padding: 1.5rem;
  background-color: #f9fafb;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
`;

const SectionTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #2d8659;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #2d8659;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #2d8659;
    box-shadow: 0 0 0 3px rgba(45, 134, 89, 0.1);
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
  background-color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #2d8659;
    box-shadow: 0 0 0 3px rgba(45, 134, 89, 0.1);
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #2d8659;
    box-shadow: 0 0 0 3px rgba(45, 134, 89, 0.1);
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #2d8659 0%, #1e5a3e 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  
  &:hover {
    background: linear-gradient(135deg, #1e5a3e 0%, #2d8659 100%);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(45, 134, 89, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const ErrorMessage = styled.div`
  background-color: #fee;
  color: #c33;
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 1.5rem;
  border: 1px solid #fcc;
`;

const SuccessDialog = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1rem;
`;

const SuccessDialogContent = styled.div`
  background: white;
  border-radius: 16px;
  padding: 3rem 2rem;
  max-width: 500px;
  width: 100%;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideIn 0.3s ease-out;
  
  @keyframes slideIn {
    from {
      transform: translateY(-50px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const SuccessIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #2d8659 0%, #1e5a3e 100%);
  color: white;
  font-size: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
`;

const SuccessTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  color: #222f3e;
  margin-bottom: 1rem;
`;

const SuccessMessage = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 1.5rem;
`;

const TrackingIdDisplay = styled.div`
  background: #f5f7fa;
  border: 2px solid #2d8659;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`;

const TrackingId = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #2d8659;
  letter-spacing: 0.1em;
  word-break: break-all;
`;

const CopyButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #2d8659;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #1e5a3e;
    transform: translateY(-2px);
  }
`;

const DialogButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const DialogButton = styled.button`
  padding: 0.75rem 2rem;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid #d1d5db;
  background: white;
  color: #333;
  
  ${props => props.primary && `
    background: linear-gradient(135deg, #2d8659 0%, #1e5a3e 100%);
    color: white;
    border-color: #2d8659;
  `}
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const DialogLink = styled(Link)`
  padding: 0.75rem 2rem;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid #2d8659;
  background: linear-gradient(135deg, #2d8659 0%, #1e5a3e 100%);
  color: white;
  display: inline-block;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;
