'use client'
import React from 'react';
import './CompleteBooking.css'
import { IoLocationSharp } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import { AiFillEyeInvisible } from 'react-icons/ai';
import { FaStar } from "react-icons/fa";
import { FaDollarSign } from "react-icons/fa";
import { useRouter } from 'next/navigation';

const CompleteBooking = () => {

  const router = useRouter(); // Create an instance of the router

  const handleBackClick = () => {
    router.back(); // Go back to the previous page
  };

  return (
    <div className='container'>
      <header className='header-container'>
      <span className="back-arrow"  onClick={handleBackClick}><IoIosArrowBack /></span>
      <h1>#524587</h1>
      </header>
      <main className='main-container'>
        <section className="service-item">
          <div>
            <p className="service-title">oxiwheel</p>
            {/* <p className="service-description">Suited for repair or replacement</p> */}
          </div>
          <p className="service-price">$&nbsp;49</p>
        </section>
        {/* <section className="service-item">
          <div>
            <p className="service-title">Waste Pipe Leakage</p>
            <p className="service-description">Suited for repair or replacement</p>
          </div>
          <p className="service-price">$&nbsp;29</p>
        </section> */}
        <section className="job-info">
          <div className="job-header">
            <p className="job-id">#524587</p>
            <span className="status">Completed</span>
          </div>
          <p className="provider-name">Sanjana Gowdanar</p>
          <p className="provider-company">GTPL Pvt. Ltd.</p>
          <p className="provider-address"><IoLocationSharp />Hebbal Bangaluru, India</p>
        </section>
        <section className="user-info">
          <div className="user-rating-header">
            
            <div>
              <p className="user-name">Akshay Kumar</p>
              {/* <p className="user-rating"><span><FaStar />&nbsp;4.7&nbsp;</span> 192 Ratings</p> */}
            </div>
            <img src="/images/doctor.png" alt="User Avatar" className="user-avatar"/>
          </div>
          <p className="completion-time">Job Completed at 04:24 PM on Friday, 22 March 21</p>
        </section>
        {/* <section className="rating-section">
          <p>Your Rating</p>
          <div className="rating-stars">
            <FaStar className="filled-star" />
            <FaStar className="filled-star" />
            <FaStar className="filled-star" />
            <FaStar className="empty-star" />
            <FaStar className="empty-star" />
            <span className="rating-value">3.0</span>
          </div>
        </section> */}
        <section className="vendor-comment">
          <p>Vendor Comment</p>
          <span className="comment-text">Comment from vendor</span>
          <div className="password-eye-container">
            <h1>..............</h1>
            <AiFillEyeInvisible className="password-eye-icon" />
          </div>
        </section>
        <section className="order-summary">
          <p className="summary-title">Order Summary</p>
          <p className="summary-item">Subtotal <span>$156.00</span></p>
          <p className="summary-item">Est. Tax <span>$12.00</span></p>
          <p className="summary-total">Total <span className="price"><FaDollarSign className="dollar-icon" />168</span></p>
          <p className="bill-info">We've sent a copy of this bill to your email id </p>
          <a href="mailto:support@rightjoy.com" className='support'>support@rightjoy.com</a>
        </section>
        <footer>
          <button className="feedback-button">Give Feedback</button>
        </footer>
      </main>
    </div>
  );
};

export default CompleteBooking;
