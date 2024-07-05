"use client"

import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/lib/redux';
import { setCurrentBid } from '@/lib/redux/features/bid/bidSlice';
import { useSocket } from '@/providers/socket-provider';
import React from 'react'

interface BiddingPriceButtonProps {
    price: number;
}

const BiddingPriceButton = (
    { price }: BiddingPriceButtonProps
) => {

    const { socket, isConnected } = useSocket();
    const dispatch = useAppDispatch();
    const { currentBid } = useAppSelector((state) => state.bidRoom);

    const handleBid = () => {
        dispatch(setCurrentBid(currentBid + price));
        socket.emit('bid', { price });
    }


    return (
        <Button variant={'outline'} onClick={handleBid} className='px-4 py-2 h-auto'>
            +{price}
        </Button>
    )
}

export default BiddingPriceButton
