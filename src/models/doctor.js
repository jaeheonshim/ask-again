import mongoose, { Schema } from "mongoose";
import { ObjectId } from "mongodb";

const doctorSchema = new Schema({
  userId: {
    type: ObjectId,
    unique: true,
  },
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
  languagesSpoken: {
    type: [String],
    default: [],
  },
  speciality: String,
  yearsOfExperience: Number,
  medicalSchool: String,
  practiceName: String,
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
