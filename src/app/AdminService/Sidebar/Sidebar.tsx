import React, { useEffect, useState } from 'react';
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

  // Prefetch critical routes when the component mounts
  useEffect(() => {
    router.prefetch('/AdminService/');
    router.prefetch('/AdminService/Invoicelist');
    router.prefetch('/AdminService/Booking/');
    router.prefetch('/AdminService/AdminDashboard/');
    router.prefetch('/AdminService/AdminPerson/');
    router.prefetch('/AdminService/AdminDashboard/ManageService/');
    router.prefetch('/AdminService/Inventory/');
    router.prefetch('/AdminService/VendorsList/');
  }, [router]);

  const handleLogout = () => {
    console.log("User logged out");
    router.push('/AdminService/AdminDashboard/AccountPage');
  };

  const navigateWithPreload = (route) => {
    router.push(route); // Navigate directly
  };

  return (
    <>
      <aside className="admin-sidebar">
        <div className="logo">
          <img src="/images/shot(1).png" alt="Logo" />
          <p>Super Admin</p>
        </div>
        <nav className="sidebar-icons">
          <button className="sidebar-icon" data-name="Admin" onClick={() => navigateWithPreload('/AdminService/')}>
            <FaHome />
          </button>
          <button className="sidebar-icon" data-name="Invoice" onClick={() => navigateWithPreload('/AdminService/Invoicelist')}>
            <FaCartPlus />
          </button>
          <button className="sidebar-icon" data-name="Booking" onClick={() => navigateWithPreload('/AdminService/Booking/')}>
            <BiSolidBookAdd />
          </button>
          <button className="sidebar-icon" data-name="Vendor Approval" onClick={() => navigateWithPreload('/AdminService/AdminDashboard/')}>
            <FaPeopleGroup />
          </button>
          <button className="sidebar-icon" data-name="Add Admin" onClick={() => navigateWithPreload('/AdminService/AdminPerson/')}>
            <IoMdPersonAdd />
          </button>
          <button className="sidebar-icon" data-name="Manage Service" onClick={() => navigateWithPreload('/AdminService/AdminDashboard/ManageService/')}>
            <MdManageAccounts />
          </button>
          <button className="sidebar-icon" data-name="Inventory" onClick={() => navigateWithPreload('/AdminService/Inventory/')}>
            <MdOutlineInventory />
          </button>
          <button className="sidebar-icon" data-name="Vendor" onClick={() => navigateWithPreload('/AdminService/VendorsList/')}>
            <MdOutlinePeopleAlt />
          </button>
          <button
            className="sidebar-icon logout-icon"
            data-name="Logout"
            onClick={() => setShowLogoutPopup(true)}
          >
            <FaSignOutAlt />
          </button>
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
