'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import './Booking.css';
import { FaRedoAlt, FaStar } from 'react-icons/fa';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { GoHome } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { RxCalendar } from "react-icons/rx";
import { BsPerson } from "react-icons/bs";

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
                    console.log('Fetched bookings:', data); // Check the response data here
                    setBookings(data);
                } else {
                    console.error('Failed to fetch bookings:', response.status);
                }
            } catch (error) {
                console.error('Error fetching booking data:', error);
            }
        };

        fetchBookings();
    }, []);

    const handleCardClick = () => {
        if (activeTab === 'Completed') {
            router.push(`/Booking/CompleteBooking/`);
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

    const [activeFooterIcon, setActiveFooterIcon] = useState('home');

    const handleFooterIconClick = (icon) => {
        setActiveFooterIcon(icon);
        if (icon === 'home') {
            router.push('/');
        } else if (icon === 'search') {
            router.push('/DashBoard/SearchPage');
        } else if (icon === 'booking') {
            router.push('/Booking');
        } else if (icon === 'profile') {
            router.push('/UserProfile');
        }
    };
  
    const footerIconStyle = (icon) => ({
        color: activeFooterIcon === icon ? '#FC000E' : 'rgb(151, 147, 147)',
    });

    return (
        <div className='container'>
            <header className='header'>
                <MdOutlineKeyboardBackspace className="back-button" />
                <h1 className="title">My Bookings</h1>
            </header>
            <div className='container-header'>
                <button className={`tab ${activeTab === 'MyBooking' ? 'active' : ''}`} onClick={() => setActiveTab('MyBooking')}>My Booking</button>
                <button className={`tab ${activeTab === 'Cancelled' ? 'active' : ''}`} onClick={() => setActiveTab('Cancelled')}>Cancelled</button>
                <button className={`tab ${activeTab === 'Completed' ? 'active' : ''}`} onClick={() => setActiveTab('Completed')}>Completed</button>
            </div>
            <section className="booking-list">
                {filteredBookings.length > 0 ? (
                    filteredBookings.map((booking) => (
                        <article key={booking.id} className="booking-card" onClick={handleCardClick}>
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
                                        <button className="cancel-button" onClick={handleCancelClick}>Cancel Booking</button>
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
                    ))
                ) : (
                    <p>No bookings available</p>
                )}
                <div className="footer-section">
                    <div className="footer-icon" style={footerIconStyle('home')} onClick={() => handleFooterIconClick('home')}>
                        <GoHome size={24} />
                        <span className="footer-header" style={{ color: footerIconStyle('home').color }}>Home</span>
                    </div>
                    <div className="footer-icon" style={footerIconStyle('search')} onClick={() => handleFooterIconClick('search')}>
                        <CiSearch size={24} />
                        <span className="footer-header" style={{ color: footerIconStyle('search').color }}>Search</span>
                    </div>
                    <div className="footer-icon" style={footerIconStyle('booking')} onClick={() => handleFooterIconClick('booking')}>
                        <RxCalendar size={24} />
                        <span className="footer-header" style={{ color: footerIconStyle('booking').color }}>Booking</span>
                    </div>
                    <div className="footer-icon" style={footerIconStyle('profile')} onClick={() => handleFooterIconClick('profile')}>
                        <BsPerson size={28} />
                        <span className="footer-header" style={{ color: footerIconStyle('profile').color }}>Profile</span>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Booking;
