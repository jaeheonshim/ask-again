"use server";

import Doctor from "@/models/doctor";

export default async function DoctorCard({ doctorId }) {
    const doctor = await Doctor.findOne({ userId: doctorId });
    if (!doctor) return null;

    return (
        <div className="card p-3">
            <div className="row g-3">
                <div className="col-auto">
                    <img
                        src="https://i.pravatar.cc/300"
                        alt={`${doctor.firstName} ${doctor.lastName}`}
                        className="img-fluid rounded-circle"
                        style={{ width: '100px', height: '100px' }}
                    />
                </div>
                <div className="col">
                    <div className="card-title fs-2">
                        {doctor.firstName} {doctor.lastName}
                    </div>
                    <div>
                        <span className="badge text-bg-info me-2">{doctor.speciality}</span>
                        <span className="badge text-bg-success">{doctor.yearsOfExperience} years of experience</span>
                    </div>
                </div>
            </div>
            <div className="card-text mt-1">
                <p>Bio text</p>
                <ul>
                    <li>{doctor.gender}</li>
                    <li>Languages spoken: {doctor.languagesSpoken.join(", ")}</li>
                    <li>Medical School: {doctor.medicalSchool}</li>
                    <li>Consultation Fee: ${doctor.consultationFee}</li>
                </ul>
            </div>
        </div>
    );
}
