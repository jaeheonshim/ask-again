import Link from 'next/link';
import './page.css';

export default function About() {
  return (
    <div className="container">
      {/* Header Section */}
      <header className="header text-center">
        <h1>About Us</h1>
        <p className="lead">
          Learn more about askAgain and our mission to connect patients with trusted doctors worldwide.
        </p>
      </header>

      {/* Content in columns */}
      <div className="columns">
        {/* Welcome Section */}
        <section className="box">
          <h2>Welcome to askAgain</h2>
          <p>
            We believe every patient deserves access to the best care. askAgain connects patients with top-tier doctors globally to offer second opinions, reduce medical errors, and enhance patient safety.
          </p>
        </section>

        {/* Our Mission */}
        <section className="box">
          <h2>Our Mission</h2>
          <p>
            Our mission is to eliminate misdiagnoses and medical errors by providing access to global expertise. We leverage cutting-edge technology and a network of verified doctors to ensure affordable, trustworthy care.
          </p>
        </section>

        {/* The Problem We Address */}
        <section className="box">
          <h2>The Problem We Address</h2>
          <p>
            Medical errors, including misdiagnoses, affect millions annually. These errors not only compromise patient safety but also drive up costs due to unnecessary tests and legal battles, eroding trust in healthcare.
          </p>
        </section>
      </div>

      {/* Our Solution - Full Width */}
      <section className="box full-width-box mb-4 p-4">
        <h2>Our Solution</h2>
        <ul>
          <li><strong>Second Opinions:</strong> Verified doctors provide accurate diagnoses to reduce medical errors.</li>
          <li><strong>AI-Powered Assistance:</strong> AI helps with documentation, note-taking, and prediagnosis to lighten the load on doctors.</li>
          <li><strong>Global Expertise:</strong> Access specialists worldwide for tailored care.</li>
          <li><strong>Trust & Accuracy:</strong> Ensuring timely, accurate diagnoses builds trust in healthcare.</li>
        </ul>
      </section>
    </div>
  );
}
