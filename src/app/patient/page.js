"use server";

import Patient from "@/models/patient";
import PatientDashboardComponent from "./Dashboard";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import connectMongo from "@/mongoose";
import Header from "@/components/header"; // Import the Header

export default async function PatientDashboard({ searchParams }) {
    await connectMongo();
    
    const session = await auth();
    const newappt = searchParams.newappt || null;

    if(!session) return null;
    if(!session.user) return null;

    const patientModel = await Patient.findOne({userId: session.user.id});
    if(!patientModel) {
        redirect("/patient/registration");
    }

    return (
        <>
            {/* Render the Header and pass the user data */}
            <Header user={session.user} />
            <PatientDashboardComponent newappt={newappt} />
        </>
    );
}
