'use client';
import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faClock, faClipboardList, faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import "./bookings.css";

const Bookings: React.FC = () => {
  const [activeTab, setActiveTab] = useState("bookings");
  const [selectedFooter, setSelectedFooter] = useState("home");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [weekDates, setWeekDates] = useState<string[]>([]);

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
      setInterval(getWeekDates, 24 * 60 * 60 * 1000); // Update every 24 hours
    }, timeUntilMidnight);

    return () => clearTimeout(timer); // Clear timeout on component unmount
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

  return (
    <div className="bookings-container">
      <header className="header">
        <FaArrowLeft className="back-icon" />
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
        <div className="booking-card">
          <div>
            <h3>Oxi Clinic</h3>
            <p>HSR Layout 2nd Main</p>
          </div>
          <div className="status-section">
            <span className="status">Completed</span>
            <div className="date-time">
              <span className="date">12-May-24</span>
              <span className="time">
                <FontAwesomeIcon icon={faClock} className="time-icon" /> 2 hrs ago
              </span>
            </div>
          </div>
        </div>

        <div className="booking-card">
          <div>
            <h3>Oxi Wheel</h3>
            <p>BTM Layout 5th Main</p>
          </div>
          <div className="status-section">
            <span className="status">Completed</span>
            <div className="date-time">
              <span className="date">12-May-24</span>
              <span className="time">
                <FontAwesomeIcon icon={faClock} className="time-icon" /> 2 hrs ago
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="footer">
        <div
          className={`footer-icon ${selectedFooter === 'home' ? 'selected' : ''}`}
          onClick={() => handleFooterClick('home')}
        >
          <FontAwesomeIcon icon={faHome} />
          <span>Home</span>
        </div>
        <div
          className={`footer-icon ${selectedFooter === 'bookings' ? 'selected' : ''}`}
          onClick={() => handleFooterClick('bookings')}
        >
          <FontAwesomeIcon icon={faClipboardList} />
          <span>Bookings</span>
        </div>
        <div
          className={`footer-icon ${selectedFooter === 'notifications' ? 'selected' : ''}`}
          onClick={() => handleFooterClick('notifications')}
        >
          <FontAwesomeIcon icon={faBell} />
          <span>Notifications</span>
        </div>
        <div
          className={`footer-icon ${selectedFooter === 'profile' ? 'selected' : ''}`}
          onClick={() => handleFooterClick('profile')}
        >
          <FontAwesomeIcon icon={faUser} />
          <span>Profile</span>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
