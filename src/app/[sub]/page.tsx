import dynamic from "next/dynamic";

// Dynamically import the component with no SSR
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
