"use client"
import { useAppDispatch, useAppSelector } from '@/lib/redux';
import { setBidders } from '@/lib/redux/features/bid/bidSlice';
import { useSocket } from '@/providers/socket-provider';
import { useSearchParams } from 'next/navigation';
import React, { useCallback } from 'react'

const BiddingBoard = ({
    room
}: {
    room: string;
}) => {
    const { socket, isConnected } = useSocket();
    const searchParams = useSearchParams();
    const name = searchParams?.get('name') || 'quickstart-user';
    const dispatch = useAppDispatch();
    const { bidders } = useAppSelector((state) => state.bidRoom);

    const handleUserList = useCallback((users) => {
        console.log(JSON.stringify(users, null, 2));
        dispatch(setBidders(users));
    }, [])

    React.useEffect(() => {
        if (!socket) return;

        socket.emit('join-room', { room, name });
        socket.on('users-list', handleUserList);


        return () => {
            socket.off('users-list', handleUserList);
        }
    }, [socket, room, name, handleUserList]);

    return (
        <div className="bg-blue-200 h-full w-full p-2 relative">
            <div className={`rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-300'} px-4 py-1 absolute right-4 top-4`}>
                <span className='text-white'>
                    {bidders.length}{' '}{isConnected ? 'Live' : 'Connecting...'}
                </span>
            </div>
            <div className="flex flex-col items-center justify-center h-full">
                <div>
                    <div className="text-4xl">
                        Base Price: 5000
                    </div>
                    <div className="text-4xl">
                        Current Bid: 5000
                    </div>
                </div>
                <div className="flex-1 grid place-items-center">
                    <div className="w-60 h-60 bg-slate-50 rounded-full grid place-items-center ">
                        <span className='text-7xl text-zinc-500'>{0}</span>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default BiddingBoard
