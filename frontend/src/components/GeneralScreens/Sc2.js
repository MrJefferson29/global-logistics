import React from "react";
import styled from "styled-components";
import ab1 from "../../Assets/ab1.jpg"

export default function Sc2() {
  return (
    <Styles>
      <HeroSection>
        <HeroContent>
          <HeroHeading>Who We Are?</HeroHeading>
        </HeroContent>
      </HeroSection>

      <StorySection>
        <SectionHeading>The Global Logistics Inc. Story</SectionHeading>
        <Separator />
        <StoryText>
          Founded with a vision to revolutionize the logistics industry, Global Logistics Inc was born from a simple yet powerful idea: to offer innovative, customer-centric solutions that make shipping seamless and stress-free. Our name, Global Logistics Inc, reflects our commitment to speed, precision, and reliability—the "Global" symbolizing our pursuit of global-degree excellence in every aspect of our service.
        </StoryText>
        <StoryText>
          From our humble beginnings, we've grown into a trusted logistics partner, serving businesses and individuals worldwide. Our team of experts brings decades of combined experience in managing complex transportation networks, optimizing supply chains, and delivering exceptional customer service. We understand that every shipment matters, and we're dedicated to ensuring your goods reach their destination safely, on time, and with the care they deserve.
        </StoryText>
        <StoryText>
          At GLI, we don't just move packages—we move businesses forward. Whether you're shipping across town or across continents, we're here to be your strategic partner in logistics, providing solutions that are as unique as your needs.
        </StoryText>
      </StorySection>

      <WorkerImageSection>
        <WorkerImage 
          src={ab1}
          alt="Worker in warehouse carrying box" 
        />
      </WorkerImageSection>

      <MissionSection>
        <SectionHeading>Our Mission: Simplifying Logistics, Delivering Success</SectionHeading>
        <Separator />
        <MissionText>
          Our mission is to provide seamless, efficient, and tailored logistics solutions that empower businesses to focus on what they do best. We believe that logistics should be an enabler, not a barrier, to your success.
        </MissionText>
        <MissionText>
          We understand that every shipment is critical, and we're committed to making the process as smooth and stress-free as possible. By combining cutting-edge technology with personalized service, we ensure that your logistics needs are met with precision, care, and reliability.
        </MissionText>
      </MissionSection>

      <VisionSection>
        <SectionHeading>Our Vision: Leading the Future of Logistics</SectionHeading>
        <Separator />
        <VisionText>
          Global Logistics Inc envisions a world where logistics is no longer a barrier to growth, but a catalyst for success. We're committed to leading the industry by embracing innovation, sustainability, and customer-first practices that set new standards for excellence.
        </VisionText>
        <VisionList>
          <VisionItem>Reliability</VisionItem>
          <VisionItem>Innovation</VisionItem>
          <VisionItem>Sustainability</VisionItem>
        </VisionList>
      </VisionSection>
    </Styles>
  );
}

// Theme colors matching sc1.js
const theme = {
  darkGreen: "#1b4d3e",
  darkGreenHover: "#2a6b5a",
  lightGreen: "#7CB342",
  lightGreenHover: "#8BC34A",
  lightGreenBg: "#A5D6A7",
  textLight: "#ffffff",
  textDark: "#2c3e50",
  textGray: "#5a6c7d",
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

// Hero Section
const HeroSection = styled.section`
  background-image: url("https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&h=800&fit=crop");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 60vh;
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
    min-height: 50vh;
    margin-top: -70px;
    padding-top: calc(70px + 2rem);
  }

  @media (min-width: 992px) {
    min-height: 70vh;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  color: ${theme.textLight};
  max-width: 90%;
  animation: fadeInUp 0.8s ease-out;

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

const HeroHeading = styled.h1`
  font-weight: 800;
  font-size: 2.5rem;
  margin: 0;
  line-height: 1.2;
  color: ${theme.textLight};
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  letter-spacing: -0.5px;

  @media (min-width: 768px) {
    font-size: 4rem;
    letter-spacing: -1px;
  }
`;

// Story Section
const StorySection = styled.section`
  background-color: ${theme.white};
  padding: 60px 15px;
  position: relative;

  @media (min-width: 768px) {
    padding: 80px 30px;
  }

  @media (min-width: 992px) {
    padding: 100px 40px;
    max-width: 1200px;
    margin: 0 auto;
  }
`;

const SectionHeading = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${theme.textDark};
  text-align: center;
  margin-bottom: 25px;
  letter-spacing: -0.5px;

  @media (min-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 30px;
    letter-spacing: -1px;
  }
`;

const Separator = styled.div`
  width: 80px;
  height: 5px;
  background: linear-gradient(90deg, ${theme.lightGreen} 0%, ${theme.lightGreenHover} 100%);
  margin: 0 auto 40px;
  border-radius: 3px;
  box-shadow: ${theme.shadow};

  @media (min-width: 768px) {
    width: 120px;
    height: 6px;
    margin-bottom: 50px;
  }
`;

const StoryText = styled.p`
  font-size: 1rem;
  line-height: 1.75;
  color: ${theme.textGray};
  font-weight: 400;
  margin-bottom: 20px;
  text-align: left;

  @media (min-width: 768px) {
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 25px;
  }
`;

// Worker Image Section
const WorkerImageSection = styled.section`
  padding: 0 15px 60px;
  background-color: ${theme.white};

  @media (min-width: 768px) {
    padding: 0 30px 80px;
  }

  @media (min-width: 992px) {
    padding: 0 40px 100px;
    max-width: 1200px;
    margin: 0 auto;
  }
`;

const WorkerImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: ${theme.shadowMedium};

  @media (min-width: 768px) {
    border-radius: 16px;
    max-height: 500px;
    object-fit: cover;
  }
`;

// Mission Section
const MissionSection = styled.section`
  background-color: ${theme.white};
  padding: 60px 15px;
  position: relative;

  @media (min-width: 768px) {
    padding: 80px 30px;
  }

  @media (min-width: 992px) {
    padding: 100px 40px;
    max-width: 1200px;
    margin: 0 auto;
  }
`;

const MissionText = styled.p`
  font-size: 1rem;
  line-height: 1.75;
  color: ${theme.textGray};
  font-weight: 400;
  margin-bottom: 20px;
  text-align: left;

  @media (min-width: 768px) {
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 25px;
  }
`;

// Vision Section
const VisionSection = styled.section`
  background-color: ${theme.white};
  padding: 60px 15px 80px;
  position: relative;

  @media (min-width: 768px) {
    padding: 80px 30px 100px;
  }

  @media (min-width: 992px) {
    padding: 100px 40px 120px;
    max-width: 1200px;
    margin: 0 auto;
  }
`;

const VisionText = styled.p`
  font-size: 1rem;
  line-height: 1.75;
  color: ${theme.textGray};
  font-weight: 400;
  margin-bottom: 30px;
  text-align: left;

  @media (min-width: 768px) {
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 40px;
  }
`;

const VisionList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 15px;

  @media (min-width: 768px) {
    gap: 20px;
  }
`;

const VisionItem = styled.li`
  font-size: 1.05rem;
  line-height: 1.6;
  color: ${theme.textDark};
  font-weight: 600;
  padding-left: 30px;
  position: relative;

  &::before {
    content: "—";
    position: absolute;
    left: 0;
    color: ${theme.lightGreen};
    font-weight: 700;
    font-size: 1.5rem;
  }

  @media (min-width: 768px) {
    font-size: 1.15rem;
    padding-left: 40px;
  }
`;
