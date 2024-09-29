import React from 'react';
import './page.css';

export default function HowItWorks() {
  return (
    <div className="container my-5">
      {/* Header Section */}
      <header className="header mb-5 text-center">
        <h1 className="text-primary">How It Works</h1>
        <p className="lead">
          Discover how easy it is to connect with doctors using askAgain.
        </p>
      </header>

      {/* Step 1: Sign Up and Verification */}
      <section className="box mb-5 p-4">
        <h2 className="text-secondary">Step 1: Sign Up and Verification</h2>
        <p>
          Whether you're a patient seeking a second opinion or a doctor offering your expertise, start by creating an account. 
          Patients and doctors have separate registration forms to ensure a tailored experience for each user type.
        </p>
        <ul>
          <li>For Patients: Provide basic information and health details to create your profile.</li>
          <li>For Doctors: Submit your medical license and credentials for verification, ensuring that only qualified professionals join our network.</li>
        </ul>
      </section>

      {/* Step 2: Access Your Dashboard */}
      <section className="box mb-5 p-4">
        <h2 className="text-secondary">Step 2: Access Your Dashboard</h2>
        <p>
          After logging in, both patients and doctors are redirected to their personalized dashboards.
        </p>
        <ul>
          <li>Patient Dashboard: Manage upcoming appointments, view past consultations, and book new sessions.</li>
          <li>Doctor Dashboard: View scheduled appointments, access patient records, and manage your availability.</li>
        </ul>
      </section>

      {/* Step 3: Book a Consultation */}
      <section className="box mb-5 p-4">
        <h2 className="text-secondary">Step 3: Book a Consultation</h2>
        <p>
          When you're ready to seek a second opinion, initiate the booking process through your dashboard.
        </p>
        <ul>
          <li>AI-Powered Prediagnosis: Our intelligent chatbot conducts a prediagnosis by asking relevant questions, saving cognitive energy for both patients and doctors.</li>
          <li>Doctor Recommendations: Based on your prediagnosis, receive a curated list of relevant specialists from our global network.</li>
          <li>Schedule Appointment: Choose a convenient time slot and book your consultation with the selected doctor.</li>
        </ul>
      </section>

      {/* Step 4: Secure Consultation */}
      <section className="box mb-5 p-4">
        <h2 className="text-secondary">Step 4: Secure Consultation</h2>
        <p>
          Connect with your chosen doctor through a secure video call within the platform.
        </p>
        <ul>
          <li>Real-Time Communication: Discuss your health concerns directly with the doctor in a private and secure environment.</li>
          <li>AI-Enhanced Documentation: During the consultation, our AI listens and generates organized doctor notes and prescriptions, minimizing human error.</li>
        </ul>
      </section>

      {/* Step 5: Post-Consultation Follow-Up */}
      <section className="box mb-5 p-4">
        <h2 className="text-secondary">Step 5: Post-Consultation Follow-Up</h2>
        <p>
          After your consultation, both you and your doctor receive detailed summaries of the session.
        </p>
        <ul>
          <li>Review and Amend: Doctors have the opportunity to review and amend the AI-generated notes to ensure accuracy.</li>
          <li>Email Summaries: Receive comprehensive reports via email, including doctor’s notes and prescriptions, for your records.</li>
        </ul>
      </section>

      {/* Step 6: Manage Your Health Records */}
      <section className="box mb-5 p-4">
        <h2 className="text-secondary">Step 6: Manage Your Health Records</h2>
        <p>
          Easily access and manage all your medical records through your dashboard.
        </p>
        <ul>
          <li>Past Appointments: View detailed records of all your previous consultations, including AI-generated notes and prescriptions.</li>
          <li>Data Security: Your health information is securely stored and only accessible to you and your authorized doctors.</li>
        </ul>
      </section>

      {/* Footer */}
      <footer className="text-white py-3 w-100" style={{ backgroundColor: "#673AB7" }}>
        <div className="container text-center">
          <p>&copy; 2024 askAgain. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
