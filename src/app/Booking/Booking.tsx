'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import './Booking.css';
import { FaRedoAlt } from 'react-icons/fa';
import { GoHome } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { RxCalendar } from "react-icons/rx";
import { BsPerson } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";

interface Booking {
    
    booking_status: string;
    service_type: string;
    appointment_date: string;
    appointment_time: string;
    name: string;
    address: string;
    booking_id: string;
    phone_number: number;
    user_id: string;
}

const Booking = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [activeTab, setActiveTab] = useState('MyBooking'); 
    const router = useRouter();
    const searchParams = useSearchParams();
    const user_id = searchParams.get('oxi_id')

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/bookingapp-bookingservice/${user_id}/`);
                if (response.ok) {
                    const data = await response.json();
                    console.log('Fetched bookings:', data);
                    // Update the booking status from 'cancel' to 'cancelled'
                    const updatedBookings = data.map((booking: Booking) => ({
                        ...booking,
                        booking_status: booking.booking_status.toLowerCase() === 'cancel' ? 'cancelled' : booking.booking_status,
                    }));
                    setBookings(updatedBookings);
                } else {
                    console.error('Failed to fetch bookings:', response.status);
                }
            } catch (error) {
                console.error('Error fetching booking data:', error);
            }
        };

        fetchBookings();
    }, []);

    const handleCardClick = (booking: Booking) => {
        if (activeTab === 'History') {
            router.push(`/Booking/CompleteBooking?status=${booking.booking_status}&serviceType=${booking.service_type}&appointmentDate=${booking.appointment_date}&appointmentTime=${booking.appointment_time}&name=${booking.name}&location=${booking.address}&booking_id=${booking.booking_id}`);
        }
    };

    const handleCancelClick = (booking: Booking) => {
        router.push(`/Booking/CancelBooking?status=${booking.booking_status}&serviceType=${booking.service_type}&appointmentDate=${booking.appointment_date}&appointmentTime=${booking.appointment_time}&name=${booking.name}&location=${booking.address}&booking_id=${booking.booking_id}`);
    };

    const handleRescheduleClick = (booking: Booking) => {
        localStorage.setItem('bookingData', JSON.stringify(booking));
        router.push(`/Booking/ReschedulePage?booking_id=${booking.booking_id}&oxi_id=${booking.user_id}&date=${booking.appointment_date}&time=${booking.appointment_time}}&name=${booking.name}&location=${booking.address}`);
    };
    

    const filteredBookings = bookings.filter((booking) => {
        const today = new Date();
        const todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate()); // Start of today
        const bookingDate = new Date(booking.appointment_date);
    
        // Include only bookings that match today's date
        if (activeTab === 'MyBooking') {
            return (
                bookingDate.getFullYear() === todayDateOnly.getFullYear() &&
                bookingDate.getMonth() === todayDateOnly.getMonth() &&
                bookingDate.getDate() === todayDateOnly.getDate()
            );
        }
        if (activeTab === 'Cancelled') {
            return booking.booking_status.toLowerCase() === 'cancelled';
        }
        if (activeTab === 'History') {
            return ['completed', 'cancelled'].includes(booking.booking_status.toLowerCase());
        }
        return false;
    });
    

    const [activeFooterIcon, setActiveFooterIcon] = useState('booking');

    const handleFooterIconClick = (icon: string) => {
        setActiveFooterIcon(icon);
        if (icon === 'home') {
            router.push('/DashBoard/HomePage');
        } else if (icon === 'search') {
            router.push('/DashBoard/SearchPage');
        } else if (icon === 'booking') {
            router.push(`/Booking`);
        } else if (icon === 'profile') {
            router.push('/UserProfile');
        }
    };

    const footerIconStyle = (icon: string) => ({
        color: activeFooterIcon === icon ? '#FC000E' : 'rgb(151, 147, 147)',
    });

    const handleBackClick = () => {
        router.back();
    };

    const calculateTimeRemaining = (appointmentDate: string, appointmentTime: string) => {
        const now = new Date();
        const bookingDateTime = new Date(`${appointmentDate}T${appointmentTime}`);
        const difference = bookingDateTime.getTime() - now.getTime();

        if (difference <= 0) return 'Time passed';

        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

        return `${hours > 0 ? `${hours}h ` : ''}${minutes}m left`;
    };

    return (
        <div className='container'>
            <header className='header'>
                <IoIosArrowBack className="back-button" onClick={handleBackClick}/>
                <h1 className="title">My Bookings</h1>
            </header>
            <div className='container-header'>
                <button className={`tab ${activeTab === 'MyBooking' ? 'active' : ''}`} onClick={() => setActiveTab('MyBooking')}>My Booking</button>
                <button className={`tab ${activeTab === 'Cancelled' ? 'active' : ''}`} onClick={() => setActiveTab('Cancelled')}>Cancelled</button>
                <button className={`tab ${activeTab === 'History' ? 'active' : ''}`} onClick={() => setActiveTab('History')}>History</button>
            </div>
            <section className="booking-list">
                {filteredBookings.length > 0 ? (
                    filteredBookings.map((booking) => (
                        <article key={booking.booking_id} className="booking-card" onClick={() => handleCardClick(booking)}>
                            {activeTab !== 'MyBooking' && (
                                <header className="booking-header">
                                    <span className={`status ${booking.booking_status.toLowerCase()}`}>{booking.booking_status}</span>
                                </header>
                            )}
                            <p className="service-name">{booking.service_type}</p>
                            {/* Address */}
                            <p className="booking-address">Address: {booking.address}</p>
                            {/* Phone Number */}
                            <p className="booking-phone">Phone: {booking.phone_number || 'N/A'}</p>
                            <p className="service-time">
                                {new Date(booking.appointment_date).toLocaleDateString()} {booking.appointment_time}
                                <span className="price">₹149</span>
                            </p>
                            <p className="time-remaining">
                                 {calculateTimeRemaining(booking.appointment_date, booking.appointment_time)}
                            </p>
                            <div className="action-buttons">
                                {activeTab === 'MyBooking' && (
                                    <>
                                        <button className="cancel-button" onClick={(e) => {
                                            e.stopPropagation();
                                            handleCancelClick(booking);
                                        }}>Cancel Booking</button>
                                        <button
                                            className="reschedule-button"
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent the card's click event
                                                handleRescheduleClick(booking);
                                            }}
                                        >
                                            <FaRedoAlt /> Reschedule
                                        </button>

                                    </>
                                )}
                            </div>
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
