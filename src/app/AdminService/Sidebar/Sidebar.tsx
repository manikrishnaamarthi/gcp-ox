'use client'
import React from 'react';
import { FaHome, FaCartPlus, FaChartArea, FaSignOutAlt } from 'react-icons/fa';
import { BiSolidBookAdd } from 'react-icons/bi';
import { MdManageAccounts, MdOutlineInventory, MdOutlinePeopleAlt } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import { FaPeopleGroup } from "react-icons/fa6";
import './Sidebar.css';

const Sidebar = () => {
  const router = useRouter();

  return (
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
        <div className="sidebar-icon" data-name="Booking" onClick={() => router.push('http://localhost:3000/AdminService/AdminDashboard/Booking/')}>
          <BiSolidBookAdd />
        </div>
        <div className="sidebar-icon" data-name="Vendor Approval" onClick={() => router.push('http://localhost:3000/AdminService/AdminDashboard/')}>
          <FaPeopleGroup />
        </div>
        <div className="sidebar-icon" data-name="Revenue">
          <FaChartArea />
        </div>
        <div className="sidebar-icon" data-name="Manage Service" onClick={() => router.push('http://localhost:3000/AdminService/AdminDashboard/ManageService/')}>
          <MdManageAccounts />
        </div>
        <div className="sidebar-icon" data-name="Inventory" onClick={() => router.push('http://localhost:3000/AdminService/Inventory/')}>
          <MdOutlineInventory />
        </div>
        <div className="sidebar-icon" data-name="Vendor"onClick={() => router.push('http://localhost:3000/AdminService/VendorsList/')}>
          <MdOutlinePeopleAlt />
        </div>
        <div className="sidebar-icon logout-icon" data-name="Logout">
          <FaSignOutAlt />
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
