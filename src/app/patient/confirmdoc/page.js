import Image from 'next/image';
import connectMongo from '@/mongoose';
import Doctor from '@/models/doctor';
import { notFound } from 'next/navigation';  // For handling 404s
import ConfirmDocModal from './ConfirmDocModal';
import Header from '@/components/header';
import placeholder from '../finddoctors/placeholder.jpg'
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
        <>
        <div style={styles.container}>
            {/* Left side: Image and core details */}
            <div style={styles.leftSide}>
                <div style={styles.imageContainer}>
                    <Image
                        src={placeholder}  // Placeholder image
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

            {/* Right side: Additional information */}
            <div style={styles.rightSide}>
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

            
        </div>
        </>
    );
}

// Updated styles for left-aligned image and right details layout
const styles = {
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        padding: '40px 10px',
    },
    leftSide: {
        flex: '0 0 300px',  // Fix the width of the left side
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginRight: '40px',  // Add spacing between left and right sides
    },
    imageContainer: {
        marginBottom: '20px',
    },
    image: {
        borderRadius: '50%',
        height: '200px',
        width: '200px',
        objectFit: 'cover',
        border: '4px solid #ddd',
    },
    profileDetails: {
        textAlign: 'center',
    },
    name: {
        fontSize: '30px',
        fontWeight: 'bold',
        margin: '10px 0',
        color: '#6a0dad',  // Purple name color
    },
    speciality: {
        fontSize: '16px',
        color: '#6a0dad',  // Purple text color for specialization
    },
    rightSide: {
        flex: '1',  // The right side takes up the remaining space
    },
    section: {
        marginBottom: '10px',
        padding: '5px',
    },
    sectionTitle: {
        fontSize: '25px',
        fontWeight: '600',
        color: '#6a0dad',  // Purple section titles
        marginBottom: '10px',
    },
    sectionContent: {
        fontSize: '14px',
        lineHeight: '1.6',
        color: '#555',
    },
};
