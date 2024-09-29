import { auth } from '@/auth';
import DoctorCard from '@/components/DoctorCard';
import Doctor from '@/models/doctor';
import connectMongo from '@/mongoose';
import Link from 'next/link';
import "./page.css";
import AppointmentCalendar from '@/components/AppointmentCalendar';
import { redirect } from 'next/navigation';

export default async function DoctorDashboard() {
    await connectMongo();

    const session = await auth();
    if (!session?.user) return null;
    const user = session.user;

    const doctor = await Doctor.findOne({ userId: user.id });
    if(!doctor) {
        return redirect("/doctor/edit")
    }

    return (
        <main>
            <AppointmentCalendar style={{minHeight: 100}}/>
        </main>
    );
}
