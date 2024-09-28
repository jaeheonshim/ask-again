"use client";

import { useEffect, useState } from "react";
import { getUserType, setUserType } from "./actions";
import { useRouter } from "next/navigation";
import './page.css';

export default function Registration() {
    const router = useRouter();
    const [isLoaded, setIsLoaded] = useState(false);

    // Function to handle redirection based on selected user type
    function handleSelection(userType) {
        setUserType(userType).then(() => {
            if (userType === 'doctor') {
                router.push('/doctor');
            } else if (userType === 'patient') {
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

    if (!isLoaded) return null;

    return (
        <div className="container mt-5 text-center">
            <h2
                className="mb-4"
                style={{
                    fontSize: "2rem",
                    background: "linear-gradient(135deg, #7B1FA2, #4A148C)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    textFillColor: "transparent"
                }}
            >
                Welcome! Please choose your user type:
            </h2>
            <div className="row justify-content-center">
                <div className="col-md-5 mb-3">
                    <div
                        className="profile-card h-100 p-5 rounded-3 border border-4"
                        onClick={() => handleSelection('doctor')}
                        style={{
                            background: "white",
                            borderColor: "#7B1FA2",
                            color: "black",
                            cursor: 'pointer',
                            transition: "background-color 0.3s ease, color 0.3s ease"
                        }}
                    >
                        <img
                            src="https://via.placeholder.com/100"
                            alt="Doctor"
                            className="img-fluid mb-3"
                            style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                        />
                        <h2>I'm a Doctor</h2>
                        <p>
                            As a doctor, you can manage appointments, patients, and medical records through our platform.
                        </p>
                    </div>
                </div>
                <div className="col-md-5 mb-3">
                    <div
                        className="profile-card h-100 p-5 rounded-3 border border-4"
                        onClick={() => handleSelection('patient')}
                        style={{
                            background: "white",
                            borderColor: "#7B1FA2",
                            color: "black",
                            cursor: 'pointer',
                            transition: "background-color 0.3s ease, color 0.3s ease"
                        }}
                    >
                        <img
                            src="https://via.placeholder.com/100"
                            alt="Patient"
                            className="img-fluid mb-3"
                            style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                        />
                        <h2>I'm a Patient</h2>
                        <p>
                            As a patient, you can schedule appointments, consult with doctors, and track your health records.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
