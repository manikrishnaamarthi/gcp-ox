'use client';
import React, { useState, useRef } from 'react';
import './profile.css';
import { FaCamera, FaArrowLeft, FaTimes, FaHome, FaBell, FaUser, FaCalendarAlt, FaPlusCircle, FaEdit } from 'react-icons/fa';

const Profile: React.FC = () => {
  const [selectedFooter, setSelectedFooter] = useState('home');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState('/path-to-profile-image.jpg'); // Initial profile image
  const [oxiImage1, setOxiImage1] = useState(''); // State for first Oxi Upload image
  const [oxiImage2, setOxiImage2] = useState(''); // State for second Oxi Upload image
  const [isEditing, setIsEditing] = useState(false); // Toggle editing mode
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Reference for profile image file input
  const oxiFileInputRef1 = useRef<HTMLInputElement | null>(null); // Reference for first Oxi Upload input
  const oxiFileInputRef2 = useRef<HTMLInputElement | null>(null); // Reference for second Oxi Upload input

  const handleFooterClick = (icon: string) => {
    setSelectedFooter(icon);
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing); // Toggle edit mode
  };

  const handleCameraClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger profile image file input click
    }
  };

  const handleOxiUploadClick = (inputRef: React.RefObject<HTMLInputElement>) => {
    if (inputRef.current) {
      inputRef.current.click(); // Trigger Oxi Upload file input click
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string); // Update the image with the uploaded file
      };
      reader.readAsDataURL(file); // Read the image file as a data URL for preview
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <FaArrowLeft className="arrow-icon" />
        <h2 className="profile-title">Profile</h2>
        <FaEdit
          className="edit-icon"
          onClick={handleEditClick}
          style={{ color: 'red', fontSize: '20px', cursor: 'pointer' }}
        /> {/* Red edit icon in the top-right */}
      </div>

      {/* Profile Image Section */}
      <div className="profile-image-section">
        <div className="profile-image-wrapper">
          <img className="profile-image" src={profileImage} alt="Profile" />
          <FaCamera className="camera-icon" onClick={handleCameraClick} />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={(e) => handleFileChange(e, setProfileImage)}
          />
        </div>
      </div>

      <div className="profile-info">
        <div className="input-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter your Name"
            disabled={!isEditing} // Enable only in edit mode
          />
        </div>
        <div className="input-group email-group">
          <label htmlFor="email">Email</label>
          <div className="email-input-wrapper">
            <input
              type="email"
              id="email"
              placeholder="Enter your gmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!isEditing} // Enable only in edit mode
            />
            {email && isEditing && (
              <FaTimes
                className="clear-icon"
                onClick={() => setEmail('')}
                style={{ color: 'red' }}
              />
            )}
          </div>
        </div>
        <div className="input-group">
          <label htmlFor="mobile">Mobile Number</label>
          <input
            type="text"
            id="mobile"
            placeholder="Enter your mobile number"
            disabled={!isEditing} // Enable only in edit mode
          />
        </div>

        {/* Oxi Upload Section */}
        <div className="oxi-upload-section">
          <div className="oxi-upload-container" onClick={() => handleOxiUploadClick(oxiFileInputRef1)}>
            <FaPlusCircle className="plus-icon" style={{ color: 'red', fontSize: '24px' }} />
            {oxiImage1 ? (
              <img src={oxiImage1} alt="Oxi Upload 1" className="oxi-upload-image" />
            ) : (
              <div className="oxi-upload">
                <span>Oxi Upload 1</span>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              ref={oxiFileInputRef1}
              style={{ display: 'none' }}
              onChange={(e) => handleFileChange(e, setOxiImage1)}
            />
          </div>
          <div className="oxi-upload-container" onClick={() => handleOxiUploadClick(oxiFileInputRef2)}>
            <FaPlusCircle className="plus-icon" style={{ color: 'red', fontSize: '24px' }} />
            {oxiImage2 ? (
              <img src={oxiImage2} alt="Oxi Upload 2" className="oxi-upload-image" />
            ) : (
              <div className="oxi-upload">
                <span>Oxi Upload 2</span>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              ref={oxiFileInputRef2}
              style={{ display: 'none' }}
              onChange={(e) => handleFileChange(e, setOxiImage2)}
            />
          </div>
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
