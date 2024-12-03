'use client';
import React, { useState } from 'react';
import './Logout.css';

const Logout = () => {
  const [showModal, setShowModal] = useState(false);

  const handleLogoutClick = () => {
    setShowModal(true);
  };

  const handleConfirmLogout = () => {
    // Add your logout logic here (e.g., clear session, redirect)
    console.log('User logged out');
    setShowModal(false);
  };

  const handleCancelLogout = () => {
    setShowModal(false);
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img
          src="/path/to/profile-picture.jpg"
          alt="Profile"
          className="profile-picture"
        />
        <h2>Alfredo Ross</h2>
        <p>syalfreelance@gmail.com</p>
        <button className="edit-profile-button">Edit Profile</button>
      </div>

      <div className="profile-options">
        <div className="profile-option">Register as a Partner</div>
        <div className="profile-option">My Booking</div>
        <div className="profile-option">Help Center</div>
        <div className="profile-option logout-button" onClick={handleLogoutClick}>
          Log out
        </div>
      </div>

      {showModal && (
  <div className={`logout-modal ${showModal ? 'show' : ''}`}>
    <div className="logout-modal-content">
      <h3>Log out</h3>
      <p>Are you sure you want to log out?</p>
      <div className="logout-buttons">
        <button className="confirm-button" onClick={handleConfirmLogout}>
           Logout
        </button>
        <button className="cancel-button" onClick={handleCancelLogout}>
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default Logout;
