'use client';
import React, { useState } from 'react';
import './AccountPage.css';
import { FaEnvelope} from 'react-icons/fa';
import { FaLock } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import axios from 'axios';

const AccountPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [identifier, setIdentifier] = useState<string>(''); // This can be username or contact
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !identifier) {
      setError('Email and Identifier (Username/Contact) are required.');
      return;
    }

    try {
      const payload = { email, identifier };

      const response = await axios.post('http://127.0.0.1:8000/api/login/', payload);

      if (response.data.success) {
        const navigateTo = response.data.usertype === 'SuperAdmin'
          ? '/AdminService/AdminDashboard/Dashboard/'
          : '/AdminServiceClinics/Dashboard/';
        router.push(navigateTo);
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
              <FaLock  className="icon" />
              <input
                type="text"
                placeholder="Password"
                className="input"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
              />
            </div>
            <button type="submit" className="signupButton">Log In</button>
            {error && <p className="errorMessage">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
