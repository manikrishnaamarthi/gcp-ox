"use client"
import React, { useState } from 'react';
import { MdAccessTime } from "react-icons/md";
import { SlHome } from "react-icons/sl";
import { LuBookPlus } from "react-icons/lu";
import { IoNotificationsOutline } from "react-icons/io5";
import { BsPerson } from "react-icons/bs";
import { BiArrowBack } from "react-icons/bi";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import './MyBooking.css';
import { useRouter } from 'next/navigation';

const MyBooking: React.FC = () => {
  const router = useRouter();
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}-${currentDate.toLocaleString('default', { month: 'short' }).toLowerCase()}-${currentDate.getFullYear()}`;
  
  const [activeTab, setActiveTab] = useState('bookings');
  const [selectedBooking, setSelectedBooking] = useState(null);

  const [bookings, setBookings] = useState([
    { name: "Deepak", location: "No 3, Maha Laxmi Nagar7-40-1/2, Maha Laxmi Nagar Rd Karri Satyavathi Nagar Tadepalligudem, Andhra Pradesh", phone: "6303872390", timeLeft: "2 hrs 30 min", status: "active" },
    { name: "John Doe", location: "13/1113, Ungarala Vari St, Ramarao Peta, Ambedkar Nagar, Tadepalligudem, Andhra Pradesh", phone: "987-654-3210", timeLeft: "1 hr 45 min", status: "inactive" },
    { name: "Jane Smith", location: "Indiranagar", phone: "456-789-1230", timeLeft: "3 hrs 15 min", status: "inactive" }
  ]);

  const handleBackClick = () => {
    router.back();
  };

  const openBookingDetails = (booking) => {
    setSelectedBooking(booking);
  };

  const closeBookingDetails = () => {
    setSelectedBooking(null);
  };

  const openDriverMap = (booking) => {
    router.push(`/DriverManagementService/VendorDriverBooking/DriverMap?location=${booking.location}`);
  };

  const completeRide = () => {
    if (selectedBooking) {
      const updatedBookings = bookings.map((booking, index) => {
        if (booking === selectedBooking) {
          return { ...booking, status: 'completed' };
        } else if (bookings[index - 1] && bookings[index - 1].status === 'completed' && booking.status === 'inactive') {
          return { ...booking, status: 'active' };
        }
        return booking;
      });

      setBookings(updatedBookings);
      closeBookingDetails();
    }
  };

  return (
    <div className="myBookingContainer">
      <div className="header">
        <BiArrowBack className="backArrow" onClick={handleBackClick} />
        <h1 className="myBookingsTitle">My Bookings</h1>
      </div>
      <div className="tabs">
        <span className={`tab ${activeTab === 'bookings' ? 'active' : ''}`} onClick={() => setActiveTab('bookings')}>Bookings</span>
        <span className={`tab ${activeTab === 'cancelled' ? 'active' : ''}`} onClick={() => setActiveTab('cancelled')}>Cancelled</span>
        <span className={`tab ${activeTab === 'history' ? 'active' : ''}`} onClick={() => setActiveTab('history')}>History</span>
      </div>
      <div className="greyBackground">
        {activeTab === 'bookings' && bookings.map((booking, index) => (
          <div className="bookingContainer" key={index} onClick={() => openBookingDetails(booking)}>
            <div className="bookingDetails">
              <div className="bookingInfo">
                <h2>{booking.name}</h2>
                <p>{booking.location}</p>
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
        ))}
        {/* Other tabs... */}
      </div>

      {selectedBooking && (
        <div className="modalOverlay" onClick={closeBookingDetails}>
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <h2 style={{ color: '#FC000E', textAlign: 'center',fontSize :'24px' }}>{selectedBooking.name}</h2>
            <div className="modalDetails">
              <div className="modalInfo">
                <FaMapMarkerAlt color="#FC000E" />
                <p>{selectedBooking.location}</p>
              </div>
              <div className="modalInfo">
                <FaPhoneAlt color="#FC000E" />
                <p>{selectedBooking.phone}</p>
              </div>
              <div className="modalButtons">
                <button 
                  onClick={() => openDriverMap(selectedBooking)} 
                  style={{ backgroundColor: selectedBooking.status === 'active' ? '#FC000E' : '#CCCCCC' }}
                  disabled={selectedBooking.status !== 'active'}
                >
                  Start
                </button>
                <button 
                  onClick={completeRide} 
                  style={{ backgroundColor: selectedBooking.status === 'active' ? '#FC000E' : '#CCCCCC' }}
                  disabled={selectedBooking.status !== 'active'}
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
  );
};

export default MyBooking;
