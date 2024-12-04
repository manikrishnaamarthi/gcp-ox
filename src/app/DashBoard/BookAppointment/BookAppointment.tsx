"use client";
import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { IoChevronBackSharp } from 'react-icons/io5';
import './BookAppointment.css';

const BookAppointment = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const vendorId = searchParams?.get("vendor_id"); // Extract vendor_id from URL params
  const today = new Date();
  
  const [clinicData, setClinicData] = useState<any | null>(null); // Store clinic data
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<string>(today.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<{ serviceType: string; oxiId: string; phone_number: string; email: string;} | null>(null);

  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (vendorId) {
      const fetchClinicDetails = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:8004/api/vendor-appointment-details/${vendorId}/`);
          if (!response.ok) throw new Error("Failed to fetch clinic details");
          const data = await response.json();
          setClinicData(data);
        } catch (err: any) {
          console.error("Error fetching clinic details:", err.message);
        }
      };

      fetchClinicDetails();
    }

    const savedData = localStorage.getItem('selectedData');
    if (savedData) {
      setSelectedData(JSON.parse(savedData));
    }

    const todayIndex = weekDates.findIndex(date => {
      const todayDate = today.getDate();
      return date.day === todayDate;
    });

    if (todayIndex !== -1) {
      setSelectedDay(todayIndex);
    }
  }, [vendorId]); // Re-run when vendorId changes

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
      let selectedTime = selectedSlot.split('-')[1];

      const isMorningSlot = selectedSlot.startsWith("morning");
      const timeParts = selectedTime.split(":");
      let formattedTime = selectedTime;
      if (isMorningSlot) {
        formattedTime = `${timeParts[0]}:${timeParts[1]} AM`;
      } else {
        let hour = parseInt(timeParts[0]);
        if (hour >= 12) {
          formattedTime = `${hour}:${timeParts[1]} PM`;
        } else {
          formattedTime = `${hour + 12}:${timeParts[1]} PM`;
        }
      }

      const appointmentData = {
        serviceType: selectedData?.serviceType,
        oxiId: selectedData?.oxiId,
        appointmentDate: selectedDate,
        appointmentTime: formattedTime,
        phone_number: selectedData?.phone_number,
        email: selectedData?.email,
      };

      localStorage.setItem('appointmentData', JSON.stringify(appointmentData));
      window.location.href = '/DashBoard/paymentPage';
    }
    setIsModalOpen(false);
  };

  const handleDaySelect = (index: number) => {
    setSelectedDay(index);
    setSelectedSlot(null);
  };

  return (
    <div className="appointment-container">
      <div className="header">
        <button className="back-button" onClick={() => router.back()}>
          <IoChevronBackSharp size={20} />
        </button>
        <h1>Oxivive Services</h1>
      </div>

      {clinicData && (
        <div className="services">
          <div className="service">
            <p>{clinicData.clinic_name}</p>
            <p>{clinicData.address}</p>
            <p><span className="amount">{clinicData.serviceType}</span></p>
          </div>
        </div>
      )}

      <div className="appointment-dates">
        <h2>Appointment</h2>
        <div className="date-picker-container">
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
      </div>

      <div className="time-slots">
        <h3>Available Slots</h3>
        <div className="slots">
        {Array.isArray(clinicData?.available_slots) ? (
    clinicData.available_slots.map((slot, index) => (
        <button
            key={index}
            className={`slot-button ${selectedSlot === slot ? 'selected' : ''}`}
            onClick={() => setSelectedSlot(slot)}
            disabled={selectedDay === null}
        >
            {slot}
        </button>
    ))
) : (
    <p>No available slots found.</p>
)}

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
          >
            <h1 className='modal-header'>Confirmation</h1>
            {showError ? (
              <p><strong>Please select the date and time.</strong></p>
            ) : (
              <>
                <p><strong>Name:</strong> {selectedData?.name || "N/A"}</p>
                <p><strong>Address:</strong> {selectedData?.address || "Fetching address..."}</p>
                <p><strong>Time:</strong> {selectedSlot || "N/A"}</p>
                <p><strong>Date:</strong> {weekDates[selectedDay!].weekDay}, {weekDates[selectedDay!].day} {weekDates[selectedDay!].month} {today.getFullYear()}</p>
              </>
            )}
            <div className="modal-buttons">
              <button className="modal-button" onClick={handleContinue}>Continue</button>
              <button className="modal-button cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookAppointment;
