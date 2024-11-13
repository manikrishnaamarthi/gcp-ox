"use client";
import React, { useState, useEffect } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { CgProfile } from "react-icons/cg";
import { PiPlusCircleFill } from 'react-icons/pi';
import './Profilephoto.css';
import { useRouter } from "next/navigation";

const ProfilePhoto: React.FC = () => {
  const Router = useRouter();
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);

  // Load data from localStorage on mount
  useEffect(() => {
    const storedProfilePreview = localStorage.getItem("profilePhotoPreview");
    if (storedProfilePreview) {
      setProfilePreview(storedProfilePreview);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const fileURL = URL.createObjectURL(file);
      setProfileImage(file);
      setProfilePreview(fileURL);
    }
  };

  const handleSubmit = () => {
    if (profileImage) {
      // Store preview and file in localStorage only when submit is clicked
      localStorage.setItem("profilePhotoPreview", profilePreview || "");
      localStorage.setItem("isProfilePhotoUploaded", "true"); // Mark as uploaded
      
      // Convert the file to base64 and store it as profilePhotoFile for backend upload
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        localStorage.setItem("profilePhotoFile", base64String);
        
        alert('Profile photo uploaded successfully!');
        Router.push("/VendorManagementService/DocumentsVerifyPage"); // Redirect to the verification page
      };
      reader.readAsDataURL(profileImage);
    } else {
      alert('Please upload your profile photo');
    }
  };

  return (
    <div className="container">
      <div className="back-arrow">
        <FiArrowLeft className="arrow-icon" onClick={() => Router.back()} />
      </div>

      <h1 className="header1">Profile Photo</h1>

      <p className="instruction">
        Make sure your photo is entirely visible, glare-free and not blurred.
      </p>

      <div className="profileImageContainer">
        <label htmlFor="upload-profile" className="uploadLabel">
          {profilePreview ? (
            <img src={profilePreview} alt="Profile Preview" className="profileImage" />
          ) : (
            <div className="imagePlaceholder">
              <CgProfile className="profileIcon" />
              <PiPlusCircleFill className="plusIcon" />
            </div>
          )}
        </label>
        <input
          id="upload-profile"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="inputFile"
        />
      </div>

      <button className="submitButton" onClick={handleSubmit}>
        Done
      </button>
    </div>
  );
};

export default ProfilePhoto;
