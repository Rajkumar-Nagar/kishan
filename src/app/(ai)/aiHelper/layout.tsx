// app/layout.js
import Sidebar from '@/components/aiHelper/siderbar';
import '../../globals.css';
import InputBox from '@/components/aiHelper/inputbox';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

export default function RootLayout({ children }:{children:React.ReactNode}) {
  return (
    <SidebarProvider>
      <Sidebar />
      <SidebarInset>
        <div className="flex flex-1">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
