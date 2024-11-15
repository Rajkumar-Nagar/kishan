import React from 'react'
import { SocketProvider } from "@/providers";
import NoHeader from '@/components/no-header';
import NoFooter from '@/components/no-footer';

const layout = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <SocketProvider>
            <NoHeader />
            <NoFooter />
            {children}
        </SocketProvider>
    )
}

export default layout
