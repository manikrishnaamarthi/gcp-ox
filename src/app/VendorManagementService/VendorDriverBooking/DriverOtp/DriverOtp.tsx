"use client"
import React, { useState } from 'react';
import './DriverOtp.css';
import { SlHome } from "react-icons/sl";
import { IoNotificationsOutline } from "react-icons/io5";
import { BsPerson } from "react-icons/bs";
import { LuBookPlus } from "react-icons/lu";

const DriverOtp = () => {
  return (
    <div className="container">
      <header className="header">
        <h1 className="title">
            <span className="welcome">Enter OTP to Start</span>
            <span className="oxiwheel">Please enter the 5-OTP sent to the customer</span>
        </h1>
        
      </header>

      <div className="main">
       
          
          
        
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
