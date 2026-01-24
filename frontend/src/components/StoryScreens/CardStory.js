import React, { useState, useContext } from "react";
import { Col, Row, Container } from "react-bootstrap";
import styled from "styled-components";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import PropTypes from "prop-types";
import { FiEdit2 } from "react-icons/fi";
import pin from "../../Assets/pin.png";
import { AuthContext } from "../../Context/AuthContext";
import EditPackageModal from "./EditPackageModal";
import bar from "../../Assets/bar.png";
import tom from "../../Assets/tom.jpg";


const customIcon = new L.Icon({
  iconUrl: pin,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const Story = ({ story, onUpdate }) => {
  const { activeUser } = useContext(AuthContext);
  // Check if user is authenticated (has activeUser or authToken)
  const isAuthenticated = (activeUser && Object.keys(activeUser).length > 0) || localStorage.getItem("authToken");
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const hasValidCoordinates = story.lat && story.long && !isNaN(story.lat) && !isNaN(story.long);
  const trackingId = story.title || "N/A";
  const receiverName = story.receiverName || story.content || "N/A";
  const receiverAddress = story.receiverAddress || story.address || "N/A";
  const shipperName = story.shipperName || "N/A";
  const shipperAddress = story.shipperAddress || "N/A";

  const handleEditSuccess = (updatedStory) => {
    if (onUpdate) {
      onUpdate(updatedStory);
    }
    setIsEditModalOpen(false);
  };

  return (
    <Styles>
      <StoryWrapper>
        <StoryCard>
          {/* Track Shipment Section */}
          <TrackSection>
            <TrackHeading>Track Shipment</TrackHeading>
            <TrackingIdDisplay>
              <TrackingIdLabel>Consignment No.:</TrackingIdLabel>
              <TrackingIdValue>{trackingId}</TrackingIdValue>
            </TrackingIdDisplay>
            <ButtonGroup>
              {isAuthenticated ? (
                <TrackButton onClick={() => setIsEditModalOpen(true)}>
                  <FiEdit2 /> Edit Package
                </TrackButton>
              ) : (
                <TrackButton>TRACK RESULT</TrackButton>
              )}
              <PrintButton onClick={() => window.print()}>Print Track Result</PrintButton>
            </ButtonGroup>
          </TrackSection>

          {/* Barcode and Carrier Logo */}
          <BarcodeSection>
            <BarcodeContainer>
              <BarcodeImage>
                <img 
                  src={bar} 
                  alt="Barcode" 
                />
              </BarcodeImage>
              <BarcodeNumber>{trackingId}</BarcodeNumber>
            </BarcodeContainer>
          </BarcodeSection>

          {/* Shipper Information */}
          {(shipperName !== "N/A" || shipperAddress !== "N/A") && (
            <InfoSection>
              <SectionTitle>Shipper Information</SectionTitle>
              <InfoGrid>
                <InfoItem>
                  <InfoLabel>Name:</InfoLabel>
                  <InfoValue>{shipperName}</InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>Address:</InfoLabel>
                  <InfoValue>{shipperAddress}</InfoValue>
                </InfoItem>
                {story.shipperPhone && (
                  <InfoItem>
                    <InfoLabel>Phone:</InfoLabel>
                    <InfoValue>{story.shipperPhone}</InfoValue>
                  </InfoItem>
                )}
                {story.shipperEmail && (
                  <InfoItem>
                    <InfoLabel>Email:</InfoLabel>
                    <InfoValue>{story.shipperEmail}</InfoValue>
                  </InfoItem>
                )}
              </InfoGrid>
            </InfoSection>
          )}

          {/* Receiver Information */}
          <InfoSection>
            <SectionTitle>Receiver Information</SectionTitle>
            <InfoGrid>
              <InfoItem>
                <InfoLabel>Name:</InfoLabel>
                <InfoValue>{receiverName}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>Address:</InfoLabel>
                <InfoValue>{receiverAddress}</InfoValue>
              </InfoItem>
              {story.receiverPhone && (
                <InfoItem>
                  <InfoLabel>Phone:</InfoLabel>
                  <InfoValue>{story.receiverPhone}</InfoValue>
                </InfoItem>
              )}
              {story.receiverEmail && (
                <InfoItem>
                  <InfoLabel>Email:</InfoLabel>
                  <InfoValue>{story.receiverEmail}</InfoValue>
                </InfoItem>
              )}
            </InfoGrid>
          </InfoSection>

          {/* Shipment Information */}
          <InfoSection>
            <SectionTitle>Shipment Information</SectionTitle>
            <InfoGrid>
              {story.origin && (
                <InfoItem>
                  <InfoLabel>Origin:</InfoLabel>
                  <InfoValue>{story.origin}</InfoValue>
                </InfoItem>
              )}
              {story.packageName && (
                <InfoItem>
                  <InfoLabel>Package:</InfoLabel>
                  <InfoValue>{story.packageName}</InfoValue>
                </InfoItem>
              )}
              <InfoItem>
                <InfoLabel>Status:</InfoLabel>
                <StatusValue status={story.status || "Pending"}>{story.status || "N/A"}</StatusValue>
              </InfoItem>
              {story.destination && (
                <InfoItem>
                  <InfoLabel>Destination:</InfoLabel>
                  <InfoValue>{story.destination}</InfoValue>
                </InfoItem>
              )}
              {story.carrier && (
                <InfoItem>
                  <InfoLabel>Carrier:</InfoLabel>
                  <InfoValue>{story.carrier}</InfoValue>
                </InfoItem>
              )}
              {story.shipmentMode && (
                <InfoItem>
                  <InfoLabel>Shipment Mode:</InfoLabel>
                  <InfoValue>{story.shipmentMode}</InfoValue>
                </InfoItem>
              )}
              {story.weight && (
                <InfoItem>
                  <InfoLabel>Weight:</InfoLabel>
                  <InfoValue>{story.weight}</InfoValue>
                </InfoItem>
              )}
              {story.title && (
                <InfoItem>
                  <InfoLabel>Carrier Reference No.:</InfoLabel>
                  <InfoValue>{story.title}</InfoValue>
                </InfoItem>
              )}
              {story.product && (
                <InfoItem>
                  <InfoLabel>Product:</InfoLabel>
                  <InfoValue>{story.product}</InfoValue>
                </InfoItem>
              )}
              {story.quantity && (
                <InfoItem>
                  <InfoLabel>Qty:</InfoLabel>
                  <InfoValue>{story.quantity}</InfoValue>
                </InfoItem>
              )}
              {story.paymentMethod && (
                <InfoItem>
                  <InfoLabel>Payment Mode:</InfoLabel>
                  <InfoValue>{story.paymentMethod}</InfoValue>
                </InfoItem>
              )}
              {story.totalFreight && (
                <InfoItem>
                  <InfoLabel>Total Freight:</InfoLabel>
                  <InfoValue>{story.totalFreight}</InfoValue>
                </InfoItem>
              )}
              {story.expectedDeliveryDate && (
                <InfoItem>
                  <InfoLabel>Expected Delivery Date:</InfoLabel>
                  <InfoValue>{story.expectedDeliveryDate}</InfoValue>
                </InfoItem>
              )}
              {story.departureTime && (
                <InfoItem>
                  <InfoLabel>Departure Time:</InfoLabel>
                  <InfoValue>{story.departureTime}</InfoValue>
                </InfoItem>
              )}
              {story.pickupDate && (
                <InfoItem>
                  <InfoLabel>Pick-up Date:</InfoLabel>
                  <InfoValue>{story.pickupDate}</InfoValue>
                </InfoItem>
              )}
              {story.pickupTime && (
                <InfoItem>
                  <InfoLabel>Pick-up Time:</InfoLabel>
                  <InfoValue>{story.pickupTime}</InfoValue>
                </InfoItem>
              )}
              {(story.shipmentComments || story.comments) && (
                <InfoItem fullWidth>
                  <InfoLabel>Comments:</InfoLabel>
                  <InfoValue>{story.shipmentComments || story.comments || "N/A"}</InfoValue>
                </InfoItem>
              )}
            </InfoGrid>
          </InfoSection>

          {/* Packages Section */}
          {(story.packageLength || story.packageWidth || story.packageHeight || story.weight) && (
            <InfoSection>
              <SectionTitle>Packages</SectionTitle>
              <TableWrapper>
              <PackageTable>
                <thead>
                  <tr>
                    <th>Qty</th>
                    <th>Pieces</th>
                    <th>Description</th>
                    <th>Length (cm)</th>
                    <th>Width (cm)</th>
                    <th>Height (cm)</th>
                    <th>Weight (kg)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{story.quantity || story.pieces || "1"}</td>
                    <td>{story.pieces || "1"}</td>
                    <td>{story.description || story.packageName || "-"}</td>
                    <td>{story.packageLength || "0.00"}</td>
                    <td>{story.packageWidth || "0.00"}</td>
                    <td>{story.packageHeight || "0.00"}</td>
                    <td>{story.weight || "0.00"}</td>
                  </tr>
                </tbody>
              </PackageTable>
              </TableWrapper>
            </InfoSection>
          )}

          {/* Shipment History */}
          <InfoSection>
            <SectionTitle>Shipment History</SectionTitle>
            <TableWrapper>
            <HistoryTable>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Updated By</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {story.shipmentHistory && story.shipmentHistory.length > 0 ? (
                  story.shipmentHistory.map((history, index) => (
                    <tr key={index}>
                      <td>{history.date || "-"}</td>
                      <td>{history.time || "-"}</td>
                      <td>{history.location || story.location || "-"}</td>
                      <td>
                        <StatusValue status={history.status || story.status}>
                          {history.status || story.status || "-"}
                        </StatusValue>
                      </td>
                      <td>{history.updatedBy?.name || "admin"}</td>
                    <td>{history.remarks || "-"}</td>
                  </tr>
                ))
                ) : (
                  <tr>
                    <td>{story.pickupDate || new Date().toISOString().split('T')[0]}</td>
                    <td>{story.pickupTime || "09:00 am"}</td>
                    <td>{story.location || "Origin"}</td>
                    <td>
                      <StatusValue status={story.status}>{story.status || "On Hold"}</StatusValue>
                    </td>
                    <td>admin</td>
                    <td>{story.shipmentComments || story.comments || "-"}</td>
                  </tr>
                )}
              </tbody>
            </HistoryTable>
            </TableWrapper>
          </InfoSection>

          {/* Map Section (if coordinates available) */}
          {hasValidCoordinates && (
            <InfoSection>
              <SectionTitle>Package Location on Map</SectionTitle>
              <MapWrapper>
                <MapContainer
                  center={[parseFloat(story.lat), parseFloat(story.long)]}
                  zoom={13}
                  scrollWheelZoom={false}
                  style={{
                    width: "100%",
                    height: "350px",
                    borderRadius: "10px",
                  }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                  />
                  <Marker position={[parseFloat(story.lat), parseFloat(story.long)]} icon={customIcon}>
                    <Popup>
                      Package current location: {story.location || "Unknown"}
                    </Popup>
                  </Marker>
                </MapContainer>
              </MapWrapper>
            </InfoSection>
          )}
        </StoryCard>
      </StoryWrapper>
      
      {/* Edit Modal */}
      {isEditModalOpen && (
        <EditPackageModal
          story={story}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSuccess={handleEditSuccess}
        />
      )}
    </Styles>
  );
};

Story.propTypes = {
  story: PropTypes.object.isRequired,
};

export default Story;

const Styles = styled.div``;

const StoryWrapper = styled.div`
  background-color: #f5f7fa;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  overflow-x: hidden;
  width: 100%;
  max-width: 100vw;
  box-sizing: border-box;
  margin: 0;
  position: relative;

  @media (min-width: 768px) {
    padding: 15px 10px;
  }
`;

const StoryCard = styled.div`
    background-color: #fff;
  max-width: 1000px;
    margin: 0 auto;
  padding: 8px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 100vw;
  box-sizing: border-box;
  overflow-x: hidden;
  position: relative;

  @media (min-width: 768px) {
    padding: 20px;
    max-width: 1000px;
  }

  @media (min-width: 992px) {
    padding: 25px;
  }
`;

const EditButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
`;

const EditButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  background: linear-gradient(135deg, #2d8659 0%, #1e5a3e 100%);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

    &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(45, 134, 89, 0.3);
  }
  
  svg {
    font-size: 1rem;
  }
`;

const TrackSection = styled.div`
  text-align: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;

  @media (min-width: 768px) {
    margin-bottom: 2rem;
    padding-bottom: 2rem;
  }
`;

const TrackHeading = styled.h1`
  font-size: 1.25rem;
    font-weight: 700;
    color: #222f3e;
  margin-bottom: 0.75rem;
  word-wrap: break-word;

  @media (min-width: 768px) {
    font-size: 1.75rem;
    margin-bottom: 1.5rem;
  }

  @media (min-width: 992px) {
    font-size: 2.25rem;
  }
`;

const TrackingIdDisplay = styled.div`
  margin-bottom: 1rem;
`;

const TrackingIdLabel = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
`;

const TrackingIdValue = styled.div`
  font-size: 1.125rem;
  font-weight: 600;
  color: #222f3e;
  word-break: break-all;

  @media (min-width: 768px) {
    font-size: 1.25rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: center;
  width: 100%;
  max-width: 100%;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
    gap: 1rem;
  }
`;

const TrackButton = styled.button`
  padding: 0.625rem 1rem;
  background: linear-gradient(135deg, #2d8659 0%, #1e5a3e 100%);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  max-width: 100%;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-sizing: border-box;

  @media (min-width: 768px) {
    padding: 0.875rem 2rem;
    font-size: 1rem;
    max-width: 250px;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(45, 134, 89, 0.3);
  }
`;

const PrintButton = styled.button`
  padding: 0.625rem 1rem;
  background: white;
  color: #2d8659;
  border: 2px solid #2d8659;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  max-width: 100%;
  transition: all 0.3s ease;
  box-sizing: border-box;

  @media (min-width: 768px) {
    padding: 0.875rem 2rem;
    font-size: 0.875rem;
    max-width: 250px;
  }

  &:hover {
    background: #2d8659;
    color: white;
  }
`;

const BarcodeSection = styled.div`
  text-align: center;
  padding: 0.75rem;
  background: #f9fafb;
  border-radius: 8px;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;

  @media (min-width: 768px) {
    padding: 1.5rem;
  }
`;

const CarrierLogo = styled.div`
  margin-bottom: 0;
  width: 200px;
  
  img {
    height: 350%;
    width: 200px;
    object-fit: contain;
  }

  @media (max-width: 767px) {
    width: 300px;
    
    img {
      height: 300px;
      width: 300px;
    }
  }
`;

const BarcodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 0;
  width: 100%;
`;

const BarcodeImage = styled.div`
  margin-bottom: 0;
  width: 100%;
  max-width: 250px;
  
  img {
    width: 300px;
    height: 300px;
    object-fit: contain;
    display: block;
  }

  @media (max-width: 767px) {
    w0idth: 300px;
    
    img {
      height: 300px;
      width: 300px;
    }
  }
`;

const BarcodeNumber = styled.div`
  font-size: 0.875rem;
  font-weight: 800;
  color: #222f3e;
  word-break: break-all;
  margin-top: 0.5rem;
  text-align: center;
  letter-spacing: 2px;
  
  @media (max-width: 767px) {
    font-size: 0.75rem;
  }
`;

const InfoSection = styled.div`
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: #f9fafb;
  border-radius: 8px;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;

  @media (min-width: 768px) {
    margin-bottom: 2rem;
    padding: 1.5rem;
  }
`;

const SectionTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  color: #222f3e;
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #2d8659;
  word-wrap: break-word;

  @media (min-width: 768px) {
    font-size: 1.25rem;
    margin-bottom: 1.25rem;
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  
  ${props => props.fullWidth && `
    grid-column: 1 / -1;
  `}
`;

const InfoLabel = styled.span`
  font-weight: 600;
  color: #374151;
  font-size: 0.8125rem;
  word-wrap: break-word;

  @media (min-width: 768px) {
    font-size: 0.875rem;
  }
`;

const InfoValue = styled.span`
  color: #222f3e;
  font-size: 0.8125rem;
  word-break: break-word;
  overflow-wrap: break-word;

  @media (min-width: 768px) {
    font-size: 0.9375rem;
  }
`;

const StatusValue = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.875rem;
      font-weight: 600;
  background-color: ${props => {
    switch (props.status) {
      case "Delivered":
        return "#10b981";
      case "On Hold":
        return "#f59e0b";
      case "On Transit":
      case "In Transit":
        return "#3b82f6";
      case "Delayed":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  }};
  color: white;
`;

const PackageTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 0;
  font-size: 0.75rem;
  display: table;
  table-layout: auto;
  min-width: 600px;

  thead {
    background-color: #2d8659;
    color: white;
  }

  th {
    padding: 0.75rem 0.5rem;
    text-align: left;
    font-weight: 600;
    font-size: 0.75rem;
    white-space: nowrap;
    min-width: 80px;

    @media (min-width: 768px) {
      padding: 0.75rem;
      font-size: 0.875rem;
      white-space: normal;
    }
  }

  tbody {
    background-color: white;
  }

  td {
    padding: 0.75rem 0.5rem;
    border-bottom: 1px solid #e5e7eb;
    font-size: 0.75rem;
    word-break: break-word;
    max-width: 200px;

    @media (min-width: 768px) {
      padding: 0.75rem;
      font-size: 0.875rem;
      max-width: none;
    }
  }

  tr:last-child td {
    border-bottom: none;
  }
`;

const PackageSummary = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SummaryLabel = styled.span`
  font-weight: 600;
  color: #374151;
  font-size: 0.875rem;
`;

const SummaryValue = styled.span`
  color: #222f3e;
      font-weight: 600;
  font-size: 0.875rem;
`;

const HistoryTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.75rem;
  display: table;
  table-layout: auto;
  min-width: 600px;

  thead {
    background-color: #2d8659;
    color: white;
  }

  th {
    padding: 0.75rem 0.5rem;
    text-align: left;
    font-weight: 600;
    font-size: 0.75rem;
    white-space: nowrap;
    min-width: 80px;

    @media (min-width: 768px) {
      padding: 0.75rem;
      font-size: 0.875rem;
      white-space: normal;
    }
  }

  tbody {
    background-color: white;
  }

  td {
    padding: 0.75rem 0.5rem;
    border-bottom: 1px solid #e5e7eb;
    font-size: 0.75rem;
    word-break: break-word;
    max-width: 200px;

    @media (min-width: 768px) {
      padding: 0.75rem;
      font-size: 0.875rem;
      max-width: none;
    }
  }

  tr:last-child td {
    border-bottom: none;
  }
`;

const TableWrapper = styled.div`
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  margin-bottom: 1rem;
  box-sizing: border-box;
  position: relative;
  
  /* Prevent table from causing page overflow */
  @media (max-width: 767px) {
    margin-left: 0;
    margin-right: 0;
    
    &::-webkit-scrollbar {
      height: 6px;
    }
    
    &::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 4px;
    }
    
    &::-webkit-scrollbar-thumb {
      background: #2d8659;
      border-radius: 4px;
    }
  }
`;

const MapWrapper = styled.div`
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;
