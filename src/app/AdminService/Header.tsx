"use client";

import React from 'react';
import './Header.css';
import { FaBell, FaUserCircle, FaSearch } from 'react-icons/fa'; // Import FaSearch for search icon
import { useLocation } from 'react-router-dom'; // Import useLocation to detect route

const Header: React.FC = () => {
  const location = useLocation();

  // Define the titles for each route
  const getTitle = (): string => {
    switch (location.pathname) {
      case '/analytics':
        return 'Analytics';
      case '/application':
        return 'Vendor Application List';
      case '/products':
        return 'Products';
      case '/vendors':
        return 'Vendors';
      case '/doctors':
        return 'Doctors';
      default:
        return 'Overview';
    }
  };

  return (
    <div className="header">
      <div className="header-left">
        <h2>{getTitle()}</h2>
        <p className="detail-text">Detailed information about {getTitle()} goes here.</p>
      </div>

      <div className="search-container">
        <FaSearch className="search-icon" /> {/* Search Icon */}
        <input type="text" placeholder="         Search anything..." className="search-bar" />
      </div>

      <div className="header-right">
        <FaBell className="notification-icon" />
        <FaUserCircle className="profile-icon" />
      </div>
    </div>
  );
};

export default Header;
