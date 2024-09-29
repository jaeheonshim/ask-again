
'use client'; // This makes the component a Client Component

import { signIn } from 'next-auth/react';
import React from 'react';

export function PatientSignIn() {
  const handleSignIn = () => {
    signIn(undefined, { callbackUrl: `/after-sign-in?userType=patient` });
  };

  return (
    <button
      onClick={handleSignIn}
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
  );
}

export function DoctorSignIn() {
  const handleSignIn = () => {
    signIn(undefined, { callbackUrl: `/after-sign-in?userType=doctor` });
  };

  return (
    <button
      onClick={handleSignIn}
      className="btn btn-primary mx-2"
      style={{
        backgroundColor: "#673AB7",
        borderColor: "#673AB7",
      }}
    >
      Doctor Sign In
    </button>
  );
}

export function FindDoctor() {
  const handleSignIn = () => {
    signIn(undefined, { callbackUrl: `/after-sign-in?userType=patient` });
  };

  return (
    <button
      onClick={handleSignIn}
      className="btn btn-outline-primary mx-2 hover:bg-gray-200"
      style={{
        borderColor: "#673AB7",
        color: "#673AB7",
      }}
    >
      Find A Doctor Now!
    </button>
  );
}
