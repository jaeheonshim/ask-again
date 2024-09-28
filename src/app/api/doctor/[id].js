import Doctor from "@/models/doctor";
import connectMongo from "@/mongoose";
import mongoose from 'mongoose';

export default async function handler(req, res) {
  const { query: { id } } = req;

  console.log("Requested ID:", id);  // Debugging log

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  await connectMongo();

  try {
    const doctor = await Doctor.findOne({ userId: mongoose.Types.ObjectId(id) });
    console.log("Doctor found:", doctor);  // Debugging log

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.status(200).json(doctor);
  } catch (error) {
    console.error("Error finding doctor:", error);  // Debugging log
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}
