"use client"; // Ensure this is marked as a client component

import { useState } from "react";
import AppointmentCalendar from "@/components/AppointmentCalendar";
import PastAppointmentsCalendar from "@/components/PastAppointmentsCalender";
import Chatbot from "../chat/page";
import "./Dashboard.css";

export default function PatientDashboardComponent({ newappt }) {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showChatbot, setShowChatbot] = useState(false); // State to control Chatbot visibility

  const handleSignOut = () => {
    // Redirect to the sign-out page using window.location.href
    window.location.href = "/sign-out";
  };

  return (
    <div className="container-fluid mt-4">
      {newappt && (
        <div className="alert alert-success" role="alert">
          A new consultation has been scheduled!
        </div>
      )}

      {/* Flexbox container for Tabs and Button */}
      <div className="d-flex justify-content-between align-items-center">
        {/* Bootstrap Nav Tabs */}
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'upcoming' ? 'active' : ''}`}
              onClick={() => setActiveTab('upcoming')}
            >
              Upcoming
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'past' ? 'active' : ''}`}
              onClick={() => setActiveTab('past')}
            >
              Past
            </button>
          </li>
        </ul>

        {/* "Create New Appointment" Button */}
        <button
          className="btn btn-primary"
          onClick={() => setShowChatbot(true)}
        >
          Create New Appointment
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content mt-3">
        {activeTab === 'upcoming' && (
          <div className="tab-pane fade show active">
            <AppointmentCalendar
              startDate={newappt && new Date(decodeURIComponent(newappt))}
            />
          </div>
        )}
        {activeTab === 'past' && (
          <div className="tab-pane fade show active">
            <PastAppointmentsCalendar />
          </div>
        )}
      </div>

      {/* Chatbot Popup */}
      {showChatbot && <Chatbot onClose={() => setShowChatbot(false)} />}
    </div>
  );
}
