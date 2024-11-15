"use client"
import { useAppDispatch, useAppSelector } from '@/lib/redux';
import { bidActions, Bidproduct } from '@/lib/redux/features';
import { useSocket } from '@/providers/socket-provider';
import React, { useCallback, useEffect } from 'react'
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

    const handleUserList = useCallback((data: typeof bidders) => {
        dispatch(bidActions.setBidders(data))
    }, [dispatch])

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
        }

        socket.on(SOCKET_EVENTS.USERS_LIST, handleUserList);
        socket.on(SOCKET_EVENTS.MAKE_BID, handleBid);

        return () => {
            socket.off(SOCKET_EVENTS.USERS_LIST, handleUserList);
            socket.off(SOCKET_EVENTS.MAKE_BID, handleBid);
        };
    }, [socket, room, user.name, user.id, bidders, handleUserList, handleBid]);


    return null
}

export default BidSocketAction
