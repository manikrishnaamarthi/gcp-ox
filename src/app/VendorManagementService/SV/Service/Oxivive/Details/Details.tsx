'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MdKeyboardBackspace } from "react-icons/md";
import './Details.css';

const Details = () => {
  const router = useRouter();

  const [serviceData, setServiceData] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  useEffect(() => {
    const serviceName = localStorage.getItem('selectedService');
    setSelectedService(serviceName);
}, []);

  useEffect(() => {
    const data = localStorage.getItem('serviceData');
    if (data) {
      setServiceData(data);
    }
  }, []);

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

  useEffect(() => {
    const allFieldsFilled = Object.values(formData).every(field => field.trim() !== '');
    setIsFormValid(allFieldsFilled);
  }, [formData]);

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
      localStorage.setItem('formData', JSON.stringify(formData || {}));
      localStorage.setItem('serviceData', JSON.stringify(serviceData || {}));
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
        {Object.entries(formData).map(([field, value]) => (
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
        ))}
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
