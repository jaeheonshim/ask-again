import Link from 'next/link';
import './page.css';

export default function About() {
  return (
    <div className="container my-4">
      {/* Header Section */}
      <header className="header mb-4 text-center">
        <h1 className="text-primary">About Us</h1>
        <p className="lead">
          Learn more about askAgain and our mission to connect patients with trusted doctors worldwide.
        </p>
      </header>

      {/* Welcome Section */}
      <section className="box mb-4 p-3">
        <h2 className="text-secondary">Welcome to askAgain</h2>
        <p>
          At askAgain, we believe that every patient deserves access to the best care. We connect patients with top-tier doctors globally to offer second opinions, reduce medical errors, and enhance patient safety.
        </p>
      </section>

      {/* Our Mission */}
      <section className="box mb-4 p-3">
        <h2 className="text-secondary">Our Mission</h2>
        <p>
          We aim to eliminate misdiagnoses and medical errors by providing global access to medical expertise. askAgain ensures affordable, trustworthy, and efficient healthcare through cutting-edge technology and a robust network of verified doctors.
        </p>
      </section>

      {/* The Problem We Address */}
      <section className="box mb-4 p-3">
        <h2 className="text-secondary">The Problem We Address</h2>
        <p>
          Medical errors are prevalent and dangerous, causing millions of lives to be affected annually. These errors erode trust in healthcare and significantly drive up costs due to unnecessary tests and legal battles.
        </p>
      </section>

      {/* Our Solution */}
      <section className="box mb-4 p-3">
        <h2 className="text-secondary">Our Solution</h2>
        <ul>
          <li><strong>Second Opinions:</strong> Verified doctors provide accurate diagnoses, reducing the risk of medical errors.</li>
          <li><strong>AI-Powered Assistance:</strong> AI tools assist in documentation, organize doctor notes, and handle prediagnosis to free up cognitive load.</li>
          <li><strong>Global Expertise:</strong> Access specialists globally to get the best care tailored to your needs.</li>
          <li><strong>Trust & Accuracy:</strong> Ensures timely and accurate diagnoses, building patient trust in healthcare.</li>
        </ul>
      </section>

      {/* Key Features */}
      <section className="box mb-4 p-3">
        <h2 className="text-secondary">Key Features</h2>
        <ul>
          <li><strong>Verified Registration:</strong> Separate, rigorous verification processes ensure safe and trustworthy consultations.</li>
          <li><strong>Easy Dashboard:</strong> Manage appointments, review AI-generated notes, and access medical history all in one place.</li>
          <li><strong>Automated Follow-Ups:</strong> Post-appointment summaries ensure clarity and allow both doctors and patients to review for accuracy.</li>
        </ul>
      </section>

      {/* Footer */}
      <footer className="text-white py-2 w-100" style={{ backgroundColor: "#673AB7" }}>
        <div className="container text-center">
          <p>&copy; 2024 askAgain. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
