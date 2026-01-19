import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import styled from "styled-components";
import { FiX } from "react-icons/fi";
import { AuthContext } from "../../Context/AuthContext";

const EditPackageModal = ({ story, isOpen, onClose, onSuccess }) => {
  const { config } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Form state - initialize with story data
  const [formData, setFormData] = useState({
    // Shipper Information
    shipperName: story?.shipperName || "",
    shipperAddress: story?.shipperAddress || "",
    shipperPhone: story?.shipperPhone || "",
    shipperEmail: story?.shipperEmail || "",
    // Receiver Information
    receiverName: story?.receiverName || story?.content || "",
    receiverAddress: story?.receiverAddress || story?.address || "",
    receiverPhone: story?.receiverPhone || "",
    receiverEmail: story?.receiverEmail || "",
    // Shipment Information
    origin: story?.origin || "",
    packageName: story?.packageName || "",
    status: story?.status || "",
    destination: story?.destination || "",
    carrier: story?.carrier || "",
    shipmentMode: story?.shipmentMode || "",
    weight: story?.weight || "",
    quantity: story?.quantity || "1",
    paymentMethod: story?.paymentMethod || "",
    totalFreight: story?.totalFreight || "",
    expectedDeliveryDate: story?.expectedDeliveryDate || "",
    departureTime: story?.departureTime || "",
    pickupDate: story?.pickupDate || "",
    pickupTime: story?.pickupTime || "",
    shipmentComments: story?.shipmentComments || story?.comments || "",
    // Package Dimensions
    packageLength: story?.packageLength || "",
    packageWidth: story?.packageWidth || "",
    packageHeight: story?.packageHeight || "",
    pieces: story?.pieces || "1",
    description: story?.description || "",
    // Location
    location: story?.location || "",
    long: story?.long || "",
    lat: story?.lat || "",
    time: story?.time || "",
  });

  useEffect(() => {
    if (story) {
      setFormData({
        shipperName: story.shipperName || "",
        shipperAddress: story.shipperAddress || "",
        shipperPhone: story.shipperPhone || "",
        shipperEmail: story.shipperEmail || "",
        receiverName: story.receiverName || story.content || "",
        receiverAddress: story.receiverAddress || story.address || "",
        receiverPhone: story.receiverPhone || "",
        receiverEmail: story.receiverEmail || "",
        origin: story.origin || "",
        packageName: story.packageName || "",
        status: story.status || "",
        destination: story.destination || "",
        carrier: story.carrier || "",
        shipmentMode: story.shipmentMode || "",
        weight: story.weight || "",
        quantity: story.quantity || "1",
        paymentMethod: story.paymentMethod || "",
        totalFreight: story.totalFreight || "",
        expectedDeliveryDate: story.expectedDeliveryDate || "",
        departureTime: story.departureTime || "",
        pickupDate: story.pickupDate || "",
        pickupTime: story.pickupTime || "",
        shipmentComments: story.shipmentComments || story.comments || "",
        packageLength: story.packageLength || "",
        packageWidth: story.packageWidth || "",
        packageHeight: story.packageHeight || "",
        pieces: story.pieces || "1",
        description: story.description || "",
        location: story.location || "",
        long: story.long || "",
        lat: story.lat || "",
        time: story.time || "",
      });
    }
  }, [story]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const { data } = await axios.put(
        `https://global-logistics-isu8.onrender.com/story/${story.slug}/edit`,
        formData,
        config
      );

      setSuccess("Package updated successfully!");
      setTimeout(() => {
        if (onSuccess) {
          onSuccess(data.data);
        }
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update package");
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Edit Package Details</ModalTitle>
          <CloseButton onClick={onClose}>
            <FiX />
          </CloseButton>
        </ModalHeader>

        <ModalBody>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>{success}</SuccessMessage>}

          <Form onSubmit={handleSubmit}>
            {/* Shipper Information */}
            <SectionGroup>
              <SectionTitle>Shipper Information (Optional)</SectionTitle>
              <Row>
                <Col md="6">
                  <FormInput
                    type="text"
                    name="shipperName"
                    placeholder="Shipper Name"
                    value={formData.shipperName}
                    onChange={handleChange}
                  />
                </Col>
                <Col md="6">
                  <FormInput
                    type="text"
                    name="shipperAddress"
                    placeholder="Shipper Address"
                    value={formData.shipperAddress}
                    onChange={handleChange}
                  />
                </Col>
                <Col md="6">
                  <FormInput
                    type="tel"
                    name="shipperPhone"
                    placeholder="Shipper Phone"
                    value={formData.shipperPhone}
                    onChange={handleChange}
                  />
                </Col>
                <Col md="6">
                  <FormInput
                    type="email"
                    name="shipperEmail"
                    placeholder="Shipper Email"
                    value={formData.shipperEmail}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
            </SectionGroup>

            {/* Receiver Information */}
            <SectionGroup>
              <SectionTitle>Receiver Information *</SectionTitle>
              <Row>
                <Col md="6">
                  <FormInput
                    type="text"
                    name="receiverName"
                    required
                    placeholder="Receiver Name"
                    value={formData.receiverName}
                    onChange={handleChange}
                  />
                </Col>
                <Col md="6">
                  <FormInput
                    type="text"
                    name="receiverAddress"
                    required
                    placeholder="Receiver Address"
                    value={formData.receiverAddress}
                    onChange={handleChange}
                  />
                </Col>
                <Col md="6">
                  <FormInput
                    type="tel"
                    name="receiverPhone"
                    placeholder="Receiver Phone"
                    value={formData.receiverPhone}
                    onChange={handleChange}
                  />
                </Col>
                <Col md="6">
                  <FormInput
                    type="email"
                    name="receiverEmail"
                    placeholder="Receiver Email"
                    value={formData.receiverEmail}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
            </SectionGroup>

            {/* Shipment Information */}
            <SectionGroup>
              <SectionTitle>Shipment Information *</SectionTitle>
              <Row>
                <Col md="6">
                  <FormInput
                    type="text"
                    name="origin"
                    placeholder="Origin"
                    value={formData.origin}
                    onChange={handleChange}
                  />
                </Col>
                <Col md="6">
                  <FormInput
                    type="text"
                    name="packageName"
                    required
                    placeholder="Package Name"
                    value={formData.packageName}
                    onChange={handleChange}
                  />
                </Col>
                <Col md="6">
                  <FormSelect
                    name="status"
                    required
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="">Select Status</option>
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
                    name="destination"
                    placeholder="Destination"
                    value={formData.destination}
                    onChange={handleChange}
                  />
                </Col>
                <Col md="6">
                  <FormSelect
                    name="carrier"
                    required
                    value={formData.carrier}
                    onChange={handleChange}
                  >
                    <option value="">Select Carrier</option>
                    <option value="USPS">USPS</option>
                    <option value="UPS">UPS</option>
                    <option value="FedEx">FedEx</option>
                    <option value="DHL">DHL</option>
                    <option value="UShip">UShip</option>
                  </FormSelect>
                </Col>
                <Col md="6">
                  <FormSelect
                    name="shipmentMode"
                    value={formData.shipmentMode}
                    onChange={handleChange}
                  >
                    <option value="">Select Shipment Mode</option>
                    <option value="Air Freight">Air Freight</option>
                    <option value="Sea Freight">Sea Freight</option>
                    <option value="Road Freight">Road Freight</option>
                    <option value="Express">Express</option>
                  </FormSelect>
                </Col>
                <Col md="6">
                  <FormInput
                    type="text"
                    name="weight"
                    required
                    placeholder="Weight"
                    value={formData.weight}
                    onChange={handleChange}
                  />
                </Col>
                <Col md="6">
                  <FormInput
                    type="text"
                    name="quantity"
                    placeholder="Quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                  />
                </Col>
                <Col md="6">
                  <FormInput
                    type="text"
                    name="paymentMethod"
                    placeholder="Payment Method"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                  />
                </Col>
                <Col md="6">
                  <FormInput
                    type="text"
                    name="totalFreight"
                    placeholder="Total Freight"
                    value={formData.totalFreight}
                    onChange={handleChange}
                  />
                </Col>
                <Col md="6">
                  <FormInput
                    type="date"
                    name="expectedDeliveryDate"
                    placeholder="Expected Delivery Date"
                    value={formData.expectedDeliveryDate}
                    onChange={handleChange}
                  />
                </Col>
                <Col md="6">
                  <FormInput
                    type="time"
                    name="departureTime"
                    placeholder="Departure Time"
                    value={formData.departureTime}
                    onChange={handleChange}
                  />
                </Col>
                <Col md="6">
                  <FormInput
                    type="date"
                    name="pickupDate"
                    placeholder="Pick-up Date"
                    value={formData.pickupDate}
                    onChange={handleChange}
                  />
                </Col>
                <Col md="6">
                  <FormInput
                    type="time"
                    name="pickupTime"
                    placeholder="Pick-up Time"
                    value={formData.pickupTime}
                    onChange={handleChange}
                  />
                </Col>
                <Col md="12">
                  <FormTextarea
                    name="shipmentComments"
                    placeholder="Comments"
                    rows="3"
                    value={formData.shipmentComments}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
            </SectionGroup>

            {/* Package Dimensions */}
            <SectionGroup>
              <SectionTitle>Package Dimensions (Optional)</SectionTitle>
              <Row>
                <Col md="3">
                  <FormInput
                    type="text"
                    name="packageLength"
                    placeholder="Length (cm)"
                    value={formData.packageLength}
                    onChange={handleChange}
                  />
                </Col>
                <Col md="3">
                  <FormInput
                    type="text"
                    name="packageWidth"
                    placeholder="Width (cm)"
                    value={formData.packageWidth}
                    onChange={handleChange}
                  />
                </Col>
                <Col md="3">
                  <FormInput
                    type="text"
                    name="packageHeight"
                    placeholder="Height (cm)"
                    value={formData.packageHeight}
                    onChange={handleChange}
                  />
                </Col>
                <Col md="3">
                  <FormInput
                    type="text"
                    name="pieces"
                    placeholder="Pieces"
                    value={formData.pieces}
                    onChange={handleChange}
                  />
                </Col>
                <Col md="12">
                  <FormInput
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
            </SectionGroup>

            {/* Location Information */}
            <SectionGroup>
              <SectionTitle>Location Information</SectionTitle>
              <Row>
                <Col md="6">
                  <FormInput
                    type="text"
                    name="location"
                    required
                    placeholder="Last Recorded Location"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </Col>
                <Col md="3">
                  <FormInput
                    type="text"
                    name="lat"
                    placeholder="Latitude"
                    value={formData.lat}
                    onChange={handleChange}
                  />
                </Col>
                <Col md="3">
                  <FormInput
                    type="text"
                    name="long"
                    placeholder="Longitude"
                    value={formData.long}
                    onChange={handleChange}
                  />
                </Col>
                <Col md="12">
                  <FormInput
                    type="text"
                    name="time"
                    required
                    placeholder="Expected Delivery Time"
                    value={formData.time}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
            </SectionGroup>

            <ButtonGroup>
              <CancelButton type="button" onClick={onClose} disabled={loading}>
                Cancel
              </CancelButton>
              <SubmitButton type="submit" disabled={loading}>
                {loading ? "Updating..." : "Update Package"}
              </SubmitButton>
            </ButtonGroup>
          </Form>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default EditPackageModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 1rem;
  overflow-y: auto;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  background: white;
  z-index: 1;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #222f3e;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #6b7280;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background: #f3f4f6;
    color: #222f3e;
  }
`;

const ModalBody = styled.div`
  padding: 2rem;
  overflow-y: auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const SectionGroup = styled.div`
  padding: 1.5rem;
  background: #f9fafb;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
`;

const SectionTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #2d8659;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #2d8659;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.9375rem;
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
  font-size: 0.9375rem;
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
  font-size: 0.9375rem;
  font-family: inherit;
  resize: vertical;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #2d8659;
    box-shadow: 0 0 0 3px rgba(45, 134, 89, 0.1);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
`;

const CancelButton = styled.button`
  padding: 0.75rem 2rem;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid #d1d5db;
  background: white;
  color: #333;
  
  &:hover:not(:disabled) {
    background: #f3f4f6;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SubmitButton = styled.button`
  padding: 0.75rem 2rem;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  background: linear-gradient(135deg, #2d8659 0%, #1e5a3e 100%);
  color: white;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(45, 134, 89, 0.3);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  background-color: #fee;
  color: #c33;
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  border: 1px solid #fcc;
`;

const SuccessMessage = styled.div`
  background-color: #efe;
  color: #3c3;
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  border: 1px solid #cfc;
`;
