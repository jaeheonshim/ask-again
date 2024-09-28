"use server"

import Doctor from "@/models/doctor"

export async function saveDoctor(userId, data) {
    await Doctor.updateOne({ userId }, data, { upsert: true });
}