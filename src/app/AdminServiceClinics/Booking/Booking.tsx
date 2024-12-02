"use client"
import React, { useState, useEffect } from 'react';
import Sidebar from "../Sidebar/page";
import {
  FaClock,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import 'chart.js/auto';
import './Booking.css';

// Interfaces for booking data
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
  const [selectedClinic, setSelectedClinic] = useState<string>('OxiClinic'); // Set default to 'OxiClinic'
  const [selectedStatus, setSelectedStatus] = useState<string>('Completed'); // Default status set to 'Completed'
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  // Fetch bookings data from the backend API based on the selected clinic
  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/bookingapp-bookingservice/?clinic=${selectedClinic}`
        );
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
  }, [selectedClinic]);

  // Filter bookings based on selected status and clinic
  const filteredBookings = bookings.filter((booking) => {
    if (selectedStatus === 'History') {
      return (
        booking.booking_status.toLowerCase() === 'completed' ||
        booking.booking_status.toLowerCase() === 'cancel'
      );
    }
    return (
      booking.booking_status.toLowerCase() === selectedStatus.toLowerCase()
    );
  });

  return (
    <div className="app">
      <Sidebar />
      {/* Main Booking List */}
      <main className="booking-list">
        <header>
          <h1>Booking List</h1>
          <p>See the scheduled events from the calendar</p>
        </header>

        {/* Clinic Toggle Buttons */}
        <div className="clinic-toggle-container">
          <div className="clinic-toggle">
            <button
              className={selectedClinic === 'OxiClinic' ? 'active' : ''}
              onClick={() => setSelectedClinic('OxiClinic')}
            >
              OxiClinic
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
              className={selectedStatus === 'Completed' ? 'active' : ''} // Set active for "Completed"
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
            <button
              className={selectedStatus === 'History' ? 'active' : ''}
              onClick={() => setSelectedStatus('History')}
            >
              History
            </button>
          </div>
        </div>

        {/* Booking Cards */}
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : filteredBookings.length > 0 ? (
          <div className="booking-cards">
            {filteredBookings.map((booking, index) => (
              <div className="booking-card" key={index}>
                {/* Booking Date */}
                <p className="booking-date">
                  <span className="booking-day">
                    {new Date(booking.appointment_date).toLocaleDateString(
                      'en-US',
                      { weekday: 'long' }
                    )}
                  </span>
                  <span className="booking-date-only">
                    {new Date(booking.appointment_date).toLocaleDateString(
                      'en-US',
                      { day: '2-digit' }
                    )}
                  </span>
                </p>

                {/* Booking Info */}
                <div className="booking-info">
                  <div className="booking-time">
                    <FaClock className="icon" />
                    <span>Time: {booking.appointment_time}</span>
                  </div>
                  <div className="booking-location">
                    <FaMapMarkerAlt className="icon" />
                    <span>Address: {booking.address}</span>
                  </div>
                  <p className="booking-name">Name: {booking.name}</p>
                  <p
                    className={`booking-status ${booking.booking_status.toLowerCase()}`}
                  >
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
