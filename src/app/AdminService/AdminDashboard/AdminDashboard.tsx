'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './AdminDashboard.css';
import { FaHome } from 'react-icons/fa';
import { BiSolidBookAdd } from "react-icons/bi";
import { FaCartPlus } from "react-icons/fa";
import { MdOutlinePeopleAlt, MdOutlineInventory, MdManageAccounts } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaChartArea } from "react-icons/fa";

const categories = ["OxiviveClinic", "OxiviveWheel"];

const AdminDashboard = () => {
  const [activeCategory, setActiveCategory] = useState("OxiviveClinic");
  const [vendors, setVendors] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // State for the search query
  const router = useRouter();

  // Fetch data from backend API
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/adminservice-vendordetails/');
        const data = await response.json();
        setVendors(data);
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    };

    fetchVendors();
  }, []);

  // Filter vendors based on active category and search query
  const filteredVendors = vendors.filter(vendor => {
    const matchesCategory = activeCategory === "OxiviveClinic" 
      ? vendor.selectedService === "Oxi Clinic" 
      : vendor.selectedService === "Oxi Wheel";
    const matchesSearch = vendor.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Navigate to the details page for the selected vendor
  const handleCardClick = () => {
    router.push(`/AdminService/AdminDashboard/AdminDetails/`);
  };

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
            <FaCartPlus />
          </div>
          <div className="sidebar-icon" data-name="Booking">
            <BiSolidBookAdd />
          </div>
          <div className="sidebar-icon" data-name="Vendor Approval">
            <FaPeopleGroup />
          </div>
          <div className="sidebar-icon" data-name="Revenue">
            <FaChartArea />
          </div>
          <div className="sidebar-icon" data-name="Manage Service">
            <MdManageAccounts />
          </div>
          <div className="sidebar-icon" data-name="Inventory">
            <MdOutlineInventory />
          </div>
          <div className="sidebar-icon" data-name="Vendor">
            <MdOutlinePeopleAlt />
          </div>
        </nav>
      </aside>
      
      <main className="admin-content">
        <div className="admin-header">
          <h2 className="admin-title">Vendors Applications</h2>
          
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search by vendor name..."
            className="search-bar"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery on input change
          />
        </div>

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
          {filteredVendors.length > 0 ? (
            filteredVendors.map((vendor, index) => (
              <div key={index} className="card" onClick={() => handleCardClick()}>
                <img src={`${vendor.profile_photo}`} alt={vendor.name} className="vendor-image" />
                <p className="vendor-name">Name: {vendor.name}</p>
                <p className="vendor-info">Applied: {vendor.selectedService}</p>
                <p className="vendor-info">Location: {vendor.address}</p>
              </div>
            ))
          ) : (
            <p>No vendors available for {activeCategory}.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
