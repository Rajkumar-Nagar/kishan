// "use client"

import { getDataFromId } from '@/actions/productId.actio'
import Faq from '@/components/Faq'
import { Product_details_slider } from '@/components/product_details_slider'
import { CarouselSize } from '@/components/product_slider'
import Image from 'next/image'
import Link from 'next/link'
import { Dateconverter } from '@/utils/dateconverter'
import Title from '@/components/ui/title'
import { getProductById } from '@/actions/product.actions'
// import React, { useEffect, useState } from 'react'



async function Page({ params }: { params: { productId: string } }) {
    const product = await getProductById(params.productId)

    if (!product) {
        throw new Error("product details fetching failed")
    }

    return (
        <div className="maincontainer w-full h-full">
            <div className="crousalcontainer w-full justify-center  flex  px-20 py-8">
                <div className="topbox w-full h-full  flex justify-center gap-5 relative">

                    <div className='w-[60%] h-full space-y-3'>
                        <div className='w-full h-[500px]'>
                            <Product_details_slider product={product} height={34} />
                        </div>

                     
                    </div>


                    <div className='w-[30%] space-y-5  sticky top-20 h-full'>
                        <div className="basicdetails w-full h-72 py-5 px-5 space-y-2  rounded-md border-[1px] ">
                            <div className="firstrow  rounded-md flex items-center justify-between ">
                                <h1 className='text-xl font-semibold text-[#2e054e]'>{product.ProductInfo?.cropName}</h1>

                                <div className='flex items-center gap-4'>
                                    <Image
                                        width={23}
                                        height={23}
                                        alt='reload'
                                        src={"/heart.png"}
                                    />
                                    <Image
                                        width={23}
                                        height={23}
                                        alt='reload'
                                        src={"/share.png"}
                                    />
                                </div>

                            </div>

                            <div className="secondrow flex items-center gap-8">
                                <div className='flex items-center gap-2'>
                                    <h1 className='text-base font-semibold text-[#2e054e]'>Quantity : </h1>
                                    <h1 className='text-base font-semibold text-[#64566f]'>{`${product.ProductInfo?.quantityAvailable} kg `}</h1>
                                </div>

                                <div className='flex items-center gap-2'>
                                    <h1 className='text-base font-semibold text-[#2e054e]'>Varity : </h1>
                                    <h1 className='text-base font-semibold text-[#64566f]'>{product.ProductInfo?.variety} </h1>
                                </div>
                            </div>

                            <div className="secondrow flex items-center gap-8">
                                <h1 className='text-2xl font-bold text-[#2e054e]'>{`₹ ${product.ProductInfo?.expectedPrice} / ${product.ProductInfo?.units}`}</h1>
                            </div>


                            <div className="locationpart border-t-2">

                                <div className="secondrow py-3">
                                    <div className='flex items-center gap-2'>
                                        <Image
                                            width={45}
                                            height={20}
                                            alt='reload'
                                            src={"/live.png"}
                                        />
                                        <h1 className='text-base font-semibold text-[#2e054e]'>Live Streaming : </h1>
                                        <h1 className='text-base font-semibold text-[#64566f]'>Available </h1>
                                    </div>

                                    <div className='flex items-center gap-2'>
                                        <Image
                                            width={35}
                                            height={20}
                                            alt='reload'
                                            src={"/sample.png"}
                                        />
                                        <h1 className='text-base font-semibold text-[#2e054e]'>Sample Request : </h1>
                                        <h1 className='text-base font-semibold text-[#64566f]'>Available</h1>
                                    </div>


                                </div>


                                <div className='flex gap-3 border-t-2 py-3'>
                                    <Image
                                        src="/location1.png"
                                        height="15"
                                        width="15"
                                        alt="thumbnail"
                                    />
                                    <span className="text-xs w-full font-semibold  text-[#74667f] dark:text-white">{
                                        ` ${product.locationInfo.village}, ${product.locationInfo.districtCity},${product.locationInfo.state},${product.locationInfo.pincode}`
                                    }</span>
                                </div>
                            </div>

                        </div>

                        <div className="profile w-full  py-5 px-5 space-y-3  rounded-md border-[1px] ">

                            <div className="profile flex items-center gap-3">
                                <div className="image w-14 h-14 rounded-full bg-indigo-700">

                                </div>
                                <div className='space-y-1'>
                                    <h1 className='text-xl font-semibold text-[#2e054e]'>{product.pesonalInfo.name}</h1>

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


                            <div className="chatandcall flex flex-wrap gap-3">

                                <div className="chat flex-grow flex items-center text-base hover:bg-[#5ddbbc] hover:text-[#ffff] hover:border-black cursor-pointer font-semibold text-[#2e054e] justify-center py-1  border-2 rounded-md gap-4">
                                    <Image
                                        width={30}
                                        height={30}
                                        alt='reload'
                                        src={"/message1.png"}
                                    />
                                    <span >Message</span>
                                </div>

                                <div className="chat flex-grow flex items-center text-base hover:bg-[#5ddbbc] hover:text-[#ffff] hover:border-black cursor-pointer font-semibold text-[#2e054e] justify-center py-1  border-2 rounded-md gap-4">
                                    <Image
                                        width={20}
                                        height={20}
                                        alt='reload'
                                        src={"/phone3.png"}
                                    />
                                    <span >Phone</span>
                                </div>

                            </div>

                            <div className='flex gap-3 border-t-2 py-3'>
                                <Image
                                    src="/location1.png"
                                    height="15"
                                    width="15"
                                    alt="thumbnail"
                                />
                                <span className="text-xs w-full font-semibold  text-[#74667f] dark:text-white">{
                                    ` ${product.locationInfo.village}, ${product.locationInfo.districtCity},${product.locationInfo.state},${product.locationInfo.pincode}`
                                }</span>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

            <div className="listedProduct my-10 ">

                <Title content={"Similar Crops"} />

                <div className='w-full px-20 py-7'>
                    <CarouselSize />
                </div>

                <div className='w-full flex justify-center items-center '>
                    <Link href={"/products"} className='w-36 py-1 flex items-center justify-center rounded-md  border-[1px] border-gray-500 gap-2'>
                        <h1 className='text-[#002f34] text-base font-semibold'>See more</h1>
                        <Image width={16} height={1} alt='reload' src={"/down.png"} />
                    </Link>
                </div>

            </div>

                <Faq />
           


        </div>
    )
}

export default Page