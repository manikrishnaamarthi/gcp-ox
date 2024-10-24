"use client"
import React, { useState } from 'react';
import './DriverOtp.css';
import { SlHome } from "react-icons/sl";
import { IoNotificationsOutline } from "react-icons/io5";
import { BsPerson } from "react-icons/bs";
import { LuBookPlus } from "react-icons/lu";

const DriverOtp = () => {
  const [otp, setOtp] = useState(['', '', '', '', '']);

  const handleChange = (element, index) => {
    const value = element.value;
    if (/^\d$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Focus next input
      if (element.nextSibling) {
        element.nextSibling.focus();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Submitted OTP: ${otp.join('')}`);
  };

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">
          <span className="welcome">Enter OTP to Start</span>
          <span className="oxiwheel">Please enter the 5-digit OTP sent to <br></br>the customer</span>
        </h1>
      </header>

      <div className="main">
        <form onSubmit={handleSubmit} className="otp-form">
          <div className="otp-inputs">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                className="otp-input"
                value={otp[index]}
                onChange={(e) => handleChange(e.target, index)}
                onFocus={(e) => e.target.select()}
              />
            ))}
          </div>
          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>

      <footer className="footer">
        <div className="footerItem">
          <SlHome className="footerIcon" />
          <p>Home</p>
        </div>
        <div className="footerItem">
          < LuBookPlus className="footerIcon" />
          <p>Booking</p>
        </div>
        <div className="footerItem">
          <IoNotificationsOutline className="footerIcon" />
          <p>Notification</p>
        </div>
        <div className="footerItem">
          <BsPerson className="footerIcon" />
          <p>Profile</p>
        </div>
      </footer>
    </div>
  );
};

export default DriverOtp;
