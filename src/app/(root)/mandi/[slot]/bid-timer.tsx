"use client";
import { WinningBid } from "@/actions/bid.action";
import { useAppSelector } from "@/lib/redux";
import { useEffect, useMemo, useState } from "react";

const BidTimer = () => {
    const { latestBid, product } = useAppSelector((state) => state.bidRoom);
    const [currentTime, setCurrentTime] = useState(new Date().getTime());
    const [key, setKey] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date().getTime());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const timer = useMemo(() => {
        if (!latestBid) return 30;

        const time1 = new Date(latestBid.createdAt).getTime();
        const diffInSeconds = 30 - Math.floor((currentTime - time1) / 1000);
        if (diffInSeconds <= 0) {
            // alert("Your bid has ended! TimeOut!");
            return 0;
        }

        setKey((prevKey) => prevKey + 1);
        return diffInSeconds;
    }, [latestBid, currentTime]);

    useEffect(() => {
        if (!latestBid || !product || timer !== 0) return;

        WinningBid({
            cropId: product?.id!,
            highestBid: latestBid.price,
            winning_bidderId: latestBid.bidderId,
        }).then(console.log)
    }, [timer, latestBid, product])

    return (
        <div className="timer w-32 h-32 lg:w-40 lg:h-40 bg-[#6cbdaf] rounded-full flex items-center justify-center">
            <h1
                key={key}
                className={`${timer < 10 ? "text-red-600" : "text-white"} text-5xl font-bold animate-pop delay-400`}
            >
                {timer}
            </h1>
        </div>
    );
};

export default BidTimer;
