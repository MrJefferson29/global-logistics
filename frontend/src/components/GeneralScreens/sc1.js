import React from "react";
import styled from "styled-components";
import { Row, Col } from "react-bootstrap";
import j1 from '../../Assets/burn.jpg';
import exel1 from '../../Assets/exel1.jpg'
import exel2 from '../../Assets/exel2.jpg'
import gal1 from '../../Assets/gal1.jpg'
import gal2 from '../../Assets/gal2.jpg'
import gal3 from '../../Assets/gal3.jpg'
import gal4 from '../../Assets/gal4.jpg'

export default function Sc1() {
  return (
    <Styles>
      <HeroSection>
        <HeroContent>
          <MainHeading>Delivering Excellence, Every Time</MainHeading>
          <SubHeading>
            Your Trusted Partner in Transport Logistics
          </SubHeading>
          <RequestButton href="#contact">REQUEST QUOTE</RequestButton>
        </HeroContent>
      </HeroSection>
      
      <QuoteSection>
        <QuoteIcon>&ldquo;</QuoteIcon>
        <QuoteText>
          At Global Logistics, we believe logistics is more than just moving goods—it's about moving businesses forward. Our mission is simple: to deliver reliability, innovation, and exceptional service every step of the way.
        </QuoteText>
        <QuoteAuthor>- Frank Weller</QuoteAuthor>
      </QuoteSection>
      <ExcellenceSection>
        <SectionHeading>How We Deliver Excellence</SectionHeading>
        <Separator />
        <ExcellenceContent>
          <Col md="12" className="excellence-item">
            <ExcellenceImage 
              src={exel1}
              alt="Consultation and Planning" 
            />
            <ExcellenceText>
              <ExcellenceTitle>Consultation and Planning</ExcellenceTitle>
              <ExcellenceDescription>
                Our expert team works closely with you to understand your unique logistics needs. We analyze your supply chain, identify optimization opportunities, and develop customized solutions that align with your business goals. Through detailed consultation, we ensure every aspect of your logistics operation is carefully planned and executed.
              </ExcellenceDescription>
            </ExcellenceText>
          </Col>
          <Col md="12" className="excellence-item">
            <ExcellenceImage 
              src={exel2}
              alt="Booking and Scheduling" 
            />
            <ExcellenceText>
              <ExcellenceTitle>Booking and Scheduling</ExcellenceTitle>
              <ExcellenceDescription>
                Streamline your shipping process with our intuitive booking system. Our advanced scheduling platform allows you to book shipments, track availability, and manage your logistics calendar with ease. We coordinate all aspects of your shipment, ensuring timely pickups and deliveries that keep your operations running smoothly.
              </ExcellenceDescription>
            </ExcellenceText>
          </Col>
        </ExcellenceContent>
      </ExcellenceSection>

      <InnovationSection>
        <SectionHeadingWhite>Our Commitment to Innovation</SectionHeadingWhite>
        <SeparatorLight />
        <InnovationText>
          At Global Logistics Inc, we're constantly pushing the boundaries of what's possible in logistics. We invest in cutting-edge technologies including AI-powered route optimization, machine learning for predictive analytics, blockchain for transparent supply chains, and IoT sensors for real-time cargo monitoring. Our commitment to innovation ensures you always have access to the most advanced logistics solutions available.
        </InnovationText>
        <TrackButton href="/tracking">
          TRACK SHIPMENT <Arrow>→</Arrow>
        </TrackButton>
      </InnovationSection>

      <JoinSection>
        <SectionHeading>Join the Global Logistics Family</SectionHeading>
        <Separator />
        <JoinText>
          When you partner with Global Logistics, you're not just getting a logistics provider—you're joining a family of businesses that value excellence, reliability, and innovation. We offer competitive rates, flexible solutions, and a dedicated support team that's available 24/7 to assist you. Experience the difference that comes with working with a logistics partner that truly cares about your success.
        </JoinText>
        <TrackButton href="/tracking">
          TRACK SHIPMENT <Arrow>→</Arrow>
        </TrackButton>
      </JoinSection>

      <GallerySection>
        <GalleryImage 
          src={gal1}
          alt="Delivery workers loading van" 
        />
        <GalleryImage 
          src={gal2}
          alt="Warehouse forklift operation" 
        />
        <GalleryImage 
          src={gal3}
          alt="Delivery driver with clipboard" 
        />
        <GalleryImage 
          src={gal4}
          alt="Fleet of delivery vans" 
        />
      </GallerySection>
    </Styles>
  );
}

const theme = {
  darkGreen: "#1b4d3e",           // dark green for headers and sections
  darkGreenHover: "#2a6b5a",      // darker green hover
  lightGreen: "#7CB342",          // professional light green
  lightGreenHover: "#8BC34A",    // lighter green hover
  lightGreenBg: "#A5D6A7",        // light green background
  textLight: "#ffffff",           // white text
  textDark: "#2c3e50",            // professional dark text
  textGray: "#5a6c7d",            // gray text
  white: "#ffffff",
  shadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  shadowMedium: "0 8px 16px rgba(0, 0, 0, 0.15)",
  shadowLarge: "0 12px 24px rgba(0, 0, 0, 0.2)",
};

const Styles = styled.div`
  overflow-x: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

// Main Hero Section styling
const HeroSection = styled.div`
  background-image: url(${j1});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 1rem;
  position: relative;
  margin-top: -76px;
  padding-top: calc(76px + 2rem);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(27, 77, 62, 0.7) 0%, rgba(0, 0, 0, 0.5) 100%);
    z-index: 1;
  }

  @media (max-width: 768px) {
    background-attachment: scroll;
    margin-top: -70px;
    padding-top: calc(70px + 2rem);
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  color: ${theme.textLight};
  max-width: 90%;
  animation: fadeInUp 0.8s ease-out;
  
  @media (min-width: 768px) {
    max-width: 800px;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

// Main Heading
const MainHeading = styled.h1`
  font-weight: 800;
  font-size: 2.2rem;
  margin: 0 0 1.5rem 0;
  line-height: 1.2;
  color: ${theme.textLight};
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  letter-spacing: -0.5px;

  @media (min-width: 768px) {
    font-size: 3.8rem;
    margin-bottom: 2rem;
    letter-spacing: -1px;
  }
`;

// Sub Heading
const SubHeading = styled.h2`
  font-weight: 300;
  font-size: 1.1rem;
  margin: 0 0 2.5rem 0;
  line-height: 1.6;
  color: ${theme.textLight};
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  opacity: 0.95;

  @media (min-width: 768px) {
    font-size: 1.6rem;
    margin-bottom: 3rem;
  }
`;

// Request Quote Button
const RequestButton = styled.a`
  display: inline-block;
  background: linear-gradient(135deg, ${theme.lightGreen} 0%, ${theme.lightGreenHover} 100%);
  color: ${theme.textLight};
  padding: 16px 36px;
  border-radius: 50px;
  font-weight: 700;
  font-size: 1rem;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin-top: 1rem;
  box-shadow: ${theme.shadowMedium};
  border: 2px solid transparent;

  &:hover {
    background: linear-gradient(135deg, ${theme.lightGreenHover} 0%, ${theme.lightGreen} 100%);
    transform: translateY(-3px);
    box-shadow: ${theme.shadowLarge};
  }

  &:active {
    transform: translateY(-1px);
  }

  @media (min-width: 768px) {
    padding: 18px 48px;
    font-size: 1.1rem;
  }
`;

// Quote Section
const QuoteSection = styled.section`
  background: linear-gradient(135deg, ${theme.lightGreenBg} 0%, ${theme.lightGreen} 100%);
  padding: 50px 20px;
  text-align: center;
  color: ${theme.textLight};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    opacity: 0.3;
  }

  @media (min-width: 768px) {
    padding: 40px 20px;
  }
`;

const QuoteIcon = styled.div`
  font-size: 6rem;
  font-weight: 300;
  color: ${theme.textLight};
  margin-bottom: 30px;
  line-height: 0.8;
  font-family: Georgia, 'Times New Roman', serif;
  opacity: 0.95;
  position: relative;
  z-index: 1;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  @media (min-width: 768px) {
    font-size: 10rem;
    margin-bottom: 40px;
  }
`;

const QuoteText = styled.p`
  font-size: 1.05rem;
  line-height: 1.8;
  max-width: 800px;
  margin: 0 auto 30px;
  color: ${theme.textLight};
  position: relative;
  z-index: 1;
  font-style: italic;
  font-weight: 300;

  @media (min-width: 768px) {
    font-size: 1.3rem;
    margin-bottom: 40px;
  }
`;

const QuoteAuthor = styled.p`
  font-size: 1rem;
  color: ${theme.textLight};
  margin-top: 30px;
  position: relative;
  z-index: 1;
  font-weight: 600;
  letter-spacing: 0.5px;

  @media (min-width: 768px) {
    font-size: 1.1rem;
    margin-top: 40px;
  }
`;

// Excellence Section
const ExcellenceSection = styled.section`
  background-color: ${theme.white};
  position: relative;

  @media (min-width: 768px) {
    padding: 100px 20px;
  }

  @media (min-width: 992px) {
    padding: 100px 30px;
  }
`;

const SectionHeading = styled.h2`
  font-size: 1.9rem;
  font-weight: 700;
  color: ${theme.textDark};
  text-align: center;
  margin-bottom: 25px;
  letter-spacing: -0.5px;

  @media (min-width: 768px) {
    font-size: 2.8rem;
    margin-bottom: 30px;
    letter-spacing: -1px;
  }
`;

const Separator = styled.div`
  width: 80px;
  height: 5px;
  background: linear-gradient(90deg, ${theme.lightGreen} 0%, ${theme.lightGreenHover} 100%);
  margin: 0 auto 50px;
  border-radius: 3px;
  box-shadow: ${theme.shadow};

  @media (min-width: 768px) {
    width: 140px;
    height: 6px;
    margin-bottom: 70px;
  }
`;

const ExcellenceContent = styled(Row)`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 10px;

  @media (min-width: 768px) {
    padding: 0 20px;
  }

  .excellence-item {
    margin-bottom: 40px;
    display: flex;
    flex-direction: column;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
      gap: 30px;
      margin-bottom: 60px;

      &:nth-child(even) {
        flex-direction: row-reverse;
      }
    }
  }
`;

const ExcellenceImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 25px;
  box-shadow: ${theme.shadowMedium};
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.02);
    box-shadow: ${theme.shadowLarge};
  }

  @media (min-width: 768px) {
    width: 50%;
    height: 380px;
    margin-bottom: 0;
    border-radius: 16px;
  }
`;

const ExcellenceText = styled.div`
  @media (min-width: 768px) {
    width: 50%;
  }
`;

const ExcellenceTitle = styled.h3`
  font-size: 1.6rem;
  font-weight: 700;
  color: ${theme.textDark};
  margin-bottom: 18px;
  letter-spacing: -0.3px;

  @media (min-width: 768px) {
    font-size: 2rem;
    margin-bottom: 22px;
  }
`;

const ExcellenceDescription = styled.p`
  font-size: 1.05rem;
  line-height: 1.75;
  color: ${theme.textGray};
  font-weight: 400;

  @media (min-width: 768px) {
    font-size: 1.15rem;
    line-height: 1.8;
  }
`;

// Innovation Section
const InnovationSection = styled.section`
  background: linear-gradient(135deg, ${theme.darkGreen} 0%, ${theme.darkGreenHover} 100%);
  padding: 80px 20px;
  text-align: center;
  color: ${theme.textLight};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20H20v0.5zM0 20h2v20H0V20zm40 0v20H20v-2h18V20h2zM20 0h2v20h-2V0z'/%3E%3C/g%3E%3C/svg%3E");
    opacity: 0.5;
  }

  @media (min-width: 768px) {
    padding: 100px 60px;
  }
`;

const SectionHeadingWhite = styled.h2`
  font-size: 1.9rem;
  font-weight: 700;
  color: ${theme.textLight};
  text-align: center;
  margin-bottom: 25px;
  position: relative;
  z-index: 1;
  letter-spacing: -0.5px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);

  @media (min-width: 768px) {
    font-size: 2.8rem;
    margin-bottom: 30px;
    letter-spacing: -1px;
  }
`;

const SeparatorLight = styled.div`
  width: 80px;
  height: 5px;
  background: linear-gradient(90deg, ${theme.lightGreen} 0%, ${theme.lightGreenHover} 100%);
  margin: 0 auto 50px;
  border-radius: 3px;
  position: relative;
  z-index: 1;
  box-shadow: 0 2px 8px rgba(124, 179, 66, 0.4);

  @media (min-width: 768px) {
    width: 140px;
    height: 6px;
    margin-bottom: 70px;
  }
`;

const InnovationText = styled.p`
  font-size: 1.05rem;
  line-height: 1.8;
  max-width: 900px;
  margin: 0 auto 40px;
  color: ${theme.textLight};
  position: relative;
  z-index: 1;
  font-weight: 300;
  opacity: 0.95;

  @media (min-width: 768px) {
    font-size: 1.25rem;
    margin-bottom: 50px;
    line-height: 1.9;
  }
`;

// Track Button
const TrackButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: linear-gradient(135deg, ${theme.lightGreen} 0%, ${theme.lightGreenHover} 100%);
  color: ${theme.textLight};
  padding: 16px 36px;
  border-radius: 50px;
  font-weight: 700;
  font-size: 1rem;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin-top: 1rem;
  box-shadow: ${theme.shadowMedium};
  position: relative;
  z-index: 1;
  border: 2px solid transparent;

  &:hover {
    background: linear-gradient(135deg, ${theme.lightGreenHover} 0%, ${theme.lightGreen} 100%);
    transform: translateY(-3px);
    box-shadow: ${theme.shadowLarge};
  }

  &:active {
    transform: translateY(-1px);
  }

  @media (min-width: 768px) {
    padding: 18px 48px;
    font-size: 1.1rem;
  }
`;

const Arrow = styled.span`
  font-size: 1.3rem;
  font-weight: 700;
  transition: transform 0.3s ease;

  ${TrackButton}:hover & {
    transform: translateX(5px);
  }
`;

// Join Section
const JoinSection = styled.section`
  background-color: ${theme.white};
  padding: 80px 20px;
  text-align: center;

  @media (min-width: 768px) {
    padding: 100px 60px;
  }
`;

const JoinText = styled.p`
  font-size: 1.05rem;
  line-height: 1.8;
  max-width: 900px;
  margin: 0 auto 40px;
  color: ${theme.textGray};
  font-weight: 400;

  @media (min-width: 768px) {
    font-size: 1.25rem;
    margin-bottom: 50px;
    line-height: 1.9;
  }
`;

// Gallery Section
const GallerySection = styled.section`
  background-color: #f8f9fa;
  padding: 60px 20px 80px;
  display: flex;
  flex-direction: column;
  gap: 25px;
  max-width: 1200px;
  margin: 0 auto;

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 35px;
    padding: 80px 40px 100px;
  }
`;

const GalleryImage = styled.img`
  width: 100%;
  height: 280px;
  object-fit: cover;
  border-radius: 6px;
  box-shadow: ${theme.shadow};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;

  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: ${theme.shadowLarge};
  }

  @media (min-width: 768px) {
    height: 320px;
    border-radius: 16px;
  }
`;
