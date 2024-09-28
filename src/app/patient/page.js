"use client";
import { useState, useEffect } from "react";
import { addDays, addWeeks, format, startOfWeek } from "date-fns";
import CreateProfile from "./createProfile";
import { getAppointmentsByDateRange } from "@/actions/getAppointmentByDateRange";

export default function PatientDashboard() {
    const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
    const [appointments, setAppointments] = useState([]);

    const handlePrevWeek = () => {
        setCurrentWeek(addWeeks(currentWeek, -1));
    };

    const handleNextWeek = () => {
        setCurrentWeek(addWeeks(currentWeek, 1));
    };

    const daysOfWeek = Array.from({ length: 7 }, (_, i) =>
        format(addDays(currentWeek, i), 'EEEE, MMM dd')
    );

    // Fetch appointments whenever `currentWeek` changes
    useEffect(() => {
        async function fetchAppointments() {
            const startOfWeekDate = startOfWeek(currentWeek, { weekStartsOn: 1 });
            const endOfWeekDate = addDays(startOfWeekDate, 6); // Full week range
            const fetchedAppointments = await getAppointmentsByDateRange({
                start: startOfWeekDate,
                end: endOfWeekDate,
            });
            setAppointments(fetchedAppointments);
        }

        fetchAppointments();
    }, [currentWeek]);

    return (
        <div>
            {/* <CreateProfile /> */}
            <h1>Patient Dashboard</h1>
            <div className="btn-group" role="group" aria-label="Basic example">
                <button type="button" className="btn btn-primary" onClick={handlePrevWeek}>Prev</button>
                <button type="button" className="btn btn-primary">Week of {format(currentWeek, 'MMM dd')}</button>
                <button type="button" className="btn btn-primary" onClick={handleNextWeek}>Next</button>
            </div>
            <div className="row">
                {
                    daysOfWeek.map((day, index) => (
                        <div key={index} className="col">
                            {day}
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Appointments:</h5>
                                    {appointments
                                        .filter(appointment => {
                                            const appointmentDate = new Date(appointment.start);
                                            return appointmentDate.toDateString() === addDays(currentWeek, index).toDateString();
                                        })
                                        .map(appointment => (
                                            <div key={appointment._id}>
                                                <h6>{format(new Date(appointment.start), 'p')} - {format(new Date(appointment.end), 'p')}</h6>
                                                <p>{appointment.patientId} with Doctor {appointment.doctorId}</p>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
