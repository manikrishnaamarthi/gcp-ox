"use client";
import React, { useState } from 'react';
import { FiUpload, FiArrowLeft } from 'react-icons/fi';
import './Drivinglicence.css';

const Drivinglicence: React.FC = () => {
  const [frontSide, setFrontSide] = useState<File | null>(null);
  const [backSide, setBackSide] = useState<File | null>(null);
  const [drivingLicenceNumber, setDrivingLicenceNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, side: string) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (side === 'front') {
        setFrontSide(file);
      } else {
        setBackSide(file);
      }
    }
  };

  const handleDateOfBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formattedValue = value.replace(/[^0-9\-\/]/g, '');
    setDateOfBirth(formattedValue);
  };

  const handleSubmit = () => {
    if (frontSide && backSide) {
      console.log('Driving Licence Number:', drivingLicenceNumber);
      console.log('Date of Birth:', dateOfBirth);
      console.log('Front Side:', frontSide);
      console.log('Back Side:', backSide);
      alert('Files uploaded successfully!');
    } else {
      alert('Please upload both sides of the Driving Licence');
    }
  };

  const renderPreview = (file: File | null) => {
    return file ? URL.createObjectURL(file) : undefined;
  };

  return (
    <div className="container">
      <div className="back-arrow">
        <FiArrowLeft className="arrow-icon" />
      </div>

      <h1 className="header">Driving Licence</h1>
      <p className="instruction">
        Make sure that all the data on your document is fully visible, glare-free, and not blurred.
      </p>

      <div className="imagePreview">
        <img src="/images/vehiclerc.jpg" alt="Driving Licence Preview" className="aadharImage" />
      </div>

      <div className="uploadContainer">
        <div className="uploadBox">
          {frontSide ? (
            <img src={renderPreview(frontSide)} alt="Front side" className="uploadPreview" />
          ) : (
            <label htmlFor="upload-front" className="uploadLabel">
              <FiUpload className="uploadIcon" />
              <span>Upload front side</span>
            </label>
          )}
          <input
            id="upload-front"
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, 'front')}
            className="inputFile"
          />
        </div>

        <div className="uploadBox">
          {backSide ? (
            <img src={renderPreview(backSide)} alt="Back side" className="uploadPreview" />
          ) : (
            <label htmlFor="upload-back" className="uploadLabel">
              <FiUpload className="uploadIcon" />
              <span>Upload back side</span>
            </label>
          )}
          <input
            id="upload-back"
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, 'back')}
            className="inputFile"
          />
        </div>
      </div>

      <div className="inputFieldsContainer">
        <label className="formLabel">Driving Licence Number</label>
        <input
          type="text"
          placeholder="Driving Licence Number"
          className="inputField"
          value={drivingLicenceNumber}
          onChange={(e) => setDrivingLicenceNumber(e.target.value)}
        />

        <label className="formLabel">Date of Birth</label>
        <input
          type="text"
          placeholder="Enter date of birth in Driving Licence"
          className="inputField"
          value={dateOfBirth}
          onChange={handleDateOfBirthChange}
        />
      </div>

      <button className="submitButton" onClick={handleSubmit}>
        Done
      </button>
    </div>
  );
};

export default Drivinglicence;
