"use client";

import { useEffect, useState } from "react";
import { getProviders, signIn } from "next-auth/react";
import { createUserPatientProfile } from "./actions";

export default function SimpleAuthenticationForm({ editForm }) {
    const [formData, setFormData] = useState({});
    const [providers, setProviders] = useState(null);

    useEffect(() => {
        const data = localStorage.getItem('patient_registration_info');
        setFormData(data ? JSON.parse(data) : {});
    }, []);

    useEffect(() => {
        const fetchProviders = async () => {
          const res = await getProviders();
          setProviders(res);
        };
        fetchProviders();
    }, []);

    const signInHandler = async (provider) => {
        const res = await signIn(provider, { callbackUrl: '/patient' });
    };

    return (
        <div>
            <h2>Hi {formData.firstName}!</h2>
            <p>Please confirm your details</p>
            <ul>
                <li>First Name: {formData.firstName}</li>
                <li>Last Name: {formData.lastName}</li>
                <li>Date of Birth: {formData.dateOfBirth}</li>
                <li>Gender: {formData.gender}</li>
            </ul>
            <p>Something not right? <a href="" onClick={editForm}>Make changes</a></p>
            <h3>Last step: Create an account</h3>
            {providers &&
            Object.values(providers).map((provider) => (
              <button
                className="btn btn-primary w-100"
                key={provider.name}
                onClick={() => signInHandler(provider.id)}
              >
                Sign in with {provider.name}
              </button>
            ))}
        </div>
    );
}