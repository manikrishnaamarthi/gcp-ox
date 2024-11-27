'use client';
import React, { useState, useEffect } from 'react';
import './EditProfile.css';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const EditProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [originalData, setOriginalData] = useState(null);

  const router = useRouter();
  const oxiId = localStorage.getItem('oxi_id');
  if (!oxiId || oxiId === 'Unknown') {
   alert('Invalid user session.');
   return;
  }


  useEffect(() => {
    const oxiId = localStorage.getItem('oxi_id') || 'Unknown';
    if (oxiId === 'Unknown') {
      alert('Invalid user session.');
      router.push('/login');
      return;
    }
    fetchUserData(oxiId);
  }, []);

  const fetchUserData = async (oxiId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/usmapp/usmapp-oxiusers/${oxiId}/`);
      console.log(response.data);
      if (response.status === 200) {
        const data = response.data;
        setName(data.name || '');
        setEmail(data.email || '');
        setMobile(data.phone_number || '');
        setProfileImage(data.profile_photo || '/images/profile.jpg');
        setOriginalData(data);
      } else {
        console.log('Failed to fetch user data:', response);
      }
    } catch (error) {
      console.log('Error fetching user data:', error);
    }
  };

  const handleSave = async () => {
    const oxiId = localStorage.getItem('oxi_id') || 'Unknown';
    if (!oxiId || !originalData) return;

    try {
      setIsSaving(true);

      const formData = new FormData();
      if (name !== originalData.name) formData.append('name', name);
      if (email !== originalData.email) formData.append('email', email);
      if (mobile !== originalData.phone_number) formData.append('phone_number', mobile);

      if (profileImageFile) {
        const cloudinaryData = new FormData();
        cloudinaryData.append('file', profileImageFile);
        cloudinaryData.append('upload_preset', 'signup image'); // Replace with your preset
        const cloudinaryResponse = await fetch(
          'https://api.cloudinary.com/v1_1/ddtfd7o0h/image/upload',
          { method: 'POST', body: cloudinaryData }
        );
        const cloudinaryResult = await cloudinaryResponse.json();
        formData.append('profile_photo', cloudinaryResult.secure_url);
      }

      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }
      

      // const response = await axios.patch(
      //   `http://127.0.0.1:8000/usmapp/usmapp-oxiusers/${oxiId}/`,
      //   formData,
      //   { headers: { 'Content-Type': 'multipart/form-data' } }
      // );
      const response = await fetch(`http://localhost:8000/usmapp/usmapp-oxi/${oxiId}/`, {
        method: 'PATCH',
        credentials: 'include',
        body: formData, // Send FormData instead of JSON
      });
       console.log (formData);
      if (response.status === 200) {
        alert('Profile updated successfully!');
        router.push('/UserProfile');
      } else {
        console.error('Failed to update profile:', response.data);
        alert('Failed to update profile. Please try again.');
      }
    } catch (error) {
      console.log('Error updating profile:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImageFile(file);
      setProfileImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="edit-profile">
      <header className="edit-profile-header">
        <button className="back-btn" onClick={() => router.push('/UserProfile')}>
          Back
        </button>
        <h2>Edit Profile</h2>
        <button className="save-btn" onClick={handleSave} disabled={isSaving}>
          {isSaving ? 'Saving' : 'Save'}
        </button>
      </header>

      <div className="edit-profile-content">
      <div className="plus-icon0" onClick={() => document.getElementById('profileImageInput').click()}>+</div>
        <div className="profile-image-containerp">
          <img src={profileImage} alt="Profile" className="profile-imageb"
           />
          <input
            type="file"
            id="profileImageInput"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
          <button onClick={() => document.getElementById('profileImageInput').click()}>
            Change Photo
          </button>
        </div>

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email ID</label>
          <input
            type="email"
            id="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="mobile">Mobile number</label>
          <input
            type="text"
            id="mobile"
            value={mobile}
            placeholder="Enter your mobile number"
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
