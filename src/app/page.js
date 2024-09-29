import { auth } from "@/auth";
import { FindDoctor } from "@/components/auth/SignInButton";
import User from "@/models/user";
import { redirect } from "next/navigation";
import "@/models/appointment";
import connectMongo from "@/mongoose";
import { signIn } from "@/auth";
import React from "react";
import Header from "@/components/header";

// ... other imports

export default async function Home() {
  await connectMongo();
  const session = await auth();

  if (session?.user) {
    const userModel = await User.findOne({ userId: session.user.id });

    if (userModel?.userType === "doctor") {
      redirect("/doctor");
    } else if (userModel?.userType === "patient") {
      redirect("/patient");
    } else {
      // Optionally, redirect to /after-sign-in if userType is not set
      redirect("/after-sign-in");
    }
  }
  return (
    <div
      className="d-flex w-100 h-100 p-3 mx-auto flex-column min-vh-100"
      style={{
        background: "white", // Keep the background white
      }}
    >
      <main className="text-center flex-grow-1 d-flex flex-column align-items-center justify-content-center">
        <h1
          className="display-4 mb-4"
          style={{
            fontSize: "3.5rem",
            color: "#673AB7",
            fontWeight: "bold",
          }}
        >
          Get Expert Medical Advice from Trusted Doctors Worldwide
        </h1>
        <p
          className="lead mb-5"
          style={{
            fontSize: "1.25rem",
            color: "#333",
            maxWidth: "600px",
          }}
        >
          Easily connect with specialists across the globe for a second opinion on your health.
        </p>
        <div className="d-flex">
          <FindDoctor />
        </div>
      </main>

      <section className="features py-5 w-100" style={{ background: "#f9f9f9" }}>
        <div className="container text-center">
          <h2 className="mb-5" style={{ color: "#673AB7" }}>Why Choose askAgain?</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="feature-item p-4 shadow-sm" style={{ backgroundColor: "white", borderRadius: "8px" }}>
                <h3 style={{ color: "#673AB7" }}>Wide Network of Specialists</h3>
                <p>Connect with doctors from various specializations to get the best advice.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-item p-4 shadow-sm" style={{ backgroundColor: "white", borderRadius: "8px" }}>
                <h3 style={{ color: "#673AB7" }}>Secure and Confidential</h3>
                <p>Your privacy is our priority. All consultations are secure and private.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-item p-4 shadow-sm" style={{ backgroundColor: "white", borderRadius: "8px" }}>
                <h3 style={{ color: "#673AB7" }}>Easy Appointment Booking</h3>
                <p>Book a consultation with just a few clicks, anytime, anywhere.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="text-white py-3 w-100" style={{ backgroundColor: "#673AB7" }}>
        <div className="container text-center">
          <p>&copy; 2024 askAgain. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
