'use client';
import React from 'react';
import './Wheel.css';
import { FaHome, FaCalendarAlt, FaBell, FaUser, FaRegBell, FaRegAddressBook, FaFileInvoiceDollar, FaCarAlt } from 'react-icons/fa';
import { BsGraphUpArrow } from 'react-icons/bs';
import { MdInventory } from 'react-icons/md';
import { useRouter } from 'next/navigation';

const Wheel = () => {
  const router = useRouter();
  return (
    <div className="container">
      <header className="header">
        <div className="logoContainer">
          <img src="/images/shot(1).png" alt="OxiWheel Logo" className="logo" />
        </div>
        <h1 className="title">
          <span className="welcome">Welcome to</span>
          <span className="oxiwheel">OxiWheel</span>
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

      <footer className="footer">
        <div className="footerItem">
          <FaHome className="footerIcon" />
          <p>Home</p>
        </div>
        <div className="footerItem">
          <FaCalendarAlt className="footerIcon" />
          <p>Booking</p>
        </div>
        <div className="footerItem">
          <FaBell className="footerIcon" />
          <p>Notification</p>
        </div>
        <div className="footerItem">
          <FaUser className="footerIcon" />
          <p>Profile</p>
        </div>
      </footer>
    </div>
  );
};

export default Wheel;
