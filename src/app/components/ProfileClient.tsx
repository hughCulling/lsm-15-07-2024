"use client";
// Profile information is available through the 'user' property exposed by 'useUser()' hook.
// This is an example of how to use it in a Client Component.
import { useUser } from "@auth0/nextjs-auth0/client";

export default function ProfileClient() {
  const { user, error, isLoading } = useUser();

  // These are here to prevent render errors as 'user' property contains sensitive information.
  // Ensures SDK has completed loading and loaded successfully before accessing 'user' property.
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    user && (
      <div>
        {/* <img src={user.picture} alt={user.name} /> */}
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
}
