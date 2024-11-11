// EditProfile.jsx
'use client';
import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './EditProfile.css';
import { useRouter } from 'next/navigation';

const EditProfile = () => {
  const userId = '1009917741782859777'; // Ideally, fetch this dynamically based on authenticated user
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [profileImage, setProfileImage] = useState('/images/profile.jpg');
  const [profileImageFile, setProfileImageFile] = useState(null); // To store the selected file
  const [isEditable, setIsEditable] = useState(true); // Set true to make fields editable by default
  const router = useRouter();

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/usmapp/usmapp-oxiusers/1009917741782859777/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Fetched user data:', data); // Log data received from API

          // Set state based on the data fetched from API
          setName(data.name || '');
          setEmail(data.email || '');
          setMobile(data.phone_number || '');
          setProfileImage(data.profileImage || '/images/profile.jpg');
        } else {
          console.error('Error: Response not OK', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('phone_number', mobile);
      if (profileImageFile) {
        formData.append('profile_photo', profileImageFile);
      }

      const response = await fetch(`http://localhost:8000/usmapp/Oxi/${userId}/update_profile/`, {
        method: 'PATCH',
        credentials: 'include',
        body: formData, // Send FormData instead of JSON
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Profile updated:', data);
        alert('Profile updated successfully!');
        setIsEditable(false);
        // Update the profile image if updated
        if (data.profile_photo) {
          setProfileImage(`http://localhost:8000${data.profile_photo}`); // Adjust based on MEDIA_URL
          setProfileImageFile(null); // Reset the file input
        }
      } else {
        const errorData = await response.json();
        console.error('Failed to update profile:', errorData);
        alert('Failed to update profile. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    document.getElementById('profileImageInput').click();
  };

  const handleBack = () => {
    router.push('/user-profile');
  };

  return (
    <div className="edit-profile">
      <header className="edit-profile-header">
        <span className="back-btn" onClick={() => router.push('/UserProfile')}>Back</span>
        <h2>Edit Profile</h2>
        <span className="save-btn" onClick={handleSave}>Save</span>
      </header>

      <div className="edit-profile-content">
        <div className="profile-image-container">
          {profileImage === '/images/profile.jpg' ? (
            <i className="fas fa-user person-icon"></i> // Display person icon if no profile image
          ) : (
            <img
              src={profileImage}
              alt="Profile"
              className="profile-image"
            />
          )}
        </div>

        {isEditable && (
          <div
            className="camera-icon-container"
            onClick={triggerFileInput}
          >
            <i className="fas fa-camera camera-icon"></i>
          </div>
        )}

        <input
          type="file"
          id="profileImageInput"
          style={{ display: 'none' }}
          accept="image/*"
          onChange={handleImageChange}
        />

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
            readOnly={!isEditable}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email ID</label>
          <div className="email-input-wrapper">
            <input
              type="email"
              id="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              readOnly={!isEditable}
            />
            {email && isEditable && (
              <span className="clear-email" onClick={() => setEmail('')}>
                &times;
              </span>
            )}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="mobile">Mobile number</label>
          <input
            type="text"
            id="mobile"
            value={mobile}
            placeholder="Enter your mobile number"
            onChange={(e) => setMobile(e.target.value)}
            readOnly={!isEditable}
          />
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
