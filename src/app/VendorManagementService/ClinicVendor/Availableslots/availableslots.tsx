'use client';
import React, { useState, useEffect } from 'react';
import './availableslots.css';
import { useRouter,useSearchParams } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';

const AvailableSlots: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams(); // Get the search params
  const vendorId = searchParams.get('vendor_id'); // Extract the vendor_id from the URL

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
    // Save selected slots to localStorage
    localStorage.setItem('selectedSlots', JSON.stringify(selectedSlots));

    // Navigate to profile page and pass vendor_id as a query parameter
    if (vendorId) {
      router.push(`/VendorManagementService/ClinicVendor/profile?vendor_id=${vendorId}&editable=true`);
    }
  };


  

  // Predefined time slots
  const timeSlots = ['10:00 AM', '12:00 PM', '02:00 PM', '04:00 PM', '06:00 PM'];

  return (
    <div className="available-slots-container1">
      <header className="header">
        <FaArrowLeft className="arrow-icon9" onClick={handleBackClick} />
        <h1>Add Time Slots</h1>
      </header>

      <div className="time-slots-grid5">
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
