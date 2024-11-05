"use client";
import React, { useState, useEffect } from 'react';
import { FiUpload, FiArrowLeft } from 'react-icons/fi';
import './Aadhar.css';
import { useRouter } from "next/navigation";
import { TiTick } from "react-icons/ti";

const Aadhar: React.FC = () => {
  const Router = useRouter();
  const [frontSide, setFrontSide] = useState<File | null>(null);
  const [backSide, setBackSide] = useState<File | null>(null);
  const [frontPreview, setFrontPreview] = useState<string | null>(null);
  const [backPreview, setBackPreview] = useState<string | null>(null);

  // Load data from localStorage on mount
  useEffect(() => {
    const storedFront = localStorage.getItem("aadharFrontPreview");
    const storedBack = localStorage.getItem("aadharBackPreview");

    if (storedFront) setFrontPreview(storedFront);
    if (storedBack) setBackPreview(storedBack);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, side: string) => {
    if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        const fileURL = URL.createObjectURL(file);
        
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result as string;
            if (side === 'front') {
                setFrontSide(file);
                setFrontPreview(fileURL);
                localStorage.setItem("aadharFrontPreview", fileURL);
                localStorage.setItem("aadharFrontFile", base64String); // Store Base64 string
            } else {
                setBackSide(file);
                setBackPreview(fileURL);
                localStorage.setItem("aadharBackPreview", fileURL);
                localStorage.setItem("aadharBackFile", base64String); // Store Base64 string
            }
        };
        
        reader.readAsDataURL(file); // Convert file to Base64
    }
};


  const handleSubmit = () => {
    if (frontSide && backSide) {
      localStorage.setItem("isAadharUploaded", "true");
      alert('Files uploaded successfully!');
      Router.push("/VendorManagementService/DocumentsVerifyPage");
    } else {
      alert('Please upload both sides of the Aadhar card');
    }
  };

  return (
    <div className="container">
      <div className="back-arrow">
        <FiArrowLeft className="arrow-icon" onClick={() => Router.back()}/>
      </div>

      <h1 className="header1">Aadhar Card</h1>

      <p className="instruction">
        Make sure that all the data on your document is fully visible, glare-free and not blurred
      </p>
      <div className="imagePreview">
                <img
                    src="/images/vehiclerc.jpg"
                    alt="Medical Practitioner Licence Preview"
                    className="aadharImage"
                />
            </div>

      <div className="uploadContainer">
        <div className="uploadBox">
          <label htmlFor="upload-front" className="uploadLabel">
            {frontPreview ? (
              <img src={frontPreview} alt="Front Preview" className="previewImage" />
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
              <img src={backPreview} alt="Back Preview" className="previewImage" />
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
