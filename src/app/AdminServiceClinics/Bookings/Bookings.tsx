'use client';
import React, { useState, useEffect } from 'react';
import './Bookings.css';
import axios from 'axios';

interface Appointment {
    oxi_book_id: number;
    oxi_book_date: string; // This will hold the date in "YYYY-MM-DD" format
    oxi_book_time: string;  // This will hold the appointment time
    oxi_username: string;
    oxi_status: 'upcoming' | 'completed' | 'cancelled';
}

const Bookings = () => {
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [tab, setTab] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming');
    const [dates, setDates] = useState<{ month: string; date: string }[]>([]);
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

    const getUpcomingDates = () => {
        const today = new Date();
        const dateArray = [];
        for (let i = -1; i < 4; i++) {
            const nextDate = new Date(today);
            nextDate.setDate(today.getDate() + i);
            const month = nextDate.toLocaleDateString('en-US', { month: 'short' });
            const date = nextDate.toLocaleDateString('en-US', { day: 'numeric' });
            dateArray.push({ month, date });
        }
        setDates(dateArray);
        setSelectedDate(`${dateArray[0].month} ${dateArray[0].date}`);
    };

    const getAppointments = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/Clinic_Backend/bookings/');
            const data: Appointment[] = response.data;
            setAppointments(data);
        } catch (error) {
            console.error("Error fetching appointment data:", error);
        }
    };

    useEffect(() => {
        getUpcomingDates();
        getAppointments();
    }, []);

    const handleDateClick = (month: string, date: string) => {
        setSelectedDate(`${month} ${date}`);
    };

    const handleTabClick = (tab: 'upcoming' | 'completed' | 'cancelled') => {
        setTab(tab);
    };

    const getFilteredAppointments = () => {
        return appointments.filter(appointment => {
            const appointmentDate = new Date(appointment.oxi_book_date);
            const formattedDate = appointmentDate.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
            });
            return formattedDate === selectedDate && appointment.oxi_status === tab;
        });
    };

    const filteredAppointments = getFilteredAppointments();

    const handleCardClick = (appointment: Appointment) => {
        setSelectedAppointment(appointment);
    };

    const handleAccept = () => {
        console.log(`Accepted appointment: ${selectedAppointment?.oxi_book_id}`);
        setSelectedAppointment(null);
    };

    const handleReject = () => {
        console.log(`Rejected appointment: ${selectedAppointment?.oxi_book_id}`);
        setSelectedAppointment(null);
    };

    return (
        <div className="bookings-container">
            <header className="bookings-header">
                <i className="back-icon">←</i>
                <h1>My appointments</h1>
                <i className="search-icon"></i>
            </header>

            <div className="dates-scroll">
                {dates.map(({ month, date }) => (
                    <button
                        key={`${month} ${date}`}
                        className={`date-button ${selectedDate === `${month} ${date}` ? 'selected' : ''}`}
                        onClick={() => handleDateClick(month, date)}
                    >
                        <span className="month">{month}</span>
                        <span className="date">{date}</span>
                    </button>
                ))}
            </div>

            <div className="tabs">
                {['upcoming', 'completed', 'cancelled'].map((tabItem) => (
                    <button
                        key={tabItem}
                        className={`tab-button ${tab === tabItem ? 'active' : ''}`}
                        onClick={() => handleTabClick(tabItem as 'upcoming' | 'completed' | 'cancelled')}
                    >
                        {tabItem.charAt(0).toUpperCase() + tabItem.slice(1)}
                    </button>
                ))}
            </div>

            <div className="appointments-list">
                {filteredAppointments.length > 0 ? (
                    filteredAppointments.map((appointment) => (
                        <AppointmentCard
                            key={appointment.oxi_book_id}
                            appointment={appointment}
                            onCardClick={handleCardClick}
                        />
                    ))
                ) : (
                    <p>No {tab} appointments for {selectedDate}.</p>
                )}
            </div>

            {selectedAppointment && (
                <div className="appointment-details">
                    <h2>Appointment Details</h2>
                    <p><strong>Username:</strong> {selectedAppointment.oxi_username}</p>
                    <p><strong>Date:</strong> {selectedAppointment.oxi_book_date}</p>
                    <p><strong>Time:</strong> {selectedAppointment.oxi_book_time}</p> {/* Time added here */}
                    <p><strong>Status:</strong> {selectedAppointment.oxi_status}</p>
                    <button onClick={handleAccept} className="accept-button">Accept</button>
                    <button onClick={handleReject} className="reject-button">Reject</button>
                </div>
            )}
        </div>
    );
};

interface AppointmentCardProps {
    appointment: Appointment;
    onCardClick: (appointment: Appointment) => void;
}

const AppointmentCard = ({ appointment, onCardClick }: AppointmentCardProps) => (
    <div className="appointment-card" onClick={() => onCardClick(appointment)}>
        <div className="appointment-time">
            <span>{appointment.oxi_book_date}</span>
        </div>
        <div className="appointment-details">
            <h3>{appointment.oxi_username}</h3>
            <p>Status: {appointment.oxi_status}</p>
        </div>
    </div>
);

export default Bookings;
