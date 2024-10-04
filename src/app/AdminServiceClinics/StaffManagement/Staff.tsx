'use client';

import React, { useState } from 'react';
import './Staff.css'; // Importing the CSS file

const Staff: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Kcal');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="staff-container">
      <h1>Staff</h1>

      {/* Tabs */}
      <div className="tabs">
        {['Kcal', 'Water', 'Steps'].map((tab) => (
          <button
            key={tab}
            className={`tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Chart Section */}
      <div className="chart-section">
        <h2>This Week Details</h2>
        <p>Total {activeTab.toLowerCase()} burned</p>
        {/* Example chart - you can replace this with a real chart library */}
        <div className="chart-placeholder">
          <div className="bar" style={{ height: '10%' }}></div>
          <div className="bar" style={{ height: '50%' }}></div>
          <div className="bar" style={{ height: '80%' }}></div>
          <div className="bar" style={{ height: '40%' }}></div>
          <div className="bar" style={{ height: '30%' }}></div>
          <div className="bar" style={{ height: '70%' }}></div>
          <div className="bar" style={{ height: '90%' }}></div>
        </div>
        {/* Days of the Week */}
        <div className="days-of-week">
          {['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day) => (
            <div key={day} className="day-label">{day}</div>
          ))}
        </div>
      </div>

      {/* Weekly Performance */}
      <div className="weekly-performance">
        <h3>Weekly Performance</h3>
        <div className="performance-circle">
          <span>80%</span>
        </div>
        <p>Your weekly report</p>
      </div>
    </div>
  );
};

export default Staff;
