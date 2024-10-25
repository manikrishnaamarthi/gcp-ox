"use client";
import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { BsPersonAdd } from 'react-icons/bs'; // Importing the new icon
import './Profilephoto.css';

const ProfilePhoto: React.FC = () => {
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const fileURL = URL.createObjectURL(file);
      setProfileImage(file);
      setProfilePreview(fileURL);
    }
  };

  const handleSubmit = () => {
    if (profileImage) {
      console.log('Profile Image:', profileImage);
      alert('Profile photo uploaded successfully!');
    } else {
      alert('Please upload your profile photo');
    }
  };

  return (
    <div className="container">
      <div className="back-arrow">
        <FiArrowLeft className="arrow-icon" />
      </div>

      <h1 className="header">Profile Photo</h1>

      <p className="instruction">
        Make sure your photo is entirely visible, glare-free and not blurred.
      </p>

      <div className="profileImageContainer">
        <label htmlFor="upload-profile" className="uploadLabel">
          {profilePreview ? (
            <img src={profilePreview} alt="Profile Preview" className="profileImage" />
          ) : (
            <div className="imagePlaceholder">
              <BsPersonAdd className="personAddIcon" /> {/* New icon */}
            </div>
          )}
        </label>
        <input
          id="upload-profile"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="inputFile"
        />
      </div>

      <button className="submitButton" onClick={handleSubmit}>
        Done
      </button>
    </div>
  );
};

export default ProfilePhoto;