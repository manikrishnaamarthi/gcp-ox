'use client';
import React, { useState, useEffect } from 'react';
import './availableslots.css';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';

const AvailableSlots: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State variables for vendor details
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [phone, setPhone] = useState<string | null>(null);
  const [oxiImage1, setOxiImage1] = useState<string | null>(null);
  const [oxiImage2, setOxiImage2] = useState<string | null>(null);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);

  useEffect(() => {
    // Fetch saved data from localStorage
    const savedData = localStorage.getItem('profileData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setProfilePhoto(parsedData.profile_photo);
      setName(parsedData.name);
      setEmail(parsedData.email);
      setPhone(parsedData.phone);
      setOxiImage1(parsedData.oxi_image1);
      setOxiImage2(parsedData.oxi_image2);
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
  const handleSave = async () => {
  const vendorId = 'SP-42024'; // Hardcoded vendor ID
  const updatedData = {
    profile_photo: profilePhoto,
    name,
    email,
    phone,
    oxi_image1: oxiImage1,
    oxi_image2: oxiImage2,
    available_slots: selectedSlots,
  };

  try {
    const response = await axios.patch(
      `http://127.0.0.1:8000/api/vendorapp-vendordetails/${vendorId}/`,
      updatedData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 200) {
      alert('Vendor details updated successfully!');
      router.push('/VendorManagementService/WheelVendor/profile'); // Navigate back to profile page
    } else {
      alert('Failed to update vendor details.');
    }
  } catch (error) {
    // Change from console.error to console.log
    console.log('Error updating vendor details:', error);
    alert('An error occurred while updating vendor details.');
  }
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
