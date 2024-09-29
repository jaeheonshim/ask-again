import Link from 'next/link';
import './page.css';

export default function About() {
  return (
    <div className="container my-5">
      {/* Header Section */}
      <header className="header mb-5 text-center">
        <h1 className="text-primary">About Us</h1>
        <p className="lead">
          Learn more about askAgain and our mission to connect patients with trusted doctors worldwide.
        </p>
      </header>

      {/* Welcome Section */}
      <section className="box mb-5 p-4">
        <h2 className="text-secondary">Welcome to askAgain</h2>
        <p>
          At askAgain, we believe that every patient deserves access to accurate diagnoses and the highest quality of medical care, regardless of their location. Founded with the vision of transforming healthcare, askAgain connects patients with top-tier doctors from around the world to provide reliable second opinions, reduce medical errors, and enhance overall patient safety.
        </p>
      </section>

      {/* Our Mission */}
      <section className="box mb-5 p-4">
        <h2 className="text-secondary">Our Mission</h2>
        <p>
          Our mission is simple yet profound: to eliminate misdiagnoses and medical errors by facilitating seamless access to global medical expertise. We strive to make healthcare more affordable, trustworthy, and efficient by leveraging cutting-edge technology and a robust network of verified medical professionals.
        </p>
      </section>

      {/* The Problem We Address */}
      <section className="box mb-5 p-4">
        <h2 className="text-secondary">The Problem We Address</h2>
        <p>
          Medical errors, including misdiagnoses, medication mistakes, and routine care mishaps, are alarmingly prevalent, affecting millions of lives each year. These errors not only compromise patient safety but also drive up healthcare costs through additional tests, prolonged hospital stays, and expensive legal battles. Moreover, they erode trust in the medical system, making patients hesitant to seek necessary care.
        </p>
      </section>

      {/* Our Solution */}
      <section className="box mb-5 p-4">
        <h2 className="text-secondary">Our Solution: askAgain</h2>
        <ul>
          <li>Provides Reliable Second Opinions: Connects patients with a global network of verified, qualified doctors to obtain second opinions, ensuring diagnostic accuracy and reducing the risk of medical errors.</li>
          <li>Reduces Cognitive Load: Utilizes an AI-powered chatbot to handle prediagnosis, generating comprehensive reports that allow doctors to focus on accurate diagnoses without the hassle of recalling every symptom.</li>
          <li>Enhances Documentation Accuracy: Implements AI-driven documentation during consultations, organizing doctor notes and prescriptions to minimize human error and ensure clarity.</li>
          <li>Expands Access to Expertise: Offers access to a diverse pool of medical professionals from around the world, ensuring patients receive the best possible care tailored to their specific needs.</li>
          <li>Builds Trust in Healthcare: By ensuring accurate and timely diagnoses, askAgain fosters trust between patients and the medical system, encouraging proactive and informed healthcare decisions.</li>
        </ul>
      </section>

      {/* Key Features */}
      <section className="box mb-5 p-4">
        <h2 className="text-secondary">Key Features</h2>
        <ul>
          <li>Secure Dual Registration: Separate, rigorous verification processes for doctors and patients guarantee that only licensed professionals provide consultations, ensuring a safe and trustworthy environment.</li>
          <li>Intuitive Dashboard: Manage upcoming and past appointments with ease. Access comprehensive records, including AI-generated doctor notes and prescriptions, all organized to minimize errors.</li>
          <li>AI-Powered Documentation: Real-time AI assistance during consultations captures and structures critical information, reducing the likelihood of human error in note-taking and prescription writing.</li>
          <li>LLM Chatbot for Prediagnosis: An intelligent chatbot conducts initial assessments, recommending the most suitable specialists based on your specific health needs, saving cognitive energy for both patients and doctors.</li>
          <li>Automated Follow-Ups: Post-appointment, detailed summaries are sent to both patients and doctors, allowing for review and amendments to ensure accuracy and clarity.</li>
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
