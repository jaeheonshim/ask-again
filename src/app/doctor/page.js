import { auth } from '@/auth';
import Doctor from '@/models/doctor';
import connectMongo from '@/mongoose';
import Link from 'next/link';

export default async function DoctorDashboard() {
    connectMongo();

    const session = await auth();
    if (!session.user) return null;
    const user = session.user;

    const doctor = await Doctor.findOne({ userId: user.id });

    if (!doctor) {
        return (
            <div>
                <h1>Welcome, {user.name}</h1>
                <p>It looks like you haven't completed your profile registration yet.</p>
                <Link href="/doctor/edit/">Complete your profile</Link>
            </div>
        );
    }

    return (
        <div>
            <h1>Welcome, {user.name}</h1>
        </div>
    );
};