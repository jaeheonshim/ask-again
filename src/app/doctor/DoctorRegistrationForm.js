"use client";

import React, { useState } from 'react';
import Select from 'react-select';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const DoctorRegistrationForm = () => {
  const [formData, setFormData] = useState({
    // Basic Information
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    email: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    // Professional Information
    languagesSpoken: [],
    speciality: '',
    yearsOfExperience: '',
    medicalSchool: '',
    boardCertifications: [],
    // Upload Documents
    medicalLicenseFile: null,
    photoIDFile: null,
    // Work Information
    practiceName: '',
    hospitalAffiliations: [],
    clinicAddress: '',
    // Additional Details
    telemedicineAvailable: false,
    consultationFee: '',
    consultationMethods: [],
  });

  // Options for select inputs
  const genderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Other', label: 'Other' },
  ];

  const languageOptions = [
    { value: 'English', label: 'English' },
    { value: 'Spanish', label: 'Spanish' },
    { value: 'French', label: 'French' },
    // Add more languages as needed
  ];

  const specialityOptions = [
    { value: 'General Practitioner', label: 'General Practitioner' },
    { value: 'Cardiologist', label: 'Cardiologist' },
    { value: 'Dermatologist', label: 'Dermatologist' },
    // Add more specialities as needed
  ];

  const boardCertificationOptions = [
    { value: 'American Board of Internal Medicine', label: 'American Board of Internal Medicine' },
    { value: 'American Board of Pediatrics', label: 'American Board of Pediatrics' },
    // Add more certifications as needed
  ];

  const stateOptions = [
    { value: 'AL', label: 'Alabama' },
    { value: 'AK', label: 'Alaska' },
    { value: 'AZ', label: 'Arizona' },
    // Add all states/provinces
  ];

  const consultationMethodOptions = [
    { value: 'In-person', label: 'In-person' },
    { value: 'Video Call', label: 'Video Call' },
    { value: 'Phone Call', label: 'Phone Call' },
  ];

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Handle Select changes
  const handleSelectChange = (selectedOptions, actionMeta) => {
    const { name } = actionMeta;
    setFormData({
      ...formData,
      [name]: selectedOptions,
    });
  };

  // Handle file uploads
  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    setFormData({
      ...formData,
      [name]: file,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare data for JSON
    const submissionData = {
      ...formData,
      // Convert Select options to arrays of values
      languagesSpoken: formData.languagesSpoken.map((option) => option.value),
      boardCertifications: formData.boardCertifications.map((option) => option.value),
      consultationMethods: formData.consultationMethods.map((option) => option.value),
      hospitalAffiliations: formData.hospitalAffiliations.map((option) => option.label),
    };

    // Handle file data (exclude from JSON for now)
    delete submissionData.medicalLicenseFile;
    delete submissionData.photoIDFile;

    // Convert to JSON string
    const jsonData = JSON.stringify(submissionData, null, 2);

    // Console log the JSON data
    console.log('JSON Data:', jsonData);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Doctor Registration</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Basic Information */}
        <h2 style={styles.sectionHeading}>Basic Information</h2>
        <div style={styles.section}>
          {/* First Name */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>First Name*</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          {/* Last Name */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Last Name*</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          {/* Date of Birth */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Date of Birth*</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          {/* Gender */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Gender*</label>
            <Select
              name="gender"
              options={genderOptions}
              onChange={(option) =>
                setFormData({ ...formData, gender: option.value })
              }
              placeholder="Select Gender"
              styles={customSelectStyles}
              isSearchable
              required
            />
          </div>
          {/* Email */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email*</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          {/* Phone Number */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Phone Number*</label>
            <PhoneInput
              country={'us'}
              value={formData.phoneNumber}
              onChange={(phone) => setFormData({ ...formData, phoneNumber: phone })}
              inputStyle={{ ...styles.input, color: 'black' }}
            />
          </div>
          {/* Address */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Address*</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          {/* City */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>City*</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          {/* State */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>State/Province*</label>
            <Select
              name="state"
              options={stateOptions}
              onChange={(option) =>
                setFormData({ ...formData, state: option.value })
              }
              placeholder="Select State"
              styles={customSelectStyles}
              isSearchable
              required
            />
          </div>
          {/* Zip Code */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Zip/Postal Code*</label>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          {/* Country */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Country*</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
        </div>

        {/* Professional Information */}
        <h2 style={styles.sectionHeading}>Professional Information</h2>
        <div style={styles.section}>
          {/* Languages Spoken */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Languages Spoken*</label>
            <Select
              name="languagesSpoken"
              options={languageOptions}
              isMulti
              onChange={handleSelectChange}
              placeholder="Select Languages"
              styles={customSelectStyles}
              required
            />
          </div>
          {/* Speciality */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Speciality*</label>
            <Select
              name="speciality"
              options={specialityOptions}
              onChange={(option) =>
                setFormData({ ...formData, speciality: option.value })
              }
              placeholder="Select Speciality"
              styles={customSelectStyles}
              isSearchable
              required
            />
          </div>
          {/* Years of Experience */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Years of Experience*</label>
            <input
              type="number"
              name="yearsOfExperience"
              value={formData.yearsOfExperience}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          {/* Medical School Attended */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Medical School Attended*</label>
            <input
              type="text"
              name="medicalSchool"
              value={formData.medicalSchool}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          {/* Board Certifications */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Board Certifications</label>
            <Select
              name="boardCertifications"
              options={boardCertificationOptions}
              isMulti
              onChange={handleSelectChange}
              placeholder="Select Certifications"
              styles={customSelectStyles}
            />
          </div>
        </div>

        {/* Upload Documents */}
        <h2 style={styles.sectionHeading}>Upload Documents</h2>
        <div style={styles.section}>
          {/* Medical License File */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Upload Medical License*</label>
            <input
              type="file"
              name="medicalLicenseFile"
              onChange={handleFileChange}
              required
              style={styles.input}
            />
          </div>
          {/* Photo ID File */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Upload Photo ID*</label>
            <input
              type="file"
              name="photoIDFile"
              onChange={handleFileChange}
              required
              style={styles.input}
            />
          </div>
        </div>

        {/* Work Information */}
        <h2 style={styles.sectionHeading}>Work Information</h2>
        <div style={styles.section}>
          {/* Practice Name */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Current Practice Name*</label>
            <input
              type="text"
              name="practiceName"
              value={formData.practiceName}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          {/* Hospital Affiliations */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Hospital Affiliation(s)</label>
            <Select
              name="hospitalAffiliations"
              isMulti
              options={[]}
              onChange={handleSelectChange}
              placeholder="Select Hospitals"
              styles={customSelectStyles}
            />
          </div>
          {/* Clinic Address */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Clinic/Hospital Address*</label>
            <input
              type="text"
              name="clinicAddress"
              value={formData.clinicAddress}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
        </div>

        {/* Additional Details */}
        <h2 style={styles.sectionHeading}>Additional Details</h2>
        <div style={styles.section}>
          {/* Telemedicine Availability */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              <input
                type="checkbox"
                name="telemedicineAvailable"
                checked={formData.telemedicineAvailable}
                onChange={handleChange}
                style={{ marginRight: '0.5rem' }}
              />
              Telemedicine Available
            </label>
          </div>
          {/* Consultation Fee */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Consultation Fee*</label>
            <input
              type="number"
              name="consultationFee"
              value={formData.consultationFee}
              onChange={handleChange}
              required
              style={styles.input}
              placeholder="USD"
              min="0"
            />
          </div>
          {/* Consultation Methods */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Preferred Consultation Methods*</label>
            <Select
              name="consultationMethods"
              options={consultationMethodOptions}
              isMulti
              onChange={handleSelectChange}
              placeholder="Select Methods"
              styles={customSelectStyles}
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" style={styles.button}>
          Register
        </button>
      </form>
    </div>
  );
};

// Styles
const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '2rem',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    color: 'black',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    color: 'black',
  },
  section: {
    marginBottom: '2rem',
    color: 'black',
  },
  inputGroup: {
    marginBottom: '1rem',
    color: 'black',
  },
  input: {
    width: '100%',
    padding: '0.5rem',
    fontSize: '1rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    color: 'black',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    color: 'black',
  },
  heading: {
    textAlign: 'center',
    color: 'black',
  },
  sectionHeading: {
    color: 'black',
  },
  button: {
    padding: '1rem',
    fontSize: '1.2rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

// Custom styles for react-select
const customSelectStyles = {
  control: (provided) => ({
    ...provided,
    width: '100%',
    color: 'black',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'black',
  }),
  input: (provided) => ({
    ...provided,
    color: 'black',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#666',
  }),
  menu: (provided) => ({
    ...provided,
    color: 'black',
  }),
};

export default DoctorRegistrationForm;
