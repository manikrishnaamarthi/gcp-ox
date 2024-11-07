"use client";
import React, { useState, useEffect } from "react";
import { FiUpload, FiArrowLeft } from "react-icons/fi";
import "./Drivinglicence.css";
import { useRouter } from "next/navigation";

const DrivingLicence: React.FC = () => {
    const Router = useRouter();
    const [frontSide, setFrontSide] = useState<File | null>(null);
    const [backSide, setBackSide] = useState<File | null>(null);
    const [frontPreview, setFrontPreview] = useState<string | null>(null);
    const [backPreview, setBackPreview] = useState<string | null>(null);
    const [licenceNumber, setLicenceNumber] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");

    // Load data from localStorage on mount
    useEffect(() => {
        const storedFront = localStorage.getItem("drivingFrontFile");
        const storedBack = localStorage.getItem("drivingBackFile");
        const storedLicenceNumber = localStorage.getItem("drivingLicenceNumber");
        const storedDateOfBirth = localStorage.getItem("dateOfBirth");

        if (storedFront) setFrontPreview(storedFront);
        if (storedBack) setBackPreview(storedBack);
        if (storedLicenceNumber) setLicenceNumber(storedLicenceNumber);
        if (storedDateOfBirth) setDateOfBirth(storedDateOfBirth);
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, side: string) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
    
            const reader = new FileReader();
            reader.onload = () => {
                const fileBase64 = reader.result as string;
                if (side === "front") {
                    setFrontSide(file);
                    setFrontPreview(fileBase64);
                    localStorage.setItem("drivingFrontFile", fileBase64);
                } else {
                    setBackSide(file);
                    setBackPreview(fileBase64);
                    localStorage.setItem("drivingBackFile", fileBase64);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDateOfBirthChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = e.target.value;
        const formattedValue = value.replace(/[^0-9\-\/]/g, "");
        setDateOfBirth(formattedValue);
    };

    const handleSubmit = () => {
      if (frontSide && backSide && licenceNumber && dateOfBirth) {
          localStorage.setItem("drivingLicenceNumber", licenceNumber);
          localStorage.setItem("dateOfBirth", dateOfBirth);
          localStorage.setItem("isDrivingLicenceUploaded", "true"); // Update the status in localStorage
  
          alert("Files uploaded successfully!");
          Router.push("/VendorManagementService/DocumentsVerifyPage");
      } else {
          alert("Please complete all fields and upload both sides of the licence.");
      }
  };

    return (
        <div className="container">
            <div className="back-arrow">
                <FiArrowLeft className="arrow-icon" onClick={() => Router.back()} />
            </div>

            <h1 className="header1">Driving Licence</h1>
            <p className="instruction">
                Make sure that all the data on your document is fully visible, glare-free,
                and not blurred.
            </p>

            <div className="imagePreview">
                <img
                    src="/images/vehiclerc.jpg"
                    alt="Driving Licence Preview"
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
                <label className="formLabel">Driving Licence Number</label>
                <input
                    type="text"
                    placeholder="Enter Driving Licence Number"
                    className="inputField"
                    value={licenceNumber}
                    onChange={(e) => setLicenceNumber(e.target.value)}
                />

                <label className="formLabel">Date of Birth</label>
                <input
                    type="text"
                    placeholder="Enter Date of Birth in Driving Licence"
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

export default DrivingLicence;
