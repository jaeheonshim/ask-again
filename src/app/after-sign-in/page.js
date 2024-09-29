"use server"

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import User from "@/models/user";
import connectMongo from "@/mongoose";

export default async function AfterSignIn({ searchParams }) {
  const userType = searchParams.userType;

  await connectMongo();
  const session = await auth();

  if (session?.user) {
    let userModel = await User.findOne({ userId: session.user.id });

    if (!userModel) {
      userModel = new User({ userId: session.user.id });
    }

    userModel.userType = userType;
    await userModel.save();

    if (userType === "doctor") {
      return redirect("/doctor");
    } else {
      return redirect("/patient");
    }
  } else {
    return redirect("/");
  }
}
