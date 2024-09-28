"use client"

import { useEffect, useState } from "react";
import { getUserType, setUserType } from "./actions";
import { useRouter } from "next/navigation";

export default function Registration() {
    const router = useRouter();
    const [selectedUserType, setSelectedUserType] = useState('doctor');
    const [isLoaded, setIsLoaded] = useState(false);

    function handleSubmit(event) {
        setUserType(selectedUserType).then(() => {
            if(selectedUserType == 'doctor') {
                router.push('/doctor');
            } else if(selectedUserType == 'patient') {
                router.push('/patient');
            }
        });
    }

    useEffect(() => {
        async function verifyUserType() {
            const userType = await getUserType();
            if (userType) {
                if (userType === 'doctor') {
                    router.push('/doctor');
                } else if (userType === 'patient') {
                    router.push('/patient');
                }
            }

            setIsLoaded(true);
        }

        verifyUserType();
    }, []);

    if(!isLoaded) return null;

    return (
        <div>
            <h2>Welcome! Please choose your user type:</h2>
            <form action={handleSubmit}>
                <div className="d-flex justify-content-center gap-3">
                    <div onClick={() => setSelectedUserType("doctor")} className={(selectedUserType == 'doctor' ? "bg-primary " : "") + "p-4 rounded"} style={{ cursor: 'pointer' }}>
                        <img
                            src="/path/to/doctor-image.png"
                            alt="Doctor"
                            className="img-fluid"
                            style={{ width: '100px', height: '100px' }}
                        />
                        <p>I'm a doctor</p>
                    </div>
                    <div onClick={() => setSelectedUserType("patient")} className={(selectedUserType == 'patient' ? "bg-primary " : "") + "p-4 rounded"} style={{ cursor: 'pointer' }}>
                        <img
                            src="/path/to/patient-image.png"
                            alt="Patient"
                            className="img-fluid"
                            style={{ width: '100px', height: '100px' }}
                        />
                        <p>I'm a patient</p>
                    </div>
                </div>
                <button type="submit" className="mt-3">Continue</button>
            </form>
        </div>
    );
};