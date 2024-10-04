'use client';
import React, { useState, useEffect } from 'react';
import './Bookings.css';

interface Appointment {
    time: string;
    duration: string;
    doctor: string;
    specialty: string;
    clinic: string;
    address: string;
    status: 'Upcoming' | 'Completed' | 'Canceled';
}

const Bookings = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [tab, setTab] = useState('Upcoming');
    const [dates, setDates] = useState<{ day: string; date: string }[]>([]);
    const [appointments, setAppointments] = useState<Appointment[]>([]);

    // Function to generate dates for the next 5 days
    const getUpcomingDates = () => {
        const today = new Date();
        const dateArray = [];
        for (let i = 0; i < 5; i++) {
            const nextDate = new Date(today);
            nextDate.setDate(today.getDate() + i);

            const day = nextDate.toLocaleDateString('en-US', { weekday: 'short' }); // e.g., 'Wed'
            const date = nextDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short' }); // e.g., 'Feb 8'

            dateArray.push({ day, date });
        }
        setDates(dateArray);
        setSelectedDate(dateArray[1].date); // Default to the second date (e.g., today)
    };

    // Mocking appointment data
    const getAppointments = () => {
        const data: Appointment[] = [
            {
                time: '11:00',
                duration: '30 min',
                doctor: 'Dr. Simon Stanley',
                specialty: 'Dentist',
                clinic: 'Advanced Dental Care',
                address: '142 Joralemon St, Brooklyn, NY',
                status: 'Upcoming'
            },
            {
                time: '13:30',
                duration: '30 min',
                doctor: 'Dr. Cecilia Evans',
                specialty: 'General doctor',
                clinic: 'Brooklyn Family Health Center',
                address: '44 Brooklyn Janice Rd, Brooklyn, NY',
                status: 'Upcoming'
            },
            {
                time: '15:00',
                duration: '30 min',
                doctor: 'Dr. Joseph Miller',
                specialty: 'Oculist',
                clinic: 'Brooklyn Plaza Medical Center',
                address: '650 Fulton St, Brooklyn, NY',
                status: 'Upcoming'
            },
            {
                time: '10:00',
                duration: '20 min',
                doctor: 'Dr. Alan Richards',
                specialty: 'Cardiologist',
                clinic: 'Heart Care Clinic',
                address: '12 Health St, Brooklyn, NY',
                status: 'Completed'
            },
            {
                time: '09:00',
                duration: '40 min',
                doctor: 'Dr. Marie Clark',
                specialty: 'Dermatologist',
                clinic: 'Skin Health Clinic',
                address: '23 Skin Ave, Brooklyn, NY',
                status: 'Canceled'
            }
        ];
        setAppointments(data);
    };

    useEffect(() => {
        getUpcomingDates();
        getAppointments(); // Load appointment data
    }, []);

    const handleDateClick = (date: string) => {
        setSelectedDate(date);
    };

    const handleTabClick = (tab: string) => {
        setTab(tab);
    };

    // Filter appointments based on selected tab (Upcoming, Completed, Canceled)
    const filteredAppointments = appointments.filter(appointment => appointment.status === tab);

    return (
        <div className="bookings-container">
            <header className="bookings-header">
                <i className="back-icon">←</i>
                <h1>My appointments</h1>
                <i className="search-icon"></i>
            </header>

            <div className="dates-scroll">
                {dates.map(({ day, date }) => (
                    <button
                        key={date}
                        className={`date-button ${selectedDate === date ? 'selected' : ''}`}
                        onClick={() => handleDateClick(date)}
                    >
                        <span className="day">{day}</span>
                        <span className="date">{date}</span>
                    </button>
                ))}
            </div>

            <div className="tabs">
                {['Upcoming', 'Completed', 'Canceled'].map((tabItem) => (
                    <button
                        key={tabItem}
                        className={`tab-button ${tab === tabItem ? 'active' : ''}`}
                        onClick={() => handleTabClick(tabItem)}
                    >
                        {tabItem}
                    </button>
                ))}
            </div>

            <div className="appointments-list">
                {filteredAppointments.length > 0 ? (
                    filteredAppointments.map((appointment, index) => (
                        <AppointmentCard
                            key={index}
                            time={appointment.time}
                            duration={appointment.duration}
                            doctor={appointment.doctor}
                            specialty={appointment.specialty}
                            clinic={appointment.clinic}
                            address={appointment.address}
                        />
                    ))
                ) : (
                    <p>No {tab.toLowerCase()} appointments.</p>
                )}
            </div>
        </div>
    );
};

const AppointmentCard = ({ time, duration, doctor, specialty, clinic, address }: any) => (
    <div className="appointment-card">
        <div className="appointment-time">
            <span>{time}</span>
            <span>{duration}</span>
        </div>
        <div className="appointment-details">
            <h3>{doctor}</h3>
            <p>{specialty}</p>
            <p>{clinic}</p>
            <p>{address}</p>
        </div>
        <div className="appointment-actions">
            <button className="more-options">⋮</button>
        </div>
    </div>
);

export default Bookings;
