"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import './StartPage/HomePage.css';

function HomePage() {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/UserAuthentication/LoginPage'); // Navigate to LoginForm
  };

  const handleSignupClick = () => {
    router.push('/UserAuthentication/SignupPage'); // Navigate to SignupForm
  };

  return (
    <div className="container">
      {(
        <div className="button-section">
          <button className="login-button" onClick={handleLoginClick}>
            LOGIN
          </button>
          <button className="signup-button" onClick={handleSignupClick}>
            SIGNUP
          </button>
        </div>
      )}
    </div>
  );
}

export default HomePage;
