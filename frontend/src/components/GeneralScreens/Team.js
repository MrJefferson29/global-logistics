import React from "react";
import styled from "styled-components";

export default function Services() {
  const services = [
    {
      title: "Freight Transportation",
      description: "We specialize in transporting goods across land, sea, and air. Our fleet of modern vehicles, coupled with our partnerships with trusted carriers, ensures that your cargo is handled with care and delivered on time. Whether you need full truckload (FTL), less-than-truckload (LTL), or specialized freight services, we have the expertise to get the job done.",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop"
    },
    {
      title: "E-Commerce Logistics",
      description: "In today's fast-paced digital world, e-commerce businesses need logistics partners that can keep up with their growth. Global Logistics offers tailored solutions for online retailers, including same-day delivery, returns management, and real-time tracking.",
      image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=800&h=600&fit=crop"
    },
    {
      title: "Warehousing and Distribution",
      description: "Our state-of-the-art warehousing facilities are strategically located to provide easy access to major transportation hubs. We offer secure storage, inventory management, and efficient distribution services to help you streamline your operations and reduce costs.",
      image: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&h=600&fit=crop"
    },
    {
      title: "International Shipping",
      description: "Navigating the complexities of international trade can be challenging, but with us by your side, you can rest easy. We handle customs clearance, documentation, and compliance, ensuring that your goods move seamlessly across borders.",
      image: "https://images.unsplash.com/photo-1601581875218-ee0c892ed92a?w=800&h=600&fit=crop"
    }
  ];

  const whyChooseUs = [
    "Customer-Centric Approach",
    "Cutting-Edge Technology",
    "Global Network, Local Expertise"
  ];

  return (
    <Styles>
      <HeroSection>
        <HeroContent>
          <HeroHeading>Our Services</HeroHeading>
        </HeroContent>
      </HeroSection>

      <CoreServicesSection>
        <SectionHeading>Our Core Services: Tailored Solutions for Every Need</SectionHeading>
        <Separator />
        <IntroText>
          At Global Logistics, we offer a comprehensive range of logistics services designed to meet the diverse needs of our clients. From domestic shipments to international freight, we've got you covered. Here's a closer look at what we do:
        </IntroText>
      </CoreServicesSection>

      <ServicesGrid>
        {services.map((service, index) => (
          <ServiceCard key={index}>
            <ServiceImage src={service.image} alt={service.title} />
            <ServiceContent>
              <ServiceTitle>{service.title}</ServiceTitle>
              <ServiceDescription>{service.description}</ServiceDescription>
            </ServiceContent>
          </ServiceCard>
        ))}
      </ServicesGrid>

      <WhyChooseSection>
        <SectionHeading>Why Choose Us?</SectionHeading>
        <Separator />
        <WhyChooseText>
          In a crowded logistics market, Global Logistics stands out as a trusted partner that puts your needs first. Here's what sets us apart:
        </WhyChooseText>
        <WhyChooseList>
          {whyChooseUs.map((item, index) => (
            <WhyChooseItem key={index}>{item}</WhyChooseItem>
          ))}
        </WhyChooseList>
      </WhyChooseSection>
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
  background-image: url("https://images.unsplash.com/photo-1601581874957-0e18b0c49a0e?w=1200&h=800&fit=crop");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 50vh;
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
    background: linear-gradient(135deg, rgba(27, 77, 62, 0.75) 0%, rgba(0, 0, 0, 0.6) 100%);
    z-index: 1;
  }

  @media (max-width: 768px) {
    min-height: 40vh;
    margin-top: -70px;
    padding-top: calc(70px + 2rem);
  }

  @media (min-width: 992px) {
    min-height: 60vh;
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

// Core Services Section
const CoreServicesSection = styled.section`
  background-color: ${theme.white};
  padding: 60px 15px 40px;
  position: relative;

  @media (min-width: 768px) {
    padding: 80px 30px 50px;
  }

  @media (min-width: 992px) {
    padding: 100px 40px 60px;
    max-width: 1200px;
    margin: 0 auto;
  }
`;

const SectionHeading = styled.h2`
  font-size: 1.9rem;
  font-weight: 700;
  color: ${theme.textDark};
  text-align: center;
  margin-bottom: 25px;
  letter-spacing: -0.5px;
  line-height: 1.2;

  @media (min-width: 768px) {
    font-size: 2.6rem;
    margin-bottom: 30px;
    letter-spacing: -1px;
  }
`;

const Separator = styled.div`
  width: 80px;
  height: 5px;
  background: linear-gradient(90deg, ${theme.lightGreen} 0%, ${theme.lightGreenHover} 100%);
  margin: 0 auto 35px;
  border-radius: 3px;
  box-shadow: 0 2px 4px rgba(124, 179, 66, 0.3);

  @media (min-width: 768px) {
    width: 120px;
    height: 6px;
    margin-bottom: 45px;
  }
`;

const IntroText = styled.p`
  font-size: 1.05rem;
  line-height: 1.8;
  color: ${theme.textGray};
  font-weight: 400;
  text-align: left;
  max-width: 900px;
  margin: 0 auto;

  @media (min-width: 768px) {
    font-size: 1.15rem;
    line-height: 1.9;
  }
`;

// Services Grid - Clean layout without cards
const ServicesGrid = styled.section`
  background-color: ${theme.white};
  padding: 0 15px 60px;
  display: flex;
  flex-direction: column;
  gap: 60px;

  @media (min-width: 768px) {
    padding: 0 30px 80px;
    gap: 80px;
  }

  @media (min-width: 992px) {
    padding: 0 40px 100px;
    max-width: 1200px;
    margin: 0 auto;
  }
`;

const ServiceCard = styled.article`
  display: flex;
  flex-direction: column;
  background-color: transparent;
  border-radius: 0;
  overflow: visible;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.95;
  }

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
    gap: 50px;

    &:nth-child(even) {
      flex-direction: row-reverse;
    }
  }
`;

const ServiceImage = styled.img`
  width: 100%;
  height: 280px;
  object-fit: cover;
  border-radius: 2px;
  margin-bottom: 25px;

  @media (min-width: 768px) {
    width: 48%;
    height: 400px;
    margin-bottom: 0;
    border-radius: 12px;
  }
`;

const ServiceContent = styled.div`
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  @media (min-width: 768px) {
    width: 48%;
    padding: 0;
  }
`;

const ServiceTitle = styled.h3`
  font-size: 1.6rem;
  font-weight: 700;
  color: ${theme.textDark};
  margin-bottom: 18px;
  letter-spacing: -0.3px;
  line-height: 1.3;

  @media (min-width: 768px) {
    font-size: 2rem;
    margin-bottom: 22px;
    margin-top: 0;
  }
`;

const ServiceDescription = styled.p`
  font-size: 1.05rem;
  line-height: 1.8;
  color: ${theme.textGray};
  font-weight: 400;
  margin: 0;

  @media (min-width: 768px) {
    font-size: 1.15rem;
    line-height: 1.85;
  }
`;

// Why Choose Section
const WhyChooseSection = styled.section`
  background: linear-gradient(135deg, ${theme.lightGreenBg} 0%, ${theme.lightGreen} 100%);
  padding: 70px 15px;
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
    opacity: 0.25;
  }

  @media (min-width: 768px) {
    padding: 90px 30px;
  }

  @media (min-width: 992px) {
    padding: 110px 40px;
    max-width: 1200px;
    margin: 0 auto;
  }
`;

const WhyChooseText = styled.p`
  font-size: 1.05rem;
  line-height: 1.8;
  color: ${theme.textDark};
  font-weight: 400;
  text-align: left;
  margin-bottom: 35px;
  position: relative;
  z-index: 1;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 768px) {
    font-size: 1.15rem;
    line-height: 1.9;
    margin-bottom: 45px;
  }
`;

const WhyChooseList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
  position: relative;
  z-index: 1;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 768px) {
    gap: 20px;
  }
`;

const WhyChooseItem = styled.li`
  font-size: 1.1rem;
  line-height: 1.7;
  color: ${theme.textDark};
  font-weight: 600;
  padding-left: 35px;
  position: relative;

  &::before {
    content: "—";
    position: absolute;
    left: 0;
    color: ${theme.darkGreen};
    font-weight: 700;
    font-size: 1.6rem;
    line-height: 1.2;
  }

  @media (min-width: 768px) {
    font-size: 1.2rem;
    padding-left: 45px;
    line-height: 1.8;
  }
`;
