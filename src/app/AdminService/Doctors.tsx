import React from 'react';

const Doctors: React.FC = () => {
  return (
    <div className="main-content">
      <h2 style={{ color: 'grey' }}>This is the Doctors Page</h2>
      {/* You can add more content here later */}
    </div>
  );
};

export default Doctors;

// import React from 'react';
// import './Doctors.css'; // Import the CSS file

// function Doctors() {
//   return (
//     <div className="dashboard-container">
//       {/* Sidebar */}
//       <div className="sidebar">
//         <div className="logo">Doctor</div>
//         <ul className="menu">
//           <li className="menu-item active">Dashboard</li>
//           <li className="menu-item">Report</li>
//           <li className="menu-item">Appointment</li>
//           <li className="menu-item">Patients</li>
//           <li className="menu-item">Doctors</li>
//           <li className="menu-item">Activity</li>
//           <li className="menu-item">Settings</li>
//         </ul>
//         <div className="profile">
//           <img src="profile.jpg" alt="Profile" className="profile-img" />
//           <p className="profile-name">Eliza Karni</p>
//           <p className="profile-email">eliza.karni@email.com</p>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="content">
//         {/* Header */}
//         <div className="header">
//           <input type="text" placeholder="Search..." className="search-bar" />
//           <div className="user-actions">
//             <button className="notifications"></button>
//             <button className="profile-icon"></button>
//           </div>
//         </div>

//         {/* Dashboard */}
//         <div className="dashboard">
//           <div className="dashboard-header">
//             <h2 className="dashboard-title">Dashboard</h2>
//             <div className="date-export">
//               <input type="text" className="date-picker" placeholder="12/05/2023 - 18/05/2023" />
//               <button className="export-btn">Export</button>
//             </div>
//           </div>

//           <div className="stats-grid">
//             <div className="stat-card">Total Patient 42353</div>
//             <div className="stat-card">Total Appointment 42353</div>
//             <div className="stat-card">Total Staff 42353</div>
//             <div className="stat-card">Total Recovered 42353</div>
//           </div>

//           <div className="charts-grid">
//             <div className="chart">Visits</div>
//             <div className="chart">Online Scheduling</div>
//             <div className="chart">Number of Patients</div>
//             <div className="chart">Visits Graph</div>
//             <div className="patient-list">
//               <div className="patient-card">Darwin Haven 09:00 - 09:30</div>
//               <div className="patient-card">Darwin Haven 09:00 - 09:30</div>
//               <div className="patient-card">Darwin Haven 09:00 - 09:30</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Doctors;
