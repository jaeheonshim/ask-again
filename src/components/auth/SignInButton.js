
'use server'; // This makes the component a Client Component

import { signIn } from '@/auth';
import React from 'react';

const handleSignIn = async () => {
  "use server";
  await signIn(undefined, { callbackUrl: `/after-sign-in?userType=patient` });
};

export async function PatientSignIn() {
  return (
    <form action={handleSignIn}>
      <button
        type='submit'
        className="btn btn-outline-primary mx-2 hover:bg-gray-200 active:bg-gray-400"
        style={{
          borderColor: "#673AB7",
          color: "#673AB7",
          backgroundColor: "transparent",
          accentColor: "#673AB7",
        }}
      >
        Patient Sign In
      </button>
    </form>
  );
}

export async function DoctorSignIn() {

  return (
    <form action={handleSignIn}>
      <button
        type='submit'
        className="btn btn-primary mx-2"
        style={{
          backgroundColor: "#673AB7",
          borderColor: "#673AB7",
        }}
      >
        Doctor Sign In
      </button>
    </form>
  );
}

export async function FindDoctor() {

  return (
    <form action={handleSignIn}>
      <button
        type="submit"
        className="btn btn-outline-primary mx-2 hover:bg-gray-200"
        style={{
          borderColor: "#673AB7",
          color: "#673AB7",
        }}
      >
        Find A Doctor Now!
      </button>
    </form>
  );
}
