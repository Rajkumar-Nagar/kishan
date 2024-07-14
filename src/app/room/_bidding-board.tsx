"use client"
import { useAppDispatch, useAppSelector } from '@/lib/redux';
import { bidActions, BidSliceState } from '@/lib/redux/features';
import { useSocket } from '@/providers/socket-provider';
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { SOCKET_EVENTS as SE } from '@/constants'
import BiddingPriceButton from './_bidding-price-btn';

type BiddingBoardProps = {
    room: string;
    name: string;
    userId: string;
}

const BiddingBoard: React.FC<BiddingBoardProps> = ({ room, name, userId }) => {
    const { socket, isConnected } = useSocket();

    const dispatch = useAppDispatch();
    const bidDetails = useAppSelector((state) => state.bidRoom);
    const { bidders, currentBid, basePrice, timestamps, paused, default_waiting } = bidDetails;
    const [now, setNow] = useState(Date.now());


    useEffect(() => {
        const interval = setInterval(() => {
            setNow(Date.now());
        }, 1000);
        return () => clearInterval(interval);
    }, []);


    const timer = useMemo(() => {
        if (timestamps.updated_at === 0 || !paused) return 0;
        const diff = Date.now() - timestamps.updated_at;
        const waiting = Math.max(default_waiting - Math.floor(diff / 1000), 0);
        return waiting;
    }, [timestamps.updated_at, now, default_waiting]);


    const handleUserList = useCallback((users: any) => {
        console.log('Bidders List...\n', JSON.stringify(users, null, 2));
        dispatch(bidActions.setBidders(users));
    }, [])

    const handleBid = useCallback((data: { bid: number, userId: string, at: number }) => {
        console.log('Bid Created...\n', JSON.stringify(data, null, 2));
        dispatch(bidActions.setCurrentBid(data.bid));
        dispatch(bidActions.setHighestBidder(data.userId));
        dispatch(bidActions.setHighestBid(data.bid));
        dispatch(bidActions.updateBidTimeStamp(data.at));
    }, [])

    const initBid = useCallback((data: BidSliceState) => {
        console.log('Bid Initialized...\n', JSON.stringify(data, null, 2));
        data && dispatch(bidActions.setInitialValues(data));
    }, [])

    useEffect(() => {
        if (!socket) return;
        if (bidders.find(b => b.userId === userId)) return;
        if (bidders.find(b => b.id === socket.id)) return;
        socket.emit(SE.USERS_LIST, { room })
    }, [socket, bidders.length, room])

    useEffect(() => {
        if (!socket || !userId) return;
        socket.emit(SE.UPDATE_BID, { room, basePrice: 5000 });
        socket.emit(SE.JOIN_ROOM, { room, name, userId });
        socket.on(SE.USERS_LIST, handleUserList);
        socket.on(SE.MAKE_BID, handleBid);
        socket.on(SE.INIT_BID, initBid)

        return () => {
            socket.off(SE.USERS_LIST, handleUserList);
            socket.off(SE.MAKE_BID, handleBid);
        }
    }, [socket, room, name, userId, handleUserList, handleBid,]);


    useEffect(() => {
        if (timer === 0) dispatch(bidActions.setCanMakeBid(true));
    }, [timer])

    useEffect(() => {
        if (!socket) return;
        socket.emit(SE.UPDATE_BID, { room, timestamps, paused });
    }, [timestamps.created_at, timestamps.updated_at, socket, paused])


    const handleBidding = useCallback((price: number) => {
        dispatch(bidActions.setCurrentBid(currentBid + price));
        const at = Date.now();
        dispatch(bidActions.updateBidTimeStamp(now));
        socket && socket.emit(SE.MAKE_BID, { room, userId, bid: currentBid + price, at });
    }, [dispatch, currentBid, socket]);

    useEffect(() => {
        dispatch(bidActions.setBasePrice(5000));
        dispatch(bidActions.createBidTimeStamp(Date.now()));
    }, [])

    return (
        <div className="flex h-full flex-col shadow-2xl rounded-sm overflow-hidden">
            <div className="flex-1">
                <div className="bg-blue-200 h-full w-full p-2 relative">
                    <div className={`rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-300'} px-4 py-1 absolute right-4 top-4`}>
                        <span className='text-white'>
                            {bidders.length}{' '}{isConnected ? 'Live' : 'Connecting...'}
                        </span>
                    </div>
                    <div className="flex flex-col items-center justify-center h-full">
                        <div>
                            <div className="text-4xl">
                                Base Price: {basePrice}
                            </div>
                            <div className="text-4xl">
                                Current Bid: {currentBid}
                            </div>
                        </div>
                        <div className="flex-1 grid place-items-center">
                            <div className="w-60 h-60 bg-slate-50 rounded-full grid place-items-center ">
                                <span className='text-7xl text-zinc-500'>{timer}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="min-h-10 p-2 bg-blue-300 flex flex-wrap items-center justify-center gap-10 relative">
                {[5000, 10000, 15000, 20000].map((price) => (
                    <BiddingPriceButton price={price} handleClick={handleBidding} key={price} />
                ))}
                {paused && <div className="text-3xl absolute inset-0 bg-black/30 text-white grid place-content-center">wait until: {timer}</div>}
            </div>
        </div>
    )
}

export default BiddingBoard
