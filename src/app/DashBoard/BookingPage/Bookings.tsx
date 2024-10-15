import React from 'react';
import './Bookings.css';
import { FaHome, FaSearch, FaCalendarAlt, FaUser } from 'react-icons/fa';

const Bookings = () => {
  return (
    <>
      <main>
        <div className="calendar-icon">
          <img src="/images/calender.png" alt="Calendar" />
        </div>
        <h2>No Appointment Booked</h2>
        <p>You have not booked any appointment yet.</p>
        <button>Book Now</button>
      </main>
      <footer>
        <nav>
          <ul>
            <li>
                <p><FaHome /></p>
              Home
            </li>
            <li>
               <p><FaSearch /></p>
              Search
            </li>
            <li>
               <p><FaCalendarAlt /></p>
              Booking
            </li>
            <li>
               <p><FaUser /></p>
              Profile
            </li>
          </ul>
        </nav>
      </footer>
    </>
  );
};

export default Bookings;
