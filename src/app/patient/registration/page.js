"use client";

import { useState } from 'react';
import SimpleAuthenticationForm from './SimpleAuthenticationForm';
import SimplePatientRegistrationForm from './SimplePatientInformationForm';

const FORM = 0;
const REGISTER = 1;

const RegistrationPage = () => {
    const [signUpStage, setSignUpStage] = useState(FORM);
    const [formData, setFormData] = useState({});

    return (
        <div className='card w-50 p-4 mx-auto'>
            <div>
                {signUpStage == FORM && <SimplePatientRegistrationForm formDataProp={formData} onFormComplete={(formData) => {
                    setFormData(formData);
                    setSignUpStage(REGISTER);
                }} />}
                {signUpStage == REGISTER && <SimpleAuthenticationForm formData={formData} editForm={() => setSignUpStage(FORM)} />}
            </div>
        </div>
    );
};

export default RegistrationPage;