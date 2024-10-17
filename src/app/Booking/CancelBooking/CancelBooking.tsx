import React from 'react';
import './CancelBooking.css';

const CancelBooking = () => {
  return (
    <>
      <header>
        <span className="back-arrow">&#706;</span>
        <h1>#524587</h1>
        <span className="phone-icon">&#x1F4DE;</span>
      </header>

      <main>
        <section className="item">
          <h2>Apartment</h2>
          <p>Suited for repair or replacement</p>
          <span className="price">$49</span>
        </section>
        <section className="item">
          <h2>Waste Pipe Leakage</h2>
          <p>Suited for repair or replacement</p>
          <span className="price">$29</span>
        </section>

        <div className="booking-details">
          <h2>#524587</h2>
          <div className="status">Accepted</div>
          <p>Tyrone Mitchell<br/>Right Joy Pvt. Ltd.<br/>1534 Single Street, USA</p>
        </div>

        <div className="cancellation-policy">
          <h3>Cancellation Policy</h3>
          <p>If you cancel less than 24 hours before your booking, you may be charged a cancellation fee up to the full amount of the services booked.</p>
        </div>

        <footer>
          <h3>Order Summary</h3>
          <div className="summary">
            <p>Subtotal<span>$156.00</span></p>
            <p>Est. Tax<span>$12.00</span></p>
            
          </div>
          <p className='total'>Total<span>$168.00</span></p>
        </footer>
        
      </main>
      <button className="cancel-button">Cancel Booking</button>
    </>
  );
};

export default CancelBooking;
