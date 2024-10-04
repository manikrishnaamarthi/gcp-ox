"use client";
import React from "react";
import "./page.css";
import { useRouter } from "next/navigation";

const Page: React.FC = () => {
  const router = useRouter();

  const sections = [
    { id: 1, title: "Bookings", subtitle: "Manage Appointments", icon: "📅", notification: "120+" },
    { id: 2, title: "Staff Management", subtitle: "Doctors & Admins", icon: "👥", notification: "50+" },
    { id: 3, title: "Clinic Performance", subtitle: "KPIs & Efficiency", icon: "📊", notification: "8 Active" },
    { id: 4, title: "Equipment", subtitle: "Status & Maintenance", icon: "🛠️", notification: "5 In Maintenance" },
    { id: 5, title: "Operations", subtitle: "Clinic Operations", icon: "⚙️", notification: "Operational" },
  ];

  const handleCardClick = (title: string) => {
    if (title === "Bookings") {
      router.push("/AdminServiceClinics/Bookings"); // Navigate to Bookings
    } else if (title === "Operations") {
      router.push("/AdminServiceClinics/Operations"); // Navigate to Operations
    } else if (title === "ClinicPerformance") {
      router.push("/AdminServiceClinics/ClinicPerformance"); // Navigate to ClinicPerformance
    } else if (title === "StaffManagement") {
      router.push("/AdminServiceClinics/StaffManagement"); // Navigate to StaffManagement
    } else if (title === "Equipment") {
      router.push("/AdminServiceClinics/Equipment"); // Navigate to Equipment
    }
  };
  

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Oxivive Dashboard</h2>
        <div className="notification-icon">🔔</div>
      </div>
      <div className="dashboard-grid">
        {sections.map((section) => (
          <div
            className="dashboard-card"
            key={section.id}
            onClick={() => handleCardClick(section.title)} // Handle card click
          >
            <div className="card-header">
              <span className="icon">{section.icon}</span>
              <span className="notification">{section.notification}</span>
            </div>
            <div className="card-body">
              <h3>{section.title}</h3>
              <p>{section.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="dashboard-footer">
        <div className="footer-icon" onClick={() => router.push("/")}>🏠</div>
        <div className="footer-icon active" onClick={() => router.push("/AdminServiceClinics/Account")}>👤</div>
      </div>
    </div>
  );
};

export default Page;
