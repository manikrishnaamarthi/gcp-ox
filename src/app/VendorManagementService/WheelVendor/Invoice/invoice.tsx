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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState<{ id: number; name: string; price: string }[]>([]);
  const [savedItems, setSavedItems] = useState<{ id: number; name: string; price: string }[]>([]);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const router = useRouter();

  // Function to handle footer icon click
  const handleFooterClick = (footer: string) => {
    setSelectedFooter(footer);
  };

  // Function to handle tab click
  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
  };


  const handleAddItem = () => {
    setItems([...items, { id: items.length, name: '', price: '' }]);
  };

  const handleItemChange = (id: number, field: string, value: string) => {
    const updatedItems = items.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    );
    setItems(updatedItems);
  };

  const handleSave = () => {
    // Save current items and reset input fields
    setSavedItems([...savedItems, ...items]);
    setItems([]);
  };


  return (
    <div className="invoice-container6">
      {/* Header Section */}
      <div className="header9">
        <button className="back-button1" onClick={() => router.push('/VendorManagementService/Vendors/WheelVendor/Wheel')}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <h1 className="title">Invoice</h1>
      </div>

      {/* Tab Navigation */}
      <div className="tabsp">
        <div
          className={`tab1 ${selectedTab === 'invoice' ? 'active' : ''}`}
          onClick={() => handleTabClick('invoice')}
        >
          Invoice
        </div>
        <div
          className={`tab1 ${selectedTab === 'history' ? 'active' : ''}`}
          onClick={() => handleTabClick('history')}
        >
          History
        </div>
      </div>

      {/* Card Section - All inside a single gray card */}
      <div className="new-invoice-card1">
        <div className="cards0">
          <div className="invoice-cards">
            <div className="invoice-info">
              <p className="invoice-title">Wheel rent</p>
              <p className="invoice-date">25 Sept 2024</p>
            </div>
            <div className="invoice-price">
              <p className="price">Rs 19955</p>
              <span className="status paid">Paid</span>
            </div>
          </div>
          <div className="invoice-cards">
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
        <button className="new-invoice-buttons" onClick={toggleModal}>New Invoice</button>
      </div>

      {isModalOpen && (
  <div className="modal">
    <div className="modal-content">
      <h2>Create New Invoice</h2>

      {/* Add Item Button */}
      <button className="add-item-button" onClick={handleAddItem}>
        Add Item
      </button>

      {/* Raise Claim Button */}
      <button className="raise-claim-button" onClick={() => alert("Claim raised!")}>
       Raise Claim
      </button>

      {/* Dynamic Input Fields */}
      <div className="items-container">
        {items.map(item => (
          <div key={item.id} className="item-row">
            <input
              type="text"
              placeholder="Item Name"
              value={item.name}
              onChange={e => handleItemChange(item.id, 'name', e.target.value)}
            />
            <input
              type="text"
              placeholder="Item Price"
              value={item.price}
              onChange={e => handleItemChange(item.id, 'price', e.target.value)}
            />
          </div>
        ))}
      </div>
      {/* Saved Items Section */}
      {savedItems.length > 0 && (
              <div className="saved-items">
                <h3>Saved Items</h3>
                {savedItems.map(item => (
                  <div key={item.id} className="item-row">
                    <p>{item.name}</p>
                    <p>{item.price}</p>
                  </div>
                ))}
              </div>
            )}

      {/* Save Button */}
      <button className="save-button" onClick={handleSave}>
        Save
      </button>

      {/* Close Modal */}
      <button className="close-modal" onClick={toggleModal}>
        Close
      </button>
    </div>
  </div>
)}


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
