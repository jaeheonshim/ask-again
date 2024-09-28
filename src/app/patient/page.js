"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation"; // Import useRouter
import AppointmentCalendar from "@/components/AppointmentCalendar";
import PastAppointmentsCalendar from "@/components/PastAppointmentsCalender";

export default function PatientDashboard() {
    const [activeTab, setActiveTab] = useState('upcoming');
    const router = useRouter();
    const params = useSearchParams();

    // Extract startDate from query parameters
    const newappt = params.get("newappt")

    return (
        <div className="container-fluid mt-4">
            {newappt && <div class="alert alert-success" role="alert">
                A new consultation has been scheduled!
            </div>
            }

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
                        {/* Pass the startDate prop to the AppointmentCalendar */}
                        <AppointmentCalendar startDate={new Date(decodeURIComponent(newappt))}/>
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
