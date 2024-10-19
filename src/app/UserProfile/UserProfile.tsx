'use client'; // This ensures the component runs on the client-side

import React, { useState } from 'react';
import './UserProfile.css';
import { useRouter } from 'next/navigation';
import { FaUser, FaMapMarkerAlt, FaHandshake, FaShareAlt } from 'react-icons/fa'; 
import { GoHome } from "react-icons/go";
import { CiSearch, CiStar } from "react-icons/ci";
import { RxCalendar } from "react-icons/rx";
import { IoMdHelpCircleOutline } from 'react-icons/io';
import { BiMessageRoundedDetail } from 'react-icons/bi';
import { AiOutlineFileProtect } from 'react-icons/ai';
import { MdLogout } from 'react-icons/md';
import { IoIosArrowForward } from "react-icons/io";

const UserProfile = () => {
  const router = useRouter();
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const handleEditProfile = () => {
    router.push('/UserProfile/UserInfo');
  };

  const handleReferFriend = () => {
    router.push('/UserProfile/ReferFriend');
  };

  const handleFaq = () => {
    router.push('/UserProfile/Faq');
  };

  const handlePrivacy = () => {
    router.push('/UserProfile/Privacy');
  };

  const handleLogoutClick = () => {
    setShowLogoutPopup(true);
  };

  const handleCancelLogout = () => {
    setShowLogoutPopup(false);
  };

  const handleConfirmLogout = () => {
    router.push('/logout');
  };

  return (
    <div className="user-profile">
      {/* Profile Header */}
      <div className="profile-header">
        <img
          className="profile-image"
          src="./images/profile.jpg"
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
    <div className="icon-container"><FaHandshake size={20} /></div> 
    Register as a Partner
    <IoIosArrowForward style={{ marginLeft: 'auto' }} />
  </li>
  <li>
    <div className="icon-container"><FaMapMarkerAlt size={20} /></div> 
    My Booking
    <IoIosArrowForward style={{ marginLeft: 'auto' }} />
  </li>
  <li>
    <div className="icon-container"><IoMdHelpCircleOutline size={20} /></div> 
    Help Center
    <IoIosArrowForward style={{ marginLeft: 'auto' }} />
  </li>
  <li>
    <div className="icon-container"><FaShareAlt size={20} /></div> 
    Share & Earn
    <IoIosArrowForward style={{ marginLeft: 'auto' }} />
  </li>
  <li>
    <div className="icon-container"><CiStar size={20} /></div> 
    Rate us
    <IoIosArrowForward style={{ marginLeft: 'auto' }} />
  </li>
  <li onClick={handleFaq} style={{ cursor: 'pointer' }}>
    <div className="icon-container"><BiMessageRoundedDetail size={20} /></div> 
    FAQ's
    <IoIosArrowForward style={{ marginLeft: 'auto' }} />
  </li>
  <li onClick={handlePrivacy} style={{ cursor: 'pointer' }}>
    <div className="icon-container"><AiOutlineFileProtect size={20} /></div> 
    Privacy Policy
    <IoIosArrowForward style={{ marginLeft: 'auto' }} />
  </li>
  <li onClick={handleLogoutClick}>
    <div className="icon-container"><MdLogout size={20} /></div> 
    Logout
    <IoIosArrowForward style={{ marginLeft: 'auto' }} />
  </li>
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
        <div className="footer-icon">
          <GoHome size={28} />
          <span className="footer-header">Home</span>
        </div>
        <div className="footer-icon">
          <CiSearch size={24} />
          <span className="footer-header">Search</span>
        </div>
        <div className="footer-icon">
          <RxCalendar size={24} />
          <span className="footer-header">Booking</span>
        </div>
        <div className="footer-icon">
          <FaUser size={24} />
          <span className="footer-header">Profile</span>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
