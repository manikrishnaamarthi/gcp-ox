"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import './HomePage.css';

function HomePage() {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/UserAuthentication/LoginPage'); // Navigate to LoginForm
  };

  const handleSignupClick = () => {
    router.push('/UserAuthentication/SignupPage'); // Navigate to SignupForm
  };

  return (
    <>
      <div className="logo-section">
        <img src="/images/shot.png" alt="Oxivive Shot Logo" className="logo" />
        <h1 className="brand-name">Oxivive</h1>
      </div>
      <div className="content-section">
        <h2>OXIVIVE - Where Science Meets Technology</h2>
      </div>
      <div className="button-section">
        <button className="login-button" onClick={handleLoginClick}>
          LOGIN
        </button>
        <button className="signup-button" onClick={handleSignupClick}>
          SIGNUP
        </button>
      </div>
    </>
  );
}

export default HomePage;
