'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Assuming you're using Next.js for navigation
import { MdKeyboardBackspace } from "react-icons/md";
import './Details.css';

const Details = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    state: '',
    district: '',
    pincode: '',
    address: '',
    wheelName: ''
  });

  const [isFormValid, setIsFormValid] = useState(false);

  // Check if all fields are filled
  useEffect(() => {
    const allFieldsFilled = Object.values(formData).every(field => field.trim() !== '');
    setIsFormValid(allFieldsFilled);
  }, [formData]);

  const handleBackClick = () => {
    router.back(); // Navigates back to the previous page
  };

  // Typing the event object for input change handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Typing the event object for form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormValid) {
      // Handle form submission
      console.log('Form submitted', formData);
    }
  };

  return (
    <div className="container">
      <div className="details-back">
        <button className="back-icon" onClick={handleBackClick}>
          <MdKeyboardBackspace />
        </button>
      </div>

      <h2 className="heading">Add your oxiWheel details</h2>
      <p className="subtext">Fill all the details properly</p>

      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your name"
            className="input"
          />
        </div>

        <div className="form-group">
          <label>Phone number</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Your phone number"
            className="input"
          />
        </div>

        <div className="form-group">
          <label>State</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            placeholder="Enter state"
            className="input"
          />
        </div>

        <div className="form-group">
          <label>District</label>
          <input
            type="text"
            name="district"
            value={formData.district}
            onChange={handleInputChange}
            placeholder="Enter district"
            className="input"
          />
        </div>

        <div className="form-group">
          <label>Pincode</label>
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleInputChange}
            placeholder="Enter pincode"
            className="input"
          />
        </div>

        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Enter address"
            className="input"
          />
        </div>

        <div className="form-group">
          <label>Wheel name</label>
          <input
            type="text"
            name="wheelName"
            value={formData.wheelName}
            onChange={handleInputChange}
            placeholder="Enter your wheel name"
            className="input"
          />
        </div>

      </form>
      <button
          type="submit"
          className="submit-btn"
          disabled={!isFormValid} 
        >
          Continue
        </button>
    </div>
  );
};

export default Details;
