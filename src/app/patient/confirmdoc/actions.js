'use server'

import { auth } from "@/auth";
import Appointment from "@/models/appointment";
import Doctor from "@/models/doctor";
import Patient from "@/models/patient";
import connectMongo from "@/mongoose";
import { parseSetCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { ObjectId } from "mongodb";
import { getSummary } from "@/app/chat/actions";

export async function createAppointment(doctorId, start, end, chatHistory) {
    await connectMongo();

    const session = await auth();
    const user = session.user;

    const patientModel = await Patient.findOne({userId: new ObjectId(user.id)});
    console.log(doctorId);
    const doctorModel = await Doctor.findOne({_id: doctorId});
    console.log(doctorModel);

    await Appointment.create({
        patient: patientModel,
        doctor: doctorModel,
        costPerHour: doctorModel.consultationFee,
        start: start,
        end: end,
        chatHistory: chatHistory,
        chatSummary: await getSummary(chatHistory)
    })
}