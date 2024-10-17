import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import './LoginForm.css';

function LoginForm({ onForgotPasswordClick }) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [identifierError, setIdentifierError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const isValidIdentifier = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    return emailRegex.test(input) || phoneRegex.test(input);
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const identifier = formData.get('identifier');
    const password = formData.get('password');

    let isValid = true;
    if (!isValidIdentifier(identifier)) {
      setIdentifierError('Please enter a valid email or phone number.');
      isValid = false;
    } else {
      setIdentifierError('');
    }

    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long.');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (!isValid) return;

    try {
      const response = await fetch('http://localhost:8000/usmapp/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Login successful! Redirecting...');
        setTimeout(() => router.push('/UserAuthentication/DashBoard'), 1500);
      } else {
        setErrorMessage(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="loginFormWrapper">
      <div className="loginFormContainer">
        <form onSubmit={handleLoginSubmit} className="loginForm">
          <h1 className="loginHeader">Log In</h1>

          <div className="inputGroup">
            <h5 className="inputLabel">E-mail</h5>
            <input
              type="text"
              id="identifier"
              name="identifier"
              className="input"
              placeholder="E-mail"
              required
            />
            {identifierError && <p className="errorMessage">{identifierError}</p>}
          </div>

          <div className="inputGroup">
            <h5 className="inputLabel">Password</h5>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              className="input"
              placeholder="Password"
              required
            />
            {passwordError && <p className="errorMessage">{passwordError}</p>}
          </div>

          <button type="submit" className="loginButton">Log In</button>

          <div className="forgotPassword">
            <span type="button" onClick={onForgotPasswordClick}>
              Forgot password?
            </span>
          </div>
          
          <div className="extra-options">
            <span><a href="/UserAuthentication/SignupPage" className="signup-link">Sign Up</a></span>
          </div>

          {successMessage && <p className="successMessage">{successMessage}</p>}
          {errorMessage && <p className="errorMessage">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
