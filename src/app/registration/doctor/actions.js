'use server'

import { auth } from "@/auth";
import Doctor from "@/models/doctor";
import connectMongo from "@/mongoose";

export async function saveDoctorInformation(data) {
    await connectMongo();

    const session = await auth();
    const user = session.user;
    
    const doctor = new Doctor({
        userId: user.id,
        firstName: data.firstName,
        lastName: data.lastName,
        dateOfBirth: data.dateOfBirth,
        gender: data.gender,
        email: data.email,
        phoneNumber: data.phoneNumber,
        city: data.city,
        country: data.country,
        bio: data.bio,
        languagesSpoken: data.languagesSpoken || [],
        speciality: data.speciality,
        yearsOfExperience: data.yearsOfExperience,
        medicalSchool: data.medicalSchool,
        boardCertifications: data.boardCertifications || [],
        practiceName: data.practiceName,
        hospitalAffiliations: data.hospitalAffiliations || [],
        clinicName: data.clinicName,
        consultationFee: data.consultationFee,
    });

    await doctor.save();
}
