'use client';
import React, { useState } from "react";
import "./clinicotp.css";
import { useRouter, useSearchParams } from "next/navigation";
import { IoChevronBackSharp } from "react-icons/io5";
import axios from "axios";

const ClinicOtp = () => {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const handleChange = (element, index) => {
    const value = element.value;
    if (/^\d$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Focus the next input
      if (element.nextSibling) {
        element.nextSibling.focus();
      }
    } else if (value === "") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      if (otp[index] === "") {
        // Focus the previous input
        if (e.target.previousSibling) {
          e.target.previousSibling.focus();
        }
      } else {
        // Clear the current input
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const otpValue = otp.join(""); // Combine OTP digits into a string
    const storedOtp = localStorage.getItem("otp");
    const expiryTime = parseInt(localStorage.getItem("otp_expiry") || "0");

    if (!storedOtp || !expiryTime || new Date().getTime() > expiryTime) {
        alert("OTP has expired or is invalid. Please request a new OTP.");
        setLoading(false);
        return;
    }

    try {
        const response = await axios.post("http://localhost:8004/api/validate-otp/", {
            otp: otpValue,  // Make sure OTP is properly formatted
            email: email,   // Make sure email is passed correctly
        });

        if (response.status === 200) {
            console.log("OTP validated successfully");
            router.push("/VendorManagementService/ClinicVendor/MyBookings"); // Redirect on success

            localStorage.removeItem("otp");
            localStorage.removeItem("otp_expiry");
        }
    } catch (error) {
        console.error("Error validating OTP:", error.response?.data || error.message);
    } finally {
        setLoading(false);
    }
};






  return (
    <div className="container">
      <header className="header">
        <h1 className="title">
          <button className="back-button" onClick={() => router.back()}>
            <IoChevronBackSharp size={20} />
          </button>
          <span className="welcome">Enter OTP to Start</span>
          <span className="oxiwheel">Please enter the 5-digit OTP sent to the customer</span>
        </h1>
      </header>

      <div className="main">
        <form className="otp-form" onSubmit={handleSubmit}>
          <div className="otp-inputs">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                className="otp-input"
                value={otp[index]}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onFocus={(e) => e.target.select()}
              />
            ))}
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Validating..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ClinicOtp;
