import { signIn } from "@/auth";

export function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn();
      }}
      className="text-center"
    >
      <button
        type="submit"
        className="btn btn-lg fw-bold border-0 d-flex align-items-center justify-content-center"
        style={{
          background: "linear-gradient(135deg, #7B1FA2, #4A148C)", // Gradient matching the text
          color: "white",
          borderRadius: "10px",
          padding: "12px 24px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          fontSize: "1.5rem",
        }}
      >
        Sign In
      </button>
    </form>
  );
}
