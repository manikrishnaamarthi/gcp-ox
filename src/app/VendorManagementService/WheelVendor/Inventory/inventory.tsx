'use client';
import React, { useState } from 'react';
import { FaArrowLeft, FaHome, FaBell, FaUser, FaCalendarAlt } from 'react-icons/fa';
import './inventory.css'
import { useRouter } from 'next/navigation';

const Inventory: React.FC = () => {
  const [selectedFooter, setSelectedFooter] = useState<string>('home'); // Add typing for state
  const router = useRouter();

  const handleFooterClick = (footer: string) => {
    setSelectedFooter(footer); // Update selected footer when clicked
  };

  return (
    <div className="inventory-page">
      <header className="inventory-header">
        <FaArrowLeft className="back-arrow"  onClick={() => router.push('/VendorManagementService/Vendors/WheelVendor/Wheel')}/>
        <h1>Inventory</h1>
      </header>

      <div className="inventory-cards">
        <div className="inventory-card">
          <img src="/images/mask.png" alt="Mask" className="item-image" />
          <div className="item-details">
            <h2>Mask</h2>
            <p>Stock: <span className="in-stock">10 in Stock</span></p>
          </div>
        </div>
        <div className="inventory-card">
          <img src="/images/gloves.png" alt="Gloves" className="item-image" />
          <div className="item-details">
            <h2>Gloves</h2>
            <p>Stock: <span className="in-stock">12 in Stock</span></p>
          </div>
        </div>
        <div className="inventory-card">
          <img src="/images/oxygen-cylinder.png" alt="Oxygen Cylinder" className="item-image" />
          <div className="item-details">
            <h2>Oxygen Cylinder</h2>
            <p>Stock: <span className="in-stock">2 in Stock</span></p>
          </div>
        </div>
        <button className="add-items-button">Add items</button>
      </div>

      

      <div className="footer">
        <div
          className={`footer-icon ${selectedFooter === 'home' ? 'selected' : ''}`}
          onClick={() => handleFooterClick('home')}
        >
          <FaHome />
          <span>Home</span>
        </div>
        <div
          className={`footer-icon ${selectedFooter === 'bookings' ? 'selected' : ''}`}
          onClick={() => handleFooterClick('bookings')}
        >
          <FaCalendarAlt />
          <span>Bookings</span>
        </div>
        <div
          className={`footer-icon ${selectedFooter === 'notifications' ? 'selected' : ''}`}
          onClick={() => handleFooterClick('notifications')}
        >
          <FaBell />
          <span>Notifications</span>
        </div>
        <div
          className={`footer-icon ${selectedFooter === 'profile' ? 'selected' : ''}`}
          onClick={() => handleFooterClick('profile')}
        >
          <FaUser />
          <span>Profile</span>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
