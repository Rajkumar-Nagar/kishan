"use client";
import React from 'react'
import { SidebarTrigger, useSidebar } from '../ui/sidebar'

const SidebarIcon = () => {
    const { isMobile, open } = useSidebar();
    if (open && !isMobile) return null;
    return (
        <div>
            <SidebarTrigger className="ml-2 absolute top-2 left-1 z-50 text-gray-400 hover:text-gray-300" />
        </div>
    )
}

export default SidebarIcon
