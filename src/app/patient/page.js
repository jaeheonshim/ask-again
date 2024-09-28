// pages/index.js
"use client";
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Welcome to the Patient Portal</h1>
      <Link href="/emergency">
        <button>Emergency</button>
      </Link>
      <Link href="/general-signin">
        <button>General Sign In</button>
      </Link>
    </div>
  );
}
