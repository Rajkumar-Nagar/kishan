"use client"

import React, { useState } from 'react'
import Dropdown from '../ui/Dropdown'
import { IStatesWithDistricts, statesWithDistricts } from '@/data'
import Image from 'next/image'
import { MandiJoinButton } from './joinButtion'
import { useRouter } from 'next/navigation'
import { verifyToken } from '@/actions/mandi.actions'

function Allindiamandijoin() {

    const route = useRouter()

    const [Indentity, setIndentity] = useState("")
    const [token_No, settoken_No] = useState("")
    const [err, seterr] = useState("")

    const handelAllindiaManid = async () => {
    
        if (!Indentity) {
            seterr("please select Identity")
            return
        }


        if (Indentity !== "Viwer"&&!token_No) {
            seterr("please fill Crop token no")
            return
        }



        const res = await verifyToken(token_No, Indentity.toLowerCase())

        if (res?.error) {
            seterr(res.error)
            return
        }
        route.push(`/mandi/all-india-mandi`)
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
                Indentity && Indentity != "Viwer" && (
                    <div className="IdentityNo">
                        <div className='flex items-center'>
                            <h1 className=" text-[#002f34] text-xl my-2"> Token</h1>
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
                    More details
                </button>
                <MandiJoinButton onClick={handelAllindiaManid} />
                {
                    err && <h1 className='text-red-400 text-base px-4'>{err}</h1>
                }
            </div>
        </div>
    )
}

export default Allindiamandijoin