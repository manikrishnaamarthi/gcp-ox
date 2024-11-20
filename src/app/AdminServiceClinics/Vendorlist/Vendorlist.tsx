import React from 'react';
import { FaBookOpen } from "react-icons/fa";
import { IoPeople } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";
import { FaAmbulance } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { FaPersonCirclePlus } from "react-icons/fa6";
import { MdOutlineInventory } from "react-icons/md";
import { FaSignOutAlt } from "react-icons/fa";
import './Vendorlist.css';

const Vendorlist = () => {
  return (
    <div className="vendorlist-container">
      {/* Sidebar */}
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

      {/* Main Content */}
      <div className="content">
        <div className="header">
          <button className="location-btn">
            <i className="icon location-icon"></i> Mumbai
          </button>
          <input
            type="text"
            placeholder="Search"
            className="search-input"
          />
        </div>
        <h2 className="title">Vendors List</h2>
        <div className="tabs">
          <button className="tab active">Oxivive Clinic</button>
          <button className="tab">Oxivive Wheel</button>
        </div>
        <div className="table-container">
          <table className="vendor-table">
            <thead>
              <tr>
                <th>Sl.No</th>
                <th>Vendors Name</th>
                <th>Contact No</th>
                <th>Address</th>
                <th>Block Info</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }, (_, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>Vishwanath</td>
                  <td>7777766666</td>
                  <td>{['HSR', 'MG Road', 'BTM', 'Yelahanka'][i]}, Mumbai</td>
                  <td>
                    <button className="block-btn">
                      <i className="icon block-icon"></i> Block
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Vendorlist;
