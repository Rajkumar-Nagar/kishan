"use client"

import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/lib/redux';
import { bidActions } from '@/lib/redux/features';
import { useSocket } from '@/providers/socket-provider';
import React, { useCallback } from 'react'
import { SOCKET_EVENTS as SE } from '@/constants'

interface BiddingPriceButtonProps {
    price: number;
    handleClick: (price: number) => void;
}

const BiddingPriceButton = (
    {
        price,
        handleClick
    }: BiddingPriceButtonProps
) => {

    return (
        <Button variant={'outline'} onClick={() => handleClick(price)} className='px-4 py-2 h-auto'>
            +{price}
        </Button>
    )
}

export default BiddingPriceButton
