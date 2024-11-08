'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BiArrowBack } from "react-icons/bi";
import './Details.css';

const Details = () => {
  const router = useRouter();
  const [selectedService, setSelectedService] = useState<string | null>(null);

  useEffect(() => {
    const serviceName = localStorage.getItem('selectedService');
    setSelectedService(serviceName);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    state: '',
    district: '',
    pincode: '',
    address: '',
    wheelName: '',
    clinicName: ''
  });

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    const allFieldsFilled = Object.entries(formData).every(([field, value]) => {
      if (
        (selectedService === 'Oxi Wheel' && field === 'wheelName') ||
        (selectedService === 'Oxi Clinic' && field === 'clinicName') ||
        !['wheelName', 'clinicName'].includes(field)
      ) {
        return value.trim() !== '';
      }
      return true;
    });
    setIsFormValid(allFieldsFilled && emailIsValid);
  }, [formData, selectedService]);

  const handleBackClick = () => {
    router.back();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Validation rules
    let validatedValue = value;

    if (name === 'name' || name === 'state' || name === 'district' || name === 'address' || name === 'wheelName' || name === 'clinicName') {
      validatedValue = value.replace(/[^a-zA-Z\s]/g, ''); // Only letters and spaces
    } else if (name === 'phone') {
      validatedValue = value.replace(/[^0-9]/g, '').slice(0, 10); // Only digits, max 10 characters
    } else if (name === 'pincode') {
      validatedValue = value.replace(/[^0-9]/g, '').slice(0, 6); // Only digits, max 6 characters
    } else if (name === 'email') {
      validatedValue = value; // No character restrictions, validate format later
    }

    setFormData(prevData => ({
      ...prevData,
      [name]: validatedValue
    }));
  };

  const handleContinue = () => {
    if (isFormValid) {
      localStorage.setItem('formData', JSON.stringify(formData));
      router.push('/VendorManagementService/DocumentsVerifyPage');
    }
  };

  return (
    <div className="container">
      <div className="details-back">
        <button className="back-icon" onClick={handleBackClick}>
          <BiArrowBack />
        </button>
      </div>

      <h2 className="heading">Add your {selectedService} details</h2>
      <p className="subtext">Fill all the details properly</p>

      <form className="form" onSubmit={handleContinue}>
        {Object.entries(formData).map(([field, value]) => {
          if (
            (selectedService === 'Oxi Wheel' && field === 'wheelName') ||
            (selectedService === 'Oxi Clinic' && field === 'clinicName') ||
            (!['wheelName', 'clinicName'].includes(field))
          ) {
            return (
              <div className="form-group" key={field}>
                <label
                  htmlFor={field}
                  className={value ? 'focused-label' : ''}
                >
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type={field === 'email' ? 'email' : 'text'}
                  id={field}
                  name={field}
                  value={value}
                  onChange={handleInputChange}
                  placeholder={`Enter ${field}`}
                  className={`input ${value ? 'input-focused' : ''}`}
                />
              </div>
            );
          }
          return null;
        })}
      </form>

      <button
        onClick={handleContinue}
        type="button"
        className="submit-btn"
        disabled={!isFormValid}
      >
        Continue
      </button>
    </div>
  );
};

export default Details;
