"use client"
import Link from "next/link";

import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import { Conversation } from "@prisma/client";

interface NavItemProp {
    items: Conversation[]
}

export default function NavItem({
    items
}: NavItemProp) {
    return (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>Chats</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.id} className="">
                        <SidebarMenuButton asChild>
                            <Link key={item.id} href={`/aiHelper/${item.id}`} className="text-gray-400 !line-clamp-1">{item.title}</Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )

}
