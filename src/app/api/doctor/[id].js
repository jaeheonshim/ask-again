import Doctor from "@/models/doctor";
import connectMongo from "@/mongoose";

export default async function handler(req, res) {
  const { query: { id } } = req;

  await connectMongo();

  try {
    const doctor = await Doctor.findOne({userId: id});
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}
