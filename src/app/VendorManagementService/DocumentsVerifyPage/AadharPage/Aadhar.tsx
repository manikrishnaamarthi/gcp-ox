"use client";
import React, { useState } from 'react';
import { FiUpload } from 'react-icons/fi';
import { FiArrowLeft } from 'react-icons/fi';
import './Aadhar.css';

const Aadhar: React.FC = () => {
  const [frontSide, setFrontSide] = useState<File | null>(null);
  const [backSide, setBackSide] = useState<File | null>(null);
  const [frontPreview, setFrontPreview] = useState<string | null>(null);
  const [backPreview, setBackPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, side: string) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const fileURL = URL.createObjectURL(file);
      if (side === 'front') {
        setFrontSide(file);
        setFrontPreview(fileURL); 
      } else {
        setBackSide(file);
        setBackPreview(fileURL); 
      }
    }
  };

  const handleSubmit = () => {
    if (frontSide && backSide) {
      console.log('Front Side:', frontSide);
      console.log('Back Side:', backSide);
      alert('Files uploaded successfully!');
    } else {
      alert('Please upload both sides of the Aadhar card');
    }
  };

  return (
    <div className="container">
      <div className="back-arrow">
        <FiArrowLeft className="arrow-icon" />
      </div>

      <h1 className="header">Aadhar Card</h1>

      <p className="instruction">
        Make sure that all the data on your document is fully visible, glare-free and not blurred
      </p>

      <div className="imagePreview">
        <img
          src="/images/aadharcard1.png"
          className="aadharImage"
        />
      </div>

      {/* Upload buttons */}
      <div className="uploadContainer">
        <div className="uploadBox">
          <label htmlFor="upload-front" className="uploadLabel">
            {frontPreview ? (
              <img src={frontPreview} alt="Front Preview" className="imageFit" />
            ) : (
              <>
                <FiUpload className="uploadIcon" />
                <span>Upload front side</span>
              </>
            )}
          </label>
          <input
            id="upload-front"
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, 'front')}
            className="inputFile"
          />
        </div>
        <div className="uploadBox">
          <label htmlFor="upload-back" className="uploadLabel">
            {backPreview ? (
              <img src={backPreview} alt="Back Preview" className="imageFit" />
            ) : (
              <>
                <FiUpload className="uploadIcon" />
                <span>Upload back side</span>
              </>
            )}
          </label>
          <input
            id="upload-back"
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, 'back')}
            className="inputFile"
          />
        </div>
      </div>

      <button className="submitButton" onClick={handleSubmit}>
        Done
      </button>
    </div>
  );
};

export default Aadhar;
