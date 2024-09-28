import mongoose, { Schema } from "mongoose";
import { ObjectId } from "mongodb";

const doctorSchema = new Schema({
  userId: ObjectId,
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
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  bio: {
    type: String
  },
  languagesSpoken: {
    type: [String],
    default: [],
  },
  speciality: String,
  yearsOfExperience: Number,
  medicalSchool: String,
  boardCertifications: {
    type: [String],
    default: [],
  },
  practiceName: String,
  hospitalAffiliations: {
    type: [String],
    default: [],
  },
  clinicName: {
    type: String,
  },
  consultationFee: {
    type: Number,
  },
});

// Export the model
const Doctor = mongoose.models.Doctor || mongoose.model('Doctor', doctorSchema);
export default Doctor;
