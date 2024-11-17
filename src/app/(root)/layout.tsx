import AiButton from "@/components/aiHelper/aiButton";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className="flex flex-col w-screen relative h-full">
      <Navbar />
      <div className="min-h-body h-full flex-1 relative">
        {children}
      </div>

      <Footer />

      <AiButton/>

    </div>
  );
}
