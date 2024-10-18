"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import the useRouter hook
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash} from '@fortawesome/free-regular-svg-icons';
import './ForgotPasswordForm.css';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

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
    const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Set default to false

    const router = useRouter(); // Initialize the useRouter hook

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

            if (emailRegex.test(emailOrMobile)) {
                setStep(2); 
                setPasswordErrorMessage('');
            } else if (mobileRegex.test(emailOrMobile)) {
                setStep(3); // Move to the "Verify Mobile" step
                setPasswordErrorMessage('');
            } else {
                throw new Error('Please enter a valid email address or 10-digit mobile number.');
            }
        } catch (error) {
            setPasswordErrorMessage(error.message);
        }
    };

    const handleVerification = async (e) => {
        e.preventDefault();
        try {
            const verificationCodeRegex = /^\d{4}$/; // Ensure the code is exactly 4 digits

            if (verificationCodeRegex.test(verificationCode)) {
                setStep(4); // Move to the "Create New Password" step
                setVerificationErrorMessage('');
            } else {
                throw new Error('Invalid Verification code');
            }
        } catch (error) {
            setVerificationErrorMessage(error.message);
        }
    };

    const handleNewPasswordChange = (e) => {
        const password = e.target.value;
        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        setNewPassword(password);

        if (password.length >= 8 && !strongPasswordRegex.test(password)) {
            setPasswordErrorMessage('Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
        } else {
            setPasswordErrorMessage('');
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        try {
            if (newPassword.length < 8 || passwordErrorMessage) {
                return;
            }

            if (newPassword !== confirmPassword) {
                setConfirmPasswordErrorMessage('Passwords do not match.');
                return;
            } else {
                setConfirmPasswordErrorMessage('');
            }

            
            setEmailOrMobile('');
            setShowSuccessMessage(true);

            // Redirect to the StartupPage after 2 seconds (optional delay)
            setTimeout(() => {
                router.push('http://localhost:3000/'); // Replace with your StartupPage path
            },2000);
            
        } catch (error) {
            setPasswordErrorMessage(error.message);
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
                                <FontAwesomeIcon icon={faArrowLeft} />
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
                            <button type="submit" className="button">Send</button>
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
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </span>
                        <div className="welcomeText">Verify</div>
                    </div>
                </div>
                <div className="ForgotPasswordCard">
                    <h2 className="header-verify">Verify Your Email</h2>
                    <p className="instruction-text">Enter the OTP Code sent to your E-mailid entered </p>
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
