'use client';
import React, { useState } from 'react';
import { FaHome, FaCartPlus, FaChartArea, FaSignOutAlt } from 'react-icons/fa';
import { BiSolidBookAdd } from 'react-icons/bi';
import { BsPersonCircle } from 'react-icons/bs';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { MdOutlinePeopleAlt, MdOutlineInventory, MdManageAccounts } from 'react-icons/md';
import { FaPeopleGroup } from 'react-icons/fa6';
import './Vendordocument.css';

const Vendordocument: React.FC = () => {
  const [selectedService, setSelectedService] = useState<'Oxivive Clinic' | 'Oxivive Wheel'>('Oxivive Clinic');

  // Document mapping for each service
  const documents = {
    'Oxivive Clinic': ['Aadhar Card', 'PAN Card', 'Medical Licence', 'Building Licence'],
    'Oxivive Wheel': ['Aadhar Card', 'PAN Card', 'Driving Licence', 'Vehicle RC'],
  };

  return (
    <div className="manage-service">
      {/* Sidebar */}
      <aside className="manage-sidebar">
        <div className="logo-container">
          <img src="/images/shot.png" alt="Logo" className="logo-img" />
          <p className="logo-text">Admin</p>
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
          <div className="sidebar-icon logout-icon" data-name="Logout">
            <FaSignOutAlt />
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="content">
        <header className="header">
          <h1>Vendor Documents</h1>
          <p className="sub-heading">Fill the following details to add person</p>
        </header>
        <section className="form-section">
          <div className="form-header">
            <button
              className={`service-toggle ${selectedService === 'Oxivive Clinic' ? 'active' : ''}`}
              onClick={() => setSelectedService('Oxivive Clinic')}
            >
              Oxivive Clinic
            </button>
            <button
              className={`service-toggle ${selectedService === 'Oxivive Wheel' ? 'active' : ''}`}
              onClick={() => setSelectedService('Oxivive Wheel')}
            >
              Oxivive Wheel
            </button>
            <button className="upload-main-btn">Upload</button>
          </div>
          <form className="vendor-form">
            <div className="profile-section">
              <div className="profile-photo">
                <BsPersonCircle size={100} className="profile-icon" />
                <p className="profile-text">Profile Photo</p>
                <button className="upload-btn">
                  <IoMdAddCircleOutline /> Upload Photo
                </button>
              </div>
              <div className="profile-details">
                <label htmlFor="name">Name</label>
                <input id="name" type="text" placeholder="Name" />
                <label htmlFor="phone">Phone Number</label>
                <input id="phone" type="text" placeholder="Phone Number" />
                <label htmlFor="address">Address</label>
                <input id="address" type="text" placeholder="Address" />
              </div>
            </div>
            <h2>Upload the Documents</h2>
            <div className="document-cards">
              {documents[selectedService].map((title) => (
                <div key={title} className="document-card">
                  <p>{title}</p>
                  <div className="upload-area">
                    <p>Drop your file here, or browse</p>
                    <p>Files must be less than 2MB</p>
                    <p>Only one file can be uploaded</p>
                    <button className="upload-btn">

                    </button>
                  </div>
                </div>
              ))}
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default Vendordocument;
