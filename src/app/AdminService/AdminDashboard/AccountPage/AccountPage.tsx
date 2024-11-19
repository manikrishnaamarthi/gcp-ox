'use client';
import React, { useState } from 'react';
import './AccountPage.css';
import { FaEnvelope, FaUserAlt } from 'react-icons/fa';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import axios from 'axios'; // Import axios for API calls

const AccountPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const router = useRouter(); // Next.js router for navigation

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !email) {
      setError('Username and Email are required');
      return;
    }

    try {
      console.log("Logging in with", username, email); // Log username and email to check

      const response = await axios.post('http://127.0.0.1:8000/api/login/', {
        identifier: email,
        username : username,
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
          <h2 className="title">Log In to Your Account</h2>
          <form className="form" onSubmit={handleLogin}>
            <div className="inputGroup">
              <FaUserAlt className="icon" />
              <input
                type="text"
                placeholder="Username"
                className="input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
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
            <button type="submit" className="signupButton">Log In</button>
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
