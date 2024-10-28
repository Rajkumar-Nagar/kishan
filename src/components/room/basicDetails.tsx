
"use client"
import { Dateconverter } from '@/utils/dateconverter'
import Image from 'next/image'
import React, { useState } from 'react'
import MoreDetails from './moreDetails'
import { CldImage } from 'next-cloudinary'
import DropdownIcon from '../ui/dropdown-icon'
import { ProductType } from '@/lib/types'

interface BasicDetailsProps {
    product: ProductType
}

function BasicDetails({ product }: BasicDetailsProps) {

    const [seeDetails, setseeDetails] = useState(false)


    return (
        <div className="basicdetails w-full py-3 space-y-2 rounded-xl my-4 border-[1px]">
            <div className="firstrow rounded-md px-5 flex items-center justify-between ">
                <h1 className='text-xl font-semibold text-[#2e054e]'>{product?.productInfo?.cropName}</h1>
                <div className="secondrow flex items-center gap-8">
                    <h1 className='text-2xl font-bold text-[#2e054e]'>{`₹ ${product?.productInfo?.expectedPrice} / ${product.productInfo?.units}`}</h1>
                </div>
            </div>

            <div className="flex items-center px-5 justify-between">
                <div className="secondrow space-y-2">
                    <div className="otherDertaisl secondrow items-center gap-8">
                        <div className='flex items-center gap-2'>
                            <h1 className='text-base font-semibold text-[#2e054e]'>Quantity : </h1>
                            <h1 className='text-base font-semibold text-[#64566f]'>{`${product?.productInfo?.quantityAvailable} kg `}</h1>
                        </div>

                        <div className='flex items-center gap-2'>
                            <h1 className='text-base font-semibold text-[#2e054e]'>Varity : </h1>
                            <h1 className='text-base font-semibold text-[#64566f]'>{product?.productInfo?.variety} </h1>
                        </div>
                    </div>

                    <div className="profile flex items-center gap-3">
                        {
                            product?.personalInfo.avatar ?
                                <CldImage
                                    alt="Uploaded Image"
                                    src={product?.personalInfo.avatar}
                                    width={"170"}
                                    height={"170"}
                                    className='w-32 h-32 rounded-full'
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
                        <div className='space-y-1'>
                            <h1 className='text-xl font-semibold text-[#2e054e]'>{product?.personalInfo.name}</h1>
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
                </div>

                <button onClick={() => { setseeDetails(!seeDetails) }} className="flex items-center justify-center gap-1 bg-[#6cbdaf] w-36 h-10  border-2 border-black rounded-sm">
                    <h1 className="text-white ">{seeDetails ? "Hide Details" : "More Details"}</h1>
                    <DropdownIcon condition={seeDetails} />
                </button>
            </div>


            <div className="locationpart border-t-2">

                {
                    seeDetails &&
                    <MoreDetails product={product} />
                }
                <div className='flex gap-3 px-5 pt-4'>
                    <Image
                        src="/location1.png"
                        height="15"
                        width="15"
                        alt="thumbnail"
                    />
                    <span className="text-xs w-full font-semibold text-[#74667f] dark:text-white">{
                        ` ${product?.locationInfo.village}, ${product?.locationInfo.districtCity},${product?.locationInfo.state},${product?.locationInfo.pincode}`
                    }</span>
                </div>
            </div>
        </div>

    )
}

export default BasicDetails