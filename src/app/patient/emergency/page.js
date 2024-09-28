'use client'

import { useSession, signIn } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { savePatientInformation } from '../registration/actions';

export default function Emergency() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Do nothing while loading
    if (!session) {
      signIn('google'); // Redirects to sign-in if no session
    } else {
      saveUserData(); // Save user data once session is available
    }
  }, [session, status]);

  const saveUserData = async () => {
    if (!session?.user) return; // Check if user data is available

    const submissionData = {
      fullName: session.user.name,
      email: session.user.email,
    };

    try {
      await savePatientInformation(submissionData);
      router.push('/chat');
    } catch (error) {
      console.error('Error saving patient information:', error);
    }
  };

  return <div>Processing...</div>;
}
