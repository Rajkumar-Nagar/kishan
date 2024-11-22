"use client"
import { useAppDispatch, useAppSelector } from '@/lib/redux';
import { bidActions, Bidproduct } from '@/lib/redux/features';
import { useSocket } from '@/providers/socket-provider';
import React, { useCallback, useEffect, useRef } from 'react'
import { SOCKET_EVENTS } from '@/constants'
import { Bids, Slot, User } from '@prisma/client';

type BiddingBoardProps = {
    room: Slot;
    product: Bidproduct;
    user: User
}

const BidSocketAction: React.FC<BiddingBoardProps> = ({ product, room, user }) => {
    const { socket, isConnected } = useSocket();
    const dispatch = useAppDispatch();
    const { bidders } = useAppSelector((state) => state.bidRoom);
    const timeout = useRef<NodeJS.Timeout | null>(null);


    const handleUserList = useCallback((data: typeof bidders[number]) => {

        socket?.getRooms(rooms => {
            if (timeout.current) clearTimeout(timeout.current)
            timeout.current = setTimeout(() => {
                dispatch(bidActions.setBidders(rooms.get(room) as any))
            }, 200)
        })

    }, [dispatch, socket, room])

    const handleBid = useCallback((data: Bids) => {
        dispatch(bidActions.addBid(data));
    }, [dispatch])

    useEffect(() => {
        dispatch(bidActions.initBid(product))
    }, [dispatch, product])

    useEffect(() => {
        if (!socket) return;

        if (!bidders.find(b => b.userId === user.id)) {
            socket.emit(SOCKET_EVENTS.JOIN_ROOM, { room, name: user.name, userId: user.id });
            socket.join(room, { room, name: user.name, userId: user.id });
        }

        socket.on(SOCKET_EVENTS.JOIN_ROOM, handleUserList)

        // socket.on(SOCKET_EVENTS.USERS_LIST, handleUserList);
        socket.on('disconnect', handleUserList);
        socket.on(SOCKET_EVENTS.MAKE_BID, handleBid);

        return () => {
            socket.off(SOCKET_EVENTS.USERS_LIST, handleUserList);
            socket.off(SOCKET_EVENTS.MAKE_BID, handleBid);
        };
    }, [socket, room, user.name, user.id, bidders, handleUserList, handleBid]);


    return null
}

export default BidSocketAction
