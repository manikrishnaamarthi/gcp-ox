"use client"
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

  const documents = {
    'Oxivive Clinic': [
      { title: 'Aadhar Card', type: ['Front', 'Back'] },
      { title: 'PAN Card', type: ['Front', 'Back'] },
      { title: 'Medical Licence', type: ['Front', 'Back'] },
      { title: 'Building Permit', type: ['Front'] },
    ],
    'Oxivive Wheel': [
      { title: 'Aadhar Card', type: ['Front', 'Back'] },
      { title: 'PAN Card', type: ['Front', 'Back'] },
      { title: 'Driving Licence', type: ['Front', 'Back'] },
      { title: 'Vehicle RC', type: ['Front', 'Back'] },
    ],
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

                <label htmlFor="email">Email</label>
                <input id="email" type="text" placeholder="Email" />

                <label htmlFor="state">State</label>
                <input id="state" type="text" placeholder="State" />

                <label htmlFor="district">District</label>
                <input id="district" type="text" placeholder="District" />

                <label htmlFor="pincode">Pincode</label>
                <input id="pincode" type="text" placeholder="Pincode" />

                <label htmlFor="address">Address</label>
                <input id="address" type="text" placeholder="Address" />

                {selectedService === 'Oxivive Wheel' && (
                  <>
                    <label htmlFor="wheelName">Wheel Name</label>
                    <input id="wheelName" type="text" placeholder="Wheel Name" />
                  </>
                )}
                {selectedService === 'Oxivive Clinic' && (
                  <>
                    <label htmlFor="clinicName">Clinic Name</label>
                    <input id="clinicName" type="text" placeholder="Clinic Name" />
                  </>
                )}
              </div>
            </div>

            <h2 className="head5">Upload The Documents</h2>
            <div className="document-cards">
            {documents[selectedService].map(({ title, type }) => (
              <div key={title} className="document-row">
                <p className="document-title">{title}</p>
                <div className="document-card-group">
                  {type.map((side) => (
                    <div key={`${title}-${side}`} className="document-card">
                      <div className="upload-area">
                        <p>Drop your file here, or browse</p>
                        <p>Files must be less than 2MB</p>
                        <p>Only one file can be uploaded</p>
                      </div>
                    </div>
                  ))}
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
