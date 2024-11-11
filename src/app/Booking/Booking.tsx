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
import { IoIosArrowBack } from "react-icons/io";

const Booking = () => {
    const [bookings, setBookings] = useState([]);
    const [activeTab, setActiveTab] = useState('MyBooking'); 
    const router = useRouter();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/bookingapp_bookingservice/');
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

    const handleCardClick = (booking) => {
        if (activeTab === 'Completed') {
            router.push(`/Booking/CompleteBooking?id=${booking.id}&status=${booking.booking_status}&serviceType=${booking.service_type}&appointmentDate=${booking.appointment_date}&appointmentTime=${booking.appointment_time}&name=${booking.name}&location=${booking.address}`);
        }
    };

    const handleCancelClick = (booking) => {
        router.push(`/Booking/CancelBooking?id=${booking.id}&status=${booking.booking_status}&serviceType=${booking.service_type}&appointmentDate=${booking.appointment_date}&appointmentTime=${booking.appointment_time}&name=${booking.name}&location=${booking.address}`);
    };
    

    const filteredBookings = bookings.filter((booking) => {
        if (activeTab === 'MyBooking') return true;
        if (activeTab === 'Cancelled') return booking.booking_status.toLowerCase() === 'cancel';
        if (activeTab === 'Completed') return booking.booking_status.toLowerCase() === 'completed';
        return false;
    });

    const [activeFooterIcon, setActiveFooterIcon] = useState('booking');

    const handleFooterIconClick = (icon) => {
        setActiveFooterIcon(icon);
        if (icon === 'home') {
            router.push('/DashBoard/HomePage');
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
                <IoIosArrowBack className="back-button" />
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
                        <article key={booking.id} className="booking-card" onClick={() => handleCardClick(booking)}>
                            <header className="booking-header">
                                <span className={`status ${booking.booking_status.toLowerCase()}`}>{booking.booking_status}</span>
                            </header>
                            <p className="service-name">{booking.service_type}</p>
                            <p className="service-time">
                                {new Date(booking.appointment_date).toLocaleDateString()} {booking.appointment_time}
                                <span className="price">$149</span>
                            </p>
                            <div className="action-buttons">
                                {activeTab === 'MyBooking' && (
                                    <>
                                        <button className="cancel-button" onClick={(e) => {
                                            e.stopPropagation();
                                            handleCancelClick(booking);
                                        }}>Cancel Booking</button>

                                        <button className="reschedule-button">
                                            <FaRedoAlt /> Reschedule
                                        </button>
                                    </>
                                )}
                            </div>
                            <footer className="booking-footer">
                                <div className="service-provider">
                                    <div className="text-content">
                                        <h2>{booking.name}</h2>
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
