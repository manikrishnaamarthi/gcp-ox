'use client';
import React, { useState } from 'react';
import './Wheel.css';
import {  FaRegBell, FaRegAddressBook, FaFileInvoiceDollar, FaCarAlt } from 'react-icons/fa';
import { BsGraphUpArrow } from 'react-icons/bs';
import { MdInventory } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faClipboardList, faBell, faUser } from '@fortawesome/free-solid-svg-icons';

const Wheel = () => {
  const router = useRouter();
  const [selectedFooter, setSelectedFooter] = useState('home'); // Define selectedFooter in state

  const handleFooterClick = (section: string) => {
    setSelectedFooter(section); // Update the selected footer section
  };

  return (
    <div className="container5">
      <header className="header">
        <div className="logoContainer">
          <img src="/images/shot(1).png" alt="OxiWheel Logo" className="logo" />
        </div>
        <h1 className="title0">
          <span className="welcome0">Welcome to</span>
          <span className="oxiwheel0">OxiWheel</span>
        </h1>
        <FaRegBell className="notificationIcon" />
      </header>

      <div className="main">
        <div className="grid">
          <div className="card" onClick={() => router.push('/VendorManagementService/WheelVendor/WheelPerformance')}>
            <BsGraphUpArrow className="cardIcon" />
            <p className="label">Dashboard</p>
          </div>
          <div className="card" onClick={() => router.push('/VendorManagementService/WheelVendor/MyBookings')}>
            <FaRegAddressBook className="cardIcon" />
            <p className="label">Bookings</p>
          </div>
          <div className="card" onClick={() => router.push('/VendorManagementService/WheelVendor/Inventory')}>
            <MdInventory className="cardIcon" />
            <p className="label">Inventory</p>
          </div>
          <div className="card" onClick={() => router.push('/VendorManagementService/WheelVendor/Invoice')}>
            <FaFileInvoiceDollar className="cardIcon" />
            <p className="label">Invoice</p>
          </div>
          <div className="card" onClick={() => router.push('/VendorManagementService/WheelVendor/MyDrivers')}>
            <FaCarAlt className="cardIcon" />
            <p className="label">Driver's</p>
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="Wheel-footer">
        <div className={`footer-icon ${selectedFooter === 'home' ? 'selected' : ''}`} onClick={() => handleFooterClick('home')}>
          <FontAwesomeIcon icon={faHome} />
          <span>Home</span>
        </div>
        <div className={`footer-icon ${selectedFooter === 'bookings' ? 'selected' : ''}`} onClick={() => handleFooterClick('bookings')}>
          <FontAwesomeIcon icon={faClipboardList} />
          <span>Bookings</span>
        </div>
        <div className={`footer-icon ${selectedFooter === 'notifications' ? 'selected' : ''}`} onClick={() => handleFooterClick('notifications')}>
          <FontAwesomeIcon icon={faBell} />
          <span>Notifications</span>
        </div>
        <div className={`footer-icon ${selectedFooter === 'profile' ? 'selected' : ''}`} onClick={() => handleFooterClick('profile')}>
          <FontAwesomeIcon icon={faUser} />
          <span>Profile</span>
        </div>
      </div>
    </div>
  );
};

export default Wheel;
