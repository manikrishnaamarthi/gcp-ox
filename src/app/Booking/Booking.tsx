import React from 'react';
import './Booking.css';
import { FaHome, FaSearch, FaCalendarAlt, FaUser } from 'react-icons/fa';

const Booking = () => {
  return (
    <>
      <header>
        <button className="tab active">Active</button>
        <button className="tab">Success</button>
        <button className="tab">Cancelled</button>
      </header>

      <section className="booking-list">
        <article className="booking-card">
          <header className="booking-header">
            <a href="#" className="booking-id">#524587</a>
            <span className="status accepted">Accepted</span>
          </header>
          <p className="service-name">Home Cleaner</p>
          <p className="service-time">22 Sep 21, 03:00 - 04:30 PM</p>
          <footer className="booking-footer">
            <div className="service-provider">
              <p>Levi Ray</p>
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
          <p className="service-name">Home Cleaner</p>
          <p className="service-time">22 Sep 21, 03:00 - 04:30 PM</p>
          <button className="cancel-button">Cancel Booking</button>
          <footer className="booking-footer">
            <div className="service-provider">
              <p>Levi Ray</p>
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
          <p className="service-name">Home Cleaner</p>
          <p className="service-time">22 Sep 21, 03:00 - 04:30 PM</p>
          <footer className="booking-footer">
            <div className="service-provider">
              <p>Levi Ray</p>
              <p>⭐ 4.7 | 192 Ratings</p>
            </div>
            <p className="price">$149</p>
          </footer>
        </article>
      </section>

      <nav className="bottom-nav">
        <button>
          <FaHome />
          <span>Home</span>
        </button>
        <button>
          <FaSearch />
          <span>Search</span>
        </button>
        <button className="active">
          <FaCalendarAlt />
          <span>Booking</span>
        </button>
        <button>
          <FaUser />
          <span>Profile</span>
        </button>
      </nav>
    </>
  );
};

export default Booking;
