"use client"
import React, { useEffect } from 'react'
import { io } from 'socket.io-client';

type SocketContextType = {
    socket: any | null;
    isConnected: boolean;
};

const SocketContext = React.createContext<SocketContextType | null>(null)

export const useSocket = () => {
    const context = React.useContext(SocketContext)
    if (!context) {
        throw new Error('useSocket must be used within a SocketProvider')
    }
    return context
}


const SocketProvider: React.FC<React.PropsWithChildren> = () => {
    const [socket, setSocket] = React.useState(null);
    const [isConnected, setIsConnected] = React.useState(false);

    React.useEffect(() => {
        const socketInstance = new (io as any)('/', {
            path: '/api/socket/io',
            addTrailingSlash: false
        });

        socketInstance.on('connect', () => {
            setIsConnected(true);
        })
        socketInstance.on('disconnect', () => {
            setIsConnected(false);
        })
        setSocket(socketInstance);

        return () => socketInstance.disconnect();
    }, [])

    return (
        <SocketContext.Provider value={{ socket, isConnected }} />
    )
}

export default SocketProvider
