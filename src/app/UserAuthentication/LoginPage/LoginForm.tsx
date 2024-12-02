import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import './LoginForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

interface LoginFormData {
  identifier: string;
  password: string;
}

interface ResponseData {
  driver_id: string;
  vendor_id: string;
  selectedService :string;
  oxi_id: string;
  user_type: string;
  message?: string;
}

function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [identifierError, setIdentifierError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  // Email/Phone validation function
  const isValidIdentifier = (input: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    return emailRegex.test(input) || phoneRegex.test(input);
  };

  const handleLoginSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const identifier = formData.get('identifier') as string;
    const password = formData.get('password') as string;

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
      const response = await fetch('http://localhost:8000/usmapp/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ identifier, password }),
      });

      const data: ResponseData = await response.json();

    if (response.ok) {
      if (data.user_type === 'customer') {
        localStorage.setItem('oxi_id', data.oxi_id);
        router.prefetch('/DashBoard/HomePage'); // Prefetch HomePage
        alert('Login successful! Redirecting to the dashboard...');
        router.push('/DashBoard/HomePage');
      } else if (data.user_type === 'Vendor') {
        // Redirect based on service_type
        if (data.selectedService === 'Oxi Wheel') {
          localStorage.setItem('vendor_id', data.vendor_id);
          router.push('/VendorManagementService/Vendors/WheelVendor/Wheel');
        } else if (data.selectedService === 'Oxi Clinic') {
          localStorage.setItem('vendor_id', data.vendor_id);
          router.push('/VendorManagementService/Vendors/WheelVendor/Clinic');
        }
      } else if (data.user_type === 'driver') {
        localStorage.setItem('driver_id', data.driver_id);
        router.push('/DriverManagementService/VendorDriverBooking/MyBooking');
      }
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

  const handleForgotPasswordClick = () => {
    router.push('/UserAuthentication/ForgotPasswordPage');
  };

  return (
    <div className="login-container">
      <div className="logoContainer">
        <img src="/images/shot(1).png" alt="Oxivive Logo" className="logo" />
        <div className="welcomeText">Oxivive</div>
      </div>

      <div className="login-card">
        <h2 className="login-heading">Log In</h2>
        <form onSubmit={handleLoginSubmit}>
          <label htmlFor="identifier" className="inputLabel">E-mail</label>
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

          <label htmlFor="password" className="inputLabel">Password</label>
          <div className="inputGroup">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              className="input"
              placeholder="Password"
              required
            />
            <span className="togglePassword" onClick={toggleShowPassword}>
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} style={{ fontSize: '16px' }} />
            </span>
            {passwordError && <p className="errorMessage">{passwordError}</p>}
          </div>

          <button type="submit" className="loginButton">Login</button>
        </form>

        <div className="extra-options">
          <span className="forgotPassword" onClick={handleForgotPasswordClick}>Forgot password?</span>
        </div>
        <div className="extra-options">
          <span className="signup-link" onClick={handleSignupClick}>Sign Up</span>
        </div>

        {successMessage && <p className="successMessage">{successMessage}</p>}
        {errorMessage && <p className="errorMessage">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default LoginForm;
