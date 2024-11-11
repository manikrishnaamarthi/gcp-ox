"use client";
import { IoChevronBackSharp } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import './payment.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';


interface BookingData {
  name: string;
  address: string;
  appointmentDate: string;
  appointmentTime: string;
  serviceType: string;
}

const PaymentPage: React.FC = () => {
    const router = useRouter();
    const [bookingData, setBookingData] = useState<BookingData | null>(null);

    useEffect(() => {
      // Retrieve booking data from local storage on component mount
      const data = localStorage.getItem("bookingData");
      if (data) {
        setBookingData(JSON.parse(data));
      }
    }, []);
    
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
          serviceType: bookingData?.serviceType,
          address: bookingData?.address,
          name: bookingData?.name,
          appointmentDate:bookingData?. appointmentDate,
          appointmentTime:bookingData?. appointmentTime,
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
                    <IoChevronBackSharp size={20} />
                </button>
                <span className="payment-text">Payment Method</span>
            </div>


            {bookingData && (
                <div className="booking-details">
                    <h3>Booking Details</h3>
                    <p><strong>Service Type:</strong> {bookingData.serviceType}</p>
                    <p><strong>Name:</strong> {bookingData.name}</p>
                    <p><strong>Address:</strong> {bookingData.address}</p>
                    <p><strong>Date:</strong> {bookingData.appointmentDate}</p>
                    <p><strong>Time:</strong> {bookingData.appointmentTime}</p>
                </div>
            )}

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
