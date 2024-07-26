"use client";

import Link from "next/link";
import Status from "@/app/components/Status";

export default function Navbar() {
  return (
    <>
      <Link href="/">Index</Link>
      <span> | </span>
      <Link href="/broadcast">Broadcast</Link>
      <span> | </span>
      <Link href="/playback">Playback</Link>
      <span> | </span>
      <Link href="/sign-up">Sign Up</Link>
      <span> | </span>
      {/* Anchor tags are used instead of Link components as the latter
       are meant to perfrom client-side transitions between pages. */}
      <a href="/api/auth/login">Login</a>
      <span> | </span>
      <Link href="/sign-in">User</Link>
      <span> | </span>
      <a href="/api/auth/logout">Logout</a>
      <Status />
    </>
  );
}
