'use client';
import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaHome, FaBell, FaUser, FaCalendarAlt } from 'react-icons/fa';
import './inventory.css';
import { useRouter } from 'next/navigation';

const Inventory: React.FC = () => {
  const [selectedFooter, setSelectedFooter] = useState<string>('home');
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [inventoryItems, setInventoryItems] = useState<any[]>([]); // To hold fetched items
  const router = useRouter();

  // Fetch inventory data when the component mounts
  useEffect(() => {
    const getInventoryItems = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/inventory1/'); // Assuming the backend API is running at /api/inventory/
        if (response.ok) {
          const data = await response.json();
          setInventoryItems(data); // Update state with fetched data, adding a quantity field
        } else {
          console.error('Error fetching inventory items:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching inventory items:', error);
      }
    };
    getInventoryItems();
  }, []);

  const handleFooterClick = (footer: string) => {
    setSelectedFooter(footer);
  };

  // Function to handle Add Item button click and show the popup
  const handleAddItemClick = () => {
    setShowPopup(true); // Show the popup
  };

  // Function to close the popup
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleQuantityChange = (index: number, action: 'increase' | 'decrease') => {
    const updatedItems = [...inventoryItems];
    if (action === 'increase') {
      updatedItems[index].quantity = (updatedItems[index].quantity || 0) + 1;
    } else if (action === 'decrease' && updatedItems[index].quantity > 0) {
      updatedItems[index].quantity = updatedItems[index].quantity - 1;
    }
    setInventoryItems(updatedItems); // Update state with modified quantity
  };

  return (
    <div className="inventory-page">
      <header className="inventory-header">
        <FaArrowLeft className="back-arrow" onClick={() => router.push('/VendorManagementService/Vendors/WheelVendor/Clinic')} />
        <h1>Inventory</h1>
      </header>

      {/* Add Item Button, visible initially */}
      {!showPopup && (
        <div className="inventory-cards">
          <button className="add-items-button" onClick={handleAddItemClick}>Add items</button>
        </div>
      )}

      {/* Popup to show item details */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            {/* <h2>Add Item</h2> */}
            <div className="inventory-cards">
              {inventoryItems.map((item, index) => (
                <div className="inventory-card" key={index}>
                  <img src={item.product_image || '/images/default.png'} alt={item.product_name} className="item-image" />
                  <div className="item-details">
                    <h2>{item.product_name}</h2>
                    <p>Stock: <span className="in-stock">{item.stock} in Stock</span></p>
                  </div>

                  {/* Counter Box */}
                  <div className="quantity-box">
              <button
                className="quantity-button"
                onClick={() => handleQuantityChange(index, 'decrease')}
              >
                -
              </button>
              <span className="quantity-display">{item.quantity || 0}</span>
              <button
                className="quantity-button"
                onClick={() => handleQuantityChange(index, 'increase')}
              >
                +
              </button>
            </div>
                </div>
              ))}
            </div>
            <button className="close-popup" onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}

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
