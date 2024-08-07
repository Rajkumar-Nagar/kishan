"use client"

import Image from 'next/image'
import React, { useState } from 'react'

function Bidder_viewer({product}) {

    const [listshow, setlistshow] = useState(false)

    const handleList = () => {
        setlistshow(false)
    }

    

    return (

        <div className="BidderList absolute w-full h-full py-7 flex px-10 justify-end   inset-0 bg-gray-800  bg-opacity-50  z-50 ">
            <div className="biddrelistbox  w-96  bg-white h-full py-5 px-6  rounded-lg border-black">

                <div className="header flex items-center justify-between ">
                    <h1 className="text-black text-xl">Bidders</h1>
                    <button>
                        <Image width={100} height={100} alt="reload" src={"/close.png"} className="w-5 h-5" />
                    </button>
                </div>

                <div className="search mt-8">
                    <input
                        type="text"
                        // value={`₹ ${bidPrice}`}
                        placeholder='Search Bidders'
                        // onChange={(e) => { setbidPrice(e.target.value) }}
                        className='h-11 w-full rounded-md pl-10 border-2 text-[#002f34] text-base border-gray-400 py-2 focus:outline-none focus:border-2 focus:border-blue-300'
                        style={{
                            backgroundImage: "url(/search.png)",
                            backgroundSize: "18px 18px", // Adjust size as needed
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "10px center", // Position the image on the left
                        }}
                    />
                </div>

                <div className="Bidders rounded-md mt-7">

                    <h1 className="text-black text-base "> Bidders in mandi</h1>

                    <div className="list  border-[1px] rounded-lg mt-3">
                        <div className="listheader flex px-5 py-2  items-center border-b-[1px] justify-between">
                            <h1>Bidders</h1>
                            <div className="buttons flex items-center gap-5">
                                <h1>5</h1>
                                <Image
                                    width={100}
                                    height={100}
                                    alt='reload'
                                    className="h-7 w-7"
                                    src={"/upload2.png"}
                                />
                            </div>
                        </div>

                        <div className="biddersBox b">
                            <div className="profile  flex items-center justify-between px-5  py-4 "
                            >
                                <div className="flex items-center gap-2">
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

                                <div className='space-y-1 flex items-center'>
                                    <div className='flex items-center gap-2'>
                                        <span className='text-sm text-[#2e054e]'>5</span>
                                        <Image
                                            width={20}
                                            height={20}
                                            alt='reload'
                                            src={"/star.png"}
                                        />
                                        <span className='text-sm text-[#2e054e]'>(10 user)</span>
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
                        </div>
                    </div>

                </div>

            </div>
        </div>

    )
}
export default Bidder_viewer