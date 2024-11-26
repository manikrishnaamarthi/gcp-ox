'use client'
import React, { useState } from "react";
import "./Inventory.css";
import Sidebar from "../Sidebar/page";
import { FaStethoscope, FaThermometerFull, FaSyringe } from "react-icons/fa";
import { FaMaskFace } from "react-icons/fa6";
import { GiGloves } from "react-icons/gi";
import { IoBandage } from "react-icons/io5";

const Inventory = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleAddItemsClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="inventory-container">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="header">
          <h1>Recent Activity</h1>
          <input
            type="text"
            placeholder="Search"
            className="search-bar"
          />
        </header>

        {/* Summary Cards */}
        <div className="summary-cards">
          <div className="card">
            <p className="count">700</p>
            <p>Total</p>
            <span>NEW ITEMS</span>
          </div>
          <div className="card highlighted">
            <p className="count">4</p>
            <p>Vendors</p>
            <span>NEW MESSAGE</span>
          </div>
          <div className="card">
            <p className="count">1</p>
            <p>Vendor</p>
            <span>REFUNDS</span>
          </div>
        </div>

        {/* Content Section */}
        <div className="content-section">
          {/* Inventory Table */}
          <section className="inventory-table">
            <table>
              <thead>
                <tr>
                  <th>Sl.No</th>
                  <th>Product Name</th>
                  <th>Stock</th>
                  <th>Product Price</th>
                </tr>
              </thead>
              <tbody>
                {/* Example Data */}
                <tr>
                  <td>1</td>
                  <td>BP Monitor</td>
                  <td>95</td>
                  <td>1,599 Rs</td>
                </tr>
                {/* Add more rows as needed */}
              </tbody>
            </table>
          </section>

          {/* Categories and Stock Numbers */}
          <div className="side-panel">
            {/* Item Categories */}
            <div className="categories">
              <h2>Item Categories List</h2>
              <button className="view-all">View All</button>
              <div className="icons-grid">
                <div className="icon"><FaStethoscope /></div>
                <div className="icon"><FaSyringe /></div>
                <div className="icon"><IoBandage /></div>
                <div className="icon"><GiGloves /></div>
                <div className="icon"><FaMaskFace /></div>
                <div className="icon"><FaThermometerFull /></div>
              </div>
              <button
                className="add-items"
                onClick={handleAddItemsClick}
              >
                + Add Items
              </button>
            </div>

            {/* Stock Numbers */}
            <div className="stock-numbers">
              <h2>Stock Numbers</h2>
              <p>Low Stock Items: <span className="highlight">12</span></p>
              <p>Item Categories: <span className="highlight">9</span></p>
              <p>Refunded Items: <span className="highlight">2</span></p>
            </div>
          </div>
        </div>
      </main>

      {/* Popup */}
      {showPopup && (
        <div className="popup-overlay" onClick={handleClosePopup}>
          <div
            className="popup-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Add New Item</h2>
            <form>
              <label>
                Product Image:
                <input type="file" accept="image/*" />
              </label>
              <label>
                Product Name:
                <input type="text" placeholder="Enter product name" />
              </label>
              <label>
                Stock:
                <input type="number" placeholder="Enter stock" />
              </label>
              <label>
                Product Price:
                <input type="text" placeholder="Enter product price" />
              </label>
              <button type="submit">Add</button>
            </form>
            <button className="close-popup" onClick={handleClosePopup}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;
