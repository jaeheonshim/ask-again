import { auth } from "@/auth";
import { SignIn } from "@/components/auth/SignInButton";
import User from "@/models/user";
import { redirect } from "next/navigation";
import "@/models/appointment";
import connectMongo from "@/mongoose";

export default async function Home() {
  await connectMongo();
  const session = await auth();

  if (session?.user) {
    const userModel = await User.findOne({ userId: session.user.id });
    if (!userModel.userType) {
      redirect("/registration");
    } else if (userModel.userType === "doctor") {
      redirect("/doctor");
    } else if (userModel.userType === "patient") {
      redirect("/patient");
    }
  }

  return (
    <div
      className="d-flex w-100 h-100 p-3 mx-auto flex-column min-vh-100 justify-content-center align-items-center"
      style={{
        background: "white", // Inverted to white
      }}
    >
      <main className="text-center">
        <h1
          className="display-4"
          style={{
            fontSize: "4rem",
            background: "linear-gradient(135deg, #7B1FA2, #4A148C)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textFillColor: "transparent",
          }}
        >
          Welcome to askAgain
        </h1>
        <p
          className="lead mt-4"
          style={{
            fontSize: "1.25rem",
            background: "linear-gradient(135deg, #7B1FA2, #4A148C)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textFillColor: "transparent",
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
          odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.
        </p>
        <div className="mt-4 d-flex justify-content-center">
          <SignIn />
        </div>
      </main>
    </div>
  );
}
