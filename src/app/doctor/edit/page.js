import { auth } from '@/auth';
import DoctorInformationEditForm from './DoctorInformationEditForm';
import connectMongo from '@/mongoose';
import Doctor from '@/models/doctor';

const DoctorRegistrationPage = async () => {
  await connectMongo();
  const session = await auth();

  if(!session.user) return null;

  const doctor = await Doctor.findOne({userId: session.user.id});

  return (
    <div>
      <DoctorInformationEditForm userId={session.user.id} doctor={JSON.parse(JSON.stringify(doctor))} />
    </div>
  );
};

export default DoctorRegistrationPage;
