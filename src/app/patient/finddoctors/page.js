import DoctorInfoCard from './DoctorInfoCard';  // Doctor card component
import Doctor from '@/models/doctor';
import connectMongo from '@/mongoose';
import './page.css'; // Import the CSS file

export default async function DoctorDashboard({ speciality }) {
    // Ensure MongoDB connection
    await connectMongo();

    // Find all doctors with the given speciality
    const doctors = await Doctor.find({ speciality: "Cardiologist" });

    if (doctors.length === 0) {
        return (
            <div>
                <h1>No doctors found for the speciality: {speciality}</h1>
            </div>
        );
    }

    return (
        <div className="container">
            <h1 className="header">Doctors Specializing in {speciality}</h1>
            <div className="grid-container">
                {/* Render a DoctorInfoCard for each doctor */}
                {doctors.map((doctor) => (
                    <DoctorInfoCard key={doctor._id} doctor={JSON.parse(JSON.stringify(doctor))} />
                ))}
            </div>
        </div>
    );
}
