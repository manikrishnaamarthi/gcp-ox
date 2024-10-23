"use client";
import { useState, useEffect } from 'react';
import { IoChevronBackSharp } from 'react-icons/io5'; // Import the icon
import './Appointment.css';

const Appointment = () => {
  const today = new Date();

  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<string>(today.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false); 

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 60000);

    return () => clearInterval(interval);
  }, []);

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

  const morningSlots = ['08:00', '09:30', '11:00'];
  const afternoonSlots = ['12:30', '02:00', '03:30', '05:00', '06:30', '08:00', '09:30'];

  const isPastTime = (slotTime: string, isMorning: boolean) => {
    if (selectedDay === 0) { // Check if it's the current day
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

  const handleProceed = () => {
    if (selectedDay === null || selectedSlot === null) {
      setShowError(true); 
      setIsModalOpen(true);
    } else {
      setShowError(false);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDaySelect = (index: number) => {
    setSelectedDay(index);
    setSelectedSlot(null); // Reset the selected time slot when date changes
  };

  return (
    <div className="appointment-container">
      <div className="header">
        <button className="back-button">
          <IoChevronBackSharp size={35} /> {/* Use the imported icon */}
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
              disabled={selectedDay === null || isPastTime(slot, true)} // For morning slots
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
              disabled={selectedDay === null || isPastTime(slot, false)} // For afternoon slots
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

