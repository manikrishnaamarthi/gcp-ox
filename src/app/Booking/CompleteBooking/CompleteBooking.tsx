import React from 'react';
import './CompleteBooking.css'

const CompleteBooking = () => {
  return (
    <body>
      <header>
      <span className="back-arrow">&#706;</span>
      <h1>#524587</h1>
      </header>
      <main>
        <section className="service-item">
          <div>
            <p className="service-title">Apartment</p>
            <p className="service-description">Suited for repair or replacement</p>
          </div>
          <p className="service-price">$49</p>
        </section>
        <section className="service-item">
          <div>
            <p className="service-title">Waste Pipe Leakage</p>
            <p className="service-description">Suited for repair or replacement</p>
          </div>
          <p className="service-price">$29</p>
        </section>
        <section className="job-info">
          <div className="job-header">
            <p className="job-id">#524587</p>
            <span className="status">Completed</span>
          </div>
          <p className="provider-name">Tyrone Mitchell</p>
          <p className="provider-company">Right Joy Pvt. Ltd.</p>
          <p className="provider-address">1534 Single Street, USA</p>
        </section>
        <section className="user-info">
          <div className="user-rating-header">
            <img src="/path/to/avatar.jpg" alt="User Avatar" className="user-avatar"/>
            <div>
              <p className="user-name">Levi Ray</p>
              <p className="user-rating">⭐ 4.7 <span>(192 Ratings)</span></p>
            </div>
          </div>
          <p className="completion-time">Job Completed at 04:24 PM on Friday, 22 March 21</p>
        </section>
        <section className="rating-section">
          <p>Your Rating</p>
          <div className="rating-stars">
            ⭐ ⭐ ⭐ ☆ ☆
            <span className="rating-value">3.0</span>
          </div>
        </section>
        <section className="vendor-comment">
          <p>Vendor Comment</p>
          <p className="comment-text">Comment from vendor</p>
        </section>
        <section className="order-summary">
          <p className="summary-title">Order Summary</p>
          <p className="summary-item">Subtotal <span>$156.00</span></p>
          <p className="summary-item">Est. Tax <span>$12.00</span></p>
          <p className="summary-total">Total <span>$168</span></p>
          <p className="bill-info">We've sent a copy of this bill to your email id <a href="mailto:support@rightjoy.com">support@rightjoy.com</a></p>
        </section>
        <footer>
          <button className="feedback-button">Give Feedback</button>
        </footer>
      </main>
    </body>
  );
};

export default CompleteBooking;
