"use client";

import { useUser } from "@auth0/nextjs-auth0/client";

export default function Status() {
  const { user, error, isLoading } = useUser();
  let status = "";

  if (isLoading) {
    status = "Loading...";
  }
  if (error) {
    status = "{error.message}";
  }

  if (user) {
    status = `Signed in as: ${user.name}`;
  } else {
    status = "User: not signed in";
  }

  return (
    <>
      <span className="status">{status}</span>
    </>
  );
}
