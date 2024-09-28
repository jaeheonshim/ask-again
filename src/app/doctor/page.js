import { auth } from '@/auth';
import DoctorCard from '@/components/DoctorCard';
import Doctor from '@/models/doctor';
import connectMongo from '@/mongoose';
import Link from 'next/link';
import "./page.css";
import AppointmentCalendar from '@/components/AppointmentCalendar';

export default async function DoctorDashboard() {
    await connectMongo();

    const session = await auth();
    if (!session?.user) return null;
    const user = session.user;

    const doctor = await Doctor.findOne({ userId: user.id });

    return (
        <main>
            <AppointmentCalendar style={{minHeight: 100}}/>
        </main>
    );
}
