
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" flex flex-col w-screen h-screen ">
          <Navbar />
          <div className="h-full flex-1">
            {children}
          </div>
        </div>
  );
}
