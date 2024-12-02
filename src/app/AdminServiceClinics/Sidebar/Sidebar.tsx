'use client'
import React from 'react';
import { FaBookOpen, FaAmbulance, FaSignOutAlt, FaHome, FaFileInvoice } from "react-icons/fa";
import { IoPeople } from "react-icons/io5";
import { MdSpaceDashboard, MdOutlineInventory } from "react-icons/md";
import { FaUserDoctor, FaPersonCirclePlus } from "react-icons/fa6";
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
        {/* Dashboard */}
        <div className="sidebar-icon" data-name="Dashboard" onClick={() => router.push('http://localhost:3000/AdminServiceClinics/Dashboard')}>
          <MdSpaceDashboard />
        </div>

        {/* Invoice Icon */}
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
        <div className="sidebar-icon logout-icon" data-name="Logout" onClick={() => router.push('http://localhost:3000/AdminServiceClinics/')}>
          <FaSignOutAlt />
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
