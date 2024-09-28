"use client"

import { useEffect } from "react";
import { createUserPatientProfile } from "./registration/actions";

export default function CreateProfile() {
    useEffect(() => {
        const createProfileIfDataExists = async () => {
            const data = localStorage.getItem('patient_registration_info');
            console.log(data);
            if (data) {
                localStorage.removeItem('patient_registration_info');
                createUserPatientProfile(JSON.parse(data));
            }
        };

        createProfileIfDataExists();
    });

    return null;
}