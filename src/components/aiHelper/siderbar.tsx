import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail, SidebarTrigger } from "../ui/sidebar";
import { NavUser } from "../nav-user";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import NavItem from "./nav-items";


export default async function AiSidebar() {

  const user = await auth()

  const ChatSession = await prisma.chatSession.findFirst({
    where: {
      userId: user?.user.id,
    },
    include: {
      conversations: {
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  });

  return (
    <Sidebar collapsible="icon" >
      <SidebarHeader>
        <SidebarTrigger className="ml-2" />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Link href={`/aiHelper`} className="text-gray-400 !line-clamp-1">New Chat</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavItem items={ChatSession?.conversations ?? []} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      {/* <SidebarRail /> */}
    </Sidebar>
  )
}
