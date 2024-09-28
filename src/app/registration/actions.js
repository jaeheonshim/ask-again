"use server"

import { auth } from "@/auth";
import User from "@/models/user";

export async function setUserType(userType) {
    const session = await auth();
    if (!session.user) throw new Error("Unauthorized");
    await User.updateOne({ userId: session.user.id }, { userType: userType });
}

export async function getUserType() {
    const session = await auth();
    if (!session.user) throw new Error("Unauthorized");
    const user = await User.findOne({ userId: session.user.id });
    return user.userType;
}