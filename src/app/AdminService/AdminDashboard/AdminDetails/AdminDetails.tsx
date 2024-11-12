'use client';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { FaHome, FaCartPlus, FaChartArea,FaSignOutAlt } from 'react-icons/fa';
import { BiSolidBookAdd } from 'react-icons/bi';
import { MdOutlinePeopleAlt, MdOutlineInventory, MdManageAccounts } from 'react-icons/md';
import { FaPeopleGroup } from 'react-icons/fa6';
import './AdminDetails.css';

const AdminDetails = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const name = searchParams.get('name');
  const profile_photo = searchParams.get('profile_photo');
  const selectedService = searchParams.get('selectedService');
  const address = searchParams.get('address');
  const email = searchParams.get('email');
  const phone = searchParams.get('phone');
  const pan_front_side = searchParams.get('pan_front_side');
  const gstNumber = searchParams.get('gstNumber');
  const aadhar_front_side = searchParams.get('aadhar_front_side');
  const aadhar_back_side = searchParams.get('aadhar_back_side');
  const pan_back_side = searchParams.get('pan_back_side');
  const licence_end_date = searchParams.get('licence_end_date');
  const medical_front_side = searchParams.get('medical_front_side');
  const medical_back_side = searchParams.get('medical_back_side');
  const medical_licence_number = searchParams.get('medical_licence_number');
  const driving_front_side = searchParams.get('driving_front_side');
  const driving_back_side = searchParams.get('driving_back_side');
  const driving_licence_number = searchParams.get('driving_licence_number');
  const vehicle_rc_front_side = searchParams.get('vehicle_rc_front_side');
  const vehicle_rc_back_side = searchParams.get('vehicle_rc_back_side');

  if (!name) return <p>Loading...</p>; // Display loading until data is available

  return (
    <div className="admin-details">
      <aside className="admin-sidebar">
        <div className="logo">
          <img src="/images/shot(1).png" alt="Logo" />
          <p>Super Admin</p>
        </div>
        
        <nav className="sidebar-icons">
          <div className="sidebar-icon" data-name="Admin">
            <FaHome />
          </div>
          <div className="sidebar-icon" data-name="Invoice">
            <FaCartPlus />
          </div>
          <div className="sidebar-icon" data-name="Booking">
            <BiSolidBookAdd />
          </div>
          <div className="sidebar-icon" data-name="Vendor Approval">
            <FaPeopleGroup />
          </div>
          <div className="sidebar-icon" data-name="Revenue">
            <FaChartArea />
          </div>
          <div className="sidebar-icon" data-name="Manage Service">
            <MdManageAccounts />
          </div>
          <div className="sidebar-icon" data-name="Inventory">
            <MdOutlineInventory />
          </div>
          <div className="sidebar-icon" data-name="Vendor">
            <MdOutlinePeopleAlt />
          </div>
          <div className="sidebar-icon logout-icon" data-name="Logout"><FaSignOutAlt /></div>
        </nav>
      </aside>
      
      <main className="content">
        <h2 className="page-title">Vendor Details</h2>

        <section className="vendor-info-page">
          <div className="profile">
            <img src={`${profile_photo}`} alt="Profile" className="profile-pic" />
            <div className="profile-details">
              <h3>{name}</h3>
              <p>{address}</p>
            </div>
          </div>

          <div className="info-details">
            <p><strong>Oxi Type:</strong> {selectedService}</p>
            <p><strong>Email ID:</strong> {email}</p>
            <p><strong>Phone:</strong> {phone}</p>
            <p><strong>PAN Number:</strong> {pan_front_side}</p>
            <p><strong>GST Number:</strong> {gstNumber}</p>
            <div className="action-buttons">
              <button className="approve">Approve</button>
              <button className="reject">Reject</button>
            </div>
          </div>

          <section className="documents">
            <h3>Aadhar Card</h3>
            <div className="document-row">
              <img src={`${aadhar_front_side}`} alt="Aadhar Front" />
              <img src={`${aadhar_back_side}`} alt="Aadhar Back" />
            </div>

            <h3>PAN Card</h3>
            <div className="document-row">
              <img src={`${pan_front_side}`} alt="PAN Front" />
              <img src={`${pan_back_side}`} alt="PAN Back" />
            </div>

            {selectedService === 'Oxi Clinic' && (
              <>
                <h3>Medical License</h3>
                <div className="document-row">
                  <p><img src={`${medical_front_side}`} alt="Medical Front" />Medical Licence Number: {medical_licence_number}</p>
                  <p><img src={`${medical_back_side}`} alt="Medical Back" />Medical Licence Exp Date: {licence_end_date}</p>
                </div>
              </>
            )}

            {selectedService === 'Oxi Wheel' && (
              <>
                <h3>Driving License</h3>
                <div className="document-row">
                  <p><img src={`${driving_front_side}`} alt="Driving Front" />Driving Licence Number: {driving_licence_number}</p>
                  <p><img src={`${driving_back_side}`} alt="Driving Back" /></p>
                </div>

                <h3>Vehicle Registration</h3>
                <div className="document-row">
                  <p><img src={`${vehicle_rc_front_side}`} alt="Vehicle Front" /></p>
                  <p><img src={`${vehicle_rc_back_side}`} alt="Vehicle Back" /></p>
                </div>
              </>
            )}
          </section>
        </section>
      </main>
    </div>
  );
};

export default AdminDetails;
