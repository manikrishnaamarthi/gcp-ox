"use client";
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faClipboardList, faBell, faUser, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './invoice.css';
import { useRouter } from 'next/navigation';

const InvoicePage: React.FC = () => {
  // State to track the selected footer icon
  const [selectedFooter, setSelectedFooter] = useState('home');
  const [selectedTab, setSelectedTab] = useState('invoice'); // State to track selected tab
  const router = useRouter();

  // Function to handle footer icon click
  const handleFooterClick = (footer: string) => {
    setSelectedFooter(footer);
  };

  // Function to handle tab click
  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <div className="invoice-containerz">
      {/* Header Section */}
      <div className="header">
        <button className="back-button" onClick={() => router.push('/VendorManagementService/Vendors/WheelVendor/Wheel')}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <h1 className="title">Invoice</h1>
      </div>

      {/* Tab Navigation */}
      <div className="tabs">
        <div
          className={`tab ${selectedTab === 'invoice' ? 'active' : ''}`}
          onClick={() => handleTabClick('invoice')}
        >
          Invoice
        </div>
        <div
          className={`tab ${selectedTab === 'history' ? 'active' : ''}`}
          onClick={() => handleTabClick('history')}
        >
          History
        </div>
      </div>

      {/* Card Section - All inside a single gray card */}
      <div className="new-invoice-cardz">
        <div className="cards">
          <div className="invoice-card">
            <div className="invoice-info">
              <p className="invoice-title">Wheel rent</p>
              <p className="invoice-date">25 Sept 2024</p>
            </div>
            <div className="invoice-price">
              <p className="price">Rs 19955</p>
              <span className="status paid">Paid</span>
            </div>
          </div>
          <div className="invoice-card">
            <div className="invoice-info">
              <p className="invoice-title">Wheel rent</p>
              <p className="invoice-date">25 Sept 2024</p>
            </div>
            <div className="invoice-price">
              <p className="price">Rs 1562</p>
              <span className="status paid">Paid</span>
            </div>
          </div>
          <div className="invoice-cards">
            <div className="invoice-info">
              <p className="invoice-title">Wheel maintenance</p>
              <p className="invoice-date">25 Sept 2024</p>
            </div>
            <div className="invoice-price">
              <p className="price">Rs 39999</p>
              <span className="status unpaid">UnPaid</span>
            </div>
          </div>
        </div>

        {/* New Invoice Button */}
        <button className="new-invoice-buttons">New Invoice</button>
      </div>

      {/* Footer */}
      <div className="footerd">
        <div
          className={`footer-icon ${selectedFooter === 'home' ? 'selected' : ''}`}
          onClick={() => handleFooterClick('home')}
        >
          <FontAwesomeIcon icon={faHome} />
          <span>Home</span>
        </div>
        <div
          className={`footer-icon ${selectedFooter === 'bookings' ? 'selected' : ''}`}
          onClick={() => handleFooterClick('bookings')}
        >
          <FontAwesomeIcon icon={faClipboardList} />
          <span>Bookings</span>
        </div>
        <div
          className={`footer-icon ${selectedFooter === 'notifications' ? 'selected' : ''}`}
          onClick={() => handleFooterClick('notifications')}
        >
          <FontAwesomeIcon icon={faBell} />
          <span>Notifications</span>
        </div>
        <div
          className={`footer-icon ${selectedFooter === 'profile' ? 'selected' : ''}`}
          onClick={() => handleFooterClick('profile')}
        >
          <FontAwesomeIcon icon={faUser} />
          <span>Profile</span>
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;
