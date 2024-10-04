import React from 'react';
import './Account.css';

const Account: React.FC = () => {
  return (
    <div className="account-container">
      <header className="account-header">
        <button className="back-button">←</button>
        <h2>My information</h2>
        <button className="notification-button">🔔</button>
      </header>

      <div className="account-profile">
        <img
          src="/path/to/profile-image.jpg" // Replace with the correct image path
          alt="Profile"
          className="profile-image"
        />
        <h3 className="profile-name">Amanda Roy</h3>
      </div>

      <div className="account-options">
        <div className="option-item">
          <span className="option-icon">🏠</span>
          <span>Change Address</span>
          <span className="option-arrow">➔</span>
        </div>
        <div className="option-item">
          <span className="option-icon">✉️</span>
          <span>Change Email</span>
          <span className="option-arrow">➔</span>
        </div>
        <div className="option-item">
          <span className="option-icon">🔒</span>
          <span>Change Password</span>
          <span className="option-arrow">➔</span>
        </div>
        <div className="option-item">
          <span className="option-icon">📞</span>
          <span>Change Phone Number</span>
          <span className="option-arrow">➔</span>
        </div>
        <div className="option-item">
          <span className="option-icon">💳</span>
          <span>Payment Method</span>
          <span className="option-arrow">➔</span>
        </div>
      </div>
    </div>
  );
};

export default Account;
