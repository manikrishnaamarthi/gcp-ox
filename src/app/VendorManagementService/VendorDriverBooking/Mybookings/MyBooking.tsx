"use client"
import './MyBooking.css';
import React, { useState } from "react";
import { FaMapMarkerAlt } from 'react-icons/fa';
import { GoHome } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { RxCalendar } from "react-icons/rx";
import { BsPerson } from "react-icons/bs";

const MyBooking = () => {
  const currentDate = new Date();
  const [activeFooter, setActiveFooter] = useState('home');

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const handleCancelClick = () => {
    console.log('Booking cancelled');
  };

  const handleFooterIconClick = (icon: string) => {
    console.log(`${icon} clicked`);
  };

  const footerIconStyle = (icon: string) => {
    return {
      color: icon === 'home' ? '#000' : '#aaa',
    };
  };

  return (
    <div className='main-container'> 
    <div className="my-booking-container">
      <h1>My Bookings</h1>
      <div className="tabs">
        <span>Bookings</span>
        <span>Cancelled</span>
        <span>History</span>
      </div>

      <div className="booking-list">
        {[1, 2, 3].map((booking, index) => (
          <div key={index} className="booking-item">
            <div className="booking-details">
              <p className="name">Satyasai</p>
              <p className="location">Some Location</p>
              <p className="phone">+123 456 7890</p>
            </div>
            <button className="cancel-button" onClick={handleCancelClick}>Cancel</button>
            <div className="date">{formatDate(currentDate)}</div>
          </div>
        ))}
      </div>

      {/* Footer Section */}
      <div className="footer-section">
        <div className="footer-icon" style={footerIconStyle('home')} onClick={() => handleFooterIconClick('home')}>
          <GoHome size={24} />
          <span className="footer-header" style={{ color: footerIconStyle('home').color }}>Home</span>
        </div>
        <div className="footer-icon" style={footerIconStyle('search')} onClick={() => handleFooterIconClick('search')}>
          <CiSearch size={24} />
          <span className="footer-header" style={{ color: footerIconStyle('search').color }}>Search</span>
        </div>
        <div className="footer-icon" style={footerIconStyle('booking')} onClick={() => handleFooterIconClick('booking')}>
          <RxCalendar size={24} />
          <span className="footer-header" style={{ color: footerIconStyle('booking').color }}>Booking</span>
        </div>
        <div className="footer-icon" style={footerIconStyle('profile')} onClick={() => handleFooterIconClick('profile')}>
          <BsPerson size={28} />
          <span className="footer-header" style={{ color: footerIconStyle('profile').color }}>Profile</span>
        </div>
      </div>
    </div>
    </div>
  );
};

export default MyBooking;
