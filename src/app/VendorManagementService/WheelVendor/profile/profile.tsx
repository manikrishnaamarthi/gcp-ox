'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './profile.css';
import axios from 'axios';
import { AxiosError } from 'axios';
import {FaCamera, FaArrowLeft, FaTimes, FaPlusCircle, FaEdit} from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faClipboardList, faBell, faUser } from '@fortawesome/free-solid-svg-icons';

const Profile: React.FC = () => {
  const router = useRouter();
  const [selectedFooter, setSelectedFooter] = useState('home');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [oxiImage1, setOxiImage1] = useState('');
  const [oxiImage2, setOxiImage2] = useState('');
  const [availableslots, setAvailableslots] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const oxiFileInputRef1 = useRef<HTMLInputElement | null>(null);
  const oxiFileInputRef2 = useRef<HTMLInputElement | null>(null);
  const [profileData, setProfileData] = useState<any[]>([]);
  const vendorId = 'SP-42024';

  useEffect(() => {
    const fetchVendorData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/vendorapp-vendordetails/${vendorId}/`);
        setProfileData(response.data);
        setProfileImage(response.data.profile_photo);
        setEmail(response.data.email);
        setName(response.data.name);
        setPhone(response.data.phone);
        setOxiImage1(response.data.oxi_image1);
        setOxiImage2(response.data.oxi_image2);
        setAvailableslots(response.data.available_slots);
      } catch (error: any) {
        console.log('Error fetching vendor data:', error.response ? error.response.data : error);
      }
    };

    fetchVendorData();
  }, []);

  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'documents_all'); // Replace with your Cloudinary preset
    formData.append('cloud_name', 'dpysjcjbf'); // Replace with your Cloudinary cloud name
  
    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dpysjcjbf/image/upload', // Replace with your Cloudinary API endpoint
        formData
      );
      return response.data.secure_url; // Return the uploaded image URL
    } catch (error) {
      console.log('Error uploading to Cloudinary:', error);
      return null;
    }
  };
  

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const uploadedUrl = await uploadToCloudinary(file);
        setImage(uploadedUrl);
      } catch (error) {
        console.error('File upload failed:', error);
      }
    }
  };

  const handleFooterClick = (icon: string) => {
    setSelectedFooter(icon);
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  const handleOxiUploadClick = (inputRef: React.RefObject<HTMLInputElement>) => {
    inputRef.current?.click();
  };

  const handleEditAvailableSlots = () => {
    const profileData = {
      profile_photo: profileImage,
      name,
      email,
      phone,
      oxi_image1: oxiImage1,
      oxi_image2: oxiImage2,
    };
    localStorage.setItem('profileData', JSON.stringify(profileData));
    router.push('/VendorManagementService/WheelVendor/Availableslots');
  };



  return (
    <div className="profile-container">
      <div className="profile-header">
        <FaArrowLeft className="arrow-icon1" />
        <h2 className="profile-title">Profile</h2>
        <FaEdit
          className="edit-icon"
          onClick={handleEditClick}
          style={{ color: 'red', fontSize: '20px', cursor: 'pointer' }}
        />
      </div>

      {/* Profile Image Section */}
      <div className="profile-image-section">
        <div className="profile-image-wrapper">
          <img className="profile-image" src={profileImage} alt="Profile" />
          <FaCamera className="camera-icon" onClick={handleCameraClick} />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={(e) => handleFileChange(e, setProfileImage)}
          />
        </div>
      </div>

      <div className="profile-info">
        <div className="input-group">
          <label htmlFor="name">Name</label>
          <div className="input-wrapper">
            <input
              type="text"
              id="name"
              placeholder="Enter your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!isEditing} // Enable only in edit mode
            />
            {name && isEditing && (
              <FaTimes
                className="clear-icon"
                onClick={() => setName('')}
                style={{ color: 'red' }}
              />
            )}
          </div>
        </div>
        <div className="input-group email-group">
          <label htmlFor="email">Email</label>
          <div className="email-input-wrapper">
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!isEditing} // Enable only in edit mode
            />
            {email && isEditing && (
              <FaTimes
                className="clear-icon"
                onClick={() => setEmail('')}
                style={{ color: 'red' }}
              />
            )}
          </div>
        </div>
        <div className="input-group">
          <label htmlFor="mobile">Mobile Number</label>
          <div className="input-wrapper">
            <input
              type="text"
              id="mobile"
              placeholder="Enter your mobile number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={!isEditing} // Enable only in edit mode
            />
            {phone && isEditing && (
              <FaTimes
                className="clear-icon"
                onClick={() => setPhone('')}
                style={{ color: 'red' }}
              />
            )}
          </div>
        </div>

        {/* Oxi Upload Section */}
        <div className="oxi-upload-section">
          <div className="oxi-upload-container" onClick={() => handleOxiUploadClick(oxiFileInputRef1)}>
            <FaPlusCircle className="plus-icon" style={{ color: 'red', fontSize: '24px' }} />
            {oxiImage1 ? (
              <img src={oxiImage1} alt="Oxi Upload 1" className="oxi-upload-image" />
            ) : (
              <div className="oxi-upload">
                <span>Oxi Image 1</span>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              ref={oxiFileInputRef1}
              style={{ display: 'none' }}
              onChange={(e) => handleFileChange(e, setOxiImage1)}
            />
          </div>
          <div className="oxi-upload-container" onClick={() => handleOxiUploadClick(oxiFileInputRef2)}>
            <FaPlusCircle className="plus-icon" style={{ color: 'red', fontSize: '24px' }} />
            {oxiImage2 ? (
              <img src={oxiImage2} alt="Oxi Upload 2" className="oxi-upload-image" />
            ) : (
              <div className="oxi-upload">
                <span>Oxi Image 2</span>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              ref={oxiFileInputRef2}
              style={{ display: 'none' }}
              onChange={(e) => handleFileChange(e, setOxiImage2)}
            />
          </div>
        </div>

        <div className="input-group">
  <div className="time-label-container">
    <label htmlFor="availableslots">Time</label>
    <button
      className="edit-time-button"
      onClick={handleEditAvailableSlots}
    >
      Edit
    </button>
  </div>

  <div className="time-slots-grid1">
  {(availableslots || '').split(',').map((slot, index) => (
      <button
        key={index}
        className="time-slot1"
        disabled={!isEditing} // Enable editing only when in edit mode
      >
        {slot.trim()} {/* Trim extra spaces if any */}
      </button>
    ))}
  </div>
</div>


      </div>

      {/* Footer with icons */}
      <div className="footer4">
      <div className={`footer-icon ${selectedFooter === 'home' ? 'selected' : ''}`} onClick={() => handleFooterClick('home')}>
          <FontAwesomeIcon icon={faHome} />
          <span>Home</span>
        </div>
        <div className={`footer-icon ${selectedFooter === 'bookings' ? 'selected' : ''}`} onClick={() => handleFooterClick('bookings')}>
          <FontAwesomeIcon icon={faClipboardList} />
          <span>Bookings</span>
        </div>
        <div className={`footer-icon ${selectedFooter === 'notifications' ? 'selected' : ''}`} onClick={() => handleFooterClick('notifications')}>
          <FontAwesomeIcon icon={faBell} />
          <span>Notifications</span>
        </div>
        <div className={`footer-icon ${selectedFooter === 'profile' ? 'selected' : ''}`} onClick={() => handleFooterClick('profile')}>
          <FontAwesomeIcon icon={faUser} />
          <span>Profile</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
