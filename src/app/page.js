import { auth, signIn } from "@/auth";
import { SignIn } from "@/components/auth/SignInButton";
import Image from "next/image";

export default async function Home() {
  const session = await auth();

  if(session.user) {
    const user = session.user;
    return <div>
      <div>User Name: {user.name}</div>
      <div>User Email: {user.email}</div>
    </div>
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <SignIn />
    </div>
  );
}
