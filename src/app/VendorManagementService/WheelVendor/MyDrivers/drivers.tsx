'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowLeft, FaPlus } from 'react-icons/fa';
import './drivers.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faClipboardList, faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';

interface Driver {
  id: number;
  name: string;
  phone: string;
  imageUrl: string;
}

const Drivers: React.FC = () => {
  const [selectedFooter, setSelectedFooter] = useState('home');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDriver, setNewDriver] = useState({ name: '', email: '', phone: '', imageUrl: '' });
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const router = useRouter();

  const handleFooterClick = (footer: string) => {
    setSelectedFooter(footer);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setNewDriver({ name: '', email: '', phone: '', imageUrl: '' });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setNewDriver({
        ...newDriver,
        imageUrl: URL.createObjectURL(event.target.files[0])
      });
    }
  };

  const handleSave = async () => {
    try {
      // Send the POST request to the backend
      const response = await axios.post('http://localhost:8000/driverapp/drivers/create', {
        name: newDriver.name,
        email: newDriver.email,
        phone: newDriver.phone,
        profile_photo: newDriver.imageUrl // Ensure the backend handles this correctly
      });
  
      // Log the response or handle success
      console.log("Driver added successfully:", response.data);
  
      // Close the modal after saving
      closeModal();
  
      // Optionally, refresh the list of drivers
      fetchDrivers();
    } catch (error) {
      // Log the error instead of using console.error
      console.log("Error adding driver:", error);
    }
  };
  

  const fetchDrivers = async () => {
    try {
      const response = await axios.get('/driverapp/drivers/create');
      setDrivers(response.data);
    } catch (error) {
      // Log the error instead of using console.error
      console.log("Error fetching drivers:", error);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  return (
    <div className="drivers-container">
      <header className="drivers-header">
        <FaArrowLeft className="back-icon5" onClick={() => router.push('/VendorManagementService/Vendors/WheelVendor/Wheel')}/>
        <h1>My Drivers</h1>
        <button className="add-button" onClick={openModal}>
          <FaPlus /> ADD
        </button>
      </header>

      <div className="driver-list">
        <div className="driver-headings">
          <p>Name</p>
          <p>Phone no</p>
        </div>
        
        {drivers.map((driver) => (
          <div key={driver.id} className="driver-card">
            <img src={driver.imageUrl || 'https://via.placeholder.com/50'} alt={driver.name} className="driver-image" />
            <div className="driver-info">
              <p className="driver-name">{driver.name}</p>
              <p className="driver-phone">{driver.phone}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="drivers-footer">
        <div className={`footer-icon ${selectedFooter === 'home' ? 'selected' : ''}`} onClick={() => handleFooterClick('home')}>
          <FontAwesomeIcon icon={faHome} />
          <span>Home</span>
        </div>
        <div className={`footer-icon ${selectedFooter === 'bookings' ? 'selected' : ''}`} onClick={() => handleFooterClick('bookings')}>
          <FontAwesomeIcon icon={faClipboardList} />
          <span>Bookings</span>
        </div>
        <div className={`footer-icon ${selectedFooter === 'notifications' ? 'selected' : ''}`} onClick={() => handleFooterClick('notifications')}>
          <FontAwesomeIcon icon={faBell} />
          <span>Notifications</span>
        </div>
        <div className={`footer-icon ${selectedFooter === 'profile' ? 'selected' : ''}`} onClick={() => handleFooterClick('profile')}>
          <FontAwesomeIcon icon={faUser} />
          <span>Profile</span>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className="image-upload1">
              <label htmlFor="file-input">
                <img src={newDriver.imageUrl || 'https://via.placeholder.com/100'} alt="Driver" className="driver-modal-image" />
                <FaPlus className="plus-icon" />
              </label>
              <input id="file-input" type="file" onChange={handleImageUpload} style={{ display: 'none' }} />
            </div>
            <div className="modal-fields">
              <label>Name:</label>
              <input type="text" value={newDriver.name} onChange={(e) => setNewDriver({ ...newDriver, name: e.target.value })} />
              <label>Email:</label>
              <input type="text" value={newDriver.email} onChange={(e) => setNewDriver({ ...newDriver, email: e.target.value })} />
              <label>Phone Number:</label>
              <input type="text" value={newDriver.phone} onChange={(e) => setNewDriver({ ...newDriver, phone: e.target.value })} />
            </div>
            <div className="modal-footer">
              <button className="modal-close" onClick={closeModal}>Close</button>
              <button className="modal-save" onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Drivers;
