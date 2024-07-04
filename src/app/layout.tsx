import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { SocketProvider } from "@/providers";
import { SessionProvider } from "next-auth/react"
// import "@stream-io/video-react-sdk/dist/css/styles.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>

        <SessionProvider>
        <SocketProvider>

          <div className=" flex flex-col w-screen h-screen ">
            {children}
          </div>

        </SocketProvider>

        </SessionProvider>
      </body>
    </html>
  );
}
