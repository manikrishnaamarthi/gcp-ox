'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MdKeyboardBackspace } from "react-icons/md";
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
    state: '',
    district: '',
    pincode: '',
    address: '',
    wheelName: '',
    clinicName: ''
  });

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    // Check if all relevant fields are filled
    const allFieldsFilled = Object.entries(formData).every(([field, value]) => {
      // Only check wheelName or clinicName if their respective service is selected
      if (
        (selectedService === 'Oxi Wheel' && field === 'wheelName') ||
        (selectedService === 'Oxi Clinic' && field === 'clinicName') ||
        !['wheelName', 'clinicName'].includes(field)
      ) {
        return value.trim() !== '';
      }
      return true; // Skip checking if the field is not relevant
    });
    setIsFormValid(allFieldsFilled);
  }, [formData, selectedService]);

  const handleBackClick = () => {
    router.back();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
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
          <MdKeyboardBackspace />
        </button>
      </div>

      <h2 className="heading">Add your {selectedService} details</h2>
      <p className="subtext">Fill all the details properly</p>

      <form className="form" onSubmit={handleContinue}>
        {Object.entries(formData).map(([field, value]) => {
          // Condition to render only the relevant field based on the selected service
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
                  type="text"
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
          return null; // Skip rendering for fields that shouldn't be shown
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
