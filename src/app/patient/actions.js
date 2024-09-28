'use server'

import { auth } from "@/auth";
import Patient from "@/models/patient";
import connectMongo from "@/mongoose";
import { parseSetCookie } from "next/dist/compiled/@edge-runtime/cookies";

export async function savePatientInformation(data) {
    await connectMongo();


    const session = await auth();
    const user = session.user;
    const userModel = await User.create({ userId: session.user.id });
    userModel.userType = "patient";
    await userModel.save();
    const present = await Patient.findOne({ userId: user.id });
    if (present) {
        return;
    }
    
    const patient = new Patient({
        userId: user.id,
        fullName: data.fullName,
        email: data.email,
        age: data.age || "",
        gender: data.gender || "",
        country: data.country || "",
        languagesSpoken: data.languagesSpoken || [],
        photoIDFile: null
    });

    await patient.save();
}