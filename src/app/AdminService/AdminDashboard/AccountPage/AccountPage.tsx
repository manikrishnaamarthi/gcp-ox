'use client';
import React, { useState } from 'react';
import './AccountPage.css';
import { FaEnvelope, FaUserAlt, FaPhoneAlt } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const AccountPage: React.FC = () => {
  const [usertype, setUsertype] = useState<'SuperAdmin' | 'Admin'>('SuperAdmin');
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [contact, setContact] = useState<string>('');
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (usertype === 'SuperAdmin' && (!username || !email)) {
      setError('Username and Email are required for SuperAdmin login.');
      return;
    }

    if (usertype === 'Admin' && (!email || !contact)) {
      setError('Email and Contact are required for Admin login.');
      return;
    }

    try {
      const payload = usertype === 'SuperAdmin'
        ? { usertype, username, email }
        : { usertype, email, contact };

      const response = await axios.post('http://127.0.0.1:8000/api/login/', payload);

      if (response.data.success) {
        const navigateTo = usertype === 'SuperAdmin'
          ? '/AdminService/AdminDashboard/'
          : '/AdminService/AdminPerson/';
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
            <div className="usertypeSelect">
              <label>
                <input
                  type="radio"
                  value="SuperAdmin"
                  checked={usertype === 'SuperAdmin'}
                  onChange={() => setUsertype('SuperAdmin')}
                />
                SuperAdmin
              </label>
              <label>
                <input
                  type="radio"
                  value="Admin"
                  checked={usertype === 'Admin'}
                  onChange={() => setUsertype('Admin')}
                />
                Admin
              </label>
            </div>

            {usertype === 'SuperAdmin' ? (
              <>
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
              </>
            ) : (
              <>
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
                  <FaPhoneAlt className="icon" />
                  <input
                    type="text"
                    placeholder="Contact"
                    className="input"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                  />
                </div>
              </>
            )}

            <button type="submit" className="signupButton">Log In</button>
            {error && <p className="errorMessage">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
