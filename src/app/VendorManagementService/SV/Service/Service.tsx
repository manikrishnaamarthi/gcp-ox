'use client'
import React from 'react';
import './Service.css';
import { BiArrowBack } from "react-icons/bi";
import { useRouter } from 'next/navigation'; // Import from next/navigation instead of next/router

const Service: React.FC = () => {
  const router = useRouter();

  const handleServiceClick = (serviceName: string) => {
    // Store the service name in localStorage
    localStorage.setItem('selected_service', serviceName);
    
    // Navigate to Oxivive page
    router.push(`/VendorManagementService/SV/Service/Oxivive`);
  };

  return (
    <div className="service-container">
      <div className="header">
        <button className="back-button"><BiArrowBack /></button>
        <div className="logo">
          <img src="/images/circle.png" alt="Oxivive Logo" />
        </div>
        <h1 className="title">
          <span className="welcome">Welcome to</span>
          <span className="oxivive">Oxivive</span>
        </h1>
      </div>

      <div className="service-selection">
        <h2>Please select your service</h2>
        <p>What specific service will you be providing?</p>
        <div className="services">
          <div className="service-item" onClick={() => handleServiceClick('Oxi Wheel')}>
            <img src="/images/oxi_wheel.jpg" alt="Oxi Wheel" />
            <p>Oxi Wheel</p>
          </div>
          <div className="service-item" onClick={() => handleServiceClick('Oxi Clinic')}>
            <img src="/images/oxi_clinic.jpg" alt="Oxi Clinic" />
            <p>Oxi Clinic</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
