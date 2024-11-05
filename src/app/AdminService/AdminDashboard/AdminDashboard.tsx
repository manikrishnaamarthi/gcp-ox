
'use client'
import React, { useState } from 'react';
import './AdminDashboard.css';
import { FaHome, FaUsers, FaClipboardList, FaCog, FaSignOutAlt, FaClinicMedical, FaWheelchair, FaDumbbell } from 'react-icons/fa';

const categories = ["OxiviveClinic", "OxiWheel"];

const vendors = [
  { name: "Veeresh Singh", applied: "Oxivive Clinic", location: "Bengaluru", image: "/images/a.jpg" },
  { name: "Raja Hari Singh", applied: "OxiWheel", location: "Mumbai", image: "/images/b.jpg" },
  { name: "Ravi Bishnoi", applied: "OxiWheel", location: "Bengaluru", image: "/images/c.jpg" },
  { name: "Randhir Tripathi", applied: "OxiWheel", location: "Pune", image: "/images/d.jpg" },
  { name: "Deepanshu Kori", applied: "Oxivive Clinic", location: "Hyderabad", image: "/images/e.jpg" },
];

const AdminDashboard = () => {
  const [activeCategory, setActiveCategory] = useState("OxiviveClinic");

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="logo">
          <img src="/images/shot(1).png" alt="Logo" />
          <p>Super Admin</p>
        </div>
        
        <nav className="sidebar-icons">
          <div className="sidebar-icon" data-name="Admin">
            <FaHome />
          </div>
          <div className="sidebar-icon" data-name="Invoice">
            <FaUsers />
          </div>
          <div className="sidebar-icon" data-name="Booking">
            <FaClinicMedical />
          </div>
          <div className="sidebar-icon" data-name="Vendor Approval">
            <FaWheelchair />
          </div>
          <div className="sidebar-icon" data-name="Revenue">
            <FaDumbbell />
          </div>
          <div className="sidebar-icon" data-name="Manage Service">
            <FaClipboardList />
          </div>
          <div className="sidebar-icon" data-name="Inventory">
            <FaCog />
          </div>
          <div className="sidebar-icon" data-name="Vendor">
            <FaSignOutAlt />
          </div>
        </nav>
      </aside>
      
      <main className="admin-content">
        <h2 className="admin-title">Vendors Applications</h2>
        
        <div className="admin-categories">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-button ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="cards-container">
          {vendors.map((vendor, index) => (
            <div key={index} className="card">
              <img src={vendor.image} alt={vendor.name} className="vendor-image" />
              <p className="vendor-name">Name: {vendor.name}</p>
              <p className="vendor-info">Applied: {vendor.applied}</p>
              <p className="vendor-info">Location: {vendor.location}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;