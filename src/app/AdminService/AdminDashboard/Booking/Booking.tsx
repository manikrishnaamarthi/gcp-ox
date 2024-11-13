"use client"
import React, { useState, useEffect } from 'react';
import { FaHome, FaClock, FaMapMarkerAlt, FaSignOutAlt } from 'react-icons/fa';
import { BiSolidBookAdd } from "react-icons/bi";
import { FaCartPlus } from "react-icons/fa";
import { MdOutlinePeopleAlt, MdOutlineInventory, MdManageAccounts } from "react-icons/md";
import { FaPeopleGroup } from 'react-icons/fa6';
import { FaChartArea } from "react-icons/fa";
import './Booking.css';

const Bookings = () => {
  const [selectedClinic, setSelectedClinic] = useState('OxiviveClinic');
  const [selectedStatus, setSelectedStatus] = useState('Booking');
  const [bookings, setBookings] = useState([]); // state to store the fetched bookings
  const [loading, setLoading] = useState(true); // loading state for API request
  const [error, setError] = useState(''); // error state to handle any errors

  // Fetch bookings data from the backend API
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // Replace with your API endpoint
        const response = await fetch('http://127.0.0.1:8000/api/bookingapp-bookingservice/');
        console.log(response)
        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }
        const data = await response.json();
        setBookings(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBookings();
  }, []); // Empty dependency array means this will run only once when the component mounts

  const filteredBookings = bookings.filter(
    (booking) => booking.status === selectedStatus && booking.clinic === selectedClinic
  );

  return (
    <div className="app">
      <aside className="admin-sidebar">
        <div className="logo">
          <img src="/images/shot(1).png" alt="Logo" />
          <p>Super Admin</p>
        </div>
        
        <nav className="sidebar-icons">
          <div className="sidebar-icon" data-name="Admin"><FaHome /></div>
          <div className="sidebar-icon" data-name="Invoice"><FaCartPlus /></div>
          <div className="sidebar-icon" data-name="Booking"><BiSolidBookAdd /></div>
          <div className="sidebar-icon" data-name="Vendor Approval"><FaPeopleGroup /></div>
          <div className="sidebar-icon" data-name="Revenue"><FaChartArea /></div>
          <div className="sidebar-icon" data-name="Manage Service"><MdManageAccounts /></div>
          <div className="sidebar-icon" data-name="Inventory"><MdOutlineInventory /></div>
          <div className="sidebar-icon" data-name="Vendor"><MdOutlinePeopleAlt /></div>
          <div className="sidebar-icon logout-icon" data-name="Logout"><FaSignOutAlt /></div>
        </nav>
      </aside>

      <main className="booking-list">
        <header>
          <h1>Booking List</h1>
          <p>See the scheduled events from the calendar</p>
        </header>

        {/* Clinic Toggle Buttons */}
        <div className="clinic-toggle-container">
          <div className="clinic-toggle">
            <button
              className={selectedClinic === 'OxiviveClinic' ? 'active' : ''}
              onClick={() => setSelectedClinic('OxiviveClinic')}
            >
              OxiviveClinic
            </button>
            <button
              className={selectedClinic === 'OxiWheel' ? 'active' : ''}
              onClick={() => setSelectedClinic('OxiWheel')}
            >
              OxiWheel
            </button>
          </div>
        </div>

        {/* Status Toggle Buttons */}
        <div className="status-toggle-container">
          <div className="status-toggle">
            <button
              className={selectedStatus === 'Booking' ? 'active' : ''}
              onClick={() => setSelectedStatus('Booking')}
            >
              Booking
            </button>
            <button
              className={selectedStatus === 'Completed' ? 'active' : ''}
              onClick={() => setSelectedStatus('Completed')}
            >
              Completed
            </button>
            <button
              className={selectedStatus === 'Cancelled' ? 'active' : ''}
              onClick={() => setSelectedStatus('Cancelled')}
            >
              Cancelled
            </button>
          </div>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <div className="booking-cards">
            {filteredBookings.map((booking, index) => (
              <div className="booking-card" key={index}>
                <p className="booking-date">{booking.date}</p>
                <div className="booking-info">
                  <div className="booking-time">
                    <FaClock className="icon" />
                    <span>{booking.time}</span>
                  </div>
                  <div className="booking-location">
                    <FaMapMarkerAlt className="icon" />
                    <span>{booking.location}</span>
                  </div>
                  <p className="booking-name">{booking.name}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Bookings;
