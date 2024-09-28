"use server";

import connectMongo from "@/mongoose";
import Appointment from "@/models/appointment";
import { startOfDay, endOfDay } from "date-fns";
import { auth } from "@/auth";
import Patient from "@/models/patient";
import User from "@/models/user";
import Doctor from "@/models/doctor";

export async function getAppointmentsByDateRange({ start, end }) {
    // Connect to MongoDB and log the connection status
    console.log("Connecting to MongoDB...");
    await connectMongo();
    console.log("Connected to MongoDB.");

    // Ensure the start and end dates cover the entire days
    const session = await auth();
    const user = session.user;

    try {
        const userModel = await User.findOne({ userId: user.id });
        let appointments = [];

        console.log(userModel);
        if (userModel.userType === "patient") {
            const patient = await Patient.findOne({ userId: user.id });
            const startDate = startOfDay(new Date(start));
            const endDate = endOfDay(new Date(end));
            appointments = await Appointment.find({
                start: { $gte: startDate, $lt: endDate },
                patient: patient
            })
                .populate('doctor')
                .populate('patient') // Populate the doctor field
                .lean();
        } else if(userModel.userType === "doctor") {
            const doctor = await Doctor.findOne({ userId: user.id });
            const startDate = startOfDay(new Date(start));
            const endDate = endOfDay(new Date(end));
            appointments = await Appointment.find({
                start: { $gte: startDate, $lt: endDate },
                doctor: doctor
            })
                .populate('doctor')
                .populate('patient')
                .lean();
        } else {
            return;
        }

        console.log("Fetched appointments:", appointments); // Log fetched appointments

        // Serialize ObjectId and Date fields
        const serializedAppointments = appointments.map(appointment => ({
            ...appointment,
            _id: appointment._id.toString(),
            start: appointment.start.toISOString(),
            end: appointment.end.toISOString(),
        }));

        console.log("Serialized appointments:", serializedAppointments);

        return JSON.parse(JSON.stringify(serializedAppointments));
    } catch (error) {
        console.error("Error fetching appointments:", error);
        throw error;
    }
}
