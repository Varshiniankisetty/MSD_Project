import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/community-logo.png";
import "./Header.css";

const Header = () => {
  const { isAuthenticated, logout, user } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="CommUnityCare Logo" className="logo-img" />
        <h1 className="logo">CommUnityCare</h1>
      </div>
      <nav className="navbar">
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/services">Services</NavLink></li>
          <li><NavLink to="/complaint">Complaint</NavLink></li>
          <li><NavLink to="/feedback">Feedback</NavLink></li>
          <li><NavLink to="/profile">Profile</NavLink></li>
          
          {isAuthenticated ? (
            <li className="user-info">
              <span>Welcome, {user?.name || user?.role}</span>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </li>
          ) : null}
        </ul>
      </nav>
    </header>
  );
};

export default Header;