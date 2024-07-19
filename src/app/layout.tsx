import "./globals.css";
import Navbar from "./components/Navbar";

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
    </html>
  );
}
