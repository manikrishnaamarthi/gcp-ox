'use client'
import React from 'react';
import { FaBookOpen } from "react-icons/fa";
import { IoPeople } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";
import { FaAmbulance } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { FaPersonCirclePlus } from "react-icons/fa6";
import { MdOutlineInventory } from "react-icons/md";
import { FaSignOutAlt } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import './Sidebar.css';

const Sidebar = () => {
  const router = useRouter();

  return (
    <aside className="admin-sidebar">
        <div className="logo">
          <img src="/images/shot(1).png" alt="Logo" />
          <p>Admin</p>
        </div>
        <nav className="sidebar-icons">
          <div className="sidebar-icon" data-name="Bookinglist"><FaBookOpen /></div>
          <div className="sidebar-icon" data-name="Vendorlist"><IoPeople /></div>
          <div className="sidebar-icon" data-name="Dashboard"><MdSpaceDashboard /></div>
          <div className="sidebar-icon" data-name="Inventory"><MdOutlineInventory /></div>
          <div className="sidebar-icon" data-name="Driverlist"><FaAmbulance /></div>
          <div className="sidebar-icon" data-name="Doctorlist"><FaUserDoctor /></div>
          <div className="sidebar-icon" data-name="Adding Vendor"><FaPersonCirclePlus /></div>
          <div className="sidebar-icon logout-icon" data-name="Logout"><FaSignOutAlt /></div>
        </nav>
      </aside>
  );
};

export default Sidebar;
