import dynamic from "next/dynamic";

// Dynamically import the component with no server-side rendering, because the 'amazon-ivs-web-broadcast' sdk relies on browser-specific APIs,
// such as accessing the 'window' object or using 'navigator.mediaDevices'.
const BroadcastComponent = dynamic(
  () => import("@/app/components/BroadcastComponent"),
  {
    ssr: false,
  }
);

export default function BroadcastPage() {
  return (
    <>
      <h2>Broadcast</h2>
      <BroadcastComponent />
    </>
  );
}
