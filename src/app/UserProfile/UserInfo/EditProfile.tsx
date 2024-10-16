'use client';
import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './EditProfile.css'; 

const EditProfile = () => {
  const [name, setName] = useState('Gnanendra');
  const [email, setEmail] = useState('Gnanendra@gmail.com');
  const [mobile, setMobile] = useState('+91 1234567890');
  const [bio, setBio] = useState('-----------');
  const [profileImage, setProfileImage] = useState('/images/profile.jpg');

  const handleSave = () => {
    console.log('Profile Saved');
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    document.getElementById('profileImageInput').click();
  };

  return (
    <div className="edit-profile">
      <header className="edit-profile-header">
        <span className="close-btn">Close</span>
        <h2>Edit Profile</h2>
        <span className="save-btn" onClick={handleSave}>Save</span>
      </header>

      <div className="edit-profile-content">
        <div className="profile-image-container">
          <img
            src={profileImage} 
            alt="Profile"
            className="profile-image"
          />
        </div>

        {/* Camera Icon */}
        <div className="camera-icon-container" onClick={triggerFileInput}>
          <i className="fas fa-camera camera-icon"></i> {/* Font Awesome Camera Icon */}
        </div>

        {/* Hidden File Input */}
        <input
          type="file"
          id="profileImageInput"
          style={{ display: 'none' }}
          accept="image/*"
          onChange={handleImageChange}
        />

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email ID</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled
          />
        </div>

        <div className="form-group">
          <label htmlFor="mobile">Mobile number</label>
          <input
            type="text"
            id="mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            disabled
          />
        </div>

        <div className="form-group">
          <label htmlFor="bio">Bio</label>
          <input
            type="text"
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>

        <button className="save-profile-btn" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default EditProfile;
