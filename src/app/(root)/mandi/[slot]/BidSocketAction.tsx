"use client"
import { useAppDispatch, useAppSelector } from '@/lib/redux';
import { bidActions, Bidproduct, BidSliceState } from '@/lib/redux/features';
import { useSocket } from '@/providers/socket-provider';
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { SOCKET_EVENTS as SE, SOCKET_EVENTS } from '@/constants'
import { Bids} from '@prisma/client';

type BiddingBoardProps = {
    room: string;
    product: Bidproduct
}

const BidSocketAction: React.FC<BiddingBoardProps> = ({ product, room }) => {
    const { socket, isConnected } = useSocket();
    const dispatch = useAppDispatch();
    const bidDetails = useAppSelector((state) => state.bidRoom);

    console.table({highestBid:bidDetails.highestBid})


    const handleUserList = useCallback((data: typeof bidDetails.bidders) => {
        dispatch(bidActions.setBidders(data))
    }, [])

    const handleBid = useCallback((data: Bids) => {
        console.log('makeing bid')
        dispatch(bidActions.addBid(data));
    }, [])


    const initBid = useCallback(() => {
        
    }, [])

    useEffect(() => {
        dispatch(bidActions.initBid(product))
    }, [product])
    
    useEffect(() => {
        if (!socket) return
        socket.on(SOCKET_EVENTS.USERS_LIST, handleUserList)
        socket.on(SOCKET_EVENTS.MAKE_BID, handleBid)
        socket.on(SOCKET_EVENTS.INIT_BID, initBid)

        return () => {
            socket.off(SOCKET_EVENTS.USERS_LIST, handleUserList)
        }
    }, [socket, handleUserList])




    return null
}

export default BidSocketAction
