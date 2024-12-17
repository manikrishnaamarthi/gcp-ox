'use client';
import React, { useState } from 'react';
import { FaBookOpen, FaAmbulance, FaSignOutAlt, FaFileInvoice } from "react-icons/fa";
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
    console.log("User logged out");
    router.push('/AdminService/AdminDashboard/AccountPage');
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
          <button
            className="sidebar-icon"
            data-name="Dashboard"
            onClick={() => router.push('/AdminServiceClinics/Dashboard')}
          >
            <MdSpaceDashboard />
          </button>

          {/* Booking List */}
          <button
            className="sidebar-icon"
            data-name="Bookinglist"
            onClick={() => router.push('/AdminServiceClinics/Booking')}
          >
            <FaBookOpen />
          </button>

          {/* Vendor List */}
          <button
            className="sidebar-icon"
            data-name="Vendorlist"
            onClick={() => router.push('/AdminServiceClinics/Vendorlist')}
          >
            <IoPeople />
          </button>

          {/* Inventory */}
          <button
            className="sidebar-icon"
            data-name="Inventory"
            onClick={() => router.push('/AdminServiceClinics/')}
          >
            <MdOutlineInventory />
          </button>

          {/* Driver List */}
          <button
            className="sidebar-icon"
            data-name="Driverlist"
            onClick={() => router.push('/AdminServiceClinics/Driverlist')}
          >
            <FaAmbulance />
          </button>

          {/* Doctor List */}
          <button
            className="sidebar-icon"
            data-name="Doctorlist"
            onClick={() => router.push('/AdminServiceClinics/Doctorlist')}
          >
            <FaUserDoctor />
          </button>

          {/* Adding Vendor */}
          <button
            className="sidebar-icon"
            data-name="Adding Vendor"
            onClick={() => router.push('/AdminServiceClinics/VendorDocument')}
          >
            <FaPersonCirclePlus />
          </button>

          {/* Logout */}
          <button
            className="sidebar-icon logout-icon"
            data-name="Logout"
            onClick={handleLogoutClick}
          >
            <FaSignOutAlt />
          </button>
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
