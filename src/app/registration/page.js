"use client";

import { useEffect, useState } from "react";
import PastCard from "@/app/patient/pastappointments/PastCard";
import { getAppointmentsByDateRange } from "@/app/actions/getAppointmentsByDateRange"; // Import server action
import AppointmentCalendar from "@/components/AppointmentCalendar";


function handleSubmit(event) {
    setUserType(selectedUserType).then(() => {
        if (selectedUserType == 'doctor') {
            router.push('/doctor');
        } else if (selectedUserType == 'patient') {
            router.push('/patient');
        }
    });
}

export default function PatientDashboard() {
    const [activeTab, setActiveTab] = useState('upcoming'); // Track which tab is active
    const [pastAppointments, setPastAppointments] = useState([]); // Store past appointments
    const [loading, setLoading] = useState(true); // Loading state for past appointments

    useEffect(() => {
        // Only fetch past appointments when the "Past" tab is active
        if (activeTab === 'past') {
            async function fetchPastAppointments() {
                try {
                    const today = new Date();
                    const oneMonthAgo = new Date(today);
                    oneMonthAgo.setMonth(today.getMonth() - 1);

                    // Fetch past appointments (last 1 month for demonstration purposes)
                    const appointments = await getAppointmentsByDateRange({
                        start: oneMonthAgo,
                        end: today,
                    });

                    setPastAppointments(appointments);
                } catch (error) {
                    console.error('Failed to fetch past appointments:', error);
                } finally {
                    setLoading(false);
                }
            }

            fetchPastAppointments();
        }
    }, [activeTab]);

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
                        <h3>Upcoming Appointments</h3>
                        <div className="tab-pane fade show active">
                            <AppointmentCalendar />
                        </div>
                    </div>
                )}
                {activeTab === 'past' && (
                    <div className="tab-pane fade show active">
                        <h3>Past Appointments</h3>
                        {loading ? (
                            <p>Loading past appointments...</p>
                        ) : pastAppointments.length > 0 ? (
                            <div>
                                {pastAppointments.map((appointment) => (
                                    <PastCard key={appointment._id} appointment={appointment} />
                                ))}
                            </div>
                        ) : (
                            <p>No past appointments found.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
