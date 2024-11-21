'use client';
import React from 'react';
import { FaHome, FaCartPlus, FaChartArea, FaSignOutAlt } from 'react-icons/fa';
import { BiSolidBookAdd } from 'react-icons/bi';
import { IoMdAddCircleOutline } from "react-icons/io";
import { CgRemove } from "react-icons/cg";
import { MdOutlinePeopleAlt, MdOutlineInventory, MdManageAccounts } from 'react-icons/md';
import { FaPeopleGroup } from 'react-icons/fa6';
import { CiSquareRemove } from 'react-icons/ci';
import './Manageservice.css';

const Manageservice = () => {
  return (
    <div className="manage-service">
      <aside className="manage-sidebar">
        <div className="logo-container">
          <img src="/images/shot.png" alt="Logo" className="logo-img" />
          <p className="logo-text">Super Admin</p>
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

      <main className="content">
        <header className="header">
          <h2 className="page-title">Manage Service</h2>
          <input
            type="text"
            className="search-bar"
            placeholder="Search services..."
          />
        </header>

        <div className="actions">
          <button className="add-service-btn">
            <IoMdAddCircleOutline className="add-icon" /> Add Service
          </button>
        </div>

        <section className="service-cards">
          <div className="card">
            <div className="card-image">
              <img src="/images/oxi_clinic.jpg" alt="Oxi Clinic" />
              <h3 className="head1">Oxi Clinic</h3>
            </div>
            <div className="card-content">
              <p><strong>Service:</strong> HYPERBARIC OXYGEN THERAPY (HBOT)</p>
              <p>
                <strong>Description:</strong> Unleash your mind's potential with
                our cutting-edge anti-aging treatments.
              </p>
              <p><strong>Price:</strong> 2,000 Rs.</p>
              <button className="remove-btn">
                <CgRemove className="remove-icon" /> Remove
              </button>
            </div>
          </div>

          <div className="card">
            <div className="card-image">
              <img src="/images/oxi_home.jpg" alt="Oxi Home" />
              <h3 className="head1">Oxi Home</h3>
            </div>
            <div className="card-content">
              <p><strong>Service:</strong> Treats the Muscles and body pain</p>
              <p>
                <strong>Description:</strong> Say goodbye to aches, pains, and
                fatigue.
              </p>
              <p><strong>Price:</strong> 2,599 Rs.</p>
              <button className="remove-btn">
                <CiSquareRemove className="remove-icon" /> Remove
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Manageservice;
