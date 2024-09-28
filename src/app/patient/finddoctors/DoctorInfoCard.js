import Image from 'next/image';  // For handling the image
import Link from 'next/link';    // For linking to edit profile or more details

export default function DoctorInfoCard({ doctor }) {
    return (
        <div style={styles.cardContainer}>
            {/* Placeholder Image */}
            <div style={styles.imageContainer}>
                <Image
                    src="/placeholder.jpg"  // Add your placeholder image in the public folder
                    alt="Doctor Profile"
                    width={80}
                    height={80}
                    style={styles.image}
                />
            </div>

            <div style={styles.content}>
                {/* Doctor's Name */}
                <h2 style={styles.name}>{doctor.firstName} {doctor.lastName}</h2>
                {/* Doctor's Specialization */}
                <p style={styles.speciality}>{doctor.speciality}</p>
                {/* Doctor's Bio */}
                <div style={styles.bioContainer}>
                    <h3 style={styles.bioTitle}>About</h3>
                    <p style={styles.bioText}>{doctor?.bio || "This doctor hasn't written a bio yet."}</p>
                </div>
                {/* Years of Experience */}
                <div style={styles.infoContainer}>
                    <p><strong>Experience:</strong> {doctor?.yearsOfExperience} years</p>
                    {/* Consultation Fee */}
                    <p><strong>Consultation Fee:</strong> ${doctor?.consultationFee}</p>
                </div>
                {/* Book Consultation Button */}
                <Link href={`/patient/confirmdoc?id=${doctor._id}`}>
                    <button style={styles.button}>
                        Book consultation
                    </button>
                </Link>
            </div>
        </div>
    );
}


const styles = {
    cardContainer: {
        width: '300px',
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
        textAlign: 'center',
        padding: '20px',
        margin: '20px auto',  // Center the card horizontally
    },
    imageContainer: {
        marginBottom: '15px',
    },
    image: {
        borderRadius: '50%',
    },
    content: {
        padding: '0 10px',
    },
    name: {
        fontSize: '20px',
        fontWeight: 'bold',
        margin: '10px 0',
    },
    speciality: {
        color: '#777',
        marginBottom: '20px',
    },
    bioContainer: {
        marginBottom: '20px',
    },
    bioTitle: {
        fontSize: '16px',
        fontWeight: 'bold',
        marginBottom: '10px',
    },
    bioText: {
        fontSize: '14px',
        color: '#666',
    },
    infoContainer: {
        marginBottom: '20px',
    },
    button: {
        backgroundColor: '#007bff',
        color: '#fff',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '14px',
    },
};
