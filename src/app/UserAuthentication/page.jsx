"use client";

import React, { useState } from "react";
import LoginForm from "./LoginPage/LoginForm";
import SignupForm from "./SignupPage/SignupForm";
import ForgotPasswordForm from "./ForgotPasswordPage/ForgotPasswordForm";
import "./StartPage/HomePage.css";

function HomePage() {
  const [formType, setFormType] = useState(null);

  const handleLoginClick = () => setFormType("login");
  const handleSignupClick = () => setFormType("signup");
  const handleForgotPasswordClick = () => setFormType("forgotPassword");
  const handleBackToLogin = () => setFormType("login");

  return (
    <div className="container">
      {formType ? (
        <div className="form-container">
          {formType === "login" && (
            <LoginForm onForgotPasswordClick={handleForgotPasswordClick} />
          )}
          {formType === "signup" && <SignupForm />}
          {formType === "forgotPassword" && (
            <ForgotPasswordForm onBackToLogin={handleBackToLogin} />
          )}
        </div>
      ) : (
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
