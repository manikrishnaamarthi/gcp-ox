'use client';
import React, { useState } from 'react';
import { FaArrowLeft, FaPlus } from 'react-icons/fa';
import './doctors.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faClipboardList, faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';

interface Doctor {
  id: number;
  name: string;
  phone: string;
  imageUrl: string;
}

const doctors: Doctor[] = [
  { id: 1, name: 'Praveen', phone: '8975889945', imageUrl: 'https://via.placeholder.com/50' },
  { id: 2, name: 'Saigen', phone: '8855559789', imageUrl: 'https://via.placeholder.com/50' },
  { id: 3, name: 'Amelie', phone: '9658745558', imageUrl: 'https://via.placeholder.com/50' },
  { id: 4, name: 'Jaylen', phone: '9998885566', imageUrl: 'https://via.placeholder.com/50' }
];

const Doctors: React.FC = () => {
  const [selectedFooter, setSelectedFooter] = useState('home');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDoctor, setNewDoctor] = useState({ name: '', phone: '', imageUrl: '' });
  const router = useRouter();

  const handleFooterClick = (footer: string) => {
    setSelectedFooter(footer);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setNewDoctor({ name: '', phone: '', imageUrl: '' }); // Reset newDoctor to initial state
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setNewDoctor({
        ...newDoctor,
        imageUrl: URL.createObjectURL(event.target.files[0])
      });
    }
  };

  const handleSave = () => {
    // Save logic can be added here (e.g., add the new doctor to the list)
    setIsModalOpen(false);
  };

  return (
    <div className="doctors-container">
      <header className="doctors-header">
        <FaArrowLeft className="back-icon" onClick={() => router.push('/VendorManagementService/Vendors/WheelVendor/Clinic')}/>
        <h1>My Doctor's</h1>
        <button className="add-button" onClick={openModal}>
          <FaPlus /> ADD
        </button>
      </header>

      <div className="doctor-list">
        <div className="doctor-headings">
          <p>Name</p>
          <p>Phone no</p>
        </div>
        
        {doctors.map((doctor) => (
          <div key={doctor.id} className="doctor-card">
            <img src={doctor.imageUrl} alt={doctor.name} className="doctor-image" />
            <div className="doctor-info">
              <p className="doctor-name">{doctor.name}</p>
              <p className="doctor-phone">{doctor.phone}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="doctors-footer">
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

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className="image-upload">
              <label htmlFor="file-input">
                <img src={newDoctor.imageUrl || 'https://via.placeholder.com/100'} alt="Doctor" className="doctor-modal-image" />
                <FaPlus className="plus-icon" />
              </label>
              <input id="file-input" type="file" onChange={handleImageUpload} style={{ display: 'none' }} />
            </div>
            <div className="modal-fields">
              <label>Name:</label>
              <input type="text" value={newDoctor.name} onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })} />
              <label>Phone Number:</label>
              <input type="text" value={newDoctor.phone} onChange={(e) => setNewDoctor({ ...newDoctor, phone: e.target.value })} />
            </div>
            <div className="modal-footer">
              <button className="modal-close" onClick={closeModal}>Close</button>
              <button className="modal-save" onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Doctors;
