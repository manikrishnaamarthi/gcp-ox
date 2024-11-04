'use client'
import React from 'react';
import './CancelBooking.css';
import { IoIosArrowBack } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { FaDollarSign } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import { useRouter } from 'next/navigation';

const CancelBooking = () => {

  const router = useRouter(); // Create an instance of the router

  const handleBackClick = () => {
    router.back(); // Go back to the previous page
  };


  return (
    <div className='cancel-booking-container'>
      <header className="cancel-booking-header">
        <span className="cancel-booking-back-arrow" onClick={handleBackClick}><IoIosArrowBack /></span>
        <h1>#524587</h1>
        <span className="cancel-booking-phone-icon"><BsFillTelephoneFill /></span>
      </header>

      <main className='cancel-booking-main-container'>
        <section className="cancel-booking-item">
          <h2>oxiwheel</h2>
          
          <span className="cancel-booking-price">$&nbsp;49</span>
        </section>
        

        <div className="cancel-booking-details">
          <div className="header">
            <h2>#524587</h2>
            <div className="status">Accepted</div>
          </div>
          <p>Tyrone Mitchell<br/><span>Right Joy Pvt. Ltd.</span><br/></p>
          <p className='location'><IoLocationSharp />1534 Single Street, USA</p>
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
        <button className="cancel-booking-button">Cancel Booking</button>
      </main>
    </div>
  );
};

export default CancelBooking;
