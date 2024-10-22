'use client';
import React, { useState, useRef } from 'react';
import './profile.css';
import { FaCamera, FaArrowLeft, FaTimes, FaHome, FaBell, FaUser, FaCalendarAlt } from 'react-icons/fa';

const Profile: React.FC = () => {
  const [selectedFooter, setSelectedFooter] = useState('home');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState('/path-to-profile-image.jpg'); // Initial profile image
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Reference to the hidden file input

  const handleFooterClick = (icon: string) => {
    setSelectedFooter(icon);
  };

  const handleCameraClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Programmatically click the hidden file input
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string); // Update the profile image with the uploaded file
      };
      reader.readAsDataURL(file); // Read the image file as a data URL for preview
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <FaArrowLeft className="arrow-icon" />
        <h2 className="profile-title">Profile</h2> {/* Centered Profile heading */}
      </div>

      {/* Profile Image Section */}
      <div className="profile-image-section">
        <div className="profile-image-wrapper">
          <img className="profile-image" src={profileImage} alt="Profile" /> {/* Display the selected image */}
          <FaCamera className="camera-icon" onClick={handleCameraClick} /> {/* Click to trigger file input */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}  // Hidden file input
            onChange={handleFileChange}
          />
        </div>
      </div>

      <div className="profile-info">
        <div className="input-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" placeholder="Enter your name" />
        </div>
        <div className="input-group email-group">
          <label htmlFor="email">Email</label>
          <div className="email-input-wrapper">
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {email && (
              <FaTimes
                className="clear-icon"
                onClick={() => setEmail('')}
                style={{ color: 'red' }}  // Red X button for clearing email
              />
            )}
          </div>
        </div>
        <div className="input-group">
          <label htmlFor="mobile">Mobile Number</label>
          <input type="text" id="mobile" placeholder="Enter your mobile number" />
        </div>
        <div className="input-group">
          <label htmlFor="bio">Bio</label>
          <input type="text" id="bio" placeholder="Tell something about yourself" />
        </div>
        <div className="input-group">
          <label htmlFor="time">Time</label>
          <div className="time-boxes">
            <div className="time-box">10:00 PM</div>
            <div className="time-box">12:00 PM</div>
            <div className="time-box">05:00 AM</div>
            <div className="time-box">10:00 AM</div>
          </div>
        </div>
      </div>

      {/* Footer with icons */}
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

export default Profile;
