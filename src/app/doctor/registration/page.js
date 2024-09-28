import { auth } from '@/auth';
import DoctorRegistrationForm from './DoctorRegistrationForm';
import connectMongo from '@/mongoose';
import Doctor from '@/models/doctor';

const DoctorRegistrationPage = async () => {
  await connectMongo();
  const session = await auth();

  if(!session.user) return null;

  const doctor = await Doctor.findOne({userId: "66f75c6d198f7959d989b847"})

  return (
    <div>
      <DoctorRegistrationForm doctor={JSON.parse(JSON.stringify(doctor))} />
    </div>
  );
};

export default DoctorRegistrationPage;
