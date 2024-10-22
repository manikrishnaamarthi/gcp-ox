import React from 'react';
import './CancelBooking.css';
import { IoIosArrowBack } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { FaDollarSign } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";

const CancelBooking = () => {
  return (
    <div className='container'>
      <header>
        <span className="back-arrow"><IoIosArrowBack /></span>
        <h1>#524587</h1>
        <span className="phone-icon"><BsFillTelephoneFill /></span>
      </header>

      <main className='main-container'>
        <section className="item">
          <h2>Apartment</h2>
          <p>Suited for repair or replacement</p>
          <span className="price">$&nbsp;49</span>
        </section>
        <section className="item">
          <h2>Waste Pipe Leakage</h2>
          <p>Suited for repair or replacement</p>
          <span className="price">$&nbsp;29</span>
        </section>

        <div className="booking-details">
          <div className='BD'>
              <div className="header">
                <h2>#524587</h2>
                  <div className="status">
                    Accepted</div>
                  </div>
              <p>Tyrone Mitchell<br/><span>Right Joy Pvt. Ltd.</span><br/></p>
              <p className='location'><IoLocationSharp />1534 Single Street, USA</p>
          </div>
        </div>

        <div className="cancellation-policy">
          <h3>Cancellation Policy</h3>
          <p>If you cancel less than 24 hours before your booking, you may be charged a cancellation fee up to the full amount of the services booked.</p>
        </div>

        <footer>
          <h3>Order Summary</h3>
          <div className="summary">
            <p>Subtotal<span>$156.00</span></p>
            <span>Est. Tax<span>$12.00</span></span>
            
          </div>
          <p className='total'>Total<span><FaDollarSign />168.00</span></p>
        </footer>
        <button className="cancel-button">Cancel Booking</button>
      </main>
      
    </div>
  );
};

export default CancelBooking;
