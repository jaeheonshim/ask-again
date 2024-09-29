"use client"; // Add this to make the component a Client Component

import React from 'react';
import { PatientSignIn, DoctorSignIn } from "@/components/auth/SignInButton"; // Assuming you have these buttons as components
import { signOut } from 'next-auth/react';

const Header = ({ user }) => {
  const handleSignOut = () => {
    // Sign-out logic, for now, just redirect to a sign-out page
    signOut({redirectTo: '/'});
  };

  return (
    <header className="d-flex justify-content-between align-items-center p-3">
      <div className="logo">
        <h3 style={{ color: "#673AB7", fontWeight: "bold" }}>askAgain</h3>
      </div>
      <nav>
        <ul className="d-flex list-unstyled m-0">
          <li className="mx-3">
            <a href="#home" style={{ color: "#333", textDecoration: "none" }}>Home</a>
          </li>
          <li className="mx-3">
            <a href="#about" style={{ color: "#333", textDecoration: "none" }}>About Us</a>
          </li>
          <li className="mx-3">
            <a href="#how" style={{ color: "#333", textDecoration: "none" }}>How It Works</a>
          </li>
          <li className="mx-3">
            <a href="#contact" style={{ color: "#333", textDecoration: "none" }}>Contact</a>
          </li>
        </ul>
      </nav>
      <div className="flex justify-around items-center gap-0.1">
        {user ? (
          <button
            className="btn btn-outline-danger mx-2"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        ) : (
          <>
            {/* Show Sign In as Patient and Doctor buttons when no user is logged in */}
            <PatientSignIn />
            <DoctorSignIn />
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
