"use client"
import React from 'react'
import BidInfo from './BidInfo'
import { useSession } from 'next-auth/react';
import { useAppSelector } from '@/lib/redux';

const WinningScreen = () => {
    const { data } = useSession();
    const { highestBidder } = useAppSelector((state) => state.bidRoom);
    return (
        <div className="absolute inset-0 backdrop-blur-md z-50 flex items-center flex-col justify-center">
            <h1 className='my-3 text-2xl'>Next bid starts in</h1>
            <div className="bg-white shadow-xl p-4 w-full max-w-screen-sm">
                <BidInfo />
            </div>
            {
                data?.user.id === highestBidder && (
                    <div className="bg-white mt-3">
                        <h1 className="text-3xl font-semibold text-center">Congratulations</h1>
                        <p className="text-lg text-center">You have won the bid</p>
                    </div>
                )
            }
        </div>
    )
}

export default WinningScreen
