import React from 'react';
import './Booking.css';
import { FaHome, FaSearch, FaCalendarAlt, FaUser, FaRedoAlt } from 'react-icons/fa'; // Import FaRedoAlt for reschedule icon

const Booking = () => {
  return (
    <>
      <header>
        <button className="tab active">MyBooking</button>
        <button className="tab">Cancelled</button>
        <button className="tab">Completed</button>
      </header>

      <section className="booking-list">
        <article className="booking-card">
          <header className="booking-header">
            <a href="#" className="booking-id">#524587</a>
            <span className="status accepted">Accepted</span>
          </header>
          <p className="service-name">Oxi Clinic</p>
          <p className="service-time">22 Sep 21, 03:00 - 04:30 PM</p>
          <div className="action-buttons">
            <button className="cancel-button">Cancel Booking</button>
            <button className="reschedule-button">
              <FaRedoAlt />
              Reschedule
            </button>
          </div>
          <footer className="booking-footer">
            <div className="service-provider">
              
              <p>⭐ 4.7 | 192 Ratings</p>
            </div>
            <p className="price">$149</p>
          </footer>
        </article>

        <article className="booking-card">
          <header className="booking-header">
            <a href="#" className="booking-id">#524587</a>
            <span className="status submitted">Submitted</span>
          </header>
          <p className="service-name">Oxi Wheel</p>
          <p className="service-time">22 Sep 21, 03:00 - 04:30 PM</p>
          <div className="action-buttons">
            <button className="cancel-button">Cancel Booking</button>
            <button className="reschedule-button">
              <FaRedoAlt />
              Reschedule
            </button>
          </div>
          <footer className="booking-footer">
            <div className="service-provider">
              
              <p>⭐ 4.7 | 192 Ratings</p>
            </div>
            <p className="price">$149</p>
          </footer>
        </article>

        <article className="booking-card">
          <header className="booking-header">
            <a href="#" className="booking-id">#524587</a>
            <span className="status ongoing">Ongoing</span>
          </header>
          <p className="service-name">Oxi Gym</p>
          <p className="service-time">22 Sep 21, 03:00 - 04:30 PM</p>
          <div className="action-buttons">
            <button className="cancel-button">Cancel Booking</button>
            <button className="reschedule-button">
              <FaRedoAlt />
              Reschedule
            </button>
          </div>
          <footer className="booking-footer">
            <div className="service-provider">
              
              <p>⭐ 4.7 | 192 Ratings</p>
            </div>
            <p className="price">$149</p>
          </footer>
        </article>
      </section>

      
    </>
  );
};

export default Booking;
