"use client"
import React, { useEffect } from 'react'
import BidInfo from './BidInfo'
import { useSession } from 'next-auth/react';
import { useAppSelector } from '@/lib/redux';
import { Bids } from '@prisma/client';
import Image from 'next/image';
import { CldImage } from 'next-cloudinary';
import { useCounter } from '@/hooks';
import { useRouter } from 'next/navigation';

const WinningScreen = () => {
    const { data } = useSession();
    const { highestBid, highestBidder, product, bidHistory, nextCropTime, isSold } = useAppSelector((state) => state.bidRoom);
    const myBids = bidHistory.filter((bid: Bids) => bid.bidderId === data?.user.id);

    const { seconds: timer } = useCounter(nextCropTime!, 0);
    const router = useRouter();
    useEffect(() => {
        if (timer === 0) {
            router.refresh();
        }
    }, [timer, router])

    if (!isSold) return null;
    
    return (
        <div className="absolute inset-0 backdrop-blur-md z-50 flex items-center flex-col justify-center">
            <h1 className='my-3 text-2xl'>Next bid starts in</h1>
            <div className="bg-white shadow-xl p-4 w-full max-w-screen-sm">
                <div className="rightpart w-full h-full">
                    <div className="h-full flex flex-col ">
                        <div className="selfProfilePart flex-1">
                            <div className="topright flex flex-col border-[1px] rounded-md w-full md:h-72 md:grid [&_div]:md:py-0 [&_div]:py-2"
                                style={{
                                    gridTemplateColumns: "repeat(6, 1fr)",
                                    gridTemplateRows: "repeat(3, 1fr)"
                                }}>

                                <div className="flex col-start-1 col-end-3 lg:col-end-4 row-start-1 row-end-3 items-center justify-center border-b-[1px] border-r-[1px]">
                                    <div className="timer w-32 h-32 lg:w-40 lg:h-40 bg-[#6cbdaf] rounded-full flex items-center justify-center">
                                        <h1
                                            key={timer}
                                            className={`text-white text-5xl font-bold animate-pop delay-400`}
                                        >
                                            {timer}
                                        </h1>
                                    </div>
                                </div>

                                <div className="price col-start-1 col-end-3 lg:col-end-4 row-start-3 row-end-4 flex-col lg:flex-row flex items-center justify-center gap-1 md:border-b-0 border-b-[1px] border-r-[1px]">

                                    <div className='flex items-center gap-2'>
                                        <Image
                                            width={100}
                                            height={100}
                                            alt='reload'
                                            className="lg:h-10 lg:w-10 h-8 w-8"
                                            src={"/party.png"}
                                        />
                                        <h1 className="text-[#002f34] lg:text-4xl text-2xl font-bold">₹{highestBid}</h1>

                                    </div>
                                    <h1 className="text-gray-400 lg:text-xl text-lg md font-semibold">(BP:₹{product?.productInfo.expectedPrice})</h1>
                                </div>

                                <div className="profile col-start-3 lg:col-start-4 col-end-7 row-start-1 row-end-2 flex items-center px-6 md:!py-4 gap-3 border-b-[1px]">
                                    <div className='relative flex w-full max-w-16  justify-center'>
                                        {
                                            product?.personalInfo.avatar ?
                                                <CldImage
                                                    alt="Uploaded Image"
                                                    src={product?.personalInfo.avatar}
                                                    width={"170"}
                                                    height={"170"}
                                                    className='w-16 h-16 aspect-square rounded-full'
                                                    crop={{
                                                        type: 'auto',
                                                        source: true
                                                    }}
                                                /> : (
                                                    <div className="profile w-14 h-14 rounded-full bg-gray-600 flex items-center justify-center">
                                                        <h1 className="text-[white] text-xl font-semibold">{product?.personalInfo?.name.slice(0, 1)}</h1>
                                                    </div>
                                                )
                                        }

                                        <Image
                                            width={20}
                                            height={20}
                                            alt='reload'
                                            src={"/King.png"}
                                            className='absolute -top-7 z-50 -left-3 w-10 h-10 -rotate-[30deg]'
                                        />
                                    </div>


                                    <div className='space-y-1'>
                                        <h1 className='font-semibold text-lg lg:text-2xl  text-[#2e054e]'>{product?.personalInfo.name}</h1>
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


                                </div>

                                <div className="lastbid col-start-3 lg:col-start-4 col-end-7 row-start-2 row-end-3 flex items-center px-10 gap-2 border-b-[1px]"
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
                                        <h1 className="text-[#002f34] text-xl font-bold">₹{bidHistory.at(isSold ? -1 : -2)?.price}</h1>
                                    </div>
                                </div>

                                <div className="summary col-start-3 lg:col-start-4 col-end-7 row-start-3 row-end-4 flex items-center justify-center">
                                    <div className="flex items-center justify-center">
                                        <button className="w-40 h-9 rounded-md bg-orange-500 text-white font-semibold">Bid Summary</button>
                                    </div>
                                </div>
                            </div>

                            {data?.user.role === 'BIDDER' && (
                                <div className="profile mx-auto lg:w-fit w-full py-4 border px-6 flex flex-col md:flex-row items-center mt-4 gap-3">

                                    <div className='flex gap-3'>

                                        {
                                            product?.personalInfo.avatar ?
                                                <CldImage
                                                    alt="Uploaded Image"
                                                    src={product?.personalInfo.avatar}
                                                    width={"170"}
                                                    height={"170"}
                                                    className='w-16 h-16 rounded-full'
                                                    crop={{
                                                        type: 'auto',
                                                        source: true
                                                    }}
                                                /> : (
                                                    <div className="profile w-20 h-20 rounded-full bg-gray-600 flex items-center justify-center">
                                                        <h1 className="text-[white] text-xl font-semibold">{product?.personalInfo?.name.slice(0, 1)}</h1>
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

                                    </div>

                                    <div className="biddupdate">
                                        <div className="flex items-center gap-1">
                                            <h1 className="text-gray-400 text-base">Your Last Bid :</h1>
                                            <h1 className="text-[#002f34] text-base font-semibold">₹{myBids.at(-1)?.price ?? 0}</h1>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <h1 className="text-gray-400 text-base">Your total Bid :</h1>
                                            <h1 className="text-[#002f34] text-base font-semibold">{myBids.length}</h1>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
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
