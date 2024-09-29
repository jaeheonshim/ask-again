"use client"; // Ensure this is marked as a client component

import { useState } from "react";
import AppointmentCalendar from "@/components/AppointmentCalendar";
import PastAppointmentsCalendar from "@/components/PastAppointmentsCalender";
import Chatbot from "../chat/page";
import "../Dashboard.css";

export default function DoctorDashboardComponent({ newappt }) {
  const [activeTab, setActiveTab] = useState('upcoming');

  return (
    <div className="container-fluid mt-4">
      {/* Flexbox container for Tabs and Button */}
      <div className="d-flex justify-content-between align-items-center">
        {/* Bootstrap Nav Tabs */}
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'upcoming' ? 'active' : ''}`}
              onClick={() => setActiveTab('upcoming')}
            >
              Upcoming Appointments
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'past' ? 'active' : ''}`}
              onClick={() => setActiveTab('past')}
            >
              Past Appointments
            </button>
          </li>
        </ul>
      </div>

      {/* Tab Content */}
      <div className="tab-content mt-3">
        {activeTab === 'upcoming' && (
          <div className="tab-pane fade show active">
            <AppointmentCalendar />
          </div>
        )}
        {activeTab === 'past' && (
          <div className="tab-pane fade show active">
            <PastAppointmentsCalendar />
          </div>
        )}
      </div>
    </div>
  );
}
