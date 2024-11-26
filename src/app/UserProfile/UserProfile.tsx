// UserProfile.js
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios'; // Import axios
import { FaBox } from 'react-icons/fa';
import { GoHome, GoShareAndroid } from "react-icons/go";
import { CiSearch, CiStar } from "react-icons/ci";
import { RxCalendar } from "react-icons/rx";
import { IoMdHelpCircleOutline } from 'react-icons/io';
import { BiMessageRoundedDetail } from 'react-icons/bi';
import { AiOutlineFileProtect } from 'react-icons/ai';
import { MdLogout } from 'react-icons/md';
import { IoIosArrowForward } from "react-icons/io";
import { IoPersonOutline, IoChevronBackSharp } from "react-icons/io5";
import { LiaHandshakeSolid } from "react-icons/lia";
import './UserProfile.css';

const UserProfile = () => {
  const router = useRouter();
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [activeFooter, setActiveFooter] = useState('');
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    profile_photo: '/images/profile.jpg',
  });
  const [isLoading, setIsLoading] = useState(true); // For loading state

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const userId = '1009917741782859777';
    try {
      const response = await axios.get(`http://127.0.0.1:8000/usmapp/usmapp-oxiusers/1009917741782859777/`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true, // Equivalent to credentials: 'include' in fetch
      });

      if (response.status === 200) {
        const data = response.data;
        setUserData({
          name: data.name,
          email: data.email,
          profile_photo: data.profile_photo || '/images/profile.jpg',
        });
      } else {
        console.error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  console.log (userData)
  const handleEditProfile = () => {
    const userDataString = encodeURIComponent(JSON.stringify(userData));
    router.push(`/UserProfile/UserInfo`);
  };

  const handleReferFriend = () => router.push('/UserProfile/ReferFriend');
  const handleFaq = () => router.push('/UserProfile/Faq');
  const handlePrivacy = () => router.push('/UserProfile/Privacy');
  const handleLogoutClick = () => setShowLogoutPopup(true);
  const handleCancelLogout = () => setShowLogoutPopup(false);
  const handleConfirmLogout = () => router.push('/logout');
  const handleBack = () => router.push('/Dashboard');

  const handleFooterClick = (iconName) => setActiveFooter(iconName);

  const handleProfileUpdate = async () => {
    await fetchUserData();
  };

  return (
    <div className="user-profile">
      <div className="back-button22" onClick={() => router.push('/DashBoard/HomePage')}>
        <IoChevronBackSharp size={24} />
      </div>

      <div className="profile-header9">
        <img className="profile-image" src={userData.profile_photo} alt="Profile" />
        <h2 className="profile-name">{userData.name}</h2>
        <p className="profile-email">{userData.email}</p>
        <button className="edit-profile-btn" onClick={handleEditProfile}>Edit Profile</button>
      </div>

      <div className="profile-menu">
        <p className='profile99'>Profile</p>
        <ul>
          <li>
            <div className="icon-container"><LiaHandshakeSolid size={20} /></div> 
            Register as a Partner
            <IoIosArrowForward style={{ marginLeft: 'auto' }} />
          </li>
          <li>
            <div className="icon-container"><FaBox size={20} /></div> 
            My Booking
            <IoIosArrowForward style={{ marginLeft: 'auto' }} />
          </li>
          <li>
            <div className="icon-container"><IoMdHelpCircleOutline size={20} /></div> 
            Help Center
            <IoIosArrowForward style={{ marginLeft: 'auto' }} />
          </li>
          <li onClick={handleReferFriend} style={{ cursor: 'pointer' }}>
            <div className="icon-container"><GoShareAndroid size={20} /></div> 
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

      {showLogoutPopup && (
        <div className="logout-popup">
          <div className="popup-content">
            <h1>Log out</h1>
            <p>Are you sure you want to logout?</p>
            <button className="logout-btn" onClick={handleConfirmLogout}>Yes, Logout</button>
            <button className="cancel-btn" onClick={handleCancelLogout}>Cancel</button>
          </div>
        </div>
      )}

      <div className="footer-section79">
        <div 
          className={`footer-icon ${activeFooter === 'home' ? 'active' : ''}`} 
          onClick={() => handleFooterClick('home')}
        >
          <GoHome size={28} />
          <span className="footer-header">Home</span>
        </div>
        <div 
          className={`footer-icon ${activeFooter === 'search' ? 'active' : ''}`} 
          onClick={() => handleFooterClick('search')}
        >
          <CiSearch size={24} />
          <span className="footer-header">Search</span>
        </div>
        <div 
          className={`footer-icon ${activeFooter === 'booking' ? 'active' : ''}`} 
          onClick={() => handleFooterClick('booking')}
        >
          <RxCalendar size={24} />
          <span className="footer-header">Booking</span>
        </div>
        <div 
          className={`footer-icon ${activeFooter === 'profile' ? 'active' : ''}`} 
          onClick={() => handleFooterClick('profile')}
        >
          <IoPersonOutline size={24} />
          <span className="footer-header">Profile</span>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
