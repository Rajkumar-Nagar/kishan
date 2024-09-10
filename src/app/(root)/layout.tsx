
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" flex flex-col w-screen relative h-full ">
      <Navbar />
      <div className="h-full flex-1 relative">
        {children}
      </div>
      {/* <div className="footer w-full">
        <Footer />
      </div> */}
    </div>
  );
}
