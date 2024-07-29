"use client";

import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function BroadcastLink() {
  const { user, error, isLoading } = useUser();

  if (user) {
    console.log(`user.sub = ${user.sub}`);
    let userPage = `${user.sub}`.substring(6);
    console.log(`userPage = ${userPage}`);
    return <Link href={`${userPage}`}>Broadcast</Link>;
  } else {
    console.log("User: not signed in");
    return <Link href="/broadcast">Broadcast</Link>;
  }

  return <Link href="/broadcast">Broadcast</Link>;
}
