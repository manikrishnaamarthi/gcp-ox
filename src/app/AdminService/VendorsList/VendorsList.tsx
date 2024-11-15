import React from 'react';
import './VendorsList.css';
import { FaHome, FaSignOutAlt, FaCartPlus, FaChartArea } from 'react-icons/fa';
import { BiSolidBookAdd } from "react-icons/bi";
import { MdOutlinePeopleAlt, MdOutlineInventory, MdManageAccounts } from "react-icons/md";
import { FaPeopleGroup } from 'react-icons/fa6';

const VendorsList = () => {
  return (
    <div className="container">
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
          <div className="sidebar-icon" data-name="Booking">
            <BiSolidBookAdd />
          </div>
          <div className="sidebar-icon" data-name="Vendor Approval">
            <FaPeopleGroup />
          </div>
          <div className="sidebar-icon" data-name="Revenue">
            <FaChartArea />
          </div>
          <div className="sidebar-icon" data-name="Manage Service">
            <MdManageAccounts />
          </div>
          <div className="sidebar-icon" data-name="Inventory">
            <MdOutlineInventory />
          </div>
          <div className="sidebar-icon" data-name="Vendor">
            <MdOutlinePeopleAlt />
          </div>
          <div className="sidebar-icon logout-icon" data-name="Logout">
            <FaSignOutAlt />
          </div>
        </nav>
      </aside>
      <main className="main">
        <header className="header">
          <h2 className="header-title">Vendors List</h2>
        </header>
        <section className="popular-cities">
  <div className="search-container">
    <h3 className="section-title">POPULAR CITIES</h3>
    <input type="text" placeholder="Search" className="search-input" />
  </div>
  <div className="cities-grid">
    <div className="city">
      <img src="/images/bengalore.jpg" alt="Bengaluru" className="city-image" />
      <p>Bengaluru</p>
    </div>
    <div className="city">
      <img src="/images/new delhi.jpeg" alt="New Delhi" className="city-image" />
      <p>New Delhi</p>
    </div>
    <div className="city">
      <img src="/images/chennai.jpg" alt="Chennai" className="city-image" />
      <p>Chennai</p>
    </div>
    <div className="city">
      <img src="/images/hyderabad.jpg" alt="Hyderabad" className="city-image" />
      <p>Hyderabad</p>
    </div>
    <div className="city">
      <img src="/images/gurgaon.jpg" alt="Gurgaon" className="city-image" />
      <p>Gurgaon</p>
    </div>
    <div className="city">
      <img src="/images/pune.jpg" alt="Pune" className="city-image" />
      <p>Pune</p>
    </div>
    <div className="city">
      <img src="/images/noida.jpg" alt="Noida" className="city-image" />
      <p>Noida</p>
    </div>
    <div className="city">
      <img src="/images/kolkata.jpeg" alt="Kolkata" className="city-image" />
      <p>Kolkata</p>
    </div>
    <div className="city">
      <img src="/images/mumbai.jpg" alt="Mumbai" className="city-image" />
      <p>Mumbai</p>
    </div>
    <div className="city">
      <img src="/images/ahmedabad.jpg" alt="Ahmedabad" className="city-image" />
      <p>Ahmedabad</p>
    </div>
    <div className="city">
      <img src="/images/all cities.jpg" alt="All Cities" className="city-image" />
      <p>All Cities</p>
    </div>
  </div>
</section>

<div className="filters">
  <span className="filter">Bengaluru</span>
  <div className="center-filters">
    <span className="filter">OxiviveClinic</span>
    <span className="filter">Oxi Wheel</span>
  </div>
  <input type="text" placeholder="Search" className="filter-search" />
</div>


        <table className="vendors-table">
          <thead>
            <tr>
              <th>Sl.No</th>
              <th>Vendors Name</th>
              <th>Service</th>
              <th>Contact No</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Vishwanath</td>
              <td>Hyperbaric Oxygen</td>
              <td>7777776666</td>
              <td>HSR, Bengaluru</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Vishwanath</td>
              <td>Hyperbaric Oxygen</td>
              <td>7777776666</td>
              <td>MG Road, Bengaluru</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Vishwanath</td>
              <td>Hyperbaric Oxygen</td>
              <td>7777776666</td>
              <td>BTM, Bengaluru</td>
            </tr>
            <tr>
              <td>4</td>
              <td>Vishwanath</td>
              <td>Hyperbaric Oxygen</td>
              <td>7777776666</td>
              <td>BTM, Bengaluru</td>
            </tr>
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default VendorsList;
