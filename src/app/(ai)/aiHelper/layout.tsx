import Sidebar from '@/components/aiHelper/siderbar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import DarkMode from '@/components/dark-mode';
import { promptActions } from '@/actions';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const user = await auth();
  if (!user) return redirect('/login/callbackUrl=/aiHelper');
  const ChatSession = await promptActions.createChatSession();

  return (
    <SidebarProvider>
      <DarkMode />
      <Sidebar />
      <SidebarInset>
        <div className="flex flex-1">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
