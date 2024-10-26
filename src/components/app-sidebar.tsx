"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "All India Mandi",
      url: "/dashboard/all-india-mandi",
      icon: SquareTerminal,
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
    {
      title: "Mini Mandi",
      url: "/dashboard/mini-mandi",
      icon: Bot,
      items: [
        {
          title: "Bidders",
          url: "/dashboard/mini-mandi/bidders",
        },
        {
          title: "Crops",
          url: "/dashboard/mini-mandi/crops",
        },
        {
          title: "Bids",
          url: "/dashboard/mini-mandi/bids",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}