"use client";
import { useState, useEffect } from "react";
import { addDays, format, startOfWeek, subWeeks } from "date-fns";
import { getAppointmentsByDateRange } from "@/actions/getAppointmentByDateRange"; // Adjust this import based on your setup

export default function PastAppointmentsCalendar() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchPastAppointments() {
            try {
                const allAppointments = await getAppointmentsByDateRange({start: new Date(0), end: new Date()});

                // Set the accumulated appointments to state
                setAppointments(allAppointments);
            } catch (error) {
                console.error("Error fetching appointments:", error);
                setError("Failed to fetch past appointments");
            } finally {
                setLoading(false);
            }
        }

        fetchPastAppointments();
    }, []);

    if (loading) return <p>Loading past appointments...</p>;
    if (error) return <p>{error}</p>;
    if (appointments.length === 0) return <p>No past appointments found.</p>;

    return (
        <div>
            <h3>Past Appointments Over the Last 20 Weeks</h3>
            <div className="list-group">
                {appointments.map((appointment) => (
                    <div key={appointment._id} className="card mb-3">
                        <div className="card-body">
                            <h6>
                                Appointment with {appointment.doctor.firstName} {appointment.doctor.lastName}
                            </h6>
                            <p>
                                <strong>Date:</strong> {format(new Date(appointment.start), "MMMM dd, yyyy")}
                            </p>
                            <p>
                                <strong>Time:</strong> {format(new Date(appointment.start), "p")} - {format(new Date(appointment.end), "p")}
                            </p>
                            <p>
                                <strong>Cost:</strong> ${appointment.costPerHour}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
