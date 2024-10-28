'use client';
import React, { useState } from 'react';
import { FaArrowLeft, FaPlus } from 'react-icons/fa';
import './doctors.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faClipboardList, faBell, faUser } from '@fortawesome/free-solid-svg-icons';

interface Doctor {
  id: number;
  name: string;
  phone: string;
  imageUrl: string;
}

const doctors: Doctor[] = [
  { id: 1, name: 'Praveen', phone: '8975889945', imageUrl: 'https://via.placeholder.com/50' },
  { id: 2, name: 'Saigen', phone: '8855559789', imageUrl: 'https://via.placeholder.com/50' },
  { id: 3, name: 'Amelie', phone: '9658745558', imageUrl: 'https://via.placeholder.com/50' },
  { id: 4, name: 'Jaylen', phone: '9998885566', imageUrl: 'https://via.placeholder.com/50' }
];

const Doctors: React.FC = () => {
  const [selectedFooter, setSelectedFooter] = useState('home');

  const handleFooterClick = (footer: string) => {
    setSelectedFooter(footer);
  };

  return (
    <div className="doctors-container">
      <header className="doctors-header">
        <FaArrowLeft className="back-icon" />
        <h1>My Doctor's</h1>
        <button className="add-button">
          <FaPlus /> ADD
        </button>
      </header>

      <div className="doctor-list">
        <div className="doctor-headings">
          <p>Name</p>
          <p>Phone no</p>
        </div>
        
        {doctors.map((doctor) => (
          <div key={doctor.id} className="doctor-card">
            <img src={doctor.imageUrl} alt={doctor.name} className="doctor-image" />
            <div className="doctor-info">
              <p className="doctor-name">{doctor.name}</p>
              <p className="doctor-phone">{doctor.phone}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="doctors-footer">
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

export default Doctors;
