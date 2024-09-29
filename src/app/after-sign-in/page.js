// app/after-sign-in/page.js

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import User from "@/models/user";
import connectMongo from "@/mongoose";

export default async function AfterSignIn({ searchParams }) {
  const userType = searchParams.userType;

  if (!userType || !["patient", "doctor"].includes(userType)) {
    redirect("/");
    return;
  }

  try {
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
        redirect("/doctor");
      } else {
        redirect("/patient");
      }
    } else {
      redirect("/");
    }
  } catch (error) {
    console.error("Error during after sign-in process:", error);
    redirect("/");
  }
}
