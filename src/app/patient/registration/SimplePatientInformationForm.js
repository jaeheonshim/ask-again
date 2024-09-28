"use client";

import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useRouter } from 'next/navigation';
import local from 'next/font/local';

const genderOptions = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: 'Other', label: 'Other' },
];

export default function SimplePatientInformationForm({ formDataProp, onFormComplete }) {
  const router = useRouter();

  const [formData, setFormData] = useState(formDataProp || {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
  });

  useEffect(() => {
    const data = localStorage.getItem('patient_registration_info');
    const parsed = JSON.parse(data);
    if(parsed) {
      setFormData({
        ...parsed,
        gender: genderOptions.find((option) => option.value == parsed.gender)
      })
    }
}, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle Select changes
  const handleSelectChange = (selectedOption) => {
    setFormData({ ...formData, gender: selectedOption });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const submissionData = {
      ...formData,
      gender: formData.gender?.value || '',
    };

    localStorage.setItem('patient_registration_info', JSON.stringify(submissionData));

    onFormComplete(submissionData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          {/* First Name */}
          <div>
            <label className='form-label'>First Name*</label>
            <input
              className='form-control'
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          {/* Last Name */}
          <div>
            <label className='form-label'>Last Name*</label>
            <input
              className='form-control'
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          {/* Birthdate */}
          <div>
            <label className='form-label'>Birthdate*</label>
            <input
              className='form-control'
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
          </div>
          {/* Gender */}
          <div>
            <label className='form-label'>Gender*</label>
            <Select
              className='form-control'
              name="gender"
              options={genderOptions}
              onChange={handleSelectChange}
              value={formData.gender}
              placeholder="Select Gender"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className='btn btn-primary mt-2'>
          Register
        </button>
      </form>
    </div>
  );
};