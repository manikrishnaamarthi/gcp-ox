'use client';
import React, { useState, useEffect } from 'react';
import './availableslots.css';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';

const AvailableSlots: React.FC = () => {
  const router = useRouter();

  // State variables for vendor details
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);

  useEffect(() => {
    // Load previously selected slots from localStorage or API if they exist
    const savedSlots = localStorage.getItem('selectedSlots');
    if (savedSlots) {
      setSelectedSlots(JSON.parse(savedSlots));
    }
  }, []);

  // Handle back button click
  const handleBackClick = () => {
    router.back(); // Navigate back to the previous page
  };

  // Toggle slot selection
  const handleSlotToggle = (slot: string) => {
    setSelectedSlots((prev) =>
      prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot]
    );
  };

  // Save updated data
  const handleSave = () => {
    localStorage.setItem('selectedSlots', JSON.stringify(selectedSlots));
    router.push('/VendorManagementService/WheelVendor/profile'); // Go back to profile
  };

  

  // Predefined time slots
  const timeSlots = ['10:00 AM', '12:00 PM', '02:00 PM', '04:00 PM', '06:00 PM'];

  return (
    <div className="available-slots-container">
      <header className="header">
        <FaArrowLeft className="arrow-icon" onClick={handleBackClick} />
        <h1>Available Time Slots</h1>
      </header>

      <div className="time-slots-grid2">
        {timeSlots.map((slot, index) => (
          <button
            key={index}
            className={`time-slot ${selectedSlots.includes(slot) ? 'selected' : ''}`}
            onClick={() => handleSlotToggle(slot)}
          >
            {slot}
          </button>
        ))}
      </div>

      <button className="edit-button" onClick={handleSave}>
        SAVE
      </button>
    </div>
  );
};

export default AvailableSlots;
