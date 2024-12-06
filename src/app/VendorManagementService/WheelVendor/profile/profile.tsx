'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './profile.css';
import axios from 'axios';
import { FaCamera, FaArrowLeft, FaTimes, FaPlusCircle, FaEdit } from 'react-icons/fa';
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
  const [availableslots, setAvailableslots] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false); // For logout popup
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const oxiFileInputRef1 = useRef<HTMLInputElement | null>(null);
  const oxiFileInputRef2 = useRef<HTMLInputElement | null>(null);
  const vendorId = 'SP-28407';

  useEffect(() => {
    const fetchVendorData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/vendorapp-vendordetails/${vendorId}/`);
        const fetchedSlots = response.data.available_slots;
        setProfileImage(response.data.profile_photo);
        setEmail(response.data.email);
        setName(response.data.name);
        setPhone(response.data.phone);
        setOxiImage1(response.data.oxi_image1);
        setOxiImage2(response.data.oxi_image2);

        // Load selected slots from localStorage or API
        const savedSlots = localStorage.getItem('selectedSlots');
        if (savedSlots) {
          setAvailableslots(JSON.parse(savedSlots)); // Load from localStorage
        } else {
          setAvailableslots(fetchedSlots); // Default to API fetched data
        }
      } catch (error) {
        console.log('Error fetching vendor data:', error);
        setAvailableslots([]);
      }
    };
    fetchVendorData();
  }, []);

  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'documents_all'); // Ensure this is correct
    formData.append('cloud_name', 'dpysjcjbf'); // Ensure this is correct

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dpysjcjbf/image/upload',
        formData
      );
      return response.data.secure_url; // This should return the URL of the uploaded image
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      throw new Error('Cloudinary upload failed');
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

  const handleOxiUploadClick = (fileInputRef: React.RefObject<HTMLInputElement>) => {
    fileInputRef.current?.click();
  };

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  const handleSaveProfile = async () => {
    const vendorId = 'SP-28407'; // Vendor ID
    let uploadedOxiImage1 = oxiImage1;
    let uploadedOxiImage2 = oxiImage2;

    try {
      if (fileInputRef.current?.files?.[0]) {
        const profileFile = fileInputRef.current.files[0];
        const profileImageUrl = await uploadToCloudinary(profileFile);
        setProfileImage(profileImageUrl);
      }

      if (oxiFileInputRef1.current?.files?.[0]) {
        const oxiFile1 = oxiFileInputRef1.current.files[0];
        uploadedOxiImage1 = await uploadToCloudinary(oxiFile1);
      }

      if (oxiFileInputRef2.current?.files?.[0]) {
        const oxiFile2 = oxiFileInputRef2.current.files[0];
        uploadedOxiImage2 = await uploadToCloudinary(oxiFile2);
      }

      const savedSlots = JSON.parse(localStorage.getItem('selectedSlots') || '[]');
      const formattedSlots = JSON.stringify(savedSlots);

      const updatedData = {
        profile_photo: profileImage,
        name,
        email,
        phone,
        oxi_image1: uploadedOxiImage1,
        oxi_image2: uploadedOxiImage2,
        available_slots: formattedSlots,
      };

      const response = await axios.patch(
        `http://127.0.0.1:8000/api/vendorapp-vendordetails/${vendorId}/`,
        updatedData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        alert('Vendor details updated successfully!');
        const updatedResponse = await axios.get(
          `http://127.0.0.1:8000/api/vendorapp-vendordetails/${vendorId}/`
        );
        setProfileImage(updatedResponse.data.profile_photo);
        setEmail(updatedResponse.data.email);
        setName(updatedResponse.data.name);
        setPhone(updatedResponse.data.phone);
        setOxiImage1(updatedResponse.data.oxi_image1);
        setOxiImage2(updatedResponse.data.oxi_image2);
        setAvailableslots(JSON.parse(updatedResponse.data.available_slots || '[]'));
        setIsEditing(false);
      } else {
        alert('Failed to update vendor details.');
      }
    } catch (error) {
      console.log('Error updating vendor details:', error);
      alert('An error occurred while updating vendor details.');
    }
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

  const handleConfirmLogout = () => {
    localStorage.removeItem('oxi_id'); // Clear oxi_id from storage
    sessionStorage.clear(); // Clear session storage
    router.push('/UserAuthentication/LoginPage'); // Redirect to login page
  };

  const handleCancelLogout = () => {
    setShowLogoutPopup(false); // Close the logout popup
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
      <FaArrowLeft 
  className="arrow-icon1" 
  onClick={() => router.push('/VendorManagementService/Vendors/WheelVendor/Wheel')} 
/>

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
  {(Array.isArray(availableslots) 
    ? availableslots 
    : (availableslots || '').split(',')
  ).map((slot: string, index: React.Key | null | undefined) => (
    <button key={index} className="time-slot1">
      {slot.trim().replace(/["[\]]/g, '')} {/* Clean unwanted characters */}
    </button>
  ))}
</div>

  
</div>
{/* Save Button */}
<div className="save-button-container">
        <button
          className="save-button3"
          onClick={handleSaveProfile}
        >
          Save
        </button>
        <button className="logout-button2" onClick={() => setShowLogoutPopup(true)}>
          Logout
        </button>
      </div>
      </div>

      {showLogoutPopup && (
        <div className="logout-popup">
          <div className="popup-content">
            <h1>Log out</h1>
            <p>Are you sure you want to logout?</p>
            <button className="logout-btn" onClick={handleConfirmLogout}>
              Logout
            </button>
            <button className="cancel-btn" onClick={handleCancelLogout}>
              Cancel
            </button>
          </div>
        </div>
      )}
      
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
