"use client";
import React, { useState, useEffect } from 'react';
import { MdAccessTime } from "react-icons/md";
import { SlHome } from "react-icons/sl";
import { LuBookPlus } from "react-icons/lu";
import { IoNotificationsOutline } from "react-icons/io5";
import { BsPerson } from "react-icons/bs";
import { BiArrowBack } from "react-icons/bi";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import './MyBooking.css';
import { useRouter } from 'next/navigation';

// Define the types for the booking and error data
interface Booking {
  name: string;
  address: string;
  phone: string;
  timeLeft: string;
  booking_status: 'pending' | 'completed' | 'cancelled';
}

interface Error {
  message: string;
}

const MyBooking: React.FC = () => {
  const router = useRouter();
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}-${currentDate.toLocaleString('default', { month: 'short' }).toLowerCase()}-${currentDate.getFullYear()}`;
  
 
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'bookings' | 'cancelled' | 'history'>('bookings');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/driverapp/booking-service/');
      
      // Check if response is ok
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      
      // Log the result to see the data structure
      console.log('Fetched bookings data:', result);

      // Check if the data structure is as expected and update the state
      if (Array.isArray(result) && result.length > 0) {
        setBookings(result); // Update bookings state with the fetched data
      } else {
        setBookings([]); // Ensure bookings is set as an empty array if no data
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError((error as Error).message);  // Set error if fetch fails
    }
  };

  fetchData();
}, []);



  const handleBackClick = () => {
    router.back();
  };

  const openBookingDetails = (booking: Booking) => {
   
    setSelectedBooking(booking);
  };

  const closeBookingDetails = () => {
    setSelectedBooking(null);
  };

  const openDriverMap = (booking: Booking) => {
    router.push(`/DriverManagementService/VendorDriverBooking/DriverMap?location=${booking.address}`);
  };

  const completeRide = () => {
    if (selectedBooking) {
      const updatedBookings = bookings.map((booking, index) => {
        if (booking === selectedBooking) {
          return { ...booking, status: 'completed' };
        } else if (bookings[index - 1] && bookings[index - 1].booking_status === 'completed' && booking.booking_status === 'cancelled') {
          return { ...booking, status: 'active' };
        }
        return booking;
      });
      setBookings(updatedBookings);

      closeBookingDetails();
    }
  };

 
  return (
    <>
      <div className="myBookingContainer">
        <div className="heading">
          <BiArrowBack className="backArrow" onClick={handleBackClick} />
          <h1 className="myBookingsTitle">My Bookings</h1>
        </div>
        <div className="tabs">
          <span className={`tab ${activeTab === 'bookings' ? 'active' : ''}`} onClick={() => setActiveTab('bookings')}>Bookings</span>
          <span className={`tab ${activeTab === 'cancelled' ? 'active' : ''}`} onClick={() => setActiveTab('cancelled')}>Cancelled</span>
          <span className={`tab ${activeTab === 'history' ? 'active' : ''}`} onClick={() => setActiveTab('history')}>History</span>
        </div>
       
        <div className="greyBackground">
  {activeTab === 'bookings' && bookings.length > 0 ? (
    bookings.map((booking, index) => (
      <div className="bookingContainer" key={index} onClick={() => openBookingDetails(booking)}>
        <div className="bookingDetails">
          <div className="bookingInfo">
            <h2>{booking.name}</h2>
            <p>{booking.address}</p>
            <p>{booking.phone}</p>
          </div>
          <div className="bookingActions">
            <button className="cancelButton">Cancel</button>
            <p className="date">{formattedDate}</p>
            <p className="timeLeft">
              <MdAccessTime /> {booking.timeLeft}
            </p>
          </div>
        </div>
      </div>
    ))
  ) : (
    <p>No bookings available.</p>  // Show a message if no bookings are present
  )}
</div>


        {selectedBooking && (
          <div className="modalOverlay" onClick={closeBookingDetails}>
            <div className="modalContent" onClick={(e) => e.stopPropagation()}>
              <h2 style={{ color: '#FC000E', textAlign: 'center', fontSize: '24px' }}>{selectedBooking.name}</h2>
              <div className="modalDetails">
                <div className="modalInfo">
                  <FaMapMarkerAlt color="#FC000E" size={18} />
                  <p>{selectedBooking.address}</p>
                </div>
                <div className="modalInfo">
                  <FaPhoneAlt color="#FC000E" size={18} />
                  <p>{selectedBooking.phone||'123456789'}</p>
                </div>
                <div className="modalButtons">
                  <button 
                    onClick={() => openDriverMap(selectedBooking)} 
                    style={{ backgroundColor: selectedBooking.booking_status === 'pending' ? '#FC000E' : '#CCCCCC' }}
                    disabled={selectedBooking.booking_status !== 'pending'}
                  >
                    Start
                  </button>
                  <button 
                    onClick={completeRide} 
                    style={{ backgroundColor: selectedBooking.booking_status === 'pending' ? '#FC000E' : '#CCCCCC' }}
                    disabled={selectedBooking.booking_status !== 'pending'}
                  >
                    OTP
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <footer className="footer">
          <div className="footerItem">
            <SlHome className="footerIcon" />
            <p>Home</p>
          </div>
          <div className="footerItem">
            <LuBookPlus className="footerIcon" />
            <p>Booking</p>
          </div>
          <div className="footerItem">
            <IoNotificationsOutline className="footerIcon" />
            <p>Notification</p>
          </div>
          <div className="footerItem">
            <BsPerson className="footerIcon" />
            <p>Profile</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default MyBooking;