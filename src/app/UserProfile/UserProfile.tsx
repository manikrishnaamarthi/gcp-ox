'use client'; // This ensures the component runs on the client-side

import React, { useState } from 'react';
import './UserProfile.css';
import { useRouter } from 'next/navigation';
import { FaUser,  FaMapMarkerAlt } from 'react-icons/fa';
import { GoHome } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { RxCalendar } from "react-icons/rx";

const UserProfile = () => {
  const router = useRouter();
  const [showLogoutPopup, setShowLogoutPopup] = useState(false); // State to handle popup visibility

  const handleEditProfile = () => {
    router.push('/UserProfile/UserInfo'); // Ensure this path exists
  };

  const handleReferFriend = () => {
    router.push('/UserProfile/ReferFriend'); // Ensure this path exists
  };

  const handleFaq = () => {
    router.push('/UserProfile/Faq'); // Ensure this path exists
  };

  const handlePrivacy = () => {
    router.push('/UserProfile/Privacy'); // Ensure this path exists
  };

  const handleLogoutClick = () => {
    setShowLogoutPopup(true); // Show the logout confirmation popup
  };

  const handleCancelLogout = () => {
    setShowLogoutPopup(false); // Hide the logout confirmation popup
  };

  const handleConfirmLogout = () => {
    // Add your logout functionality here (e.g., clearing session, redirecting)
    router.push('/logout'); // Example logout route, replace as needed
  };

  return (
    <div className="user-profile">
      {/* Profile Header */}
      <div className="profile-header">
        <img
          className="profile-image"
          src="./images/profile.jpg" // Replace with dynamic image or URL
          alt="Profile"
        />
        <h2 className="profile-name">Gnanendra</h2>
        <p className="profile-email">Gnanendra@gmail.com</p>
        <button className="edit-profile-btn" onClick={handleEditProfile}>
          Edit Profile
        </button>
      </div>

      {/* Profile Menu */}
      <div className="profile-menu">
        <p className='profile'>Profile</p>
        <ul>
          <li onClick={handleReferFriend} style={{ cursor: 'pointer' }}>
            <i className="icon register-icon"></i> Register as a Partner
          </li>
          <li><i className="icon booking-icon"></i> My Booking</li>
          <li><i className="icon help-icon"></i> Help Center</li>
          <li><i className="icon share-icon"></i> Share & Earn</li>
          <li><i className="icon rate-icon"></i> Rate us</li>
          <li onClick={handleFaq} style={{ cursor: 'pointer' }}><i className="icon faq-icon"></i> FAQ's</li>
          <li onClick={handlePrivacy} style={{ cursor: 'pointer' }}><i className="icon privacy-icon"></i> Privacy Policy</li>
          <li onClick={handleLogoutClick}><i className="icon logout-icon"></i> Logout</li>
        </ul>
      </div>

      {/* Logout Confirmation Popup */}
      {showLogoutPopup && (
        <div className="logout-popup">
          <div className="popup-content">
            <p>Are you sure you want to logout?</p>
            <button className="logout-btn" onClick={handleConfirmLogout}>Yes, Logout</button>
            <button className="cancel-btn" onClick={handleCancelLogout}>Cancel</button>
          </div>
        </div>
      )}

      {/* Footer Navigation */}
      <div className="footer-section">
        <div className="footer-icon" >
          <GoHome size={28} />
          <span className="footer-header">Home</span>
        </div>
        <div className="footer-icon"  >
          <CiSearch size={24} />
          <span className="footer-header">Search</span>
        </div>
        <div className="footer-icon" >
          <RxCalendar size={24} />
          <span className="footer-header">Booking</span>
        </div>
        <div className="footer-icon" >
          <FaUser size={24} />
          <span className="footer-header">Profile</span>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
