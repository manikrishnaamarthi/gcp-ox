import React from 'react';
import { useRouter } from 'next/navigation';
import './Bookings.css';

const Bookings = () => {
  const router = useRouter();

  const handleBookNowClick = () => {
    router.push('/DashBoard/HomePage/AppointmentPage'); // Update the path as per your appointment page route
  };

  return (
    <>
      <main>
        <div className="calendar-icon">
          <img src="/images/calender.png" alt="Calendar" />
        </div>
        <h2>No Appointment Booked</h2>
        <p>You have not booked any appointment yet.</p>
        <button onClick={handleBookNowClick}>Book Now</button>
      </main>
      
    </>
  );
};

export default Bookings;
