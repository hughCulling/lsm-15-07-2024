import React from "react";
import dynamic from "next/dynamic";

const IVSPlayerComponent = dynamic(
  () => import("@/app/components/IVSPlayerComponent"),
  {
    ssr: false,
  }
);

export const metadata = {
  title: "Playback | Live Stream Music",
};

export default function PlaybackPage() {
  const streamUrl =
    "https://548ea801f896.eu-west-1.playback.live-video.net/api/video/v1/eu-west-1.117906616901.channel.eAG7DyR7da0W.m3u8"; // Replace with your actual stream URL

  return (
    <>
      <h2>Playback</h2>
      {/* <video id="video-player" playsInline></video> */}
      <IVSPlayerComponent streamUrl={streamUrl} />
    </>
  );
}
