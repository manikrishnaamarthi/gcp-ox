'use client';
import React, { useState, useEffect } from 'react';
import { FaHome, FaClock, FaMapMarkerAlt, FaSignOutAlt, FaCartPlus, FaChartArea } from 'react-icons/fa';
import { BiSolidBookAdd } from 'react-icons/bi';
import { MdOutlinePeopleAlt, MdOutlineInventory, MdManageAccounts } from 'react-icons/md';
import { FaPeopleGroup } from 'react-icons/fa6';
import './Booking.css';

interface Booking {
  address: string;
  name: string;
  appointment_date: string;
  appointment_time: string;
  booking_status: string;
  phone_number: string | null;
  email: string | null;
}

const Bookings: React.FC = () => {
  const [selectedClinic, setSelectedClinic] = useState<string>('OxiviveClinic');
  const [selectedStatus, setSelectedStatus] = useState<string>('Booking');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  // Fetch bookings data from the backend API
  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://127.0.0.1:8000/api/bookingapp-bookingservice/');
        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }
        const data = await response.json();
        setBookings(data);
      } catch (err: any) {
        setError(`Error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Filter bookings based on selected status and clinic
  const filteredBookings = bookings.filter(
    (booking) =>
      booking.booking_status.toLowerCase() === selectedStatus.toLowerCase()
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
              className={selectedStatus === 'Pending' ? 'active' : ''}
              onClick={() => setSelectedStatus('Pending')}
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
              className={selectedStatus === 'Cancel' ? 'active' : ''}
              onClick={() => setSelectedStatus('Cancel')}
            >
              Cancelled
            </button>
          </div>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : filteredBookings.length > 0 ? (
          <div className="booking-cards">
            {filteredBookings.map((booking, index) => (
              <div className="booking-card" key={index}>
                <p className="booking-date">
                  Appointment Date: {booking.appointment_date}
                </p>
                <div className="booking-info">
                  <div className="booking-time">
                    <FaClock className="icon" />
                    <span>Time: {booking.appointment_time}</span>
                  </div>
                  <div className="booking-location">
                    <FaMapMarkerAlt className="icon" />
                    <span>Address: {booking.address}</span>
                  </div>
                  <p className="booking-name">
                    Name: {booking.name}
                  </p>
                  <p className={`booking-status ${booking.booking_status.toLowerCase()}`}>
  {booking.booking_status}
</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No bookings found for the selected filters.</p>
        )}
      </main>
    </div>
  );
};

export default Bookings;
