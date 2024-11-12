'use client';
import { useState } from 'react';
import { FaArrowLeft, FaClipboardList, FaHome, FaBell, FaUser } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './performance.css';
import { faHome, faClock, faClipboardList, faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation'; // Updated import for useRouter

const Performance = () => {
  const router = useRouter(); // Initialize useRouter
  const [selectedFooter, setSelectedFooter] = useState('home');
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('bookings'); // Default to "bookings"

  // Footer click handler
  const handleFooterClick = (footer) => setSelectedFooter(footer);

  // Date generation for dynamic weekly date selection, starting from the system's current date
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return {
      day: date.toLocaleString('en-US', { weekday: 'short' }),
      date: date.getDate(),
      month: date.toLocaleString('en-US', { month: 'short' }),
      year: date.getFullYear(),
    };
  });

  const handleDateClick = (index) => setSelectedDate(index);

  return (
    <div className="containerg">
      <header className="headerh">
        <FaArrowLeft className="backIcon" onClick={() => router.push('/VendorManagementService/Vendors/WheelVendor/Wheel')} /> {/* Navigate on click */}
        <h1>Wheel Performance</h1>
      </header>

      {/* Graph and Dropdown */}
      <div className="cardz">
        <div className="graphHeader">
          <h2>Total booking</h2>
          <select className="dropdown">
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        <div className="graph">
          <span>
            {activeTab} data for{' '}
            {selectedDate !== null
              ? `${dates[selectedDate].day} ${dates[selectedDate].month} ${dates[selectedDate].date}`
              : 'Select a Date'}
          </span>
        </div>
      </div>

      {/* Week Selection */}
      <div className="week-selection">
        {dates.map((date, index) => (
          <div
            key={index}
            className={`week-day ${selectedDate === index ? 'selected' : ''}`}
            onClick={() => handleDateClick(index)}
          >
            <span className="day">{date.day}</span>
            <span className="month-date">
              <span className="month">{date.month}</span>
              <span className="day-number">{date.date}</span>
            </span>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="tabs1">
        {['Bookings', 'Cancelled', 'Completed', 'History'].map((tab) => (
          <div
            key={tab}
            className={`tab-item ${activeTab === tab.toLowerCase() ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.toLowerCase())}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* Cards for booking details */}
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

        {/* Label for September 2024 */}
        <div className="month-label">September 2024</div>

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

      {/* Footer Navigation */}
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

export default Performance;
