import { addHours, addWeeks, startOfWeek } from "date-fns";
import mongoose, { Schema } from "mongoose";
import { ObjectId } from "mongodb";
import Doctor from "./doctor";

const appointmentSchema = new Schema({
  patient: {
    type: ObjectId,
    required: true,
    ref: 'Patient'
  },
  doctor: {
    type: ObjectId,
    required: true,
    ref: Doctor
  },
  costPerHour: {
    type: Number,
    required: true
  },
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
    required: true
  }
});

// Export the model
const Appointment = mongoose.models.Appointment || mongoose.model('Appointment', appointmentSchema);
export default Appointment;