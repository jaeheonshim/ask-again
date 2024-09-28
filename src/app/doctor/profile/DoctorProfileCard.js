"use server";

import Doctor from '@/models/doctor';
import connectMongo from '@/mongoose';
import './DoctorProfileCard.css';

async function DoctorProfileCard({ id }) {
  await connectMongo();

  const doctor = await Doctor.findOne({ userId: id });

  return (
    <div className="doctor-profile-card">
      <div className="card-header">
        <img src="/placeholder-image.png" alt="Doctor Image" className="doctor-image" />
        <h1 className="card-title">{doctor.firstName} {doctor.lastName}</h1>
        <h2 className="card-speciality">{doctor.speciality}</h2>
      </div>
      <div className="card-about">
        <h3>About</h3>
        <p>{doctor.bio}</p>
        <p><strong>Years of Experience:</strong> {doctor.yearsOfExperience} years</p>
        <p><strong>Medical School:</strong> {doctor.medicalSchool}</p>
      </div>
      <button className="work-together-btn">Consult</button>
    </div>
  );
};

export default DoctorProfileCard;
