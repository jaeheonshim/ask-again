"use server"

import connectMongo from "@/mongoose";
import Appointment from "@/models/appointment";
import { startOfDay, endOfDay } from "date-fns";

export async function getAppointmentsByDateRange({ start, end }) {
    await connectMongo();

    // Adjust start and end to cover the entire days
    const startDate = startOfDay(new Date(start));
    const endDate = endOfDay(new Date(end));

    const appointments = await Appointment.find({
        start: { $gte: startDate, $lt: endDate },
    })
        .populate('doctor')
        .lean(); // Use lean() for performance and to return plain objects

    // Serialize ObjectId and Date fields
    const serializedAppointments = appointments.map(appointment => ({
        ...appointment,
        _id: appointment._id.toString(),  // Convert ObjectId to string
        start: appointment.start.toISOString(),  // Convert Date to ISO string
        end: appointment.end.toISOString(),  // Convert Date to ISO string
    }));

    return JSON.parse(JSON.stringify(serializedAppointments));
}
