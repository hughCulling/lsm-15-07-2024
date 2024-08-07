"use client";

// Had to load the Web player from the Content Delivery Network as couldn't get working using NPM.
// This was because it required Webpack configuration and WebAssembly and wasn't well documented.
import Script from "next/script";

export default function PlaybackPage() {
  return (
    <>
      <h2>Playback</h2>
      <video id="video-player" playsInline></video>
      <Script
        src="https://player.live-video.net/1.30.0/amazon-ivs-player.min.js"
        // Code is run only once script is fully loaded.
        onLoad={() => {
          const IVSPlayer = (window as any).IVSPlayer;

          if (IVSPlayer.isPlayerSupported) {
            const player = IVSPlayer.create();
            player.attachHTMLVideoElement(
              document.getElementById("video-player")
            );
            player.load(
              "https://548ea801f896.eu-west-1.playback.live-video.net/api/video/v1/eu-west-1.117906616901.channel.eAG7DyR7da0W.m3u8"
            );
            player.play();
          }
        }}
      ></Script>
    </>
  );
}
