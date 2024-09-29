import React from 'react';
import './page.css';

export default function HowItWorks() {
  return (
    <div className="container my-3">
      {/* Header Section */}
      <header className="header mb-2 text-center">
        <h1 className=" mb-0 page-title"
        style={{color: '#673AB7'}}>How It Works</h1>
        <p className="lead">
          Discover how easy it is to connect with doctors using askAgain.
        </p>
      </header>

      {/* Steps Section */}
      <div className="steps">
        <section className="box p-3">
          <h2 className="step-title">Step 1: Sign Up and Verification</h2>
          <p>
            Whether you're a patient seeking a second opinion or a doctor offering your expertise, start by creating an account.
          </p>
          <ul>
            <li>For Patients: Provide basic information and health details to create your profile.</li>
            <li>For Doctors: Submit your medical license and credentials for verification, ensuring that only qualified professionals join our network.</li>
          </ul>
        </section>

        <section className="box p-3">
          <h2 className="step-title">Step 2: Access Your Dashboard</h2>
          <p>
            After logging in, both patients and doctors are redirected to their personalized dashboards.
          </p>
          <ul>
            <li>Patient Dashboard: Manage upcoming appointments, view past consultations, and book new sessions.</li>
            <li>Doctor Dashboard: View scheduled appointments, access patient records, and manage your availability.</li>
          </ul>
        </section>

        <section className="box p-3">
          <h2 className="step-title">Step 3: Book a Consultation</h2>
          <p>When you're ready for a second opinion, start the booking process from your dashboard.</p> <ul> <li>AI Prediagnosis: Our chatbot asks key questions to ease the process for both you and your doctor.</li> <li>Specialist Recommendations: Get a list of relevant doctors based on your prediagnosis.</li> <li>Book Appointment: Select a time and schedule your consultation.</li> </ul>
        </section>

        <section className="box p-3">
          <h2 className="step-title">Step 4: Secure Consultation</h2>
          <p>
            Connect with your chosen doctor through a secure video call within the platform.
          </p>
          <ul>
            <li>Real-Time Communication: Discuss your health concerns directly with the doctor in a private and secure environment.</li>
            <li>AI-Enhanced Documentation: During the consultation, our AI listens and generates organized doctor notes and prescriptions, minimizing human error.</li>
          </ul>
        </section>

        <section className="box p-3">
          <h2 className="step-title">Step 5: Post-Consultation Follow-Up</h2>
          <p>
            After your consultation, both you and your doctor receive detailed summaries of the session.
          </p>
          <ul>
            <li>Review and Amend: Doctors have the opportunity to review and amend the AI-generated notes to ensure accuracy.</li>
            <li>Email Summaries: Receive comprehensive reports via email, including doctor’s notes and prescriptions, for your records.</li>
          </ul>
        </section>

        <section className="box p-3">
          <h2 className="step-title">Step 6: Manage Your Health Records</h2>
          <p>
            Easily access and manage all your medical records through your dashboard.
          </p>
          <ul>
            <li>Past Appointments: View detailed records of all your previous consultations, including AI-generated notes and prescriptions.</li>
            <li>Data Security: Your health information is securely stored and only accessible to you and your authorized doctors.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
