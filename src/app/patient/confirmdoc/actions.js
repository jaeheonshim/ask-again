'use server';

import { auth } from "@/auth";
import Appointment from "@/models/appointment";
import Doctor from "@/models/doctor";
import Patient from "@/models/patient";
import connectMongo from "@/mongoose";
import { ObjectId } from "mongodb";
import { createEvent } from 'ics'; // Importing the ics library

export async function createAppointment(doctorId, start, end) {
    // Connect to the database
    await connectMongo();

    // Authenticate the user
    const session = await auth();
    const user = session.user;

    // Find the patient and doctor models
    const patientModel = await Patient.findOne({ userId: new ObjectId(user.id) });
    const doctorModel = await Doctor.findOne({ _id: doctorId });

    // Log doctor information for debugging
    console.log(doctorModel);

    // Create a new appointment in the database
    await Appointment.create({
        patient: patientModel,
        doctor: doctorModel,
        costPerHour: doctorModel.consultationFee,
        start: start,
        end: end
    });

    // Event details for the .ics file
    const eventDetails = {
        start: [start.getUTCFullYear(), start.getUTCMonth() + 1, start.getUTCDate(), start.getUTCHours(), start.getUTCMinutes()],
        end: [end.getUTCFullYear(), end.getUTCMonth() + 1, end.getUTCDate(), end.getUTCHours(), end.getUTCMinutes()],
        title: `Consultation with Dr. ${doctorModel.firstName} ${doctorModel.lastName}`,
        description: `Appointment for a consultation in ${doctorModel.speciality}.`,
        location: `${doctorModel.clinicAddress}, ${doctorModel.city}, ${doctorModel.country}`,
        url: `https://example.com/meeting/${doctorModel._id}/${patientModel._id}`, // Fake meeting URL
        status: 'CONFIRMED',
        organizer: { name: `Dr. ${doctorModel.firstName} ${doctorModel.lastName}`, email: doctorModel.email },
        attendees: [{ name: `${patientModel.firstName} ${patientModel.lastName}`, email: patientModel.email }]
    };

    // Generate the ICS file
    const icsPromise = new Promise((resolve, reject) => {
        createEvent(eventDetails, (error, value) => {
            if (error) {
                reject(error);
            } else {
                resolve(value);
            }
        });
    });

    // Wait for the ICS generation to complete
    try {
        const icsFileContent = await icsPromise;

        // Optionally return the ICS file content to the client (this can be handled in different ways depending on your setup)
        // For example, you can return it in a response if this function is part of an API call:
        return {
            status: 'success',
            message: 'Appointment created successfully',
            icsFile: icsFileContent // Client-side can use this to trigger a download
        };
    } catch (error) {
        console.error('Error generating ICS file:', error);
        return {
            status: 'error',
            message: 'Failed to generate ICS file'
        };
    }
}
