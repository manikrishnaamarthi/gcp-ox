"use client";
import React from 'react';
import { IoChevronBackSharp } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import './payment.css';
import axios from 'axios';

const PaymentPage: React.FC = () => {
    const router = useRouter();
    
    const handlePayment = () => {
  const bookingData = JSON.parse(localStorage.getItem("bookingData") || "{}");
  const totalAmount = 10.00;
  const amountInPaise = totalAmount * 100;

  const script = document.createElement("script");
  script.src = "https://checkout.razorpay.com/v1/checkout.js";
  script.onload = () => {
    const razorpayOptions = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_41ch2lqayiGZ9X",
      amount: amountInPaise,
      currency: "INR",
      name: "Oxivive Services",
      description: "Order Payment",
      handler: async (response: any) => {
        const bookingId = `BI${Math.floor(10000 + Math.random() * 90000)}`; // Generate booking ID

        // Update bookingData with payment info
        const completedBookingData = {
          ...bookingData,
          payment_id: response.razorpay_payment_id,
          booking_status: "completed",
          booking_id: bookingId,
        };

        try {
          // Send bookingData to API
          await axios.post("http://localhost:8000/api/booking/", completedBookingData);
          router.push("/DashBoard/TickPage"); // Redirect to success page
        } catch (error) {
          console.error("Error saving booking:", error);
        }
      },  
      prefill: {
        name: bookingData.name,
        email: "johndoe@example.com",
        contact: "1234567890",
      },
      theme: { color: "#3399cc" },
    };

    const razorpay = new (window as any).Razorpay(razorpayOptions);
    razorpay.open();
  };
  document.body.appendChild(script);
};

  

    return (
        <div className="payment-container">
            <div className="payment-method">
                <button className="back-button" onClick={() => router.back()}>
                    <IoChevronBackSharp size={25} />
                </button>
                <span className="payment-text">Payment Method</span>
            </div>

            <div className="order-summary">
                <h3>Order Summary</h3>
                <div className="summary-item">
                    <span>Sub Total</span>
                    <span>INR 156.00</span>
                </div>
                <div className="summary-item">
                    <span>Est. Tax</span>
                    <span>INR 12.00</span>
                </div>
                <hr />
                <div className="summary-item total">
                    <span>Total</span>
                    <span> INR 168.00</span>
                </div>
            </div>

            <button className="payment-button" onClick={handlePayment}>Pay Now</button>
        </div>
    );
};

export default PaymentPage;
