"use client";

import { useState } from "react";
import AppointmentCalendar from "@/components/AppointmentCalendar";

export default function PatientDashboard() {
    const [activeTab, setActiveTab] = useState('upcoming'); // Track which tab is active

    return (
        <div className="container-fluid mt-4">
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

            {/* Tab Content */}
            <div className="tab-content mt-3">
                {activeTab === 'upcoming' && (
                    <div className="tab-pane fade show active">
                        <AppointmentCalendar />
                    </div>
                )}
                {activeTab === 'past' && (
                    <div className="tab-pane fade show active">
                        {/* Past appointments content will go here */}
                        <h3>Past Appointments</h3>
                        <p>This section will contain past appointments data.</p>
                    </div>
                )}
            </div>
        </div>
    );
}