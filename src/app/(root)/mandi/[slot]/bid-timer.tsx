"use client";
import { WinningBid } from "@/actions/bid.action";
import { useAppSelector } from "@/lib/redux";
import { useEffect, useRef } from "react";
import confetti from 'canvas-confetti';
import { useCounter } from "@/hooks";


const party = () => {
    var count = 200;
    var defaults = {
        origin: { y: 0.7 }
    };

    function fire(particleRatio: number, opts: confetti.Options) {
        confetti({
            ...defaults,
            ...opts,
            particleCount: Math.floor(count * particleRatio)
        });
    }

    fire(0.25, {
        spread: 26,
        startVelocity: 55,
    });
    fire(0.2, {
        spread: 60,
    });
    fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8
    });
    fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2
    });
    fire(0.1, {
        spread: 120,
        startVelocity: 45,
    });

    var end = Date.now() + (10 * 1000);
    var colors = ['#bb0000', '#ffffff'];

    (function frame() {
        confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors
        });
        confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());

}

const BidTimer = () => {
    const { latestBid, product } = useAppSelector((state) => state.bidRoom);
    const bidWon = useRef(false);

    const { seconds: timer } = useCounter(latestBid?.createdAt, 31);

    useEffect(() => {
        if (!latestBid || !product || timer !== 0) return;
        if (bidWon.current) return;
        WinningBid({
            cropId: product?.id!,
            highestBid: latestBid.price,
            winning_bidderId: latestBid.bidderId,
        }).then(res => {
            console.log(res);
            if (!res?.error) {
                bidWon.current = true;
                party();
            }
        })
    }, [timer, latestBid, product]);

    return (
        <div className="timer w-32 h-32 lg:w-40 lg:h-40 bg-[#6cbdaf] rounded-full flex items-center justify-center">
            <h1
                key={timer}
                className={`${timer < 10 ? "text-red-600" : "text-white"} text-5xl font-bold animate-pop delay-400`}
            >
                {timer}
            </h1>
        </div>
    );
};

export default BidTimer;
