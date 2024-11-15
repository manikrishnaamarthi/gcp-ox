'use client';
import React, { useState } from 'react';
import './AccountPage.css';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUser } from 'react-icons/fa';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import axios from 'axios'; // Import axios for API calls

const AccountPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false); // Set to false to show login page by default
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter(); // Next.js router for navigation

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
        setError('Email and Password are required');
        return;
    }

    try {
        console.log("Logging in with", email, password); // Log email and password to check

        const response = await axios.post('http://127.0.0.1:8000/api/login/', {
            identifier: email,
            password: password,
        });

        if (response.data.success) {
            router.push('/AdminService/AdminDashboard/');
        } else {
            setError(response.data.message);
        }
    } catch (error) {
        setError('An error occurred while logging in.');
    }
};


  return (
    <div className="container1">
      <div className="leftSection">
        <div className="circleBackground">
          <div className="logoContainer1">
            <img src="/images/shot(1).png" alt="Oxivive Logo" className="logo1" />
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
          <form className="form" onSubmit={handleLogin}>
            {/* Render this input only if isSignUp is true */}
            {isSignUp && (
              <div className="inputGroup">
                <FaUser className="icon" />
                <input type="text" placeholder="Username" className="input" />
              </div>
            )}
            <div className="inputGroup">
              <FaEnvelope className="icon" />
              <input
                type="email"
                placeholder="Email"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="inputGroup">
              <FaLock className="icon" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="toggleIcon" onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            {/* Show password note only if isSignUp is true */}
            {isSignUp && <p className="passwordNote">Your password must have at least 8 characters</p>}
            <button type="submit" className="signupButton">{isSignUp ? 'Sign Up' : 'Log In'}</button>
            {error && <p className="errorMessage">{error}</p>}
            <p className="loginPrompt">
              <a href="/forgot-password" className="forgotLink">Forgot Password</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
