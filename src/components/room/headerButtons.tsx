"use client"
import Image from 'next/image'
import React from 'react'
import Bidder_viewer from './bidders_viewersList'

function HeaderButton({ product }) {
    return (
        <>
            <Bidder_viewer product={product} />
            <Bidder_viewer product={product} />
            <div className="otherbuttons flex items-center gap-10">
                <div className="flex items-center gap-10 ">
                    <button className="relative flex justify-center group hover:bg-[#63a096] hover:rounded-full p-3 active:hover:bg-[#3d9485]">
                        <h1 className="text-white group-hover:block hidden  bg-gray-500 text-sm w-32 py-1 rounded-full absolute -bottom-9">Bid Summary</h1>
                        <Image
                            width={100}
                            height={100}
                            alt='reload'
                            className="h-7 w-7"
                            src={"/summary.png"}
                        />
                    </button>
                    <button className="relative flex justify-center group hover:bg-[#63a096] hover:rounded-full p-3 active:hover:bg-[#3d9485]">
                        <h1 className="text-white group-hover:block hidden  bg-gray-500 text-sm w-32 py-1 rounded-full absolute -bottom-9">chat with others</h1>
                        <Image
                            width={100}
                            height={100}
                            alt='reload'
                            className="h-7 w-7"
                            src={"/chat1.png"}
                        />
                    </button>

                    <button className="relative flex justify-center group hover:bg-[#63a096] hover:rounded-full p-3 active:hover:bg-[#3d9485]">
                        <h1 className="text-white group-hover:block hidden  bg-gray-500 text-sm w-32 py-1 rounded-full absolute -bottom-9">Bidders</h1>
                        <Image
                            width={100}
                            height={100}
                            alt='reload'
                            className="h-7 w-7"
                            src={"/customber.png"}
                        />
                    </button>
                    <button className="relative flex justify-center group hover:bg-[#63a096] hover:rounded-full p-3 active:hover:bg-[#3d9485]">
                        <h1 className="text-white group-hover:block hidden  bg-gray-500 text-sm w-32 py-1 rounded-full absolute -bottom-9">Viewers</h1>
                        <Image
                            width={100}
                            height={100}
                            alt='reload'
                            className="h-7 w-7"
                            src={"/view1.png"}
                        />
                    </button>
                </div>

                <div className="right">
                    <button className="px-4 py-2 rounded-lg text-white text-base bg-[#357e85] font-semibold">Leave</button>
                </div>
            </div>
        </>
    )
}

export default HeaderButton