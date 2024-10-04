'use client'
import React, { useState } from 'react';
import './Equipment.css';

const Performance = () => {
  // State to manage selected time period
  const [timePeriod, setTimePeriod] = useState('Month');

  // Dummy data for different periods
  const heartRateData = {
    Day: { average: 75, maximum: 90, variability: [30, 40, 50, 60] },
    Week: { average: 76, maximum: 92, variability: [50, 60, 70, 40] },
    Month: { average: 78, maximum: 98, variability: [30, 70, 40, 50] },
  };

  // Event handler for button click
  const handleTimePeriodChange = (period: string) => {
    setTimePeriod(period);
  };

  return (
    <div className="performance-container">
      {/* Header */}
      <header className="header">
        <button className="back-button">←</button>
        <h1>Clinic Performace</h1>
      </header>

      {/* Time Selector Tabs */}
      <div className="time-selector">
        <button
          className={`tab ${timePeriod === 'Day' ? 'active' : ''}`}
          onClick={() => handleTimePeriodChange('Day')}
        >
          Day
        </button>
        <button
          className={`tab ${timePeriod === 'Week' ? 'active' : ''}`}
          onClick={() => handleTimePeriodChange('Week')}
        >
          Week
        </button>
        <button
          className={`tab ${timePeriod === 'Month' ? 'active' : ''}`}
          onClick={() => handleTimePeriodChange('Month')}
        >
          Month
        </button>
      </div>

      {/* Heart Rate Stats */}
      <div className="stats-container">
        <div className="stat">
          <h3>Average</h3>
          <p className="value">
            {heartRateData[timePeriod].average} <span>Bpm</span>
          </p>
        </div>
        <div className="stat">
          <h3>Maximum</h3>
          <p className="value">
            {heartRateData[timePeriod].maximum} <span>Bpm</span>
          </p>
        </div>
      </div>

      {/* Heart Variability Section */}
      <div className="heart-variability">
        <h3>Performance</h3>
        <div className="bars">
          {heartRateData[timePeriod].variability.map((height, index) => (
            <div key={index} className={`bar ${index === 1 ? 'active' : ''}`} style={{ height: `${height}%` }}>
              {['Mar', 'Apr', 'May', 'Jun'][index]}
            </div>
          ))}
        </div>
      </div>

      {/* Heart Rate History */}
      <div className="history-container">
        <h3>Clinics History <span>View</span></h3>
        <div className="history-item">
          <div className="history-icon">❤️</div>
          <div className="history-details">
            <p>Monthly</p>
            <h2>102 <span>Bpm</span></h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Performance;
