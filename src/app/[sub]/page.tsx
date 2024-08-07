// This page is supposed to catch user_ids.
// Based on the user_id, the user will either be allowed to broadcast or playback a stream.

"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import axios from "axios";
import PlaybackComponent from "../components/PlaybackComponent";

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
  const [myPlaybackUrl, setMyPlaybackUrl] = useState("");
  const [playbackUrlLoaded, setMyPlaybackUrlLoaded] = useState("");
  const [token, setToken] = useState("");
  const { user, error, isLoading } = useUser();
  const pathname = usePathname();

  // This function calls a route handler and saves the token it receives to be used in the request to extract 'user_metadata'.
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

  // This 'useEffect()' hook only runs when 'user' and 'token' are defined.
  useEffect(() => {
    // The 'user_id' is extracted from the session and put into the request config along with the Management API Token.
    if (user && user.sub?.substring(6) == pathname.substring(1)) {
      console.log(`user.sub = ${user.sub}`);
      console.log("They are the broadcaster.");

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
          const userStreamKey =
            response.data.user_metadata.ivsChannel.streamKey;
          console.log(`userStreamKey = ${userStreamKey}`);
          setMyVariable(userStreamKey);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("They are a viewer.");

      // The id/url is used to retrieve the broadcaster's 'playbackUrl'.
      const userId = "auth0|" + pathname.substring(1);
      console.log(`userId = ${userId}`);

      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `https://dev-acqqi6nb00ynyme4.us.auth0.com/api/v2/users/${userId}`,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      axios
        .request(config)
        .then((response) => {
          const userPlaybackUrl =
            response.data.user_metadata.ivsChannel.playbackUrl;
          console.log(`userPlaybackUrl = ${userPlaybackUrl}`);
          setMyPlaybackUrl(userPlaybackUrl);
        })
        .catch((error) => {
          console.log(error);
        });

      setMyPlaybackUrlLoaded("true");
    }
  }, [user, token, pathname]);

  if (user && user.sub?.substring(6) == pathname.substring(1)) {
    return (
      <>
        <h2>Broadcast</h2>
        <BroadcastComponent streamKey={myVariable} />
      </>
    );
  } else {
    if (myPlaybackUrl) {
      return (
        <>
          <h2>Playback</h2>
          <PlaybackComponent playbackUrl={myPlaybackUrl} />
        </>
      );
    } else {
      return (
        <>
          <h2>Playback</h2>
        </>
      );
    }
  }
}
