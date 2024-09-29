import Image from 'next/image';  // For handling the image
import Link from 'next/link';    // For linking to edit profile or more details
import placeholder from "./placeholder.jpg";  // Placeholder image
import './page.css'
export default function DoctorInfoCard({ doctor }) {
     // Function to truncate the bio to 25 words
     const truncateBio = (bio) => {
        const words = bio?.split(' ') || [];
        if (words.length > 25) {
            return words.slice(0, 25).join(' ') + '...';  // Limit to 25 words and add '...'
        }
        return bio;
    };

    return (
        <div className="doctor-card">
            <div className="image-container">
                <Image
                    src={placeholder}  // Placeholder image
                    alt={`${doctor.firstName} ${doctor.lastName}`}
                    width={150}
                    height={150}
                />
            </div>

            <div className="content">
                <h2>{doctor.firstName} {doctor.lastName}</h2>
                <p className="speciality">{doctor.speciality}</p>

                <div className="bio-container">
                    <h3>About</h3>
                    <p>{truncateBio(doctor.bio) || "This doctor hasn't written a bio yet."}</p>
                </div>

                <div className="info-container">
                    <p><strong>Experience:</strong> {doctor.yearsOfExperience || 'N/A'} years</p>
                    <p><strong>Consultation Fee:</strong> ${doctor.consultationFee || 'N/A'}</p>
                </div>

                <Link href={`/patient/confirmdoc?id=${doctor._id}`}>
                    <button>Book consultation</button>
                </Link>
            </div>
        </div>
    );
}

const styles = {
    cardContainer: {
        width: '400px',  // Set a standard width for the card
        borderRadius: '15px',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',  // White background for the card
        textAlign: 'center',
        padding: '20px 20px 30px',  // Add padding for spacing
        margin: '40px auto',  // Center the card horizontally
        position: 'relative',  // Ensure relative positioning for the card content
    },
    imageContainer: {
        display: 'flex',
        justifyContent: 'center',  // Center the image horizontally
        marginBottom: '10px',
    },
    imageWrapper: {
        position: 'relative',
        top: '-50px',  // Pull the image upwards by 50px to simulate overlap
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        backgroundColor: '#fff',
        border: '4px solid #fff',  // White border for the image
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        objectFit: 'cover',  // Ensure the image fills the circle without distortion
    },
    content: {
        paddingTop: '60px',  // Adjust top padding to provide space for the image
        padding: '0 15px',
    },
    name: {
        fontSize: '22px',
        fontWeight: 'bold',
        margin: '10px 0 5px',  // Consistent margins for name and title
        color: '#6a0dad',  // Purple text color for the name
    },
    speciality: {
        color: '#6a0dad',  // Purple text color for the speciality
        marginBottom: '20px',
        fontSize: '16px',
    },
    bioContainer: {
        marginBottom: '25px',
        textAlign: 'left',
    },
    bioTitle: {
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '10px',
        textAlign: 'left',
        color: '#6a0dad',  // Purple color for the bio title
    },
    bioText: {
        fontSize: '14px',
        color: '#333',  // Darker gray text for the bio content
        lineHeight: '1.6',
    },
    infoContainer: {
        marginBottom: '25px',
        textAlign: 'left',
        color: '#6a0dad',  // Purple color for the experience and consultation fee
    },
    button: {
        backgroundColor: '#6a0dad',  // Purple background for the button
        color: '#fff',  // White text on the button
        padding: '12px 30px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        width: '100%',
        transition: 'background-color 0.3s ease',  // Smooth transition for hover effects
    },
    buttonHover: {
        backgroundColor: '#540a9d',  // Darker purple background on hover
    }
};
