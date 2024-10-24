"use client"
import BidderButtons from '@/components/room/bidderButton'
import { SOCKET_EVENTS } from '@/constants'
import { useAppSelector } from '@/lib/redux'
import { ProductType } from '@/lib/types'
import { useSocket } from '@/providers/socket-provider'
import { Bids } from '@prisma/client'
import { CldImage } from 'next-cloudinary'
import Image from 'next/image'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'

interface BasicDetailsProps {
    product: ProductType
}
function BidInfo({ product }: BasicDetailsProps) {

    const { socket } = useSocket()
    const [currentTime, setCurrentTime] = useState(new Date().getTime()); // Store current time
    const dispatch = useDispatch();

    const { highestBid, latestBid, bidHistory } = useAppSelector((state) => state.bidRoom)

    useEffect(() => {
        if (!socket) return
        socket.on(SOCKET_EVENTS.MAKE_BID, (data: Bids) => {
            console.log("this is bid details", data)
        })
    }, [socket])


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

        return diffInSeconds;
    }, [latestBid, currentTime]);

    return (
        <div className="rightpart w-[50%]">
            <div className="topright flex border-[1px] rounded-md w-full h-72"
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(6, 1fr)",
                    gridTemplateRows: "repeat(6, 1fr)"
                }}>
                <div
                    className="flex col-start-1 col-end-4 row-start-1 row-end-5 items-center justify-center border-b-[1px] border-r-[1px]">
                    <div className="timer w-40 h-40  bg-[#6cbdaf] rounded-full flex items-center justify-center ">
                        <h1 className="text-white text-5xl font-bold">{timer}</h1>
                    </div>
                </div>
                <div className="price col-start-1 col-end-4 row-start-5 row-end-7 flex items-center justify-center gap-1 border-r-[1px]">
                    <Image
                        width={100}
                        height={100}
                        alt='reload'
                        className="h-10 w-10"
                        src={"/party.png"}
                    />
                    <h1 className="text-[#002f34] text-4xl font-bold">₹{highestBid}</h1>
                    <h1 className="text-gray-400 text-xl font-semibold">(BP:₹{product.ProductInfo.expectedPrice})</h1>
                </div>

                <div className="profile col-start-4 col-end-7 row-start-1 row-end-3 flex items-center justify-center px-6 py-4 gap-3 px border-b-[1px]"
                >
                    {
                        product?.pesonalInfo.avatar ?
                            <CldImage
                                alt="Uploaded Image"
                                src={product?.pesonalInfo.avatar}
                                width={"170"}
                                height={"170"}
                                className='w-32 h-32 rounded-full'
                                crop={{
                                    type: 'auto',
                                    source: true
                                }}
                            /> : (
                                <div className="profile w-14 h-14 rounded-full bg-gray-600 flex items-center justify-center">
                                    <h1 className="text-[white] text-xl font-semibold">{product?.pesonalInfo?.name.slice(0, 1)}</h1>
                                </div>
                            )
                    }
                    <div className='space-y-1'>
                        <h1 className='text-xl font-semibold text-[#2e054e]'>{product?.pesonalInfo.name}</h1>
                        <div className='flex items-center gap-2'>
                            <span className='text-base text-[#2e054e]'>5</span>
                            <Image
                                width={20}
                                height={20}
                                alt='reload'
                                src={"/star.png"}
                            />

                            <span className='text-base text-[#2e054e]'>(10 user)</span>
                        </div>
                    </div>

                    <Image
                        width={100}
                        height={100}
                        alt='reload'
                        className="h-14 w-14"
                        src={"/King.png"}
                    />
                </div>
                <div className="lastbid col-start-4 col-end-7 row-start-3 row-end-5 flex items-center px-10 gap-2 border-b-[1px]"
                >
                    <Image
                        width={100}
                        height={100}
                        alt='reload'
                        className="w-12 h-12"
                        src={"/salary.png"}
                    />
                    <div className="flex items-center gap-1">
                        <h1 className="text-gray-400 text-xl">Last Bid :</h1>
                        <h1 className="text-[#002f34] text-xl font-bold">₹{bidHistory.at(-2)?.price}</h1>
                    </div>
                </div>

                <div className="col-start-4 col-end-7 row-start-5 row-end-7 flex items-center justify-center">
                    <div className="flex items-center justify-center">
                        <button className="w-40 h-9 rounded-md bg-orange-500 text-white font-semibold">Bid Summary</button>
                    </div>
                </div>
            </div>

            <div className="selfProfilePart px-10 ">

                <div className="profile col-start-4 col-end-7 row-start-1 row-end-3 flex items-center  px-6  pt-10 gap-3  "
                >
                    {
                        product?.pesonalInfo.avatar ?
                            <CldImage
                                alt="Uploaded Image"
                                src={product?.pesonalInfo.avatar}
                                width={"170"}
                                height={"170"}
                                className='w-32 h-32 rounded-full'
                                crop={{
                                    type: 'auto',
                                    source: true
                                }}
                            /> : (
                                <div className="profile w-20 h-20 rounded-full bg-gray-600 flex items-center justify-center">
                                    <h1 className="text-[white] text-xl font-semibold">{product?.pesonalInfo?.name.slice(0, 1)}</h1>
                                </div>
                            )
                    }
                    <div className='space-y-1'>
                        <h1 className='text-xl font-semibold text-[#2e054e]'>You</h1>
                        <div className='flex items-center gap-2'>
                            <span className='text-base text-[#2e054e]'>5</span>
                            <Image
                                width={20}
                                height={20}
                                alt='reload'
                                src={"/star.png"}
                            />
                            <span className='text-base text-[#2e054e]'>(10 user)</span>
                        </div>
                    </div>

                    <div className="biddupdate">
                        <div className="flex items-center gap-1">
                            <h1 className="text-gray-400 text-base">Your Last Bid :</h1>
                            <h1 className="text-[#002f34] text-base font-semibold">₹300</h1>
                        </div>
                        <div className="flex items-center gap-1">
                            <h1 className="text-gray-400 text-base">Your total Bid :</h1>
                            <h1 className="text-[#002f34] text-base font-semibold">2</h1>
                        </div>
                    </div>

                    {/* 
                                <Image
                                    width={100}
                                    height={100}
                                    alt='reload'
                                    className="h-14 w-14"
                                    src={"/King.png"}
                                /> */}
                </div>

                <BidderButtons />

            </div>



        </div>
    )
}

export default BidInfo