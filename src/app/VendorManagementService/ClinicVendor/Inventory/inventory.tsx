'use client';
import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaHome, FaBell, FaUser, FaCalendarAlt } from 'react-icons/fa';
import './inventory.css';
import { useRouter } from 'next/navigation';

const Inventory: React.FC = () => {
  const [selectedFooter, setSelectedFooter] = useState<string>('home');
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [inventoryItems, setInventoryItems] = useState<any[]>([]);
  const router = useRouter();

  // Fetch vendor_id from local storage
  const vendorId = typeof window !== 'undefined' ? localStorage.getItem('vendor_id') : null;

  // Fetch inventory data when the component mounts
  useEffect(() => {
    const getInventoryItems = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/inventory1/');
        if (response.ok) {
          const data = await response.json();
          setInventoryItems(data);
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

  const handleAddItemClick = () => {
    setShowPopup(true);
  };

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
    setInventoryItems(updatedItems);
  };

  const handleSave = async () => {
    if (!vendorId) {
      alert('Vendor ID not found. Please try again.');
      return;
    }
  
    const payload = inventoryItems
      .filter(item => item.quantity > 0)
      .map(item => ({
        product_name: item.product_name,
        stock: item.stock,
        product_image: item.product_image,
        request_quantity: item.quantity,
      }));
  
    if (payload.length === 0) {
      alert('No items with increased quantity to save.');
      return;
    }
  
    try {
      const response = await fetch('http://127.0.0.1:8000/api/inventory/save/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          vendor_id: vendorId,
          items: payload,
        }),
      });
  
      if (response.ok) {
        const result = await response.json();
        alert(result.message);
      } else {
        const errorData = await response.json();
        console.error('Failed to save inventory:', errorData);
        alert('Failed to save inventory.');
      }
    } catch (error) {
      console.error('Error saving inventory:', error);
      alert('An error occurred while saving inventory.');
    }
  };
  
  

  return (
    <div className="inventory-page">
      <header className="inventory-header">
        <FaArrowLeft
          className="back-arrow"
          onClick={() => router.push('/VendorManagementService/Vendors/WheelVendor/Clinic')}
        />
        <h1>Inventory</h1>
      </header>

      {!showPopup && (
        <div className="inventory-cards">
          <button className="add-items-button" onClick={handleAddItemClick}>
            Add items
          </button>
        </div>
      )}

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <div className="inventory-cards">
              {inventoryItems.map((item, index) => (
                <div className="inventory-card" key={index}>
                  <img
                    src={item.product_image || '/images/default.png'}
                    alt={item.product_name}
                    className="item-image"
                  />
                  <div className="item-details">
                    <h2>{item.product_name}</h2>
                    <p>
                      Stock: <span className="in-stock">{item.stock} in Stock</span>
                    </p>
                  </div>

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
            <button className="save-popup" onClick={handleSave}>
              Save
            </button>

            <button className="close-popup" onClick={handleClosePopup}>
              Close
            </button>
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
