"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import the useRouter hook
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash} from '@fortawesome/free-regular-svg-icons';
import './ForgotPasswordForm.css';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Cookies from 'js-cookie';

const ForgotPassword = () => {
    const [step, setStep] = useState(1);
    const [emailOrMobile, setEmailOrMobile] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState('');
    const [verificationErrorMessage, setVerificationErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [otpSent, setOtpSent] = useState('');
    const [enteredOtp, setEnteredOtp] = useState(''); // State to hold entered OTP

    const router = useRouter();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleSubmitEmail = async (e) => {
        e.preventDefault();
        try {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const mobileRegex = /^\d{10}$/;

            if (!emailRegex.test(emailOrMobile) && !mobileRegex.test(emailOrMobile)) {
                throw new Error('Please enter a valid email address or 10-digit mobile number.');
            }

            const response = await fetch('http://localhost:8000/usmapp/checkemail/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ emailOrMobile }),
            });

            const data = await response.json();

            if (data.success) {
                alert('OTP sent to your email!');
                setStep(2);
                setOtpSent(data.otp);
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            setPasswordErrorMessage(error.message);
        }
    };

    const sendOtp = async (emailOrMobile) => {
        try {
          const response = await axios.post(
            'http://localhost:8000/usmapp/checkemail/',
            { emailOrMobile },
            { withCredentials: true } // Ensure cookies are sent
          );
          console.log(response.data);
        } catch (error) {
          console.error(error.response?.data || error.message);
        }
      };
      
      const verifyOtp = async (otp) => {
        try {
            const csrfToken = Cookies.get('csrftoken');  // Get the CSRF token from cookies
    
            const response = await axios.post(
                'http://localhost:8000/usmapp/verifyotp/',
                { otp: otp },  // Use the passed otp parameter
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrfToken,  // Include CSRF token in headers
                    },
                    withCredentials: true  // Make sure cookies are sent with the request
                }
            );
    
            console.log(response.data);  // Handle successful response
        } catch (error) {
            // Handle error response
            if (error.response) {
                console.error(error.response.data);  // Log the error response
            } else {
                console.error('Error occurred while verifying OTP:', error.message);
            }
        }
    };    

      const handleVerification = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/usmapp/verifyotp/', {
                method: 'POST',
                credentials: 'include',  // Ensure cookies are included for session management
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ otp: verificationCode })  // Send the entered OTP
            });
    
            const data = await response.json();
            console.log(data);  // Debugging
    
            if (response.ok) {
                alert('OTP verified successfully!');
                setStep(4);  // Proceed to password reset step
            } else {
                setVerificationErrorMessage(data.message || 'Invalid OTP.');
            }
        } catch (error) {
            console.error('Error:', error);
            setVerificationErrorMessage('Network error. Please try again.');
        }
    };    

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setConfirmPasswordErrorMessage('Passwords do not match.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/usmapp/resetpassword/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ emailOrMobile, newPassword }),
            });

            const data = await response.json();
            if (data.success) {
                alert('Password reset successful!');
                router.push('/login');
            } else {
                setPasswordErrorMessage(data.message);
            }
        } catch (error) {
            setPasswordErrorMessage('Network error. Please try again.');
        }
    };    

    const handleGoBack = () => {
        router.back(); // Navigates to the previous page
    };

    return (
        <div className="form-wrapper">
            {step === 1 && (
                <>
                    <div className="top-section">
                        <div className="logoContainer">
                            <span className="back-arrow" onClick={handleGoBack}>
                            <FontAwesomeIcon icon={faChevronLeft} />
                            </span>
                            <div className="welcomeText">Forgot Password</div>
                        </div>
                    </div>

                    <div className="ForgotPasswordCard">
                        <h1 className="header">Forgot Password</h1>
                        <form onSubmit={handleSubmitEmail}>
                            <label className="red-label" htmlFor="emailOrMobile">Email or Mobile</label>
                            <input
                                id="emailOrMobile"
                                type="text"
                                placeholder="Email or Mobile"
                                value={emailOrMobile}
                                onChange={(e) => setEmailOrMobile(e.target.value)}
                                className="input"
                            />
                            <button type="submit" className="button">Submit</button>
                        </form>
                        {passwordErrorMessage && <p className="alert-error-email">{passwordErrorMessage}</p>}
                    </div>
                </>
            )}

            {step === 2 && (

                <>
                <div className="top-section">
                    <div className="logoContainer">
                        <span className="back-arrow" onClick={handleGoBack}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                        </span>
                        <div className="welcomeText">Verify</div>
                    </div>
                </div>
                <div className="ForgotPasswordCard">
                    <h2 className="header-verify">Verify Your Email</h2>
                    <p className="instruction-text">Enter the OTP Code sent to your E-mailid</p>
                    <form onSubmit={handleVerification}>
                        <div className="verification-inputs">
                            {[...Array(4)].map((_, i) => (
                                <input
                                    key={i}
                                    type="text"
                                    maxLength="1"
                                    className="verification-input"
                                    value={verificationCode[i] || ''}
                                    onChange={(e) => {
                                        let code = verificationCode.split('');
                                        code[i] = e.target.value;
                                        setVerificationCode(code.join(''));
                                    }}
                                />
                            ))}
                        </div>
                        <button type="submit" className="button-verify">Submit</button>
                    </form>
                    <p className="resend-text">Didn't receive the code? <a href="#" className='resend-link'>Resend</a></p>
                    {verificationErrorMessage && <p className="alert-error-verify">{verificationErrorMessage}</p>}
                </div>
                </>
            )}
            {step === 3 && (
                <div>
                    <h2 className="header-verify">Verify Your Mobile</h2>
                    <p className="instruction-text">Please enter the 4-digit code sent to your mobile number.</p>
                    <form onSubmit={handleVerification}>
                        <div className="verification-inputs">
                            {[...Array(4)].map((_, i) => (
                                <input
                                    key={i}
                                    type="text"
                                    maxLength="1"
                                    className="verification-input"
                                    value={verificationCode[i] || ''}
                                    onChange={(e) => {
                                        let code = verificationCode.split('');
                                        code[i] = e.target.value;
                                        setVerificationCode(code.join(''));
                                    }}
                                />
                            ))}
                        </div>
                        <button type="submit" className="button-verify">Verify</button>
                    </form>
                    <p className="resend-text">Didn't receive the code? <a href="#" className='resend-link'>Resend</a></p>
                    {verificationErrorMessage && <p className="alert-error-verify">{verificationErrorMessage}</p>}
                </div>
            )}
            {step === 4 && (
                <div>
                    <h2 className="header-password">Create New Password</h2>
                    <form onSubmit={handlePasswordChange}>
                        <div className="password-container">
                            <label className="new-password-label" htmlFor="newPassword">New Password</label>
                            <input
                                id="newPassword"
                                type={showPassword ? "text" : "password"}
                                placeholder="New Password"
                                value={newPassword}
                                onChange={handleNewPasswordChange}
                                className="input"
                            />
                            <span onClick={togglePasswordVisibility} className="password-toggle">
                                <FontAwesomeIcon icon={showPassword ?  faEye:faEyeSlash} />
                            </span>
                        </div>
                        {passwordErrorMessage && <p className="alert-error">{passwordErrorMessage}</p>}
                        <div className="password-container">
                            <label className="confirm-password-label" htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                id="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="input"
                                disabled={passwordErrorMessage !== ''}
                            />
                            <span onClick={toggleConfirmPasswordVisibility} className="password-toggle">
                                <FontAwesomeIcon icon={showConfirmPassword ? faEye:faEyeSlash} />
                            </span>
                        </div>
                        {confirmPasswordErrorMessage && <p className="alert-error">{confirmPasswordErrorMessage}</p>}
                        <button type="submit" className="button-password">Change Password</button>
                    </form>
                    {showSuccessMessage && (
                        <div className="alert-success">
                            Password has been successfully changed.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ForgotPassword;