import mongoose, { Schema } from "mongoose";
import { ObjectId } from "mongodb";

const patientSchema = new Schema({
  userId: {
    type: ObjectId,
    unique: true,
  },
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
  }
});

const Patient = mongoose.models.Patient || mongoose.model('Patient', patientSchema);
export default Patient;