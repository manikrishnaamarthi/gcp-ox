'use client'
import React, { useState } from 'react';
import './AccountPage.css';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUser } from 'react-icons/fa';

const AccountPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false); // Set to false to show login page by default

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container">
      <div className="leftSection">
        <div className="circleBackground">
          <div className="logoContainer">
            <img src="/images/shot(1).png" alt="Oxivive Logo" className="logo" />
            <h1 className="brand">Oxivive</h1>
          </div>
        </div>

        <p className="tagline">Where Science Meets Technology</p>
        <p className="description">
          At Oxivive, we're not just slowing down the aging process – we're smashing the clock and unlocking your body’s hidden potential with SHOT therapy.
        </p>
      </div>
      <div className="rightSection">
        <div className="formContainer">
          <h2 className="title">{isSignUp ? 'Sign Up for an Account' : 'Log In to Your Account'}</h2>
          <form className="form">
            {/* Render this input only if isSignUp is true */}
            {isSignUp && (
              <div className="inputGroup">
                <FaUser className="icon" />
                <input type="text" placeholder="Username" className="input" />
              </div>
            )}
            <div className="inputGroup">
              <FaEnvelope className="icon" />
              <input type="email" placeholder="Email" className="input" />
            </div>
            <div className="inputGroup">
              <FaLock className="icon" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="input"
              />
              <div className="toggleIcon" onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            {/* Show password note only if isSignUp is true */}
            {isSignUp && <p className="passwordNote">Your password must have at least 8 characters</p>}
            <button type="submit" className="signupButton">{isSignUp ? 'Sign Up' : 'Log In'}</button>
            <p className="loginPrompt">
              {/* Only show login prompt since sign-up is disabled */}
              <a href="/forgot-password" className="forgotLink">Forgot Password</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
