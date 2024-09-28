'use server'

import { auth } from "@/auth";
import Patient from "@/models/patient";
import User from "@/models/user";
import connectMongo from "@/mongoose";
import { parseSetCookie } from "next/dist/compiled/@edge-runtime/cookies";

export async function savePatientInformation(data) {
    await connectMongo();

    const session = await auth();
    const user = session.user;
    const userModel = await User.findOne({ userId: session.user.id });
    userModel.userType = "patient";
    await userModel.save();

    await Patient.updateOne({userId: session.user.id}, {
        userId: user.id,
        fullName: data.fullName,
        email: data.email,
        age: data.age || "",
        gender: data.gender || "",
        country: data.country || "",
        languagesSpoken: data.languagesSpoken || [],
        photoIDFile: null
    }, { upsert: true });
}