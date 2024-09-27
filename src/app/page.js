import Image from "next/image";
import { signIn } from "../auth";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
       <button onClick={async () => {
        "use server"
        await signIn();
       }}>Sign In (Testing)</button>
    </div>
  );
}
