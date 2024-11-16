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

      <div className="fixed bottom-4 right-3 z-40 hidden md:block">
        <Link href={"/aiHelper"} className="inline-flex items-center justify-center w-28 h-32 bg-gradient-to-r from-teal-400 to-purple-500 rounded-md overflow-hidden shadow-lg transform transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-2xl active:scale-95">
          <span className="absolute inset-0 bg-white rounded-md transform scale-90"></span>
          <span className="relative text-gray-700 font-medium flex flex-col items-center space-x-2">
            <Image alt="AI Icon" src={"/file3.png"} width={200} height={200} className="h-20 w-20" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-purple-600">
              AgroAI
            </span>
          </span>
        </Link>
      </div>

    </div>
  );
}
