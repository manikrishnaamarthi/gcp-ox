'use client';
import React, { useEffect, useState } from 'react';
import { FaHome, FaCartPlus, FaChartArea } from 'react-icons/fa';
import { BiSolidBookAdd } from 'react-icons/bi';
import { MdOutlinePeopleAlt, MdOutlineInventory, MdManageAccounts } from 'react-icons/md';
import { FaPeopleGroup } from 'react-icons/fa6';
import { IoIosSearch } from "react-icons/io";
import { TbLogout } from "react-icons/tb";
import './AdminDetails.css';

const AdminDetails: React.FC = () => {
  const [adminDetailsList, setAdminDetailsList] = useState([]);

  useEffect(() => {
    // Fetch details from backend API
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/adminservice-vendordetails/');
        const data = await response.json();
        setAdminDetailsList(data); // Assuming data is an array of vendor details
      } catch (error) {
        console.error("Error fetching admin details:", error);
      }
    };
    
    fetchData();
  }, []);

  if (!adminDetailsList.length) {
    return <p>Loading...</p>;
  }

  return (
    <div className="admin-details">
      <aside className="sidebar">
        <div className="logo">
          <img src="/images/shot(1).png" alt="Oxivive Logo" />
          <h1>Oxivive</h1>
        </div>
        <div className="search-container">
          <i className="search-icon"><IoIosSearch /></i>
          <input type="text" placeholder="Search" className="search-bar" />
        </div>
        <nav className="menu">
          <ul>
            <li><FaHome className="icon" /> Admin</li>
            <li><FaCartPlus className="icon" /> Invoice</li>
            <li><BiSolidBookAdd className="icon" /> Booking</li>
            <li><FaPeopleGroup className="icon" /> Vendor Approval</li>
            <li><FaChartArea className="icon" /> Revenue</li>
            <li><MdManageAccounts className="icon" /> Manage Service</li>
            <li><MdOutlineInventory className="icon" /> Inventory</li>
            <li><MdOutlinePeopleAlt className="icon" /> Vendor</li>
          </ul>
        </nav>
        <button className="logout"><TbLogout /> Logout</button>
      </aside>
      
      <main className="content">
        <h2 className="page-title">Vendors Applications</h2>
        
        {adminDetailsList.map((admin, index) => (
          <section className="vendor-info" key={index}>
            <div className="profile">
              <img src={`http://127.0.0.1:8000/${admin.profile_photo}`} alt="Profile" className="profile-pic" />
              <div className="profile-details">
                <h3>{admin.name}</h3>
                <p>{admin.address}</p>
              </div>
            </div>
            
            <div className="info-details">
              <p><strong>Oxi Type:</strong> {admin.selectedService}</p>
              <p><strong>Email ID:</strong> {admin.email}</p>
              <p><strong>Phone:</strong> {admin.phone}</p>
              <p><strong>PAN Number:</strong> {admin.pan_front_side}</p>
              <p><strong>GST Number:</strong> {admin.gstNumber}</p>
              <div className="action-buttons">
                <button className="approve">Approve</button>
                <button className="reject">Reject</button>
              </div>
            </div>
            
            <section className="documents">
              <h3>Aadhar Card</h3>
              <div className="document-row">
                <img src={`http://127.0.0.1:8000/${admin.aadhar_front_side}`} alt="Aadhar Front" />
                <img src={`http://127.0.0.1:8000/${admin.aadhar_back_side}`} alt="Aadhar Back" />
              </div>
              
              <h3>PAN Card</h3>
              <div className="document-row">
                <img src={`http://127.0.0.1:8000/${admin.pan_front_side}`} alt="PAN Front" />
                <img src={`http://127.0.0.1:8000/${admin.pan_back_side}`} alt="PAN Back" />
              </div>
              
              <h3>Additional Documents</h3>
              <div className="document-row">
                <p>Medical Licence Exp Date: {admin.licence_end_date}</p>
              </div>
            </section>
          </section>
        ))}
      </main>
    </div>
  );
};

export default AdminDetails;
