'use client'
import React from 'react';
import './Booking.css';
import { FaHome, FaSearch, FaCalendarAlt, FaUser, FaRedoAlt } from 'react-icons/fa'; // Import FaRedoAlt for reschedule icon
import { useRouter } from 'next/navigation';
import { FaStar } from "react-icons/fa";

const Booking = () => {
    const router = useRouter();
    const handleCancelClick = () => {
        router.push('/Booking/CancelBooking'); // Update the path as per your appointment page route
      };
  return (
    <div className='container'>
        <header className='container-header'>
            <button className="tab active">MyBooking</button>
            <button className="tab" >Cancelled</button>
            <button className="tab">Completed</button>
        </header>
        <section className="booking-list">
        

      
        <article className="booking-card">
          <header className="booking-header">
            <a href="#" className="booking-id">#524587</a>
            <span className="status accepted">Accepted</span>
          </header>
          <p className="service-name">Oxi Clinic</p>
          <p className="service-time">22 Sep 21, 03:00 - 04:30 PM<span className="price">$149</span></p>
          
          <div className="action-buttons">
            <button className="cancel-button" onClick={handleCancelClick}>Cancel Booking</button>
            <button className="reschedule-button">
              <FaRedoAlt />
              Reschedule
            </button>
          </div>
          <footer className="booking-footer">
            <div className="service-provider">
            <div className="text-content">
                <h2>Akshay Kumar</h2>
                <p><span><FaStar />&nbsp;4.7&nbsp;</span> 192 Ratings</p>
              </div>
              <img src="/images/doctor.png" alt="Service Provider" className="provider-image" />
            </div>
            
          </footer>
        </article>

        <article className="booking-card">
          <header className="booking-header">
            <a href="#" className="booking-id">#524587</a>
            <span className="status submitted">Submitted</span>
          </header>
          <p className="service-name">Oxi Wheel</p>
          <p className="service-time">22 Sep 21, 03:00 - 04:30 PM<span className="price">$149</span></p>
          <div className="action-buttons">
            <button className="cancel-button">Cancel Booking</button>
            <button className="reschedule-button">
              <FaRedoAlt />
              Reschedule
            </button>
          </div>
          <footer className="booking-footer">
            <div className="service-provider">
            <div className="text-content">
                <h2>Akshay Kumar</h2>
                <p><span><FaStar />&nbsp;4.7&nbsp;</span> 192 Ratings</p>
              </div>
              <img src="/images/doctor.png" alt="Service Provider" className="provider-image" />
            </div>
            
          </footer>
        </article>

        <article className="booking-card">
          <header className="booking-header">
            <a href="#" className="booking-id">#524587</a>
            <span className="status ongoing">Ongoing</span>
          </header>
          <p className="service-name">Oxi Gym</p>
          <p className="service-time">22 Sep 21, 03:00 - 04:30 PM<span className="price">$149</span></p>
          <div className="action-buttons">
            <button className="cancel-button">Cancel Booking</button>
            <button className="reschedule-button">
              <FaRedoAlt />
              Reschedule
            </button>
          </div>
          <footer className="booking-footer">
            <div className="service-provider">
            <div className="text-content">
                <h2>Akshay Kumar</h2>
                <p><span><FaStar />&nbsp;4.7&nbsp;</span> 192 Ratings</p>
              </div>
              <img src="images/doctor.png" alt="Service Provider" className="provider-image" />
            </div>
            
          </footer>
        </article>
      </section>

      
    </div>
  );
};

export default Booking;
