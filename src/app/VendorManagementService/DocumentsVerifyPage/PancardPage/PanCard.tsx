"use client";
import React, { useState, useEffect } from 'react';
import { FiUpload, FiArrowLeft } from 'react-icons/fi';
import './PanCard.css';
import { useRouter } from "next/navigation";

const PanCard: React.FC = () => {
  const Router = useRouter();
  const [frontSide, setFrontSide] = useState<File | null>(null);
  const [backSide, setBackSide] = useState<File | null>(null);
  const [frontPreview, setFrontPreview] = useState<string | null>(null);
  const [backPreview, setBackPreview] = useState<string | null>(null);

  useEffect(() => {
    // Load previews from localStorage if available
    const storedFront = localStorage.getItem("pancardFrontSidePreview");
    const storedBack = localStorage.getItem("pancardBackSidePreview");

    if (storedFront) setFrontPreview(storedFront);
    if (storedBack) setBackPreview(storedBack);
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, side: string) => {
    if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        const previewUrl = URL.createObjectURL(file);

        const fileBase64 = await convertFileToBase64(file); // Convert file to base64

        if (side === 'front') {
            setFrontSide(file);
            setFrontPreview(previewUrl);
            localStorage.setItem("pancardFrontSidePreview", previewUrl);
            localStorage.setItem("panFrontFile", fileBase64); // Store base64 in localStorage
        } else {
            setBackSide(file);
            setBackPreview(previewUrl);
            localStorage.setItem("pancardBackSidePreview", previewUrl);
            localStorage.setItem("panBackFile", fileBase64); // Store base64 in localStorage
        }
    }
};

// Helper function to convert file to base64
const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
};


  const handleSubmit = () => {
    if (frontSide && backSide) {
      localStorage.setItem("isPancardUploaded", "true");
      alert("Pan Card uploaded successfully!");
      Router.push("/VendorManagementService/DocumentsVerifyPage");
    } else {
      alert("Please upload both sides of the Pan card");
    }
  };

  return (
    <div className="container">
      <div className="back-arrow">
        <FiArrowLeft className="arrow-icon" onClick={() => Router.back()}/>
      </div>

      <h1 className="header1">Pan Card</h1>
      <p className="instruction">
        Make sure that all the data on your document is fully visible, glare-free, and not blurred.
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
            {frontPreview ? (
              <img src={frontPreview} alt="Front side preview" className="previewImage" />
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
              <img src={backPreview} alt="Back side preview" className="previewImage" />
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
