import Image from 'next/image';
import connectMongo from '@/mongoose';
import Doctor from '@/models/doctor';
import { notFound } from 'next/navigation';  // For handling 404s
import ConfirmDocModal from './ConfirmDocModal';
import Header from '@/components/header';

export default async function ConfirmDoctorPage({ searchParams }) {
    const id = searchParams?.id;  // Extract the doctor ID from the query string

    // Ensure MongoDB connection
    await connectMongo();

    // Fetch doctor data by _id from the database
    const doctor = await Doctor.findOne({ _id: id });

    // If no doctor is found, handle it by rendering a 404 page or a custom error
    if (!doctor) {
        return notFound();  // This will render a 404 page
    }

    // Render the doctor data in the page
    return (
        <div style={styles.container}>
            {/* Profile Header */}
            <div style={styles.profileHeader}>
                <div style={styles.imageContainer}>
                    <Image
                        src="/placeholder.jpg"  // Placeholder image
                        alt="Doctor Profile"
                        width={150}
                        height={150}
                        style={styles.image}
                    />
                </div>
                <div style={styles.profileDetails}>
                    <h1 style={styles.name}>{doctor.firstName} {doctor.lastName}</h1>
                    <p style={styles.speciality}>{doctor.speciality}</p>
                </div>
            </div>

            {/* Bio Section */}
            <div style={styles.section}>
                <h3 style={styles.sectionTitle}>About</h3>
                <p style={styles.sectionContent}>{doctor.bio || "This doctor hasn't written a bio yet."}</p>
            </div>

            {/* Professional Information Section */}
            <div style={styles.section}>
                <h3 style={styles.sectionTitle}>Professional Information</h3>
                <p><strong>Experience:</strong> {doctor.yearsOfExperience} years</p>
                <p><strong>Consultation Fee:</strong> ${doctor.consultationFee}</p>
                <p><strong>Location:</strong> {doctor.city}, {doctor.country}</p>
                <p><strong>Medical School:</strong> {doctor.medicalSchool}</p>
                <p><strong>Languages Spoken:</strong> {doctor.languagesSpoken.join(', ')}</p>
            </div>

            {/* Contact Section */}
            <div style={styles.section}>
                <h3 style={styles.sectionTitle}>Contact Information</h3>
                <p><strong>Email:</strong> {doctor.email}</p>
                <p><strong>Phone:</strong> {doctor.phoneNumber}</p>
            </div>

            <ConfirmDocModal doctor={JSON.parse(JSON.stringify(doctor))} />
        </div>
        
    );
}

// New styles for a larger, more detailed page layout
const styles = {
    container: {
        maxWidth: '900px',
        margin: '0 auto',
        padding: '40px 20px',
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
    profileHeader: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '40px',
    },
    imageContainer: {
        flexShrink: 0,
        marginRight: '20px',
    },
    image: {
        borderRadius: '50%',
        objectFit: 'cover',
        border: '4px solid #ddd',
    },
    profileDetails: {
        flexGrow: 1,
    },
    name: {
        fontSize: '36px',
        fontWeight: 'bold',
        margin: '0 0 10px',
        color: '#333',
    },
    speciality: {
        fontSize: '18px',
        color: '#777',
        marginBottom: '0',
    },
    section: {
        marginBottom: '30px',
    },
    sectionTitle: {
        fontSize: '24px',
        fontWeight: '600',
        marginBottom: '15px',
        color: '#333',
        borderBottom: '2px solid #eee',
        paddingBottom: '5px',
    },
    sectionContent: {
        fontSize: '16px',
        lineHeight: '1.7',
        color: '#555',
    },
    button: {
        display: 'block',
        width: '100%',
        padding: '15px',
        backgroundColor: '#28a745',
        color: '#fff',
        fontSize: '18px',
        fontWeight: 'bold',
        textAlign: 'center',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        marginTop: '30px',
    },
    buttonHover: {
        backgroundColor: '#218838',
    },
};
