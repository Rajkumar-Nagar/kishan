import { AppSidebar } from "@/components/app-sidebar"

import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import DashboardHeader from "./header"

export default function layout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <DashboardHeader />
                <div className="flex flex-1">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
