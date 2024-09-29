"use server";

import Appointment from "@/models/appointment";

export async function updateAppointmentDoctorNotes(id, notes) {
    await Appointment.updateOne({_id: id}, {
        doctorNotes: notes
    }, { upsert: false });
}