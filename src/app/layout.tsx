import "./globals.css";
import Navbar from "./components/Navbar";
import { UserProvider } from "@auth0/nextjs-auth0/client";

export const metadata = {
  title: "Live Stream Music",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <body className="font-sans">
          <h1>Live Stream Music</h1>
          <hr />
          <Navbar />
          <hr />
          {children}
          <hr />
          <p>Author: Hugh Wilfred Culling</p>
          <p>
            <a href="mailto:hughculling@icloud.com">hughculling@icloud.com</a>{" "}
          </p>
        </body>
      </UserProvider>
    </html>
  );
}
