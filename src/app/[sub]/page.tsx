// This page is supposed to catch user_ids and allow users to broadcast to their own IVS channels.

"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import axios from "axios";

// Dynamically import the component with no SSR
const BroadcastComponent = dynamic(
  () => import("@/app/components/BroadcastComponent"),
  {
    ssr: false,
  }
);

export default function BroadcastPage() {
  // 'useState()' here ensures that the streamKey is available outside of it's defined scope.
  const [myVariable, setMyVariable] = useState("");
  const [token, setToken] = useState("");
  const { user, error, isLoading } = useUser();

  // var options = {
  //   method: "POST",
  //   url: "https://dev-acqqi6nb00ynyme4.us.auth0.com/oauth/token",
  //   headers: { "content-type": "application/x-www-form-urlencoded" },
  //   data: new URLSearchParams({
  //     grant_type: "client_credentials",
  //     client_id: "9D916kiBDyY2ZTi9Wo3VRvGO6hvttKql",
  //     client_secret:
  //       "0oRelwLcECBnbqcIIgeasJC48gi2Zht-wGcdMJCNnCyDBQDvVI72sinP4k5k4Df-",
  //     audience: "https://dev-acqqi6nb00ynyme4.us.auth0.com/api/v2/",
  //   }),
  // };

  // axios
  //   .request(options)
  //   .then(function (response) {
  //     console.log(response.data);
  //   })
  //   .catch(function (error) {
  //     console.error(error);
  //   });

  const getToken = async () => {
    try {
      const response = await fetch("/api/get-token", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch token");
      }

      const data = await response.json();
      console.log(data);

      setToken(data.access_token);
    } catch (error) {
      console.error("Error fetching token:", error);
      // setError("Failed to fetch token");
    }
  };

  getToken();

  // This 'useEffect()' hook only runs when 'user' is defined.
  useEffect(() => {
    // The 'user_id' is extracted from the session and put into the request config along with the Management API Token.
    if (user) {
      console.log(`user.sub = ${user.sub}`);

      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `https://dev-acqqi6nb00ynyme4.us.auth0.com/api/v2/users/${user.sub}`,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      // The user's 'streamKey' is extracted from their 'metadata' to be passed to the <BroadcastComponent />.
      axios
        .request(config)
        .then((response) => {
          const userStreamKey = response.data.user_metadata.stream_key;
          console.log(`userStreamKey = ${userStreamKey}`);
          setMyVariable(userStreamKey);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("User: not signed in");
    }
  }, [user, token]);
  return (
    <>
      <h2>Broadcast</h2>
      <BroadcastComponent streamKey={myVariable} />
    </>
  );
}
