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


    const initBid = useCallback(() => {

    }, [])

    useEffect(() => {
        dispatch(bidActions.initBid(product))
    }, [dispatch, product])

    useEffect(() => {
        if (!socket) return
        socket.on(SOCKET_EVENTS.USERS_LIST, handleUserList)
        socket.on(SOCKET_EVENTS.MAKE_BID, handleBid)
        socket.on(SOCKET_EVENTS.INIT_BID, initBid)

        return () => {
            socket.off(SOCKET_EVENTS.USERS_LIST, handleUserList);
            socket.off(SOCKET_EVENTS.MAKE_BID, handleBid);
            socket.off(SOCKET_EVENTS.INIT_BID, initBid);
        }
    }, [socket, handleUserList, handleBid, initBid])


    useEffect(() => {
        if (!socket) return;
        if (!bidders.find(b => b.userId === user.id)) {
            console.log('no bidders')
            socket.emit(SOCKET_EVENTS.JOIN_ROOM, { room, name: user.name, userId: user.id });
        }
    }, [socket, bidders, user.id, user.name, room])

    useEffect(() => {
        if (!socket) return;
        socket.emit(SOCKET_EVENTS.JOIN_ROOM, { room, name: "raj", userId: user.id });
    }, [socket, room, user.id])

    return null
}

export default BidSocketAction
