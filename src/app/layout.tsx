import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react"
import StoreProvider from "@/providers/StoreProvider";
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
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>

        <SessionProvider>
          <StoreProvider>
            <div className=" flex flex-col w-screen h-screen ">
              {children}
            </div>
          </StoreProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
