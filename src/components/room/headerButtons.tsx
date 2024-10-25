"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import Modal from './modal'
import { ProductType } from '@/lib/types'
import { useAppSelector } from '@/lib/redux'

export enum MandiHeaderOptions {
    bidSummary = "bid-summary",
    chat = "chat",
    biddersList = "bidders-list",
    viewersList = "viewers-list"
}

function HeaderButton({ product }: { product: ProductType }) {

    const [buttonAcitve, setbuttonAcitve] = useState("")
    const [modalshow, setmodalshow] = useState(false)
    const { bidders } = useAppSelector(state => state.bidRoom);

    const handelModal = (type: string) => {
        setbuttonAcitve(type)
        setmodalshow(true)
    }

    return (
        <>
            {
                modalshow && <Modal product={product} buttonAcitve={buttonAcitve} setmodalshow={setmodalshow} />
            }


            <div className="otherbuttons flex items-center gap-4">
                <div className="flex items-center gap-4">
                    <button onClick={() => handelModal(MandiHeaderOptions.bidSummary)} className="relative flex justify-center group hover:bg-[#63a096] hover:rounded-full p-3 active:hover:bg-[#3d9485]">
                        <h1 className="text-white group-hover:block hidden bg-gray-500 text-sm w-32 py-1 rounded-full absolute -bottom-9">Bid Summary</h1>
                        <Image
                            width={100}
                            height={100}
                            alt='reload'
                            className="h-6 w-6"
                            src={"/summary.png"}
                        />
                    </button>
                    <button onClick={() => handelModal(MandiHeaderOptions.chat)} className="relative flex justify-center group hover:bg-[#63a096] hover:rounded-full p-3 active:hover:bg-[#3d9485]">
                        <h1 className="text-white group-hover:block hidden bg-gray-500 text-sm w-32 py-1 rounded-full absolute -bottom-9">chat with others</h1>
                        <Image
                            width={100}
                            height={100}
                            alt='reload'
                            className="h-6 w-6"
                            src={"/chat1.png"}
                        />
                    </button>

                    <button onClick={() => handelModal(MandiHeaderOptions.biddersList)} className="relative flex justify-center group hover:bg-[#63a096] hover:rounded-full p-3 active:hover:bg-[#3d9485]">
                        <h1 className="text-white group-hover:block hidden bg-gray-500 text-sm w-32 py-1 rounded-full absolute -bottom-9">Bidders</h1>
                        <h1 className="text-white bg-gray-400 text-xs w-5 h-5 flex items-center justify-center rounded-full absolute -top-2 -right-0">{bidders.length}</h1>
                        <Image
                            width={100}
                            height={100}
                            alt='reload'
                            className="h-6 w-6"
                            src={"/customber.png"}
                        />
                    </button>
                    <button onClick={() => handelModal(MandiHeaderOptions.viewersList)} className="relative flex justify-center group hover:bg-[#63a096] hover:rounded-full p-3 active:hover:bg-[#3d9485]">
                        <h1 className="text-white group-hover:block hidden bg-gray-500 text-sm w-32 py-1 rounded-full absolute -bottom-9">Viewers</h1>
                        <h1 className="text-white bg-gray-400 text-xs w-5 h-5 flex items-center justify-center rounded-full absolute -top-2 -right-0">6</h1>
                        <Image
                            width={100}
                            height={100}
                            alt='reload'
                            className="h-6 w-6"
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