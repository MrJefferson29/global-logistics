import React, { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { Nav, Navbar, Container } from "react-bootstrap";
import styled, { createGlobalStyle } from "styled-components";

const Header = () => {
  const { activeUser, authToken } = useContext(AuthContext);
  const [auth, setAuth] = useState(!!authToken);
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false); // <-- control navbar expanded state
  const navigate = useNavigate();

  // Sync auth state from AuthContext or localStorage changes
  useEffect(() => {
    setAuth(!!authToken || !!localStorage.getItem("authToken"));
    setTimeout(() => setLoading(false), 1200);
  }, [authToken]);

  // Navbar scroll background effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close navbar when a link is clicked
  const handleLinkClick = () => {
    setExpanded(false);
  };

  return (
    <Styles scrolled={scrolled}>
      <GlobalStyle />
      <Navbar
        collapseOnSelect
        expand="lg"
        fixed="top"
        expanded={expanded}               // control expanded state here
        onToggle={(isExpanded) => setExpanded(isExpanded)} // sync toggle state
        className={`navy ${scrolled ? "scrolled" : ""}`}
      >
        <Container>
          <Navbar.Brand as={NavLink} to="/" tabIndex={0} onClick={handleLinkClick}>
            <span className="brand">Global</span><br />
            <span className="brand-span">Logistics</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" aria-label="Toggle navigation" className="toggle" />
          <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
            {loading ? (
              <div className="loading" aria-live="polite" aria-busy="true">
                Loading...
              </div>
            ) : (
              <Nav className="nav-links">
                <NavLink className="link" to="/" end onClick={handleLinkClick}>
                  Home
                </NavLink>
                <NavLink className="link" to="/tracking" onClick={handleLinkClick}>
                  Track
                </NavLink>
                {auth && (
                  <NavLink className="link" to="/create-post" onClick={handleLinkClick}>
                    New Package
                  </NavLink>
                )}
                <NavLink className="link" to="/about" onClick={handleLinkClick}>
                  About
                </NavLink>
                <NavLink className="link" to="/meet-the-team" onClick={handleLinkClick}>
                  Team
                </NavLink>
                <NavLink className="link" to="/summary" onClick={handleLinkClick}>
                  Insights
                </NavLink>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Styles>
  );
};

export default Header;

const GlobalStyle = createGlobalStyle`
  html, body {
    overflow-x: hidden;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
  }

  * {
    box-sizing: border-box;
  }

  body {
    padding-top: 70px; /* Account for fixed header height on mobile */
  }

  @media (min-width: 768px) {
    body {
      padding-top: 76px; /* Account for fixed header height on desktop */
    }
  }
`;

const Styles = styled.div`
  --primary-color: #1b4d3e;
  --primary-hover: #2a6b5a;
  --light-green: #7CB342;
  --text-dark: #2c3e50;
  --text-light: #ffffff;
  --shadow-color: rgba(0, 0, 0, 0.1);
  --shadow-medium: rgba(0, 0, 0, 0.15);

  .brand {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
    font-weight: 800;
    font-size: 1.8rem;
    color: var(--primary-color);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    letter-spacing: -0.5px;
    text-decoration: none;

    &:hover,
    &:focus {
      color: var(--primary-hover);
      transform: translateY(-2px);
      outline: none;
    }

    @media (min-width: 768px) {
      font-size: 1.8rem;
    }
  }
    .brand-span {
      color: var(--primary-color);
      font-weight: 600;
      font-size: 1.2rem;
      }

  .toggle {
    background: rgba(27, 77, 62, 0.1);
    border-radius: 8px;
    padding: 8px 12px;
    transition: all 0.3s ease;
    border: 2px solid transparent;

    &:hover,
    &:focus {
      background: var(--primary-color);
      color: var(--text-light);
      outline: none;
      border-color: var(--light-green);
    }

    .navbar-toggler-icon {
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(27, 77, 62, 0.85)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
    }

    &:hover .navbar-toggler-icon {
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(255, 255, 255, 1)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
    }
  }

  .navy {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    box-shadow: 0 2px 20px var(--shadow-color);
    padding: 1rem 0;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    width: 100%;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);

    &.scrolled {
      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      box-shadow: 0 4px 30px var(--shadow-medium);
      padding: 0.8rem 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.25);
    }
  }

  .loading {
    font-size: 1.5rem;
    color: var(--primary-color);
    padding: 15px 0;
    animation: fadeIn 0.8s ease-in-out infinite alternate;
  }

  @keyframes fadeIn {
    from {
      opacity: 0.5;
    }
    to {
      opacity: 1;
    }
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
    padding: 1rem 0;

    @media (min-width: 992px) {
      gap: 1rem;
      padding: 0;
    }
  }

  .navbar-collapse {
    @media (max-width: 991px) {
      background: rgba(255, 255, 255, 0.98);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      margin-top: 1rem;
      padding: 1rem;
      border-radius: 12px;
      box-shadow: 0 4px 20px var(--shadow-medium);
      border: 1px solid rgba(27, 77, 62, 0.1);
    }
  }

  .link {
    font-size: 1rem;
    text-decoration: none;
    font-weight: 600;
    color: var(--text-dark);
    position: relative;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    padding: 8px 12px;
    border-radius: 6px;
    letter-spacing: 0.3px;

    &:hover,
    &:focus {
      color: var(--primary-color);
      background: rgba(27, 77, 62, 0.08);
      outline: none;
      transform: translateY(-2px);
    }

    &.active {
      color: var(--primary-color);
      font-weight: 700;
      background: rgba(27, 77, 62, 0.1);

      &::after {
        content: "";
        position: absolute;
        bottom: 4px;
        left: 50%;
        transform: translateX(-50%);
        width: 60%;
        height: 3px;
        background: linear-gradient(90deg, var(--light-green) 0%, var(--primary-color) 100%);
        border-radius: 2px;
        transition: width 0.3s ease;
      }
    }

    @media (min-width: 768px) {
      font-size: 1.05rem;
      padding: 8px 16px;
    }

    @media (min-width: 992px) {
      font-size: 1.1rem;
    }

    @media (max-width: 767px) {
      font-size: 0.95rem;
      padding: 10px 15px;
      width: 100%;
      text-align: center;
    }
  }
`;
