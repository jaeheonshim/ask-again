import { Schema } from "mongoose";
import mongoose from mongoose;

const doctorSchema = new Schema({
  // Basic Information
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },

  // Professional Information
  languagesSpoken: {
    type: [String],
    default: [],
  },
  speciality: {
    type: String,
    required: true,
  },
  yearsOfExperience: {
    type: Number,
    required: true,
  },
  medicalSchool: {
    type: String,
    required: true,
  },
  boardCertifications: {
    type: [String],
    default: [],
  },

  // Upload Documents
  medicalLicenseFile: {
    type: String, // Assuming you'll store the file path or URL in a string format
  },
  photoIDFile: {
    type: String, // Assuming you'll store the file path or URL in a string format
  },

  // Work Information
  practiceName: {
    type: String,
  },
  hospitalAffiliations: {
    type: [String],
    default: [],
  },
  clinicAddress: {
    type: String,
  },

  // Additional Details
  telemedicineAvailable: {
    type: Boolean,
    default: false,
  },
  consultationFee: {
    type: Number,
  },
  consultationMethods: {
    type: [String], // For example, ['In-person', 'Telemedicine']
    default: [],
  },
});

// Export the model
const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;
