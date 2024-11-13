"use client"
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './paymentSuccess.css';

const PaymentSuccess: React.FC = () => {
  const router = useRouter();

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     router.push('/VendorManagementService/paymentPage/applicationUnderReview');
  //   }, 3000);

  //   return () => clearTimeout(timer);
  // }, [router]);

  return (
    <div className="payment-success-container">
      <img src="/images/submit.png" alt="Green Ticket" className="ticket-image" />
      <p className="payment-status-text">Your document has been</p>
      <p className="payment-status-text">successfully submitted!</p>
    </div>
  );
};

export default PaymentSuccess;
