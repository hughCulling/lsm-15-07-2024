"use client";

// Had to load the Web player from the Content Delivery Network as couldn't get working using NPM.
// This was because it required Webpack configuration and WebAssembly and wasn't well documented.
import PlaybackComponent from "../components/PlaybackComponent";

export default function PlaybackPage() {
  return (
    <>
      <h2>Playback</h2>
      <PlaybackComponent
        playbackUrl={
          "https://548ea801f896.eu-west-1.playback.live-video.net/api/video/v1/eu-west-1.117906616901.channel.eAG7DyR7da0W.m3u8"
        }
      />
    </>
  );
}
