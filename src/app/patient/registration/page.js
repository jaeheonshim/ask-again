"use client";
import React, { useState } from 'react';
import Select from 'react-select';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import { useSession, signIn } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { savePatientInformation } from './actions';
import { createUserPatientProfile } from './actions';
import { FaTextWidth } from 'react-icons/fa';


const PatientRegistrationForm = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Do nothing while loading
    if (!session) {
      signIn('google'); // Redirects to sign-in if no session
    }
  }, [session, status]);
  const [formData, setFormData] = useState({
    // Basic Information
    userId: '',         // Assuming this would be filled or assigned automatically
    fullName: '',
    email: '',
    age: '',            // Keeping it as a string, as in the schema
    gender: '',         // Should be one of 'Male', 'Female', 'Other', or ''
    country: '',
    languagesSpoken: [], // Array of languages
  });
  

  // Options for select inputs
  const genderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Other', label: 'Other' },
  ];

  const languageOptions = [
    { value: 'English', label: 'English' },
    { value: 'Mandarin Chinese', label: 'Mandarin Chinese' },
    { value: 'Spanish', label: 'Spanish' },
    { value: 'Hindi', label: 'Hindi' },
    { value: 'Arabic', label: 'Arabic' },
    { value: 'Bengali', label: 'Bengali' },
    { value: 'Portuguese', label: 'Portuguese' },
    { value: 'Russian', label: 'Russian' },
    { value: 'Japanese', label: 'Japanese' },
    { value: 'Punjabi', label: 'Punjabi' },
    { value: 'German', label: 'German' },
    { value: 'Javanese', label: 'Javanese' },
    { value: 'Wu (Shanghainese)', label: 'Wu (Shanghainese)' },
    { value: 'Malay', label: 'Malay' },
    { value: 'Telugu', label: 'Telugu' },
    { value: 'Vietnamese', label: 'Vietnamese' },
    { value: 'Korean', label: 'Korean' },
    { value: 'French', label: 'French' },
    { value: 'Marathi', label: 'Marathi' },
    { value: 'Tamil', label: 'Tamil' },
    { value: 'Urdu', label: 'Urdu' },
    { value: 'Turkish', label: 'Turkish' },
    { value: 'Italian', label: 'Italian' },
    { value: 'Cantonese', label: 'Cantonese' },
    { value: 'Thai', label: 'Thai' },
    { value: 'Gujarati', label: 'Gujarati' },
    { value: 'Persian', label: 'Persian' },
    { value: 'Polish', label: 'Polish' },
    { value: 'Pashto', label: 'Pashto' },
    { value: 'Kannada', label: 'Kannada' },
    { value: 'Malayalam', label: 'Malayalam' },
    { value: 'Sundanese', label: 'Sundanese' },
    { value: 'Hausa', label: 'Hausa' },
    { value: 'Odia', label: 'Odia' },
    { value: 'Burmese', label: 'Burmese' },
    { value: 'Ukrainian', label: 'Ukrainian' },
    { value: 'Bhojpuri', label: 'Bhojpuri' },
    { value: 'Tagalog', label: 'Tagalog' },
    { value: 'Yoruba', label: 'Yoruba' },
    { value: 'Maithili', label: 'Maithili' },
    { value: 'Uzbek', label: 'Uzbek' },
    { value: 'Sindhi', label: 'Sindhi' },
    { value: 'Amharic', label: 'Amharic' },
    { value: 'Fula', label: 'Fula' },
    { value: 'Romanian', label: 'Romanian' },
    { value: 'Oromo', label: 'Oromo' },
    { value: 'Igbo', label: 'Igbo' },
    { value: 'Azerbaijani', label: 'Azerbaijani' },
    { value: 'Dutch', label: 'Dutch' },
    { value: 'Kurdish', label: 'Kurdish' },
    { value: 'Serbo-Croatian', label: 'Serbo-Croatian' },
    { value: 'Malagasy', label: 'Malagasy' },
    { value: 'Sinhala', label: 'Sinhala' },
    { value: 'Khmer', label: 'Khmer' },
    { value: 'Turkmen', label: 'Turkmen' },
    { value: 'Nepali', label: 'Nepali' },
    { value: 'Assamese', label: 'Assamese' },
    { value: 'Madurese', label: 'Madurese' },
    { value: 'Somali', label: 'Somali' },
    { value: 'Hungarian', label: 'Hungarian' },
    { value: 'Czech', label: 'Czech' },
    { value: 'Greek', label: 'Greek' },
    { value: 'Swedish', label: 'Swedish' },
    { value: 'Belarusian', label: 'Belarusian' },
    { value: 'Zulu', label: 'Zulu' },
    { value: 'Hebrew', label: 'Hebrew' },
    { value: 'Danish', label: 'Danish' },
    { value: 'Finnish', label: 'Finnish' },
    { value: 'Norwegian', label: 'Norwegian' },
    { value: 'Slovak', label: 'Slovak' },
    { value: 'Irish', label: 'Irish' },
    { value: 'Croatian', label: 'Croatian' },
    { value: 'Bulgarian', label: 'Bulgarian' },
    { value: 'Lithuanian', label: 'Lithuanian' },
    { value: 'Latvian', label: 'Latvian' },
    { value: 'Slovenian', label: 'Slovenian' },
    { value: 'Estonian', label: 'Estonian' },
    { value: 'Macedonian', label: 'Macedonian' },
    { value: 'Luxembourgish', label: 'Luxembourgish' },
    { value: 'Icelandic', label: 'Icelandic' },
    { value: 'Maltese', label: 'Maltese' },
    { value: 'Welsh', label: 'Welsh' },
    { value: 'Afrikaans', label: 'Afrikaans' },
    { value: 'Swahili', label: 'Swahili' },
    { value: 'Haitian Creole', label: 'Haitian Creole' },
    { value: 'Esperanto', label: 'Esperanto' },
    // Add more languages as needed
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
  const handleSubmit = async(e) => {
    e.preventDefault();

    // Prepare data for JSON
    const submissionData = {
      ...formData,
      // Convert Select options to arrays of values
      languagesSpoken: formData.languagesSpoken.map((option) => option.value),
    };

    delete submissionData.photoIDFile;

    // Convert to JSON string
    const jsonData = JSON.stringify(submissionData, null, 2);
    try {
      await savePatientInformation(submissionData);
      router.push('/patient');
    }catch (error) {
      console.error('Error saving patient information:', error);
    }

    // Console log the JSON data
    console.log('JSON Data:', jsonData);
  };

  return (
<div style={styles.container}>
  <h1 style={styles.heading}>Patient Registration</h1>
  <form onSubmit={handleSubmit} style={styles.form}>
    {/* Basic Information */}
    <div style={styles.section}>
      {/* Full Name */}
      <div style={styles.inputGroup}>
        <label style={styles.label}>Full Name*</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder={session?.user?.name}
          required
          style={styles.input}
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
          placeholder={session?.user?.email}
          required
          style={styles.input}
        />
      </div>
      {/* Age */}
      <div style={styles.inputGroup}>
        <label style={styles.label}>Age</label>
        <input
          type="text"
          name="age"
          value={formData.age}
          onChange={handleChange}
          style={styles.input}
          placeholder="Enter your age"
        />
      </div>
      {/* Gender */}
      <div style={styles.inputGroup}>
        <label style={styles.label}>Gender</label>
        <Select
          name="gender"
          options={genderOptions}
          onChange={(option) =>
            setFormData({ ...formData, gender: option.value })
          }
          placeholder="Select Gender"
          styles={customSelectStyles}
          isSearchable
        />
      </div>
      {/* Country */}
      <div style={styles.inputGroup}>
        <label style={styles.label}>Country</label>
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          style={styles.input}
          placeholder="Enter your country"
        />
      </div>
      {/* Languages Spoken */}
      <div style={styles.inputGroup}>
        <label style={styles.label}>Languages Spoken</label>
        <Select
          name="languagesSpoken"
          options = {languageOptions}
          isMulti
          onChange={(selectedOptions) =>
            setFormData({ 
              ...formData, 
              languagesSpoken: selectedOptions.map(option => option.value) 
            })
          }
          placeholder="Select Languages"
          styles={customSelectStyles}
        />
      </div>
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
    padding: '1.5rem',
    borderRadius: '8px',
    color: '#333', // Darker text color for readability
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    color: '#333', // Darker text
  },
  section: {
    marginBottom: '1rem',
    color: '#333',
  },
  inputGroup: {
    marginBottom: '1rem',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    fontSize: '1rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    color: '#333',
    backgroundColor: '#fff',
    transition: 'border-color 0.3s',
  },
  inputHover: {
    borderColor: '#673AB7', // Purple when hovered
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    color: '#673AB7', // Purple for labels
    fontWeight: 'bold',
  },
  heading: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#673AB7', // Purple heading
    fontSize: '2rem',
    marginBottom: '1.5rem',
  },
  sectionHeading: {
    color: '#673AB7',
    fontSize: '1.5rem',
    marginBottom: '1rem',
    borderBottom: '2px solid #E0E0E0',
    paddingBottom: '0.5rem',
  },
  button: {
    padding: '1rem',
    fontSize: '1.2rem',
    backgroundColor: '#673AB7', // Purple button
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    textAlign: 'center',
  },
  buttonHover: {
    backgroundColor: '#5E35B1', // Darker purple on hover
  },
};

// Custom styles for react-select
const customSelectStyles = {
  control: (provided) => ({
    ...provided,
    width: '100%',
    backgroundColor: '#fff',
    borderColor: '#673AB7', // Purple border
    borderRadius: '4px',
    padding: '0.5rem',
    color: '#333',
    fontSize: '1rem',
    boxShadow: 'none',
    '&:hover': {
      borderColor: '#5E35B1', // Darker purple on hover
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#333', // Darker text
  }),
  input: (provided) => ({
    ...provided,
    color: '#333',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#999',
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: '#fff',
    color: '#333',
  }),

};

export default PatientRegistrationForm;
