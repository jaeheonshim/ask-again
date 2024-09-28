"use client";
import { useEffect, useState } from 'react';
import './profile.css'; // Importing the CSS file

// Basic Input Component for Reusability
const InputField = ({ label, value, name, onChange, isEditing, type = "text" }) => (
  <p>
    <strong>{label}:</strong>
    {isEditing ? (
      <input 
        type={type} 
        name={name} 
        value={value} 
        onChange={onChange} 
        className="input-field"
      />
    ) : (
      value
    )}
  </p>
);

const DoctorProfile = () => {
  const [doctor, setDoctor] = useState(null);

  useEffect(async () => {
    try {
      const response = await fetch(`/api/doctors/${id}`);
      if(!response.ok) throw new Error("Doctor not found");
      const data = await response.json();
      setDoctor(data);
    } catch (err) {
      
    }
  })

  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => setIsEditing(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      telemedicineAvailable: e.target.checked,
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    alert('Profile updated successfully');
  };

  return (
    <div className="profile-container">
      <h1>Doctor Profile</h1>

      <section>
        <h2>Basic Information</h2>
        <InputField
          label="First Name"
          name="firstName"
          value={formData.firstName}
          isEditing={isEditing}
          onChange={handleInputChange}
        />
        <InputField
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          isEditing={isEditing}
          onChange={handleInputChange}
        />
        <InputField
          label="Date of Birth"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          isEditing={isEditing}
          onChange={handleInputChange}
        />
        <InputField
          label="Gender"
          name="gender"
          value={formData.gender}
          isEditing={isEditing}
          onChange={handleInputChange}
        />
        <InputField
          label="Email"
          name="email"
          value={formData.email}
          isEditing={isEditing}
          onChange={handleInputChange}
        />
        <InputField
          label="Phone Number"
          name="phoneNumber"
          value={formData.phoneNumber}
          isEditing={isEditing}
          onChange={handleInputChange}
        />
        <InputField
          label="City"
          name="city"
          value={formData.city}
          isEditing={isEditing}
          onChange={handleInputChange}
        />
        <InputField
          label="Country"
          name="country"
          value={formData.country}
          isEditing={isEditing}
          onChange={handleInputChange}
        />
      </section>

      <section>
        <h2>Professional Information</h2>
        <InputField
          label="Speciality"
          name="speciality"
          value={formData.speciality}
          isEditing={isEditing}
          onChange={handleInputChange}
        />
        <InputField
          label="Years of Experience"
          name="yearsOfExperience"
          value={formData.yearsOfExperience}
          isEditing={isEditing}
          onChange={handleInputChange}
        />
        <InputField
          label="Medical School"
          name="medicalSchool"
          value={formData.medicalSchool}
          isEditing={isEditing}
          onChange={handleInputChange}
        />
        <InputField
          label="Board Certifications"
          value={formData.boardCertifications.join(', ')}
          isEditing={false}
        />
      </section>

      <section>
        <h2>Work Information</h2>
        <InputField
          label="Practice Name"
          name="practiceName"
          value={formData.practiceName}
          isEditing={isEditing}
          onChange={handleInputChange}
        />
        <InputField
          label="Hospital Affiliations"
          value={formData.hospitalAffiliations.join(', ')}
          isEditing={false}
        />
        <InputField
          label="Clinic Address"
          name="clinicAddress"
          value={formData.clinicAddress}
          isEditing={isEditing}
          onChange={handleInputChange}
        />
      </section>

      <section>
        <h2>Additional Details</h2>
        <p>
          <strong>Telemedicine Available:</strong>
          {isEditing ? (
            <input
              type="checkbox"
              checked={formData.telemedicineAvailable}
              onChange={handleCheckboxChange}
            />
          ) : (
            formData.telemedicineAvailable ? 'Yes' : 'No'
          )}
        </p>
        <InputField
          label="Consultation Fee"
          name="consultationFee"
          value={`$${formData.consultationFee}`}
          isEditing={isEditing}
          type="number"
          onChange={handleInputChange}
        />
      </section>

      <div className="button-container">
        {isEditing ? (
          <button onClick={handleSave}>Save</button>
        ) : (
          <button onClick={handleEditClick}>Edit Profile</button>
        )}
      </div>
    </div>
  );
};

export default DoctorProfile;
