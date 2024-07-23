"use client";

import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Navbar() {
  const { user, error, isLoading } = useUser();
  let status = "";

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    status = `Signed in as: ${user.name}`;
  } else {
    status = "User: not signed in";
  }

  return (
    <>
      <Link href="/">Index</Link>
      <span> | </span>
      <Link href="/sign-in">Broadcast</Link>
      <span> | </span>
      <Link href="/playback">Playback</Link>
      <span> | </span>
      <Link href="/sign-up">Sign Up</Link>
      <span> | </span>
      <a href="/api/auth/login">Sign In</a>
      <span> | </span>
      <Link href="/sign-in">User</Link>
      <span> | </span>
      <a href="/api/auth/logout">Sign Out</a>
      <span className="status">{status}</span>
    </>
  );
}
