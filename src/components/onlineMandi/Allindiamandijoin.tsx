"use client"

import React, { useState } from 'react'
import Dropdown from '../ui/Dropdown'
import { IStatesWithDistricts, statesWithDistricts } from '@/data'
import Image from 'next/image'
import { HoverBorderGradientDemo } from './joinButtion'
import { useRouter } from 'next/navigation'

function Allindiamandijoin() {

    const route = useRouter()

    const [Indentity, setIndentity] = useState("")
    const [token_No, settoken_No] = useState("")
    const [bidder_No, setbidder_No] = useState("")
    const [err, seterr] = useState("")

    const handelAllindiaManid = () => {
        if (!Indentity) {
            seterr("please select Identity")
            return
        }
        if (Indentity == "Bidder") {
            if (!bidder_No) {
                seterr("please fill bidder token no")
                return
            }
        }
        if (Indentity == "Seller") {
            if (!token_No) {
                seterr("please fill Crop token no")
                return
            }
        }
        route.push(`/mandi/all_india_mandi`)
    }

    return (
        <div className="selectMandi border-[1px] rounded-xl md:px-9 sm:px-6 px-4 py-6 mt-10">

            <div className="JOin as">
                <div className='flex items-center'>
                    <h1 className=" text-[#002f34] text-xl my-2">Join As</h1>
                    <span className=" text-[#da4f43] text-xl my-2">*</span>
                </div>
                <Dropdown
                    Setquantity={setIndentity}
                    quntity={Indentity}
                    fields={["Bidder", "Seller", "Viwer"]}
                    nameDrop="Identity" />
            </div>

            {
                Indentity == "Bidder" && (
                    <div className="IdentityNo">
                        <div className='flex items-center'>
                            <h1 className=" text-[#002f34] text-xl my-2">Biders Token</h1>
                            <span className=" text-[#da4f43] text-xl my-2">*</span>
                        </div>
                        <input
                            type="text"
                            className='Pinput w-full'
                            value={bidder_No}
                            onChange={(e) => { setbidder_No(e.target.value) }} />
                    </div>
                )
            }

            {
                Indentity == "Seller" && (
                    <div className="IdentityNo">
                        <div className='flex items-center'>
                            <h1 className=" text-[#002f34] text-xl my-2">Crop Token</h1>
                            <span className=" text-[#da4f43] text-xl my-2">*</span>
                        </div>
                        <input
                            type="text"
                            className='Pinput w-full'
                            value={token_No}
                            onChange={(e) => { settoken_No(e.target.value) }} />
                    </div>
                )
            }

            <div className="button flex gap-6 items-center mt-4">
                <button className='px-4 py-2 rounded-full border-2 text-[#002f34] text-base font-semibold hover:bg-green-300 hover:text-white'>
                    more details
                </button>
                <HoverBorderGradientDemo onClick={handelAllindiaManid} />
                {
                    err && <h1 className='text-red-400 text-base px-4'>{err}</h1>
                }
            </div>
        </div>
    )
}

export default Allindiamandijoin