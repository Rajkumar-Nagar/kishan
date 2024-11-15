import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail, SidebarTrigger } from "../ui/sidebar";
import { NavUser } from "../nav-user";

import {
  Folder,
  Forward,
  MoreHorizontal,
  Trash2,
  type LucideIcon,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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

const data = {
  navMain: [
    {
      title: "All India Mandi",
      url: "/dashboard/all-india-mandi",
      isActive: true,
      items: [
        {
          title: "Bidders",
          url: "/dashboard/all-india-mandi/bidders",
        },
        {
          title: "Crops",
          url: "/dashboard/all-india-mandi/crops",
        },
        {
          title: "Bids",
          url: "/dashboard/all-india-mandi/bids",
        },
      ],
    },
  ],
}

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
        {/* <TeamSwitcher teams={data.teams} /> */}
      </SidebarHeader>
      <SidebarContent>
        <SidebarTrigger className="ml-2 dark:text-white" />
        <NavItem items={ChatSession?.conversations ?? []} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      {/* <SidebarRail /> */}
    </Sidebar>
  )


  return (
    <aside className="w-80 bg-gray-800 p-4 h-screen overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4">ChatGPT</h2>
      <Link href={"/aiHelper"} className="text-base font-semibold mb-4">New chat</Link>

      <div className="space-y-2 mt-5">

        {
          ChatSession?.conversations?.map((item, index) => (
            <Link key={index} href={`/aiHelper/${item.id}`} className="text-gray-400 line-clamp-1">{item.title}</Link>
          ))
        }

      </div>
      <button className="mt-8 text-blue-500">Upgrade Plan</button>
    </aside>
  );
}
