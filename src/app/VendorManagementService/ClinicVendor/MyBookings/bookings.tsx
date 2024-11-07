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
      const response = await axios.get("http://localhost:8000/api/bookings/");
      setAllBookings(response.data); // Store all bookings
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBookings();
  }, []);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
  };

  const handleFooterClick = (footer: string) => {
    setSelectedFooter(footer);
  };

  // Filter bookings based on activeTab
  const filteredBookings = allBookings.filter((booking) => {
    if (activeTab === "bookings") return booking.status === "pending";
    if (activeTab === "cancelled") return booking.status === "cancelled";
    if (activeTab === "completed") return booking.status === "completed";
    return true; // For "history", return all bookings
  });

  return (
    <div className="bookings-container">
      <header className="header">
        <FaArrowLeft className="back-icon"  onClick={() => router.push('/VendorManagementService/Vendors/WheelVendor/Wheel')}/>
        <h1>My Bookings</h1>
      </header>

      <div className="week-selection">
        {weekDates.map((date, index) => {
          const [day, month, dayNumber] = date.split(" ");
          return (
            <div
              key={index}
              className={`week-day ${selectedDate === date ? "selected" : ""}`}
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

      <div className="tabs">
        {["Bookings", "Cancelled", "Completed", "History"].map((tab) => (
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
                <span className="status">{booking.status}</span>
                <div className="date-time">
                  <span className="date">{booking.date}</span>
                  <span className="time">
                    <FontAwesomeIcon icon={faClock} className="time-icon" /> {booking.time}
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
        {[
          { icon: faHome, label: 'Home', key: 'home' },
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

