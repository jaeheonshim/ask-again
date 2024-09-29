import Link from 'next/link';


export default function Contact() {
  return (
    <div className="container">
      <header className="header">
        <h1>Contact Us</h1>
        <p>We’d love to hear from you. Get in touch with us today.</p>
      </header>
      <section className="content">
        <h2>Email</h2>
        <p>support@askagain.com</p>

        <h2>Phone</h2>
        <p>+1 (800) 123-4567</p>

        <h2>Address</h2>
        <p>123 Health Street, Wellness City, TX 77001</p>
      </section>
      <footer className="text-white py-3 w-100" style={{ backgroundColor: "#673AB7" }}>
        <div className="container text-center">
          <p>&copy; 2024 askAgain. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
