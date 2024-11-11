'use client';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { FaHome, FaCartPlus, FaChartArea } from 'react-icons/fa';
import { BiSolidBookAdd } from 'react-icons/bi';
import { MdOutlinePeopleAlt, MdOutlineInventory, MdManageAccounts } from 'react-icons/md';
import { FaPeopleGroup } from 'react-icons/fa6';
import { IoIosSearch } from "react-icons/io";
import { TbLogout } from "react-icons/tb";
import './AdminDetails.css';

const AdminDetails = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const name = searchParams.get('name');
  const profile_photo = searchParams.get('profile_photo');
  const selectedService = searchParams.get('selectedService');
  const address = searchParams.get('address');
  const email = searchParams.get('email');
  const phone = searchParams.get('phone');
  const pan_front_side = searchParams.get('pan_front_side');
  const gstNumber = searchParams.get('gstNumber');
  const aadhar_front_side = searchParams.get('aadhar_front_side');
  const aadhar_back_side = searchParams.get('aadhar_back_side');
  const pan_back_side = searchParams.get('pan_back_side');
  const licence_end_date = searchParams.get('licence_end_date');
  const medical_front_side = searchParams.get('medical_front_side')

  if (!name) return <p>Loading...</p>; // Display loading until data is available

  return (
    <div className="admin-details">
      <aside className="sidebar">
        <div className="logo">
          <img src="/images/shot(1).png" alt="Oxivive Logo" />
          <h1>Oxivive</h1>
        </div>
        <div className="search-container-bar">
          <i className="search-icon"><IoIosSearch /></i>
          <input type="text" placeholder="Search" className="search-bar-page" />
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
        <h2 className="page-title">Vendor Details</h2>

        <section className="vendor-info-page">
          <div className="profile">
            <img src={`http://127.0.0.1:8000/${profile_photo}`} alt="Profile" className="profile-pic" />
            <div className="profile-details">
              <h3>{name}</h3>
              <p>{address}</p>
            </div>
          </div>

          <div className="info-details">
            <p><strong>Oxi Type:</strong> {selectedService}</p>
            <p><strong>Email ID:</strong> {email}</p>
            <p><strong>Phone:</strong> {phone}</p>
            <p><strong>PAN Number:</strong> {pan_front_side}</p>
            <p><strong>GST Number:</strong> {gstNumber}</p>
            <div className="action-buttons">
              <button className="approve">Approve</button>
              <button className="reject">Reject</button>
            </div>
          </div>

          <section className="documents">
            <h3>Aadhar Card</h3>
            <div className="document-row">
              <img src={`http://127.0.0.1:8000/${aadhar_front_side}`} alt="Aadhar Front" />
              <img src={`http://127.0.0.1:8000/${aadhar_back_side}`} alt="Aadhar Back" />
            </div>

            <h3>PAN Card</h3>
            <div className="document-row">
              <img src={`http://127.0.0.1:8000/${pan_front_side}`} alt="PAN Front" />
              <img src={`http://127.0.0.1:8000/${pan_back_side}`} alt="PAN Back" />
            </div>

            <h3>Additional Documents</h3>
            <div className="document-row">
              <p><img src={`http://127.0.0.1:8000/${medical_front_side}`} alt="Medical Front" />Medical Licence Exp Date: {licence_end_date}</p>
            </div>
          </section>
        </section>
      </main>
    </div>
  );
};

export default AdminDetails;
