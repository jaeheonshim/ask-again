"use client";
import { useState, useEffect } from "react";
import { addDays, addWeeks, format, startOfWeek } from "date-fns";
import { getAppointmentsByDateRange } from "@/actions/getAppointmentByDateRange";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AppointmentCalendar({ startDate, ...props }) {
    // Initialize currentWeek with either the passed startDate or the current date's week
    const initialWeek = startOfWeek(startDate ? new Date(startDate) : new Date(), { weekStartsOn: 1 });
    const [currentWeek, setCurrentWeek] = useState(initialWeek);
    const [appointments, setAppointments] = useState([]);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    // Get the start of the current week (used to restrict past weeks)
    const today = startOfWeek(new Date(), { weekStartsOn: 1 });

    // Extract dates of events to highlight them in the calendar
    const eventDates = appointments.map(appointment => new Date(appointment.start));

    const handlePrevWeek = () => {
        const prevWeek = addWeeks(currentWeek, -1);
        if (prevWeek < today) return; // Prevent going to a past week
        setCurrentWeek(prevWeek);
    };

    const handleNextWeek = () => {
        setCurrentWeek(addWeeks(currentWeek, 1));
    };

    const handleDateChange = (date) => {
        const selectedWeek = startOfWeek(date, { weekStartsOn: 1 });
        if (selectedWeek < today) return; // Prevent selecting a past week
        setCurrentWeek(selectedWeek);
        setIsCalendarOpen(false);
    };

    const daysOfWeek = Array.from({ length: 7 }, (_, i) =>
        format(addDays(currentWeek, i), 'EEEE, MMM dd')
    );

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

    // Update the week if startDate prop changes
    useEffect(() => {
        if (startDate) {
            const newWeek = startOfWeek(new Date(startDate), { weekStartsOn: 1 });
            setCurrentWeek(newWeek);
        }
    }, [startDate]);

    return (
        <div props>
            {/* Center the button group using Bootstrap flex utilities */}
            <div className="d-flex justify-content-center mb-4" style={{ position: 'relative' }}>
                <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-primary" onClick={handlePrevWeek} disabled={currentWeek <= today}>Prev</button>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                    >
                        Week of {format(currentWeek, 'MMM dd')}
                    </button>
                    <button type="button" className="btn btn-primary" onClick={handleNextWeek}>Next</button>
                </div>

                {/* Calendar Popup */}
                {isCalendarOpen && (
                    <div className="calendar-popup" style={{
                        position: 'absolute',
                        top: '100%', 
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 1000, 
                        backgroundColor: 'white',
                        border: '1px solid #ccc',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                        borderRadius: '4px'
                    }}>
                        <DatePicker
                            inline
                            selected={currentWeek}
                            onChange={handleDateChange}
                            highlightDates={[{ 'react-datepicker__day--highlighted': eventDates }]}
                            minDate={new Date()} // Disable past dates
                            calendarStartDay={1} // Set Monday as the first day of the week
                        />
                    </div>
                )}
            </div>

            <div className="d-flex justify-content-between gap-0">
                {
                    daysOfWeek.map((day, index) => (
                        <div key={index} className={`d-flex flex-column ${index !== 0 ? 'border-start' : ''}`} style={{ flex: "1 1 0px" }}>
                            <h5 className="text-center">{day}</h5>
                            {appointments
                                .filter(appointment => {
                                    const appointmentDate = new Date(appointment.start);
                                    return appointmentDate.toDateString() === addDays(currentWeek, index).toDateString();
                                })
                                .map(appointment => (
                                    <div key={appointment._id} className="card mb-3">
                                        <div className="card-body p-2 text-wrap text-break">
                                            <h6>{format(new Date(appointment.start), 'p')} - {format(new Date(appointment.end), 'p')}</h6>
                                            <div>Appointment with {appointment.doctor.firstName} {appointment.doctor.lastName} and other details that might overflow, but should wrap.</div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
