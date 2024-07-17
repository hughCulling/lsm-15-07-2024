export const metadata = {
  title: "Playback | Live Stream Music",
};

export default function PlaybackPage() {
  return (
    <>
      <h2>Playback</h2>
      <video id="video-player" playsInline></video>
    </>
  );
}
