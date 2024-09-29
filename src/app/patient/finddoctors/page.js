import DoctorInfoCard from './DoctorInfoCard';  // Doctor card component
import Doctor from '@/models/doctor';
import connectMongo from '@/mongoose';
import './page.css'; // Import the CSS file
import Header from '@/components/header';
import { auth } from "@/auth";
export default async function DoctorDashboard({ searchParams }) {
    // Ensure MongoDB connection
    await connectMongo();
    const session = await auth();

    const { speciality } = searchParams;

    // Find all doctors with the given speciality
    const doctors = await Doctor.find({ speciality: speciality});

    if (doctors.length === 0) {
        return (
            <div>
                <h1>No doctors found for the speciality: {speciality}</h1>
            </div>
        );
    }

    return (
        <>
        <div className="container">
            <h1 className="header">Expert {speciality}s Ready To Assist You!</h1>
            <div className="grid-container">
                {/* Render a DoctorInfoCard for each doctor */}
                {doctors.map((doctor) => (
                    <DoctorInfoCard key={doctor._id} doctor={JSON.parse(JSON.stringify(doctor))} />
                ))}
            </div>
        </div>
        </>
    );
}
