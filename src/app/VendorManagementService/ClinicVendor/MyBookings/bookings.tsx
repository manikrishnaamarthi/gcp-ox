'use client'; 
import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faClock, faClipboardList, faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import "./bookings.css";
import axios from "axios";
import { useRouter } from 'next/navigation';

const Bookings: React.FC = () => {
  const [activeTab, setActiveTab] = useState("bookings");
  const [selectedFooter, setSelectedFooter] = useState("home");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [weekDates, setWeekDates] = useState<string[]>([]);
  const [allBookings, setAllBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getWeekDates = () => {
      const dates = [];
      const today = new Date();

      for (let i = 0; i < 7; i++) {
        const nextDay = new Date(today);
        nextDay.setDate(today.getDate() + i);

        const day = nextDay.toLocaleDateString("en-US", { weekday: "short" });
        const month = nextDay.toLocaleDateString("en-US", { month: "short" });
        const dayNumber = nextDay.getDate();

        dates.push(`${day} ${month} ${dayNumber}`);
      }
      setWeekDates(dates);
    };

    getWeekDates();

    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    const timeUntilMidnight = midnight.getTime() - new Date().getTime();

    const timer = setTimeout(() => {
      getWeekDates();
      setInterval(getWeekDates, 24 * 60 * 60 * 1000);
    }, timeUntilMidnight);

    return () => clearTimeout(timer);
  }, []);

  const fetchAllBookings = async () => {
    setLoading(true);
    try {
      const params: any = { service_type: "Oxi clinic" };

      // If there's a selected date, format it as YYYY-MM-DD and pass it to the API
      if (selectedDate) {
        const formattedDate = new Date(selectedDate).toISOString().split('T')[0]; // Format to YYYY-MM-DD
        params.appointment_date = formattedDate;
        console.log("Fetching bookings for date:", formattedDate); // Debug log
      }

      const response = await axios.get("http://localhost:8000/api/save-booking/", { params });
      setAllBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBookings();
  }, [activeTab, selectedDate]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  // const handleDateClick = (date: string) => {
  //   setSelectedDate(date);
  // };

  const handleFooterClick = (footer: string) => {
    setSelectedFooter(footer);
  };

  const filteredBookings = allBookings.filter((booking) => {
    // Filter by status (activeTab)
    if (activeTab === "cancelled" && booking.booking_status !== "cancelled") return false;
    if (activeTab === "completed" && booking.booking_status !== "completed") return false;
  
    // Filter by selectedDate
    if (selectedDate) {
      const formattedSelectedDate = new Date(selectedDate).toISOString().split("T")[0];
      return booking.appointment_date === formattedSelectedDate;
    }
  
    return true; // If no date is selected, return all bookings matching the tab
  });

  const handleDateClick = (date: string) => {
    const today = new Date();
    const [day, month, dayNumber] = date.split(" ");
    const monthIndex = new Date(`${month} 1, ${today.getFullYear()}`).getMonth();
  
    // Create the selected date object in the local timezone
    const selectedFullDate = new Date(today.getFullYear(), monthIndex, parseInt(dayNumber));
  
    // Format the selected date as YYYY-MM-DD in the local timezone
    const formattedDate = `${selectedFullDate.getFullYear()}-${String(selectedFullDate.getMonth() + 1).padStart(2, '0')}-${String(selectedFullDate.getDate()).padStart(2, '0')}`;
  
    setSelectedDate(formattedDate);
    console.log("Selected date:", formattedDate); // Debug log
  };

  return (
    <div className="bookings-containers">
      <header className="headerb">
        <FaArrowLeft className="back-icona" onClick={() => router.push('/VendorManagementService/Vendors/WheelVendor/Clinic')} />
        <h1>My Bookings</h1>
      </header>

      <div className="week-selectionq">
        {weekDates.map((date, index) => {
          const [day, month, dayNumber] = date.split(" ");
          const isSelected = selectedDate === `${new Date().getFullYear()}-${String(new Date(`${month} 1`).getMonth() + 1).padStart(2, '0')}-${String(dayNumber).padStart(2, '0')}`;
          return (
            <div
              key={index}
              className={`week-day ${isSelected ? "selected" : ""}`}
              onClick={() => handleDateClick(date)}
            >
              <span className="day">{day}</span>
              <span className="month-date">
                <span className="month">{month}</span>
                <span className="day-number">{dayNumber}</span>
              </span>
            </div>
          );
        })}
      </div>

      <div className="tabs3">
        {["Completed", "Cancelled", "History"].map((tab) => (
          <div
            key={tab}
            className={`tab-item ${activeTab === tab.toLowerCase() ? "active" : ""}`}
            onClick={() => handleTabClick(tab.toLowerCase())}
          >
            {tab}
          </div>
        ))}
      </div>

      <div className="gray-section">
        {loading ? (
          <p>Loading bookings...</p>
        ) : filteredBookings.length > 0 ? (
          filteredBookings.map((booking, index) => (
            <div className="booking-card" key={index}>
              <h3>{booking.service_type}</h3>
              <p>{booking.address}</p>
              <div className="status-section">
                <span className="status">{booking.booking_status}</span>
                <div className="date-time">
                  <span className="date">{booking.appointment_date}</span>
                  <span className="time">
                    <FontAwesomeIcon icon={faClock} className="time-icon" /> {booking.appointment_time}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No bookings found.</p>
        )}
      </div>

      <div className="footer">
        {[{ icon: faHome, label: 'Home', key: 'home' },
          { icon: faClipboardList, label: 'Bookings', key: 'bookings' },
          { icon: faBell, label: 'Notifications', key: 'notifications' },
          { icon: faUser, label: 'Profile', key: 'profile' }
        ].map(({ icon, label, key }) => (
          <div
            key={key}
            className={`footer-icon ${selectedFooter === key ? 'selected' : ''}`}
            onClick={() => handleFooterClick(key)}
          >
            <FontAwesomeIcon icon={icon} />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookings;
