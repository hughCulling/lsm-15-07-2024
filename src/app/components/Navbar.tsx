import Link from "next/link";

export default function Navbar() {
  return (
    <>
      <Link href="/">Index</Link>
      <span> | </span>
      <Link href="/sign-in">Broadcast</Link>
      <span> | </span>
      <Link href="/playback">Playback</Link>
      <span> | </span>
      <Link href="/sign-up">Sign Up</Link>
      <span> | </span>
      <Link href="/sign-in">Sign In</Link>
      <span> | </span>
      <Link href="/sign-in">User</Link>
      <span> | </span>
      <Link href="/sign-out">Sign Out</Link>
      <span className="status">User: not signed in</span>
    </>
  );
}
