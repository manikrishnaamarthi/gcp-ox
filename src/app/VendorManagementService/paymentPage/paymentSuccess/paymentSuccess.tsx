import React from 'react';
import './paymentSuccess.css';

const paymentSuccess: React.FC = () => {
  return (
    <div className="payment-success-container">
      <img src="/images/submit.png" alt="Green Ticket" className="ticket-image" />
      <p className="payment-status-text">Your doucument has been</p>
      <p className="payment-status-text">successfully submitted!</p>
    </div>
  );
};

export default paymentSuccess;
