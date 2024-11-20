'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './SignupForm.css';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const SignupForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pincode, setPincode] = useState('');
  const [panNumber, setPanNumber] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const router = useRouter();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validatePassword = (password) => {
    const strongPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;
    return strongPasswordPattern.test(password);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phonePattern = /^\d{10}$/;
    return phonePattern.test(phoneNumber);
  };

  const validatePincode = (pincode) => {
    const pincodePattern = /^\d{6}$/;
    return pincodePattern.test(pincode);
  };

  const validatePanNumber = (panNumber) => {
    const panPattern = /^[A-Z]{5}\d{4}[A-Z]{1}$/;
    return panPattern.test(panNumber);
  };

  const handleNumberInput = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    e.target.name === 'phoneNumber' ? setPhoneNumber(value) : setPincode(value);
  };

  const handlePanInput = (e) => {
    const value = e.target.value.toUpperCase();
    setPanNumber(value);
  };

  // SignupForm.jsx
const handleSubmit = async (event) => {
  event.preventDefault();

  const validationErrors = {};

  // Validate form inputs
  if (!name) validationErrors.name = 'Name is required.';
  if (!email || !validateEmail(email)) validationErrors.email = 'Invalid email address.';
  if (!password || !validatePassword(password)) {
      validationErrors.password = 'Required 8 characters, including numbers, @#!$';
  }
  if (!phoneNumber || !validatePhoneNumber(phoneNumber)) validationErrors.phoneNumber = 'Phone number must be exactly 10 digits.';
  if (!pincode || !validatePincode(pincode)) validationErrors.pincode = 'Pincode must be exactly 6 digits.';
  if (!panNumber || !validatePanNumber(panNumber)) validationErrors.panNumber = 'Invalid PAN number format.';
  if (!profilePhoto) validationErrors.profilePhoto = 'Profile photo is required.';

  setErrors(validationErrors);

  // Proceed only if no validation errors
  if (Object.keys(validationErrors).length === 0) {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('phone_number', phoneNumber);
      formData.append('pincode', pincode);
      formData.append('pan_number', panNumber);
      formData.append('profile_photo', profilePhoto);

      // Set gst_number and address to null
      formData.append('gst_number', ''); // Or omit this line if the backend can handle missing fields
      formData.append('address', ''); // Or set to null based on backend handling

      try {
          const response = await axios.post('http://localhost:8000/usmapp/Oxi/', formData, {
              headers: {
                  'Content-Type': 'multipart/form-data',
              },
          });
          setSuccessMessage('Signup successful!');
          console.log('Signup successful:', response.data);

          setTimeout(() => {
              router.push('/UserAuthentication/LoginPage');
          }, 2000);
      } catch (error) {
          console.error('Error signing up:', error.response?.data || error.message);
          // Handle detailed error messages from backend
          if (error.response && error.response.data) {
              setErrors(error.response.data);
          } else {
              setErrors({ apiError: 'Failed to sign up. Please try again later.' });
          }
      }
  }
};


  const handleGoogleSignUp = () => {
    const userEmail = prompt('Enter your Google email:', 'example@gmail.com');
    if (userEmail) {
      setEmail(userEmail);
      alert(`Google sign-up successful! Your email: ${userEmail}`);
    }
  };

  const handleSignInClick = () => {
    router.push('/UserAuthentication/LoginPage');
  };

  return (
    <div className="signup-container">
     
        <div className="logoContainer">
          <img src="/images/shot(1).png" alt="Logo" className="logo" />
          <h1 className="welcomeText">Oxivive</h1>
        </div>
     
      <div className="signup-card">
      <h2 className="service-provider-title">Sign up</h2>
        {successMessage && (
          <p className="alert-success">{successMessage}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>
          <div className="input-field">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="input-field password-field">
            <div className="password-wrapper">
              <input
                type={passwordVisible ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                
              />
              <span className="password-toggle" onClick={togglePasswordVisibility}>
      <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
    </span>
              
            </div>
            {errors.password && <span className="error">{errors.password}</span>}
          </div>
          <div className="input-field">
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number"
              maxLength="10"
              value={phoneNumber}
              onChange={handleNumberInput}
            />
            {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
          </div>
          <div className="input-field">
            <input
              type="tel"
              name="pincode"
              placeholder="Pincode"
              maxLength="6"
              value={pincode}
              onChange={handleNumberInput}
            />
            {errors.pincode && <span className="error">{errors.pincode}</span>}
          </div>
          <div className="input-field">
            <input
              type="text"
              placeholder="PAN Number"
              maxLength="10"
              value={panNumber}
              onChange={handlePanInput}
              pattern="[A-Z]{5}\d{4}[A-Z]{1}"
            />
            {errors.panNumber && <span className="error">{errors.panNumber}</span>}
          </div>
          <div className="input-field upload-field">
            <label htmlFor="profile-photo">
              <span className="camera-plus-icon"><i className="fas fa-camera"></i></span> Upload Profile Photo
            </label>
            <input
              type="file"
              id="profile-photo"
              onChange={(e) => setProfilePhoto(e.target.files[0])}
            />
            {errors.profilePhoto && <span className="error">{errors.profilePhoto}</span>}
          </div>
          {errors.apiError && <span className="error">{errors.apiError}</span>}
          <button type="submit">Sign Up</button>
          <p className="sign-in-link">
            Already have an account?  
            <span className="sign-in-button" onClick={handleSignInClick}>Sign in</span>
          </p>
          <a className="service-provider-link" onClick={()=>router.push('/VendorManagementService/SV/Service/')}>Service Provider</a>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
