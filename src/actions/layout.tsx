// app/layout.js
import Sidebar from '@/components/aiHelper/siderbar';
import '../../globals.css';
import InputBox from '@/components/aiHelper/inputbox';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white font-sans">
        <div className="flex   min-h-screen">
          <Sidebar />
          
            {children}
      
        </div>
      </body>
    </html>
  );
}
