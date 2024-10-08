"use client";
import React from "react";
import { FaThumbsUp } from "react-icons/fa";
import { BiSolidComment } from "react-icons/bi";
import "./AppointmentBooking.css";
import { IoArrowBack } from "react-icons/io5";
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';


interface AppointmentBookingProps {}

const AppointmentBooking: React.FC<AppointmentBookingProps> = () => {

    // Create a state for the selected service
  const [selectedService, setSelectedService] = useState<string>('Oxivive Clinic'); // Default to 'Oxivive Clinic'

  // Map to associate full service name with short names for h3
  const serviceShortNames: { [key: string]: string } = {
    'Oxivive Clinic': 'OxiClinic',
    'Oxivive Wheel': 'OxiWheel',
    'Oxivive Gym': 'OxiGym'
  };

  // Use useEffect to access localStorage only on the client-side
  useEffect(() => {
    const storedService = localStorage.getItem('selectedService');
    if (storedService) {
      setSelectedService(storedService); // Update state with the selected service
    }
  }, []); // Empty dependency array ensures this runs once after initial render

     
  
    


    const [selectedLocation, setSelectedLocation] = useState<string>('HSR Layout'); // Default value

  useEffect(() => {
    const storedLocation = localStorage.getItem('selectedLocation');
    if (storedLocation) {
      setSelectedLocation(storedLocation); // Update with the stored location
    }
  }, []);


  return (
    <>
      <header className="header">
        <span className="back-button">
            <IoArrowBack size={24} />
        </span>
        <h1>Book Appointment</h1>
       </header>

      
      <section className="clinic-info">
        <div className="clinic-avatar">
            <div className="avatar-image">
                <img src="/images/doctor.png" alt="Clinic Avatar" />
            </div>
        </div>
        
        <div className="clinic-details">
          <h2>{selectedService}</h2>
            <h3>{serviceShortNames[selectedService]}</h3> {/* Display short service name in h3 */}
            <div className="rating">
                <FaThumbsUp className="thumbs-up" />
                <span>83%</span>
                <BiSolidComment className="notify" />
                <span className="patient">  8 Patient Stories</span>
            </div>
                <p className="clinic-recommendation">Highly Recommended for Doctor Friendliness</p>
        </div>
      </section>


        <section className="appointment-time">
            <h3>Appointment time</h3>
            <p className="time">
                <strong></strong>
                <span className="time-difference">
          
        </span>
            </p>
        </section>


      <section className="clinic-details-section">
        <h3>Clinic Details</h3>
            <h2>{selectedLocation}</h2> {/* Display the selected location */} 
                <hr className="separator" />
                <p className="oxivive-promise">
                    <span className="oxivive-promise-text">Oxivive Promise - </span>
                    <span className="oxivive-promise-highlight">Appointment confirmed instantly</span>
                </p>
                <hr className="separator" />
                <p className="distance-error">
                    <span className="distance-error-text">Distance between - </span>
                    <span className="distance-error-highlight">Error fetching coordinates: INVALID_REQUEST</span>
                </p>
      </section>

      <section className="payment-section">
        <h3>Choose a mode of payment</h3>
        <div className="payment-option">
            <div className="payment-method">
                <input type="radio" id="pay-online" name="payment" defaultChecked />
                <label htmlFor="pay-online">Pay Online</label>
                <span className="amount">₹1</span>
            </div>

            <div className="payment-method">
                <input type="radio" id="payAtClinic" name="payment" value="payAtClinic" />
                <label htmlFor="payAtClinic">Pay At Clinic</label>
                <span className="amounts">₹1</span>
            </div>
        </div>


        <div className="coupon-section">
            <div className="coupon-info">
                <img src="/images/coupon.png" alt="coupon" className="coupon-icon" />
                    <div className="coupon-text">
                        <h3 className="coupon-title">Apply Coupon</h3>
                        <p className="coupon-description">
                            Unlock with offers <br />
                            with coupon codes
                        </p>
                    </div>
                <button className="apply-button">APPLY</button>
            </div>
        </div>


        <div id="bill-details" className="bill-details">
          <h3>Bill Details</h3>
            <div className="detail-item">
                <span>Consultation Fee</span>
                <span>₹1</span>
            </div>
            <div className="detail-item">
                <span>Service Fee & Tax</span>
                <span>₹49</span>
                <span className="free">FREE</span>
            </div>
                <p className="service-note">We care for you & provide a free booking</p>
            <div className="detail-item">
                <span>Discount/Coupon</span>
                <span>Nothing</span>
            </div>
        </div>

        <hr className="separator" />


        <div className="total-payable">
          <h3>Total Payable</h3>
          <span>₹1</span>
        </div>


        <div className="discount-banner">
          <p>You have saved ₹49 on this appointment</p>
        </div>


        <div className="promise-section">
            <h3>Oxivive Promise</h3>
                <ul>
                    <li>
                        <input type="checkbox" className="checkbox" defaultChecked disabled ></input> 
                        <span className="text">Appointment confirmed instantly with the doctor</span>
                    </li>
                    <li>
                        <input type="checkbox" className="checkbox" defaultChecked disabled ></input> 
                        <span className="text">We assure we will connect you to the doctor. If your consultation does not happen for unforeseen reasons, we will give you 100% money back.</span>
                    </li>
                    <li>
                        <input type="checkbox" className="checkbox" defaultChecked disabled ></input> 
                        <span className="text">24/7 live chat support to address all your queries.</span>
                    </li>
                </ul>
        </div>

    
        <div className="safety-measures">
            <h3>Safety measures followed by Clinic</h3>
            <ul>
                <li>* Mask Mandatory</li>
                <li>* Temperature check at entrance</li>
                <li>* Sanitization of the visitors</li>
                <li>* Social distance maintained</li>
            </ul>
        </div>


        <div className="appointment-summary">
          <img
            src="/images/yoga.jpg"
            alt="User Avatar"
            className="user-avatar"
          />
          <div className="appointment-text">
            <span>In-Oxivive Appointment for</span>
            <strong>Prem Bejavada</strong>
          </div>
        </div>


        <div className="payment-actions">
            <div className="payment-info">
                <span className="amount1">₹1</span>
                    <a
                        href="#"
                        className="view-bill"
                        onClick={(e) => {
                            e.preventDefault(); // Prevent the default anchor behavior
                            const billDetailsSection = document.getElementById('bill-details');
                            if (billDetailsSection) {
                            billDetailsSection.scrollIntoView({ behavior: 'smooth', block: 'center'  }); // Smooth scroll to the section
                            }
                        }}
                    >
                        View Bill
                    </a>
            </div>
            <button className="pay-button">Pay & Confirm Book</button>
        </div>
      </section>
    </>
  );
};

export default AppointmentBooking;
