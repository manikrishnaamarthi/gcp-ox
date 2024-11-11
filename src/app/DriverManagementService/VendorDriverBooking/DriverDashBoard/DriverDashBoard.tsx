"use client";
import React from 'react';
import './DriverDashBoard.css';
import { useRouter } from 'next/navigation';
import { FaRegAddressBook } from 'react-icons/fa';
import { SlHome } from 'react-icons/sl';
import { LuBookPlus } from 'react-icons/lu';
import { IoNotificationsOutline } from 'react-icons/io5';
import { BsPerson } from 'react-icons/bs';

const DriverDashBoard: React.FC = () => {
  const router = useRouter();
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <IoNotificationsOutline className="notification-icon" />
        <img src="/images/shot(1).png" alt="Logo" className="logo" />
        <div className="dashboard-text">
          <h1>Welcome</h1>
          <h2>Oxi Wheel</h2>
        </div>
      </div>
      <p className="dashboard-role">Driver</p>

      <div className="dashboard-container">
        <FaRegAddressBook size={100} className="dashboard-icon" onClick={() => router.push('/DriverManagementService/VendorDriverBooking/MyBooking')} />
        <p className="dashboard-icon-text">Booking</p>
        <footer className="footer">
          <div className="footerItem">
            <SlHome className="footerIcon" />
            <p>Home</p>
          </div>
          <div className="footerItem">
            <LuBookPlus className="footerIcon" />
            <p>Booking</p>
          </div>
          <div className="footerItem">
            <IoNotificationsOutline className="footerIcon" />
            <p>Notification</p>
          </div>
          <div className="footerItem">
            <BsPerson className="footerIcon" />
            <p>Profile</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default DriverDashBoard;
