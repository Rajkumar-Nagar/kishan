
import { auth } from "@/auth";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { SessionProvider } from "next-auth/react";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()
  return (
    <SessionProvider session={session}>
      <div className="flex flex-col w-screen relative h-full ">
        <Navbar />
        <div className="min-h-body flex-1 relative">
          {children}
        </div>
        <Footer />
      </div>
    </SessionProvider>
  );
}
