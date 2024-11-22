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
import { LogOut } from "lucide-react";


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
    <Sidebar collapsible="offcanvas" >
      <SidebarHeader>

        <div className="flex items-center justify-between">
          <Link className="relative ml-2 group/exit w-max" href={'/'}>
            <LogOut className="rotate-180 cursor-pointer hover:text-gray-400 text-gray-500" />
            <span className="absolute text-xs text-gray-400 top-1 group-hover/exit:left-8 transition-all -left-20 duration-200 ease-in-out">Exit</span>
          </Link>
          <SidebarTrigger className="text-gray-400 hover:text-gray-300" />
        </div>

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
        {/* <NavUser /> */}
      </SidebarFooter>
      {/* <SidebarRail /> */}
    </Sidebar>
  )
}
