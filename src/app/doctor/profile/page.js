"use client"
import { useEffect, useState } from 'react';

const DoctorProfile = ({ id }) => {
  id = "66f75c6d198f7959d989b847";
  const [doctor, setDoctor] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await fetch(`/api/doctors/${id}`);
        if (!response.ok) throw new Error('Doctor not found');
        const data = await response.json();
        setDoctor(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchDoctor();
  }, [id]);

  if (error) return <div>Error: {error}</div>;
  if (!doctor) return <div>Loading...</div>;

  return (
    <div className="doctor-profile">
      <h1>Doctor Profile</h1>
      <div><strong>First Name:</strong> {doctor.firstName}</div>
      <div><strong>Last Name:</strong> {doctor.lastName}</div>
      <div><strong>Date of Birth:</strong> {new Date(doctor.dateOfBirth).toLocaleDateString()}</div>
      <div><strong>Gender:</strong> {doctor.gender}</div>
      <div><strong>Email:</strong> {doctor.email}</div>
      <div><strong>Phone Number:</strong> {doctor.phoneNumber}</div>
      <div><strong>City:</strong> {doctor.city}</div>
      <div><strong>Country:</strong> {doctor.country}</div>
      <div><strong>Bio:</strong> {doctor.bio}</div>
      <div><strong>Languages Spoken:</strong> {doctor.languagesSpoken.join(', ')}</div>
      <div><strong>Speciality:</strong> {doctor.speciality}</div>
      <div><strong>Years of Experience:</strong> {doctor.yearsOfExperience}</div>
      <div><strong>Medical School:</strong> {doctor.medicalSchool}</div>
      <div><strong>Board Certifications:</strong> {doctor.boardCertifications.join(', ')}</div>
      <div><strong>Practice Name:</strong> {doctor.practiceName}</div>
      <div><strong>Hospital Affiliations:</strong> {doctor.hospitalAffiliations.join(', ')}</div>
      <div><strong>Clinic Name:</strong> {doctor.clinicName}</div>
      <div><strong>Consultation Fee:</strong> {doctor.consultationFee}</div>
    </div>
  );
};

export default DoctorProfile;
