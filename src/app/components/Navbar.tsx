"use client";

import Link from "next/link";
import Status from "@/app/components/Status";
import BroadcastLink from "./BroadcastLink";

export default function Navbar() {
  return (
    <>
      <Link href="/">Index</Link>
      <span> | </span>
      <BroadcastLink />
      <span> | </span>
      <Link href="/playback">Playback</Link>
      <span> | </span>
      {/* Anchor tags are used instead of Link components as the latter
       are meant to perfrom client-side transitions between pages. */}
      <a href="/api/auth/login">Login</a>
      <span> | </span>
      <a href="/api/auth/logout">Logout</a>
      <Status />
    </>
  );
}
