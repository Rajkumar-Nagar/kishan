
"use client"
import { ProductType } from '@/lib/types';
import { CldImage } from 'next-cloudinary'
import Image from 'next/image'
import React, { useState } from 'react'

interface BidSummaryProps {
    buttonAcitve:string;
    product:ProductType
}

function BidSummary({ buttonAcitve, product }:BidSummaryProps) {
    const [downUp, setdownUp] = useState(true)

    return (
        <div className="Bidders rounded-md mt-7">
            <div className='flex items-center gap-1'>
                <h1 className="text-black text-base ">
                    Bid Summary
                </h1>
                <h1 className="text-gray-500 text-base ">
                    ( #54321 )
                </h1>
            </div>

            <div className="list  border-[1px] rounded-lg mt-3">
                <div className="listheader flex px-5 py-2  items-center border-b-[1px] justify-between">
                    <h1>
                        Total Bid
                    </h1>
                    <div className="buttons flex items-center gap-5">
                        <h1>5</h1>
                        <button onClick={() => { setdownUp(!downUp) }} className=''>
                            <Image
                                width={100}
                                height={100}
                                style={{
                                    transform: downUp ? "rotate(180deg)" : "rotate(0deg)",
                                    transition: "transform 0.3s ease",
                                }}
                                alt='reload'
                                className="h-6 w-6"
                                src={"/upload2.png"}
                            />
                        </button>
                    </div>
                </div>

                <div className="biddersBox ">

                    {
                        downUp &&

                        <>

                            <div className="profile  flex items-center justify-between px-5  py-2 "
                            >
                                <div className="flex items-center gap-2">

                                    <h1 className="text-gray-600 text-base font-semibold">1.</h1>
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
                                                <div className="profile w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
                                                    <h1 className="text-[white] text-xl font-semibold">{product?.pesonalInfo?.name.slice(0, 1)}</h1>
                                                </div>
                                            )
                                    }
                                    <h1 className='text-base font-semibold text-[#2e054e]'>You</h1>

                                </div>

                                <div className="rihgt flex items-center gap-3">
                                    <Image
                                        width={100}
                                        height={100}
                                        alt='reload'
                                        className="h-7 w-7"
                                        src={"/King.png"}
                                    />

                                    <h1 className='text-base font-semibold text-[#2e054e]'>₹ 100</h1>
                                </div>


                            </div>

                        </>

                    }

                </div>
            </div>
        </div>
    )
}

export default BidSummary