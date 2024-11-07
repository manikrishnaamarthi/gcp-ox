'use client';
import React from 'react';
import './Wheel.css';
import { FaHome, FaCalendarAlt, FaBell, FaUser } from 'react-icons/fa';
import { useRouter } from 'next/navigation';


const Wheel = () => {
  const router = useRouter();
  return (
    <div className="container">
      <header className="header">
        <div className="logoContainer">
          <img src="/images/circle.png" alt="OxiWheel Logo" className="logo" />
        </div>
        <h1 className="title">
            <span className="welcome">Welcome to</span>
            <span className="oxiwheel">OxiWheel</span>
        </h1>
        <img src="/images/bell.png" alt="Notification Icon" className="notificationIcon" />
      </header>

      <div className="main">
        <div className="grid">
            <div className="card">
            <img src="/images/dashboard.png" alt="Dashboard" className="cardIcon" onClick={()=> router.push('/VendorManagementService/WheelVendor/ClinicPerformance')} />
            <p className="label">Dashboard</p>
            </div>
            <div className="card">
            <img src="/images/bookings.png" alt="Bookings" className="cardIcon" onClick={()=> router.push('/VendorManagementService/WheelVendor/MyBookings')} />
            <p className="label">Bookings</p>
            </div>
            <div className="card">
            <img src="/images/inventory.png" alt="Inventory" className="cardIcon" onClick={()=> router.push('/VendorManagementService/WheelVendorInventory')} />
            <p className="label">Inventory</p>
            </div>
            <div className="card">
            <img src="/images/invoice.png" alt="Invoice" className="cardIcon" onClick={()=> router.push('/VendorManagementService/WheelVendorInvoice')}/>
            <p className="label">Invoice</p>
            </div>
            <div className="card">
            <img src="/images/driver.png" alt="Doctor's" className="cardIcon" onClick={()=> router.push('/VendorManagementService/WheelVendor/MyDoctors')}/>
            <p className="label">Doctor's</p>
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
