'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import './Booking.css';
import { FaRedoAlt, FaStar } from 'react-icons/fa';

const Booking = () => {
    const [bookings, setBookings] = useState([]);
    const [activeTab, setActiveTab] = useState('MyBooking'); 
    const router = useRouter();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/my-bookings/');
                if (response.ok) {
                    const data = await response.json();
                    setBookings(data);
                } else {
                    console.error('Failed to fetch bookings');
                }
            } catch (error) {
                console.error('Error fetching booking data:', error);
            }
        };

        fetchBookings();
    }, []);

    const handleCardClick = () => {
      if (activeTab === 'Completed') {
          router.push(`/Booking/CompleteBooking/`); // Navigate to the completed booking page with the booking ID
      }
  };

    const handleCancelClick = () => {
      router.push(`/Booking/CancelBooking/`);
  };

    const filteredBookings = bookings.filter((booking) => {
        if (activeTab === 'MyBooking') return true;
        if (activeTab === 'Cancelled') return booking.status.toLowerCase() === 'cancelled';
        if (activeTab === 'Completed') return booking.status.toLowerCase() === 'completed';
        return false;
    });

    return (
        <div className='container'>
            <header className='container-header'>
                <button className={`tab ${activeTab === 'MyBooking' ? 'active' : ''}`} onClick={() => setActiveTab('MyBooking')}>MyBooking</button>
                <button className={`tab ${activeTab === 'Cancelled' ? 'active' : ''}`} onClick={() => setActiveTab('Cancelled')}>Cancelled</button>
                <button className={`tab ${activeTab === 'Completed' ? 'active' : ''}`} onClick={() => setActiveTab('Completed')} >Completed</button>
            </header>
            <section className="booking-list">
                {filteredBookings.map((booking) => (
                    <article key={booking.id} className="booking-card" onClick={() => handleCardClick()}>
                        <header className="booking-header">
                            <span className={`status ${booking.status.toLowerCase()}`}>{booking.status}</span>
                        </header>
                        <p className="service-name">{booking.service_type}</p>
                        <p className="service-time">
                            {new Date(booking.date).toLocaleDateString()} {booking.time}
                            <span className="price">$149</span>
                        </p>
                        <div className="action-buttons">
                            {activeTab === 'MyBooking' && (
                                <>
                                    <button className="cancel-button" onClick={() => handleCancelClick(booking.id)}>Cancel Booking</button>
                                    <button className="reschedule-button">
                                        <FaRedoAlt /> Reschedule
                                    </button>
                                </>
                            )}
                        </div>
                        <footer className="booking-footer">
                            <div className="service-provider">
                                <div className="text-content">
                                    <h2>Akshay Kumar</h2>
                                </div>
                                <img src="/images/doctor.png" alt="Service Provider" className="provider-image" />
                            </div>
                        </footer>
                    </article>
                ))}
            </section>
        </div>
    );
};

export default Booking;
