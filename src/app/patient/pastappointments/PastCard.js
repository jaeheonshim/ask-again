import React from 'react';

export default function PastCard({ appointment }) {
  console.log('Received appointment in PastCard:', appointment); // Debugging log

  // If appointment is not received, render a fallback message
  if (!appointment) {
    return <p>No appointment data available.</p>;
  }

  // Convert timestamps to Date objects
  const startDate = new Date(appointment.start);
  const endDate = new Date(appointment.end);

  const durationHours = (endDate - startDate) / (1000 * 60 * 60); // Calculate the duration in hours

  return (
    <div style={styles.cardContainer}>
      <div style={styles.cardHeader}>
        <h3>{appointment.doctor?.firstName} {appointment.doctor?.lastName}</h3>
        <p>{appointment.doctor?.speciality}</p>
      </div>
      <div style={styles.cardBody}>
        <p><strong>Date:</strong> {startDate.toLocaleDateString()}</p>
        <p><strong>Time:</strong> {startDate.toLocaleTimeString()} - {endDate.toLocaleTimeString()}</p>
        <p><strong>Duration:</strong> {durationHours.toFixed(2)} hour(s)</p>
        <p><strong>Cost:</strong> ${(appointment.costPerHour * durationHours).toFixed(2)}</p>
      </div>
    </div>
  );
}

const styles = {
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
  },
  cardHeader: {
    borderBottom: '1px solid #eee',
    marginBottom: '10px',
  },
  cardBody: {
    fontSize: '14px',
    color: '#555',
  },
};
