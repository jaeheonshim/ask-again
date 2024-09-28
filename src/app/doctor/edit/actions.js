"use server"

import { auth } from "@/auth";
import Doctor from "@/models/doctor"

export async function saveDoctor(userId, data) {
    const session = await auth();
    if (!session.user) throw new Error("Unauthorized");
    if (session.user.id != userId) throw new Error("Unauthorized");
    await Doctor.updateOne({ userId }, data, { upsert: true });
}