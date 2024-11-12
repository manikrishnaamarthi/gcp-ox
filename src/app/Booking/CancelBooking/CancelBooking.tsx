'use client';
import React from 'react';
import './CancelBooking.css';
import { IoIosArrowBack } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { FaDollarSign } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import { useRouter, useSearchParams } from 'next/navigation';

const CancelBooking = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Retrieve booking details from URL query parameters
  const id = searchParams.get('id') || '#524587';
  const bookingid = searchParams.get('booking_id')
  const status = searchParams.get('status') || 'Accepted';
  const serviceType = searchParams.get('serviceType') || 'oxiwheel';
  const appointmentDate = searchParams.get('appointmentDate') || 'N/A';
  const appointmentTime = searchParams.get('appointmentTime') || 'N/A';
  const name = searchParams.get('name') || 'Tyrone Mitchell';
  const location = searchParams.get('location') || '1534 Single Street, USA';

  const handleBackClick = () => {
    router.back();
  };

  // Function to handle cancel booking
  const handleCancelBooking = async () => {
    try {
      // Send the booking `id` in the body to specify which booking to cancel
      const response = await fetch(`http://127.0.0.1:8000/api/bookingapp-bookingservice/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookingid, status: 'cancel' }), // send `id` and update status to 'Cancelled'
      });

      if (response.ok) {
        alert("Booking status updated to 'Cancelled'");
        router.push('/Booking/'); 
      } else {
        alert("Failed to cancel booking. Please try again.");
      }
    } catch (error) {
      console.error("Error cancelling booking:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className='cancel-booking-container'>
      <header className="cancel-booking-header">
        <span className="cancel-booking-back-arrow" onClick={handleBackClick}><IoIosArrowBack /></span>
      </header>

      <main className='cancel-booking-main-container'>
        <section className="cancel-booking-item">
          <h2>{serviceType}</h2>
          <span className="cancel-booking-price">$49</span>
        </section>

        <div className="cancel-booking-details">
          <div className="header">
            <div className="status">{status}</div>
          </div>
          <p>{name}</p>
          <p className='location'><IoLocationSharp />{location}</p>
        </div>

        <div className="cancel-booking-cancellation-policy">
          <h3>Cancellation Policy</h3>
          <p>If you cancel less than 24 hours before your booking, you may be charged a cancellation fee up to the full amount of the services booked.</p>
        </div>

        <footer className="cancel-booking-footer">
          <h3>Order Summary</h3>
          <div className="cancel-booking-summary">
            <p>Subtotal<span>$156.00</span></p>
            <span>Est. Tax<span>$12.00</span></span>
          </div>
          <p className='cancel-booking-total'>Total<span><FaDollarSign />168.00</span></p>
        </footer>
        <button className="cancel-booking-button" onClick={handleCancelBooking}>Cancel Booking</button>
      </main>
    </div>
  );
};

export default CancelBooking;
