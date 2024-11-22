"use client"
import { Socket } from 'socket.io';
import React, { useEffect } from 'react'
import { io } from 'socket.io-client';
import FireSocket from "firebase.io";


type SocketContextType = {
    socket: FireSocket | null;
    isConnected: boolean;
};

const SocketContext = React.createContext<SocketContextType | null>(null)

export const useSocket = () => {
    const context = React.useContext(SocketContext)
    if (!context) {
        throw new Error('useSocket must be used within a `SocketProvider`')
    }
    return context
}


const SocketProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [socket, setSocket] = React.useState<FireSocket | null>(null);
    const [isConnected, setIsConnected] = React.useState(false);

    React.useEffect(() => {
        // const socketInstance = new (io as any)('/', {
        //     path: '/api/socket/io',
        //     addTrailingSlash: false,
        //     reconnection: true,
        //     autoConnect: false,
        // });
        // socketInstance.connect();
        const socketInstance = new FireSocket(process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL!, '/kisan-mandi');

        setSocket(socketInstance);

        socketInstance.on('connect', () => {
            setIsConnected(true);
        })
        socketInstance.on('disconnect', () => {
            setIsConnected(false);
        })
        setSocket(socketInstance);

        return () => {
            socketInstance.disconnect();
        }
    }, [])

    return (
        <SocketContext.Provider value={{ socket, isConnected }} >
            {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider
