"use client"
import React from 'react';
import { MdAccessTime } from "react-icons/md";
import { SlHome } from "react-icons/sl";
import { LuBookPlus } from "react-icons/lu";
import { IoNotificationsOutline } from "react-icons/io5";
import { BsPerson } from "react-icons/bs";
import { BiArrowBack } from "react-icons/bi";
import './MyBooking.css';
import { useRouter } from 'next/navigation'; // Use next/navigation instead of next/router

const MyBooking: React.FC = () => {
  const router = useRouter(); // Hook to navigate programmatically
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}-${currentDate.toLocaleString('default', { month: 'short' }).toLowerCase()}-${currentDate.getFullYear()}`;

  const bookings = [
    {
      name: "Deepika",
      location: "HSR Layout 2nd Main",
      phone: "123-456-7890",
      timeLeft: "2 hrs 30 min"
    },
    {
      name: "John Doe",
      location: "Koramangala",
      phone: "987-654-3210",
      timeLeft: "1 hr 45 min"
    },
    {
      name: "Jane Smith",
      location: "Indiranagar",
      phone: "456-789-1230",
      timeLeft: "3 hrs 15 min"
    }
  ];

  const handleBackClick = () => {
    router.back(); // Navigate to the previous page using next/navigation
  };

  return (
    <div className="myBookingContainer">
      <div className="header">
        <BiArrowBack 
          className="backArrow" 
          style={{ color: '#FC000E', cursor: 'pointer', }} 
          onClick={handleBackClick} 
        />
        <h1 className="myBookingsTitle">My Bookings</h1>
      </div>
      <div className="tabs">
        <span className="tab">Bookings</span>
        <span className="tab">Cancelled</span>
        <span className="tab">History</span>
      </div>
      <div className="greyBackground">
        {bookings.map((booking, index) => (
          <div className="bookingContainer" key={index}>
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
      </div>
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
