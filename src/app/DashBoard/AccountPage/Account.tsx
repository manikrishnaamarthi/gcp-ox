// Account.tsx

"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import './Account.css';
import { FaUser, FaBell, FaLifeRing, FaCog, FaSignOutAlt, FaHome } from 'react-icons/fa';
import { BiSolidGrid, BiListUl } from 'react-icons/bi';

const Account: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const router = useRouter();
  // Footer navigation handlers
  const goToHome = () => {
    router.push('/DashBoard/HomePage'); // Replace with the correct path for Home page
  };

  const goToServices = () => {
    router.push('/DashBoard/ServicesPage'); // Replace with the correct path for Services page
  };

  const goToActivity = () => {
    router.push('/DashBoard/ActivityPage'); // Replace with the correct path for Activity page
  };

  const goToAccount = () => {
    router.push('/DashBoard/AccountPage'); // Replace with the correct path for Profile page
  };

  const handleProfileImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setProfileImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="account-page">
      <h1 className="account-title">Oxivive Account</h1>
      <div className="account-container">
        <div className="profile-section">
          <label htmlFor="profile-image-input">
            <img
              src={profileImage || 'https://via.placeholder.com/150'}
              alt="Profile"
              className="profile-image"
            />
          </label>
          <input
            type="file"
            id="profile-image-input"
            accept="image/*"
            onChange={handleProfileImageChange}
            style={{ display: 'none' }}
          />
          <span className="profile-name">John Doe</span>
        </div>

        <div className="settings-container">
          <div className="setting-item">
            <FaUser className="setting-icon" />
            <span>Profile</span>
          </div>

          <div className="setting-item">
            <FaBell className="setting-icon" />
            <span>Notification</span>
          </div>

          <div className="setting-item">
            <FaLifeRing className="setting-icon" />
            <span>Support</span>
          </div>

          <div className="setting-item">
            <FaCog className="setting-icon" />
            <span>Reset Password</span>
          </div>

          <div className="setting-item">
            <FaSignOutAlt className="setting-icon" />
            <span>Logout</span>
          </div>
        </div>

        <div className="footer-section">

        <div className="footer-icon" onClick={goToHome}>
            <FaHome size={32} />
            <p className="footer-header">Home</p>
          </div>

          

          
          <div className="footer-icon" onClick={goToServices}>
            <BiSolidGrid size={32} />
            <p className="footer-header">Services</p>
          </div>
         

          <div className="footer-icon" onClick={goToActivity}>
            <BiListUl size={32} />
            <p className="footer-header">Activity</p>
          </div>

         
          <div className="footer-icon" onClick={goToAccount}>
            <FaUser size={32} />
            <p className="footer-header">Profile</p>
          </div>

          

         

          




        </div>


      </div>
    </div>
  );
};

export default Account;
