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
    className="d-flex flex-column" // Full height with Flexbox
    style={{ height: '93%', background: "white" }}
  >
    <main
      className="flex-grow-1 d-flex flex-column align-items-center justify-content-center text-center"
      style={{ padding: "20px" }} // Add padding for spacing
    >
      <h1
        className="display-4 mb-4"
        style={{
          fontSize: "3.5rem",
          color: "#673AB7",
          fontWeight: "bold",
          maxWidth: "900px", // Ensure the text doesn't get too wide
          lineHeight: "1.2", // Adjust line height for better readability
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
        The third largest cause of death in the world is misdiagnosis. With askAgain easily connect with specialists across the globe for a second opinion on your health.
      </p>
      <div className="d-flex mb-3">
        <FindDoctor />
      </div>
    </main>

    <section className="features pt-1 py-4 w-100" style={{ background: "#f9f9f9" }}>
      <div className="container text-center">
        <h2 className="mb-4" style={{ fontWeight:"bold", color: "#673AB7", fontSize: '20px'}}>Why Choose askAgain?</h2>
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

    <footer className="text-white py-3 w-100 mt-auto" style={{ backgroundColor: "#673AB7" }}>
      <div className="container text-center">
        <p>&copy; 2024 askAgain. All rights reserved.</p>
      </div>
    </footer>
  </div>
);
}
