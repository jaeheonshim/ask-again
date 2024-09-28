import { auth, signIn } from "@/auth";
import { SignIn } from "@/components/auth/SignInButton";
import User from "@/models/user";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if(session?.user) {
    const userModel = await User.findOne({ userId: session.user.id });
    if(!userModel.userType) {
      redirect("/registration");
    } else if(userModel.userType === "doctor") {
      redirect("/doctor/");
    }
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <SignIn />
    </div>
  );
}
