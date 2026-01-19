import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

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

// Global style for smooth scrolling
const GlobalStyle = createGlobalStyle`
  html {
    scroll-behavior: smooth;
  }
`;

const Sum = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Create mailto link with form data
    const subject = encodeURIComponent('Contact Form Submission from Global Logistics Inc.');
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.number}\n\n` +
      `Message:\n${formData.message}`
    );
    
    const mailtoLink = `mailto:globallogistics704@gmail.com?subject=${subject}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Reset form after a delay
    setTimeout(() => {
      setFormData({ name: '', email: '', number: '', message: '' });
      setIsSubmitting(false);
      setSubmitStatus('success');
      setTimeout(() => setSubmitStatus(null), 3000);
    }, 500);
  };

  return (
    <>
      <GlobalStyle />
      <Styles>
        <HeroSection>
          <HeroContent>
            <HeroHeading>Contact Us</HeroHeading>
          </HeroContent>
        </HeroSection>

        <ContactSection>
          <FormHeading>We're Ready, Let's Talk.</FormHeading>
          <ContactForm onSubmit={handleSubmit}>
            <FormGroup>
              <FormInput
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <FormInput
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <FormInput
                type="tel"
                name="number"
                placeholder="Number"
                value={formData.number}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <FormTextarea
                name="message"
                placeholder="Message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </FormGroup>
            {submitStatus === 'success' && (
              <SuccessMessage>Message sent! We'll get back to you soon.</SuccessMessage>
            )}
            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
            </SubmitButton>
          </ContactForm>
        </ContactSection>

        <InfoSection>
          <InfoHeading>Contact Info</InfoHeading>
          <InfoItem>
            <InfoLabel>Email Us</InfoLabel>
            <InfoValue href="mailto:globallogistics704@gmail.com"></InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Call Us</InfoLabel>
            <InfoValue href="tel:469-656-8710">469-656-8710</InfoValue>
          </InfoItem>
        </InfoSection>

        <SocialSection>
          <SocialHeading>Follow Us</SocialHeading>
          <SocialIcons>
            <SocialIcon 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </SocialIcon>
            <SocialIcon 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </SocialIcon>
            <SocialIcon 
              href="https://youtube.com" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </SocialIcon>
          </SocialIcons>
        </SocialSection>
      </Styles>
    </>
  );
};

const Styles = styled.div`
  overflow-x: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

// Hero Section
const HeroSection = styled.section`
  background-image: url("https://images.unsplash.com/photo-1601581875218-ee0c892ed92a?w=1200&h=800&fit=crop");
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

// Contact Form Section
const ContactSection = styled.section`
  background-color: ${theme.white};
  padding: 50px 15px;
  max-width: 1200px;
  margin: 0 auto;

  @media (min-width: 768px) {
    padding: 70px 40px;
  }

  @media (min-width: 992px) {
    padding: 80px 60px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: start;
  }
`;

const FormHeading = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${theme.textDark};
  margin-bottom: 30px;
  letter-spacing: -0.5px;
  line-height: 1.2;

  @media (min-width: 768px) {
    font-size: 2.2rem;
    margin-bottom: 40px;
  }

  @media (min-width: 992px) {
    grid-column: 1 / -1;
    font-size: 2.5rem;
  }
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (min-width: 768px) {
    gap: 25px;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 14px 18px;
  font-size: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  background-color: ${theme.white};
  color: ${theme.textDark};
  font-family: inherit;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${theme.lightGreen};
    box-shadow: 0 0 0 3px rgba(124, 179, 66, 0.1);
  }

  &::placeholder {
    color: ${theme.textGray};
    opacity: 0.7;
  }

  @media (min-width: 768px) {
    padding: 16px 20px;
    font-size: 1.05rem;
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 14px 18px;
  font-size: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  background-color: ${theme.white};
  color: ${theme.textDark};
  font-family: inherit;
  resize: vertical;
  min-height: 150px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${theme.lightGreen};
    box-shadow: 0 0 0 3px rgba(124, 179, 66, 0.1);
  }

  &::placeholder {
    color: ${theme.textGray};
    opacity: 0.7;
  }

  @media (min-width: 768px) {
    padding: 16px 20px;
    font-size: 1.05rem;
    min-height: 180px;
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, ${theme.lightGreen} 0%, ${theme.lightGreenHover} 100%);
  color: ${theme.textLight};
  padding: 16px 32px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${theme.shadowMedium};
  margin-top: 10px;

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, ${theme.lightGreenHover} 0%, ${theme.lightGreen} 100%);
    transform: translateY(-2px);
    box-shadow: ${theme.shadowLarge};
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  @media (min-width: 768px) {
    padding: 18px 40px;
    font-size: 1.1rem;
    align-self: flex-start;
  }
`;

const SuccessMessage = styled.div`
  background-color: ${theme.lightGreenBg};
  color: ${theme.darkGreen};
  padding: 12px 18px;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  text-align: center;
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

// Contact Info Section
const InfoSection = styled.section`
  background-color: ${theme.white};
  padding: 50px 15px;
  max-width: 1200px;
  margin: 0 auto;

  @media (min-width: 768px) {
    padding: 70px 40px;
  }

  @media (min-width: 992px) {
    padding: 80px 60px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;
  }
`;

const InfoHeading = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${theme.textDark};
  margin-bottom: 30px;
  letter-spacing: -0.5px;
  line-height: 1.2;

  @media (min-width: 768px) {
    font-size: 2.2rem;
    margin-bottom: 40px;
  }

  @media (min-width: 992px) {
    grid-column: 1 / -1;
    font-size: 2.5rem;
  }
`;

const InfoItem = styled.div`
  margin-bottom: 25px;

  @media (min-width: 768px) {
    margin-bottom: 30px;
  }
`;

const InfoLabel = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  color: ${theme.textDark};
  margin-bottom: 8px;

  @media (min-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 10px;
  }
`;

const InfoValue = styled.a`
  font-size: 1rem;
  color: ${theme.textGray};
  text-decoration: none;
  display: block;
  transition: color 0.3s ease;

  &:hover {
    color: ${theme.lightGreen};
  }

  @media (min-width: 768px) {
    font-size: 1.1rem;
  }
`;

// Social Media Section
const SocialSection = styled.section`
  background-color: ${theme.white};
  padding: 50px 15px 70px;
  max-width: 1200px;
  margin: 0 auto;

  @media (min-width: 768px) {
    padding: 70px 40px 90px;
  }

  @media (min-width: 992px) {
    padding: 80px 60px 100px;
  }
`;

const SocialHeading = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${theme.textDark};
  margin-bottom: 30px;
  letter-spacing: -0.5px;
  line-height: 1.2;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 2.2rem;
    margin-bottom: 40px;
  }

  @media (min-width: 992px) {
    font-size: 2.5rem;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;

  @media (min-width: 768px) {
    gap: 30px;
  }
`;

const SocialIcon = styled.a`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${theme.lightGreen} 0%, ${theme.lightGreenHover} 100%);
  color: ${theme.textLight};
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${theme.shadow};

  &:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: ${theme.shadowLarge};
    background: linear-gradient(135deg, ${theme.lightGreenHover} 0%, ${theme.darkGreen} 100%);
  }

  &:active {
    transform: translateY(-1px) scale(1.02);
  }

  svg {
    width: 24px;
    height: 24px;
  }

  @media (min-width: 768px) {
    width: 60px;
    height: 60px;

    svg {
      width: 28px;
      height: 28px;
    }
  }
`;

export default Sum;
