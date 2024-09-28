'use client'

import { auth } from "@/auth";
import User from "@/models/user";
import connectMongo from "@/mongoose";
import { useEffect, useState } from "react";

const SET_USER_TYPE = "SET_USER_TYPE";

export default async function Registration() {
    await connectMongo();
    const session = await auth();
    if (!session?.user) return null;
    const user = session.user;

    const [registrationState, setRegistrationState] = useState(null);

    if (registrationState == SET_USER_TYPE) {
        return (
            <form>
                <label>
                    <input
                        name="userType"
                        type="radio"
                        value="doctor"
                    />
                    Doctor
                </label>
                <label>
                    <input
                        name="userType"
                        type="radio"
                        value="patient"
                    />
                    Patient
                </label>
                <br />
                <button type="submit">Continue</button>
            </form>
        )
    }

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
            <h2>Choose role</h2>
            <form>
                <div>
                    <label>
                        <input
                            type="radio"
                            value="doctor"
                        />
                        Doctor
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="patient"
                        />
                        Patient
                    </label>
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};