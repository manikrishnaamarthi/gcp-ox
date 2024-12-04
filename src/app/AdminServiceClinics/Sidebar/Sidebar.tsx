'use client';
import React, { useState } from 'react';
import { FaBookOpen, FaAmbulance, FaSignOutAlt, FaHome, FaFileInvoice } from "react-icons/fa";
import { IoPeople } from "react-icons/io5";
import { MdSpaceDashboard, MdOutlineInventory } from "react-icons/md";
import { FaUserDoctor, FaPersonCirclePlus } from "react-icons/fa6";
import { useRouter } from 'next/navigation';
import './Sidebar.css';

const Sidebar = () => {
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const router = useRouter();

  const handleLogoutClick = () => {
    setShowLogoutPopup(true);
  };

  const handleCancelLogout = () => {
    setShowLogoutPopup(false);
  };

  const handleConfirmLogout = () => {
    console.log("User logged out"); // Add your logout logic here
    router.push('http://localhost:3000/AdminService/AdminDashboard/AccountPage');
  };

  return (
    <>
      <aside className="admin-sidebar">
        <div className="logo">
          <img src="/images/shot(1).png" alt="Logo" />
          <p>Admin</p>
        </div>
        <nav className="sidebar-icons">
          {/* Dashboard */}
          <div className="sidebar-icon" data-name="Dashboard" onClick={() => router.push('http://localhost:3000/AdminServiceClinics/Dashboard')}>
            <MdSpaceDashboard />
          </div>

          {/* Invoice */}
          <div className="sidebar-icon" data-name="Invoice" onClick={() => router.push('http://localhost:3000/AdminServiceClinics/Invoice')}>
            <FaFileInvoice />
          </div>

          {/* Booking List */}
          <div className="sidebar-icon" data-name="Bookinglist" onClick={() => router.push('http://localhost:3000/AdminServiceClinics/Booking')}>
            <FaBookOpen />
          </div>

          {/* Vendor List */}
          <div className="sidebar-icon" data-name="Vendorlist" onClick={() => router.push('http://localhost:3000/AdminServiceClinics/Vendorlist')}>
            <IoPeople />
          </div>

          {/* Inventory */}
          <div className="sidebar-icon" data-name="Inventory" onClick={() => router.push('http://localhost:3000/AdminServiceClinics/')}>
            <MdOutlineInventory />
          </div>

          {/* Driver List */}
          <div className="sidebar-icon" data-name="Driverlist" onClick={() => router.push('http://localhost:3000/AdminServiceClinics/Driverlist')}>
            <FaAmbulance />
          </div>

          {/* Doctor List */}
          <div className="sidebar-icon" data-name="Doctorlist" onClick={() => router.push('http://localhost:3000/AdminServiceClinics/Doctorlist')}>
            <FaUserDoctor />
          </div>

          {/* Adding Vendor */}
          <div className="sidebar-icon" data-name="Adding Vendor" onClick={() => router.push('http://localhost:3000/AdminServiceClinics/VendorDocument')}>
            <FaPersonCirclePlus />
          </div>

          {/* Logout */}
          <div className="sidebar-icon logout-icon" data-name="Logout" onClick={handleLogoutClick}>
            <FaSignOutAlt />
          </div>
        </nav>
      </aside>

      {showLogoutPopup && (
        <div className="logout-popup">
          <div className="popup-content">
            <p>Are you sure you want to log out?</p>
            <div className="popup-buttons">
              <button className="confirm-button" onClick={handleConfirmLogout}>Log Out</button>
              <button className="cancel-button" onClick={handleCancelLogout}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
