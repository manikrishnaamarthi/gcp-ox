import React from "react";
import "./PaymentMethod.css";
import { IoChevronBackOutline } from "react-icons/io5";

const PaymentMethod: React.FC = () => {
  return (
    <div className="payment-method-container">
      <h1 className="heading">Payment Method</h1>

      <div className="scrollable-content">
      <div className="clinic-details">
        <h2>Clinic Details</h2>
        <div className="clinic-info">
          <img
            src="/path-to-clinic-image.jpg" // Replace with your image path
            alt="Clinic"
            className="clinic-image"
          />
          <div className="clinic-text">
            <p>
              <strong>Clinic name:</strong> Premier Health Center
            </p>
            <p>
              <strong>Phone:</strong> 8978458745
            </p>
            <p>
              <strong>Address:</strong> Unnamed rd, veerampalem, Andhra Pradesh
              560078, India
            </p>
          </div>
        </div>
      </div>

      <div className="appointment-details">
        <h2>Appointment Time</h2>
        <div className="appointment-time-container">
          <span className="appointment-time">Sun, 10 Nov 09:30 AM</span>
          <span className="appointment-countdown">
            In 5 hours & 59 minutes
          </span>
        </div>
      </div>

      <div className="bill-details">
        <h2>Bill Details</h2>
        <div className="bill-item">
          <span>Consultation Fee</span>
          <span>₹ 1</span>
        </div>
        <div className="bill-item">
          <span>Service Fee & Tax</span>
          <span>
            <span>49</span>
            <span className="free-tag">FREE</span>
          </span>
        </div>
        <p className="free-booking">
          We care for you & provide a free booking
        </p>
      </div>

      <div className="total-payable">
        
        <h2>Total Payable</h2>
        
        <p className="saved-amount">
          You have saved 49 on this appointment
        </p>
      </div>

      <div className="safety-measures">
        <p className="safety-measures-heading">Safety measures followed by Clinic</p>
        <ul>
          <li> *Mask Mandatory</li>
          <li> *Temperature check at entrance</li>
          <li> *Sanitization of the visitors</li>
          <li> *Social distance maintained</li>
        </ul>
      </div>

      <button className="pay-now-button">Pay Now</button>
    </div>
    </div>
  );
};

export default PaymentMethod;
