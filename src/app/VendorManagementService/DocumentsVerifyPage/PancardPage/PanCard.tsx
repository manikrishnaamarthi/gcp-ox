"use client";
import React, { useState } from 'react';
import { FiUpload } from 'react-icons/fi'; // Import the upload icon
import { FiArrowLeft } from 'react-icons/fi'; // Import the back arrow icon
import './PanCard.css'; // Import the CSS for styling

const PanCard: React.FC = () => {
  const [frontSide, setFrontSide] = useState<File | null>(null);
  const [backSide, setBackSide] = useState<File | null>(null);

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

  const handleSubmit = () => {
    if (frontSide && backSide) {
      console.log('Front Side:', frontSide);
      console.log('Back Side:', backSide);
      alert('Files uploaded successfully!');
    } else {
      alert('Please upload both sides of the Pan card');
    }
  };

  return (
    <div className="container">
      
      <div className="back-arrow">
        <FiArrowLeft className="arrow-icon" />
      </div>

      <h1 className="header">Pan Card</h1>

      <p className="instruction">
        Make sure that all the data on your document is fully visible, glare-free and not blurred
      </p>

      <div className="imagePreview">
        <img 
          src="/images/pancardpic.jpg" 
          alt="Pan Card Preview" 
          className="aadharImage" 
        />
      </div>

      <div className="uploadContainer">
        <div className="uploadBox">
          <label htmlFor="upload-front" className="uploadLabel">
            {frontSide ? (
              <img src={URL.createObjectURL(frontSide)} alt="Front Side" className="previewImage" />
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
            {backSide ? (
              <img src={URL.createObjectURL(backSide)} alt="Back Side" className="previewImage" />
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

export default PanCard;
