"use client";

import React, { useState } from 'react';
import './Sidebar.css';
import { FaTachometerAlt, FaClipboard, FaBoxes, FaStore, FaUserMd, FaCogs, FaSignOutAlt, FaChartBar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const [activeLink, setActiveLink] = useState<string>("/overview"); // State to track active link

  const handleLinkClick = (link: string) => {
    setActiveLink(link); // Set the active link when clicked
  };

  return (
    <div className="sidebar">
      {/* Logo Section */}
      <div className="logo">
        <img src="/images/shot.png" alt="Oxivive Logo" className="logo-img" />
        <span>Oxivive</span>
      </div>

      <ul className="nav-links">
        <li className={activeLink === "/overview" ? "active" : ""}>
          <Link to="/overview" onClick={() => handleLinkClick("/overview")}><FaTachometerAlt className="icon" /></Link>
          <span>Overview</span>
        </li>
        <li className={activeLink === "/analytics" ? "active" : ""}>
          <Link to="/analytics" onClick={() => handleLinkClick("/analytics")}><FaChartBar className="icon" /></Link>
          <span> Analytics</span>
        </li>
        <li className={activeLink === "/application" ? "active" : ""}>
          <Link to="/application" onClick={() => handleLinkClick("/application")}><FaClipboard className="icon" /></Link>
          <span>Application</span>
        </li>
        <li className={activeLink === "/products" ? "active" : ""}>
          <Link to="/products" onClick={() => handleLinkClick("/products")}><FaBoxes className="icon" /></Link>
          <span> Products</span>
        </li>
        <li className={activeLink === "/vendors" ? "active" : ""}>
          <Link to="/vendors" onClick={() => handleLinkClick("/vendors")}><FaStore className="icon" /></Link>
          <span> Vendors</span>
        </li>
        <li className={activeLink === "/doctors" ? "active" : ""}>
          <Link to="/doctors" onClick={() => handleLinkClick("/doctors")}><FaUserMd className="icon" /></Link>
          <span> Doctors</span>
        </li>
      </ul>

      <ul className="settings">
        <li>
          <FaCogs className="icon" /> Settings
        </li>
        <li>
          <FaSignOutAlt className="icon" /> Log Out
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
