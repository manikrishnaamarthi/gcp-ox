"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { IoChevronBackSharp } from 'react-icons/io5';
import './Appointment.css';

const Appointment = () => {
  const today = new Date();

  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<string>(today.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<{ serviceType: string; address: string; name: string } | null>(null);

  // Load data from local storage
  useEffect(() => {
    const savedData = localStorage.getItem('selectedData');
    if (savedData) {
      setSelectedData(JSON.parse(savedData));
    }
  }, []);

  // Update the current time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // Generate the dates for the upcoming week
  const generateWeekDates = () => {
    const weekDates = [];
    for (let i = 0; i < 6; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      weekDates.push({
        day: date.getDate(),
        month: date.toLocaleString('default', { month: 'short' }),
        weekDay: date.toLocaleString('default', { weekday: 'short' }),
      });
    }
    return weekDates;
  };

  const weekDates = generateWeekDates();

  // Time slots for selection
  const morningSlots = ['08:00', '09:30', '11:00'];
  const afternoonSlots = ['12:30', '02:00', '03:30', '05:00', '06:30', '08:00', '09:30'];

  // Check if a time slot is in the past
  const isPastTime = (slotTime: string, isMorning: boolean) => {
    if (selectedDay === 0) {
      const currentDateTime = new Date();
      const [slotHour, slotMinutes] = slotTime.split(':').map(Number);
      const slotDateTime = new Date(currentDateTime);

      if (isMorning) {
        slotDateTime.setHours(slotHour, slotMinutes, 0);
      } else {
        const adjustedHour = slotHour === 12 ? 12 : slotHour + 12;
        slotDateTime.setHours(adjustedHour, slotMinutes, 0);
      }

      return slotDateTime < currentDateTime;
    }
    return false;
  };

  // Handle proceeding with the booking
  const handleProceed = async () => {
    if (selectedDay === null || selectedSlot === null) {
      setShowError(true);
      setIsModalOpen(true);
    } else {
      setShowError(false);
  
      // Prepare the data for submission
      const bookingData = {
        service_type: selectedData?.serviceType === 'Oxivive Clinic' ? 'clinic' : 'wheel',
        address: selectedData?.address,
        name: selectedData?.name,
        appointment_date: `${today.getFullYear()}-${today.getMonth() + 1}-${weekDates[selectedDay].day}`,
        appointment_time: selectedSlot.split('-')[1],
      };
      
  
      try {
        await axios.post('http://localhost:8000/api/booking/', bookingData); // Adjust the URL as needed
        setIsModalOpen(true); // Open confirmation modal
      } catch (error) {
        console.error('Error saving appointment:', error);
      }
    }
  };
  

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDaySelect = (index: number) => {
    setSelectedDay(index);
    setSelectedSlot(null); // Reset selected time slot when date changes
  };

  return (
    <div className="appointment-container">
      <div className="header">
        <button className="back-button">
          <IoChevronBackSharp size={35} /> {/* Back icon */}
        </button>
        <h1>Oxivive Services</h1>
      </div>

      <div className="services">
        <div className="service">
          <p>Oxivive Clinic</p>
          <p><span className="amount">$ 49</span></p>
        </div>
        <div className="service">
          <p>Oxivive Wheel</p>
          <p><span className="amount">$ 29</span></p>
        </div>
      </div>

      <div className="appointment-dates">
        <h2>Appointment</h2>
        <div className="date-picker">
          {weekDates.map((date, index) => (
            <button
              key={index}
              className={`date-button ${selectedDay === index ? 'selected' : ''}`}
              onClick={() => handleDaySelect(index)}
            >
              <p className="date-number">{date.day}</p>
              <p className="date-weekday">{date.weekDay}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="time-slots">
        <h3>Morning</h3>
        <div className="slots">
          {morningSlots.map((slot, index) => (
            <button
              key={index}
              className={`slot-button ${selectedSlot === `morning-${slot}` ? 'selected' : ''}`}
              onClick={() => setSelectedSlot(`morning-${slot}`)}
              disabled={selectedDay === null || isPastTime(slot, true)} // Disable past slots
            >
              {slot}
            </button>
          ))}
        </div>

        <h3>Afternoon</h3>
        <div className="slots">
          {afternoonSlots.map((slot, index) => (
            <button
              key={index}
              className={`slot-button ${selectedSlot === `afternoon-${slot}` ? 'selected' : ''}`}
              onClick={() => setSelectedSlot(`afternoon-${slot}`)}
              disabled={selectedDay === null || isPastTime(slot, false)} // Disable past slots
            >
              {slot}
            </button>
          ))}
        </div>
      </div>

      <div className="total-payment">
        <div className="payment-details">
          <p><span className="amount">$ 168</span> <span className="light-text">1 item</span></p>
          <p className="light-text">inc. of all taxes</p>
        </div>
        <button className="proceed-button" onClick={handleProceed}>Proceed</button>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h1>Confirmation</h1>
            {showError ? (
              <p><strong>Please select the date and time.</strong></p>
            ) : (
              <>
                <p>Date: {weekDates[selectedDay!].weekDay}, {weekDates[selectedDay!].day} {weekDates[selectedDay!].month}</p>
                <p>Time: {selectedSlot?.split('-')[1]}</p>
              </>
            )}
            <div className="modal-buttons">
              <button className="modal-button" onClick={handleCloseModal}>Continue</button>
              <button className="modal-button cancel" onClick={handleCloseModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointment;
