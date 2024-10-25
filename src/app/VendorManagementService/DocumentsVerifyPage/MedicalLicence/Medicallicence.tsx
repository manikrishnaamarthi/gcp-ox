"use client";
import React, { useState } from "react";
import { FiUpload, FiArrowLeft } from "react-icons/fi";
import "./Medicallicence.css";
import { useRouter } from "next/navigation";

const Medicallicence: React.FC = () => {
  const Router = useRouter();
  const [frontSide, setFrontSide] = useState<File | null>(null);
  const [backSide, setBackSide] = useState<File | null>(null);
  const [frontPreview, setFrontPreview] = useState<string | null>(null);
  const [backPreview, setBackPreview] = useState<string | null>(null);
  const [licenceNumber, setLicenceNumber] = useState("");
  const [licenceEndDate, setLicenceEndDate] = useState("");

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    side: string
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const previewUrl = URL.createObjectURL(file);

      if (side === "front") {
        setFrontSide(file);
        setFrontPreview(previewUrl);
      } else {
        setBackSide(file);
        setBackPreview(previewUrl);
      }
    }
  };

  const handleLicenceEndDateChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    const formattedValue = value.replace(/[^0-9\-\/]/g, "");
    setLicenceEndDate(formattedValue);
  };

  const handleSubmit = () => {
    if (frontSide && backSide) {
      console.log("Medical Practitioner Licence Number:", licenceNumber);
      console.log("Licence End Date:", licenceEndDate);
      console.log("Front Side:", frontSide);
      console.log("Back Side:", backSide);
      alert("Files uploaded successfully!");
    } else {
      alert("Please upload both sides of the Medical Practitioner Licence");
    }
  };

  return (
    <div className="container">
      <div className="back-arrow">
        <FiArrowLeft className="arrow-icon" onClick={() => Router.back()} />
      </div>

      <h1 className="header">Medical Practitioner Licence</h1>
      <p className="instruction">
        Make sure that all the data on your document is fully visible, glare-free,
        and not blurred.
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
            onChange={(e) => handleFileChange(e, "front")}
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
            onChange={(e) => handleFileChange(e, "back")}
            className="inputFile"
          />
        </div>
      </div>

      <div className="inputFieldsContainer">
        <label className="formLabel">Medical Practitioner Licence Number</label>
        <input
          type="text"
          placeholder="Medical Practitioner Licence Number"
          className="inputField"
          value={licenceNumber}
          onChange={(e) => setLicenceNumber(e.target.value)}
        />

        <label className="formLabel">Licence End Date</label>
        <input
          type="text"
          placeholder="Enter Licence End Date in Medical Licence"
          className="inputField"
          value={licenceEndDate}
          onChange={handleLicenceEndDateChange}
        />
      </div>

      <button className="submitButton" onClick={handleSubmit}>
        Done
      </button>
    </div>
  );
};

export default Medicallicence;
