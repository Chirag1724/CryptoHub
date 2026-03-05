import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiLock, FiMenu, FiX } from "react-icons/fi";
import "./Navbar.css";

function Navbar() {
  const { currentUser, logout, isEmailProvider } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isDashboardPage = location.pathname === "/dashboard";

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      await logout();
      navigate("/");
      setIsMobileMenuOpen(false);
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  }, [logout, navigate]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/pricing", label: "Pricing" },
    { to: "/blog", label: "Insights" },
    { to: "/features", label: "Features" },
    { to: "/contributors", label: "Contributors" },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-content">
        {/* Brand Left */}
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          <img src="/favicon.svg" alt="CryptoHub" className="logo-img" />
          <span>CryptoHub</span>
        </Link>

        {/* Centered Menu (Desktop) */}
        <ul className="navbar-menu">
          {navLinks.map((link) => (
            <li key={link.to} className="navbar-item">
              <Link
                to={link.to}
                className={`navbar-link ${location.pathname === link.to ? "active" : ""}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Actions (Desktop) */}
        <div className="navbar-actions">
          <Link to="/login" className="btn-login">
            Login
          </Link>
          <Link to="/signup" className="btn-grow">
            Get Started
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="navbar-toggle" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${isMobileMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-drawer-menu">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`mobile-link ${location.pathname === link.to ? "active" : ""}`}
                onClick={closeMobileMenu}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mobile-drawer-actions">
          <Link to="/login" className="mobile-btn-login" onClick={closeMobileMenu}>
            Login
          </Link>
          <Link to="/signup" className="mobile-btn-signup" onClick={closeMobileMenu}>
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
