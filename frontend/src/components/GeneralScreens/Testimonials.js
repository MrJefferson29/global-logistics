import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import arah from "../../Assets/arah.jpg";
import miller from "../../Assets/miller.jpeg";
import michael from "../../Assets/michael.jpeg";
import emily from "../../Assets/emily.jpeg";
import robert from "../../Assets/robert.jpeg";

const theme = {
  darkGreen: "#1b4d3e",
  darkGreenHover: "#2a6b5a",
  lightGreen: "#7CB342",
  lightGreenHover: "#8BC34A",
  textDark: "#2c3e50",
  textGray: "#5a6c7d",
  white: "#ffffff",
  shadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  shadowMedium: "0 8px 16px rgba(0, 0, 0, 0.12)",
  shadowLarge: "0 12px 24px rgba(0, 0, 0, 0.15)",
};

const testimonials = [
  {
    name: "Sarah Gonzalez",
    feedback:
      "Global Logistics transformed how we manage our supply chain. Real-time tracking and reliable delivery mean we can promise our customers accurate arrival times. Their team feels like an extension of our own.",
    location: "New York, NY",
    imageUrl: arah,
    rating: 5,
    role: "Operations Director",
  },
  {
    name: "Miller Temili",
    feedback:
      "We ship internationally every week. Global Logistics handles booking, customs, and last-mile delivery without a hitch. Everything arrives on time and in perfect condition. Highly recommend for freight and cargo.",
    location: "Los Angeles, CA",
    imageUrl: miller,
    rating: 4.5,
    role: "Logistics Manager",
  },
  {
    name: "Michael Harrington",
    feedback:
      "The tracking platform is outstanding—we always know where our packages are. When we had a question about a delayed shipment, their 24/7 support had answers and solutions within minutes. True partnership.",
    location: "Chicago, IL",
    imageUrl: michael,
    rating: 5,
    role: "Supply Chain Lead",
  },
  {
    name: "Emily Davis",
    feedback:
      "Global Logistics doesn't just move boxes—they move our business forward. Consultation and planning helped us optimize routes and cut costs. We've been with them for three years and won't switch.",
    location: "Houston, TX",
    imageUrl: emily,
    rating: 5,
    role: "Procurement Manager",
  },
  {
    name: "Robert Brown",
    feedback:
      "From air freight to road freight, they deliver excellence every time. Their commitment to innovation shows in their systems and customer service. A top-tier logistics partner we trust completely.",
    location: "Miami, FL",
    imageUrl: robert,
    rating: 4.5,
    role: "Import/Export Coordinator",
  },
];

const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  return (
    <>
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={`full-${i}`} color={theme.lightGreen} />
      ))}
      {halfStar && <FaStarHalfAlt color={theme.lightGreen} />}
      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar key={`empty-${i}`} color="#d1d5db" />
      ))}
    </>
  );
};

const TestimonialsSection = styled.section`
  background: linear-gradient(180deg, #f8f9fa 0%, ${theme.white} 100%);
  padding: 70px 20px 90px;
  position: relative;
  overflow: hidden;

  @media (min-width: 768px) {
    padding: 90px 20px 110px;
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
    margin-bottom: 60px;
  }
`;

const Container = styled.div`
  width: 92%;
  max-width: 900px;
  margin: 0 auto;
  padding: 0 0.5rem;

  .slick-dots {
    bottom: -45px;

    li {
      margin: 0 6px;

      button:before {
        font-size: 10px;
        color: ${theme.darkGreen};
        opacity: 0.4;
      }

      &.slick-active button:before {
        color: ${theme.lightGreen};
        opacity: 1;
      }
    }
  }

  .slick-slide {
    padding: 0 15px;
    box-sizing: border-box;
  }
`;

const TestimonialCard = styled.div`
  background: ${theme.white};
  padding: 2.25rem 2rem;
  border-radius: 16px;
  box-shadow: ${theme.shadowMedium};
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid rgba(27, 77, 62, 0.08);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  min-height: 320px;

  &:hover {
    box-shadow: ${theme.shadowLarge};
    transform: translateY(-4px);
  }

  @media (min-width: 768px) {
    padding: 2.5rem 2.5rem;
    min-height: 340px;
  }
`;

const Stars = styled.div`
  display: flex;
  justify-content: center;
  gap: 4px;
  margin-bottom: 1.25rem;
`;

const ProfileImage = styled.img`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
  border: 3px solid ${theme.lightGreen};
  box-shadow: ${theme.shadow};

  @media (min-width: 768px) {
    width: 80px;
    height: 80px;
  }
`;

const Feedback = styled.p`
  font-size: 1rem;
  color: ${theme.textGray};
  margin-bottom: 1.5rem;
  font-weight: 400;
  line-height: 1.7;
  font-style: italic;

  @media (min-width: 768px) {
    font-size: 1.1rem;
    line-height: 1.75;
  }
`;

const Name = styled.h3`
  font-size: 1.15rem;
  color: ${theme.textDark};
  margin-bottom: 0.25rem;
  font-weight: 700;

  @media (min-width: 768px) {
    font-size: 1.25rem;
  }
`;

const Role = styled.span`
  font-size: 0.85rem;
  color: ${theme.lightGreen};
  font-weight: 600;
  margin-bottom: 0.35rem;
  display: block;

  @media (min-width: 768px) {
    font-size: 0.9rem;
  }
`;

const Location = styled.p`
  font-size: 0.9rem;
  color: #9ca3af;

  @media (min-width: 768px) {
    font-size: 0.95rem;
  }
`;

const TestimonialSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    adaptiveHeight: true,
  };

  return (
    <TestimonialsSection>
      <SectionHeading>What Our Clients Say</SectionHeading>
      <Separator />
      <Container>
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} aria-label={`Testimonial from ${testimonial.name}`}>
              <Stars>{renderStars(testimonial.rating)}</Stars>
              <ProfileImage src={testimonial.imageUrl} alt={`${testimonial.name}`} />
              <Feedback>"{testimonial.feedback}"</Feedback>
              <Name>{testimonial.name}</Name>
              {testimonial.role && <Role>{testimonial.role}</Role>}
              <Location>{testimonial.location}</Location>
            </TestimonialCard>
          ))}
        </Slider>
      </Container>
    </TestimonialsSection>
  );
};

export default TestimonialSlider;
