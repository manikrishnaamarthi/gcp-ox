import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import './LoginForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [identifierError, setIdentifierError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Email/Phone validation function
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

    // Validate identifier and password
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
      const response = await fetch('http://localhost:8000/usmapp/login/', { // Ensure the URL matches your backend route
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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
    setShowPassword((prevState) => !prevState);
  };

  const handleSignupClick = () => {
    router.push('/UserAuthentication/SignupPage');
  };

  return (
    <div className="loginContainer">
      <div className="logoContainer">
        <img src="/images/shot.png" alt="Oxivive Logo" className="logo" />
        <div className="welcomeText">OXIVIVE</div>
      </div>

      <form onSubmit={handleLoginSubmit}>
        <div className="inputGroup">
          <input
            type="text"
            id="identifier"
            name="identifier"
            className="input"
            placeholder="Email or Phone Number"
            required
          />
          {identifierError && <p className="errorMessage">{identifierError}</p>}
        </div>

        <div className="inputGroup">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            className="input"
            placeholder="Password"
            required
          />
          <span className="passwordToggle" onClick={toggleShowPassword}>
            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
          </span>
          {passwordError && <p className="errorMessage">{passwordError}</p>}
        </div>

        <div className="options">
          <label>
            <input type="checkbox" />
            Remember Me
          </label>
          <a href="#" className="forgotPassword">
            Forgot password?
          </a>
        </div>

        <button type="submit" className="loginButton">
          Login
        </button>
      </form>

      <div className="extra-options">
        <span>Don't have an account? <a href="#" className="signup-link" onClick={handleSignupClick}>Signup</a></span>
      </div>

      {successMessage && <p className="successMessage">{successMessage}</p>}
      {errorMessage && <p className="errorMessage">{errorMessage}</p>}
    </div>
  );
}

export default LoginForm;
