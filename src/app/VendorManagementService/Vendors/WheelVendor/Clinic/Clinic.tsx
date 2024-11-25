'use client';
import React, { useState,useEffect } from 'react';
import './Clinic.css';
import { FaHome, FaCalendarAlt, FaBell, FaUser, FaRegBell, FaRegAddressBook, FaFileInvoiceDollar, FaUserMd ,FaUsers} from 'react-icons/fa';
import { BsGraphUpArrow } from 'react-icons/bs';
import { MdInventory } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faClipboardList, faBell, faUser } from '@fortawesome/free-solid-svg-icons';

const Clinic = () => {
  const [selectedFooter, setSelectedFooter] = useState<string>('home'); // Declare state for selected footer
  const router = useRouter();
  

  const handleFooterClick = (section: string) => {
    setSelectedFooter(section); // Update the selected footer section
  };
  useEffect(() => {
    document.body.classList.add('clinic');
    return () => document.body.classList.remove('clinic');
  }, []);

  const vendorId = localStorage.getItem('vendor_id'); // Retrieve vendor_id from local storage

  const handleDoctorCardClick = () => {
      console.log('Navigating with Vendor ID:', vendorId);
      router.push(`/VendorManagementService/ClinicVendor/MyDoctors?vendor_id=${vendorId}`);
  };

  const handleStaffCardClick = () => {
    console.log('Navigating with Vendor ID:', vendorId);
    router.push(`/VendorManagementService/ClinicVendor/MyStaff?vendor_id=${vendorId}`);
};
  

  return (
    <div className="clinic-containers6">
      <header className="headera">
        <div className="logoContainer">
          <img src="/images/shot(1).png" alt="OxiWheel Logo" className="logo" />
        </div>
        <h1 className="titlea">
          <span className="welcome">Welcome to</span>
          <span className="oxiClinics">OxiClinic</span>
        </h1>
        <FaRegBell className="notificationIcon" />
      </header>

      <div className="main">
        <div className="grid">
          <div className="card" onClick={() => router.push('/VendorManagementService/ClinicVendor/ClinicPerformance')}>
            <BsGraphUpArrow className="cardIcon" />
            <p className="label">Dashboard</p>
          </div>
          <div className="card" onClick={() => router.push('/VendorManagementService/ClinicVendor/MyBookings')}>
            <FaRegAddressBook className="cardIcon" />
            <p className="label">Bookings</p>
          </div>
          <div className="card" onClick={() => router.push('/VendorManagementService/ClinicVendor/Inventory')}>
            <MdInventory className="cardIcon" />
            <p className="label">Inventory</p>
          </div>
          <div className="card" onClick={() => router.push('/VendorManagementService/ClinicVendor/Invoice')}>
            <FaFileInvoiceDollar className="cardIcon" />
            <p className="label">Invoice</p>
          </div>
          <div className="card" onClick={handleDoctorCardClick}>
            <FaUserMd className="cardIcon" />
            <p className="label">Doctor's</p>
          </div>
          <div className="card" onClick={handleStaffCardClick}>
            <FaUsers className="cardIcon" />
            <p className="label">Staff</p>
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="clinic-footer">
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

export default Clinic;
