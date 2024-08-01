"use client";

import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function BroadcastLink() {
  const { user, error, isLoading } = useUser();

  if (user) {
    console.log(`user.sub = ${user.sub}`);
    // A substring is collected in order to remove the 'auth0|' string at the start of the 'user_id'.
    let userPage = `${user.sub}`.substring(6);
    console.log(`userPage = ${userPage}`);
    // Links to unique user page.
    return <Link href={`${userPage}`}>Broadcast</Link>;
  } else {
    console.log("User: not signed in");
    return <Link href="/broadcast">Broadcast</Link>;
  }
}
