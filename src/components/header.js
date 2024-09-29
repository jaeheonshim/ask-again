"use server"; // Add this to make the component a Client Component

import { auth, signOut } from "@/auth";
import { PatientSignIn, DoctorSignIn } from "@/components/auth/SignInButton"; // Assuming you have these buttons as components

const Header = async ({ user }) => {
  const session = await auth();

  return (
    <header className="d-flex justify-content-between align-items-center p-3">
      <div className="logo">
        <h3 style={{ color: "#673AB7", fontWeight: "bold", fontSize:"23px" }}>askAgain</h3>
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
        {session?.user ? (
          <form action={async () => {
            "use server"
            await signOut({ redirectTo: '/' });
          }}>
            <button
              className="btn btn-outline-danger mx-2"
            >
              Sign Out
            </button>
          </form>
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
