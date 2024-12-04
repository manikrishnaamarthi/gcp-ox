'use client'
import React, { useState } from 'react';
import { FaHome, FaCartPlus, FaSignOutAlt } from 'react-icons/fa';
import { BiSolidBookAdd } from 'react-icons/bi';
import { MdManageAccounts, MdOutlineInventory, MdOutlinePeopleAlt } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import { FaPeopleGroup } from "react-icons/fa6";
import { IoMdPersonAdd } from "react-icons/io";
import './Sidebar.css';

const Sidebar = () => {
  const router = useRouter();
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const handleLogout = () => {
    console.log("User logged out"); // Add your logout logic here
    router.push('http://localhost:3000/AdminService/AdminDashboard/AccountPage');
  };

  return (
    <>
      <aside className="admin-sidebar">
        <div className="logo">
          <img src="/images/shot(1).png" alt="Logo" />
          <p>Super Admin</p>
        </div>
        <nav className="sidebar-icons">
          <div className="sidebar-icon" data-name="Admin">
            <FaHome />
          </div>
          <div className="sidebar-icon" data-name="Invoice">
            <FaCartPlus />
          </div>
          <div className="sidebar-icon" data-name="Booking" onClick={() => router.push('http://localhost:3000/AdminService/Booking/')}>
            <BiSolidBookAdd />
          </div>
          <div className="sidebar-icon" data-name="Vendor Approval" onClick={() => router.push('http://localhost:3000/AdminService/AdminDashboard/')}>
            <FaPeopleGroup />
          </div>
          <div className="sidebar-icon" data-name="Add Admin" onClick={() => router.push('http://localhost:3000/AdminService/AdminPerson/')}>
            <IoMdPersonAdd />
          </div>
          <div className="sidebar-icon" data-name="Manage Service" onClick={() => router.push('http://localhost:3000/AdminService/AdminDashboard/ManageService/')}>
            <MdManageAccounts />
          </div>
          <div className="sidebar-icon" data-name="Inventory" onClick={() => router.push('http://localhost:3000/AdminService/Inventory/')}>
            <MdOutlineInventory />
          </div>
          <div className="sidebar-icon" data-name="Vendor" onClick={() => router.push('http://localhost:3000/AdminService/VendorsList/')}>
            <MdOutlinePeopleAlt />
          </div>
          <div
            className="sidebar-icon logout-icon"
            data-name="Logout"
            onClick={() => setShowLogoutPopup(true)}
          >
            <FaSignOutAlt />
          </div>
        </nav>
      </aside>
      {showLogoutPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <p>Are you sure you want to log out?</p>
            <div className="popup-buttons">
              <button onClick={handleLogout} className="logout-btn">Log Out</button>
              <button onClick={() => setShowLogoutPopup(false)} className="cancel-btn">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
