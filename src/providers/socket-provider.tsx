"use client"
import { Socket } from 'socket.io';
import React, { useEffect } from 'react'
import { io } from 'socket.io-client';

type SocketContextType = {
    socket: Socket | null;
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


const SocketProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [socket, setSocket] = React.useState<Socket | null>(null);
    const [isConnected, setIsConnected] = React.useState(false);

    React.useEffect(() => {
        const socketInstance = new (io as any)('/', {
            path: '/api/socket/io',
            addTrailingSlash: false,

        });
        
        socketInstance.on('connect', () => {
            setIsConnected(true);
        })
        socketInstance.on('disconnect', () => {
            setIsConnected(false);
        })
        setSocket(socketInstance);

        const handleSocketLeft = () => {
            socketInstance.emit('user-left');
        }

        window.addEventListener('beforeunload', handleSocketLeft);

        return () => {
            socketInstance.disconnect();
            window.removeEventListener('beforeunload', handleSocketLeft);
        }
    }, [])


    return (
        <SocketContext.Provider value={{ socket, isConnected }} >
            {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider
