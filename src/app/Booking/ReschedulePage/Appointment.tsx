"use client";
import { useState, useEffect , useRef} from 'react';
import { useRouter } from 'next/navigation';
import { IoChevronBackSharp } from 'react-icons/io5';
import './Appointment.css';


const Appointment = () => {
  const router = useRouter();
  const today = new Date();
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<string>(today.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<{ serviceType: string; address: string; name: string; oxiId :string;  phone_number :string;    email : string;} | null>(null);

  const modalRef = useRef(null);
  
  
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

  // Handle proceeding with the booking (show modal if not selected)
  const handleProceed = () => {
    if (selectedDay === null || selectedSlot === null) {
      setShowError(true);
      setIsModalOpen(true);
    } else {
      setShowError(false);
      setIsModalOpen(true);
    }
  };

  const handleContinue = () => {
    if (selectedDay !== null && selectedSlot !== null) {
      const selectedDate = `${new Date(today.getFullYear(), new Date(`${weekDates[selectedDay].month} 1, 2024`).getMonth(), weekDates[selectedDay].day).toISOString().split('T')[0]}`;

      const selectedTime = selectedSlot.split('-')[1];
  
      const appointmentData = {
        serviceType: selectedData?.serviceType,
        address: selectedData?.address,
        name: selectedData?.name,
        oxiId: selectedData?.oxiId,  // Pass oxiId as well
        appointmentDate: selectedDate,
        appointmentTime: selectedTime,
        phone_number: selectedData?.phone_number,  // Added phone number
        email: selectedData?.email,  // Added email
      };
  
      localStorage.setItem('appointmentData', JSON.stringify(appointmentData));
      window.location.href = '/DashBoard/paymentPage';
    }
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDaySelect = (index: number) => {
    setSelectedDay(index);
    setSelectedSlot(null); // Reset selected time slot when date changes
  };

  const startDrag = (e) => {
    e.preventDefault();
    const modalElement = modalRef.current;
    let initialY = e.clientY || e.touches[0].clientY;

    const onDrag = (event) => {
      const currentY = event.clientY || event.touches[0].clientY;
      const offset = currentY - initialY;

      if (modalElement && offset < 0) { // Only allow upward drag
        modalElement.style.transform = `translateY(${offset}px)`;
      }
    };

    const endDrag = () => {
      if (modalElement) modalElement.style.transform = `translateY(0)`;
      document.removeEventListener("mousemove", onDrag);
      document.removeEventListener("mouseup", endDrag);
      document.removeEventListener("touchmove", onDrag);
      document.removeEventListener("touchend", endDrag);
    };

    document.addEventListener("mousemove", onDrag);
    document.addEventListener("mouseup", endDrag);
    document.addEventListener("touchmove", onDrag);
    document.addEventListener("touchend", endDrag);
  };
  

  return (
    <div className="appointment-container">
      <div className="header">
        
        <button className="back-button" onClick={() => router.back()}>
          <IoChevronBackSharp size={20} /> {/* Back icon */}
        </button>
        <h1>Oxivive Services</h1>
      </div>
     

      {/* Conditionally render selected service */}
      <div className="services">
        {selectedData?.serviceType === 'Oxivive Clinic' && (
          <div className="service">
            <p>Oxivive Clinic</p>
            <p><span className="amount">INR 49</span></p>
          </div>
        )}
        {selectedData?.serviceType === 'Oxivive Wheel' && (
          <div className="service">
            <p>Oxivive Wheel</p>
            <p><span className="amount">$ 29</span></p>
          </div>
        )}
      </div>

      <div className="appointment-dates">
        <h2>Appointment</h2>
        <div className="date-picker-container">
        <div className="date-picker" >
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
        <button className="proceed-button" onClick={handleProceed}>Proceed</button>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
           <div
            className="modal-content"
            ref={modalRef}
            onMouseDown={startDrag}
            onTouchStart={startDrag}
          >
            <h1 className='modal-header'>Confirmation</h1>
            {showError ? (
              <p><strong>Please select the date and time.</strong></p>
            ) : (
              <>
                {/* Display user details */}
                <p><strong>Name:</strong> {selectedData?.name || "N/A"}</p>
                <p><strong>Address:</strong> {selectedData?.address || "Fetching address..."}</p>

                {/* Display appointment date and time */}
                <p><strong>Time:</strong> {selectedSlot?.split('-')[1]}</p>
                <p>
                  <strong>Date:</strong> {weekDates[selectedDay!].weekDay}, 
                  {weekDates[selectedDay!].day} 
                  {weekDates[selectedDay!].month} 
                  {today.getFullYear()}
                </p>
              </>
            )}
            <div className="modal-buttons">
              <button className="modal-button" onClick={handleContinue}>Continue</button>
              <button className="modal-button cancel" onClick={handleCloseModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointment;
