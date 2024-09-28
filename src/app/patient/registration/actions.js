"use server";

import { auth } from "@/auth";
import Patient from "@/models/patient";
import User from "@/models/user";

export async function createUserPatientProfile(formData) {
    const session = await auth();
    if (!session.user) throw new Error("Unauthorized");
    const user = await User.create({ userId: session.user.id });
    user.userType = "patient";
    await user.save();
    await Patient.create({ userId: session.user.id, firstName: formData.firstName, lastName: formData.lastName, dateOfBirth: formData.dateOfBirth, gender: formData.gender});
}