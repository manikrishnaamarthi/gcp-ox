'use client';
import React from 'react';
import './availableslots.css';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa'; // Import the FaArrowLeft icon

const AvailableSlots: React.FC = () => {
  const router = useRouter();

  const handleBackClick = () => {
    router.back(); // Navigate back to the previous page
  };

  const timeSlots = ['10:00 AM', '12:00 PM', '05:00 AM', '10:00 AM', '1:30 PM'];

  return (
    <div className="available-slots-container">
      <header className="header">
        {/* Use FaArrowLeft as the arrow icon */}
        <FaArrowLeft className="arrow-icon" onClick={handleBackClick} />
        <h1>Available time slots</h1>
      </header>

      <div className="time-slots-grid">
        {timeSlots.map((slot, index) => (
          <button key={index} className="time-slot">
            {slot}
          </button>
        ))}
      </div>

      <button className="edit-button">EDIT</button>
    </div>
  );
};

export default AvailableSlots;
