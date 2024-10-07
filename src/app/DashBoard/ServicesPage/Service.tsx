'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { FaHome, FaUser } from 'react-icons/fa';
import { BiSolidGrid, BiListUl } from 'react-icons/bi';
import './Service.css';

const Service: React.FC = () => {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  const handleImageClick = () => {
    router.push('/DashBoard/HomePage/AppointmentPage'); // Navigate to Home page
  };

  return (
    <div className="service-container">
      <h1 className='header'>Oxivive Services</h1>
      <div className="services-images">


        <div className="row">
          <img
            src="/images/oxi_clinic.jpg"
            alt="Oxi Clinic"
            className="image"
            onClick={handleImageClick} // Navigate to appointment section in Home.tsx
          />
          <img
            src="/images/oxi_wheel.jpg"
            alt="Oxi Wheel"
            className="image"
            onClick={handleImageClick} // Navigate to appointment section in Home.tsx
          />
        </div>


        <div className="row">
          <img
            src="/images/oxi_gym.jpg"
            alt="Oxi Gym"
            className="image3"
            onClick={handleImageClick} // Navigate to appointment section in Home.tsx
          />
        </div>


        <div className="footer-section">
        <div className="footer-icon" >
          <FaHome size={32} />
        </div>
        <div className="footer-icon" >
          <BiSolidGrid size={32} />
        </div>
        <div className="footer-icon" >
          <BiListUl size={32} />
        </div>
        <div className="footer-icon" >
          <FaUser size={32} />
        </div>
      </div>





      </div>
    </div>
  );
};

export default Service;
