"use client";

import { auth } from '@/auth';
import DoctorRegistrationForm from './DoctorRegistrationForm';

const DoctorRegistrationPage = async () => {
  const session = await auth();

  if(!session.user) return null;

  async function updateDoctorInformation(formData) {
    
  }

  return (
    <div>
      <DoctorRegistrationForm />
    </div>
  );
};

export default DoctorRegistrationPage;
