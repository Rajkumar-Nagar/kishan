// "use client"

import { getDataFromId } from '@/actions/productId.actio'
import Faq from '@/components/Faq'
import { Product_details_slider } from '@/components/product_details_slider'
import { CarouselSize } from '@/components/product_slider'
import Image from 'next/image'
import Link from 'next/link'
import { Dateconverter } from '@/utils/dateconverter'
import Title from '@/components/ui/title'
// import React, { useEffect, useState } from 'react'



async function Page({ params }: { params: { productId: string } }) {

    const poductDetails = await getDataFromId(params.productId, "product")
    console.log("productDetails is ", poductDetails)

    const response = await fetch("http://localhost:3000/api/fetchProduct", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            poductDetails
        )
    })
    const crop = await response.json();
    if (!response.ok) {
        throw new Error("product details fetching failed")
    }

    return (
        <div className="maincontainer w-full h-full">
            <div className="crousalcontainer w-full justify-center  flex  px-20 py-8">
                <div className="topbox w-full h-full  flex justify-center gap-5 relative">

                    <div className='w-[60%] h-full space-y-3'>
                        <div className='w-full h-[500px]'>
                            <Product_details_slider crop={crop} />
                        </div>

                        <div className="cropdetails pt-16 space-y-6">

                            <h1 className='text-xl font-semibold text-[#2e054e]'>Crop More details</h1>

                            <div className="moredetails w-full h-72 rounded-md border-[1px]"
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(3, 1fr)",
                                    gridTemplateRows: "repeat(4, 1fr)"
                                }}>
                                <div className="detailsbox flex flex-col items-center justify-center border-b-2"
                                    style={{
                                        gridColumn: "1 / 2",
                                        gridRow: "1 / 2",
                                    }}>
                                    <h1 className='text-[#888]'>Harvest Date</h1>
                                    <h1 className='text-[#2e054e]'>{Dateconverter(crop.HarvestStorage.harvestDate)}</h1>
                                </div>

                                <div className="detailsbox flex flex-col items-center justify-center border-b-2"
                                    style={{
                                        gridColumn: "2 / 3",
                                        gridRow: "1 / 2"
                                    }}>
                                    <h1 className='text-[#888]'>Listed Date</h1>
                                    <h1 className='text-[#2e054e]'>{Dateconverter(poductDetails.createdAt)}</h1>
                                </div>
                                <div className="detailsbox flex flex-col justify-center items-center border-b-2"
                                    style={{
                                        gridColumn: "3 / 4",
                                        gridRow: "1 / 2"
                                    }}>

                                    <h1 className='text-[#888]'>Storage Location</h1>
                                    <h1 className='text-[rgb(46,5,78)]'>{crop?.HarvestStorage?.storageLocation}</h1>
                                </div>
                                <div className="detailsbox border-b-2 flex flex-col justify-center items-center"
                                    style={{
                                        gridColumn: "1 / 2",
                                        gridRow: "2 / 3"
                                    }}>
                                    <h1 className='text-[#888]'>Grading </h1>
                                    <h1 className='text-[#2e054e]'>{crop?.QualityMetrics?.purity === 'Yes Grading is complete' ? "Yes" : "No"}</h1>
                                </div>
                                <div className="detailsbox border-b-2 flex items-center justify-center flex-col"
                                    style={{
                                        gridColumn: "2 / 3",
                                        gridRow: "2 / 3"
                                    }}>
                                    <h1 className='text-[#888]'>Color</h1>
                                    <h1 className='text-[#2e054e]'>{crop?.QualityMetrics?.color}</h1>
                                </div>
                                <div className="detailsbox border-b-2 flex flex-col justify-center items-center"
                                    style={{
                                        gridColumn: "3 / 4",
                                        gridRow: "2 / 3"
                                    }}>
                                    <h1 className='text-[#888]'>Smell</h1>
                                    <h1 className='text-[#2e054e]'>No</h1>
                                </div>
                                <div className="detailsbox border-b-2 flex flex-col items-center justify-center"
                                    style={{
                                        gridColumn: "1 / 2",
                                        gridRow: "3 / 4"
                                    }}>
                                    <h1 className='text-[#888]'>Moisture content</h1>
                                    <h1 className='text-[#2e054e]'>No</h1>
                                </div>
                                <div className="detailsbox border-b-2 flex flex-col justify-center items-center"
                                    style={{
                                        gridColumn: "2 / 3",
                                        gridRow: "3 / 4"
                                    }}>
                                    <h1 className='text-[#888]'>visible defects</h1>
                                    <h1 className='text-[#2e054e]'>No</h1>
                                </div>
                                <div className="detailsbox border-b-2 flex flex-col justify-center items-center"
                                    style={{
                                        gridColumn: "3 / 4",
                                        gridRow: "3 / 4"
                                    }}>
                                    <h1 className='text-[#888]'>Adulteration</h1>
                                    <h1 className='text-[#2e054e]'>No</h1>
                                </div>
                                <div className="detailsbox border-b-2 flex flex-col justify-center items-center"
                                    style={{
                                        gridColumn: "1 / 2",
                                        gridRow: "4 / 5"
                                    }}>
                                    <h1 className='text-[#888]'>State</h1>
                                    <h1 className='text-[#2e054e]'>{crop?.LocationInfo?.state}</h1>
                                </div>
                                <div className="detailsbox border-b-2 flex flex-col justify-center items-center"
                                    style={{
                                        gridColumn: "2 / 3",
                                        gridRow: "4 / 5"
                                    }}>
                                    <h1 className='text-[#888]'>village</h1>
                                    <h1 className='text-[#2e054e]'>{crop?.LocationInfo?.village}</h1>
                                </div>
                                <div className="detailsbox border-b-2 flex flex-col justify-center items-center"
                                    style={{
                                        gridColumn: "3 / 4",
                                        gridRow: " 4/ 5"
                                    }}>
                                    <h1 className='text-[#888]'>distict</h1>
                                    <h1 className='text-[#2e054e]'>{crop?.LocationInfo?.districtCity}</h1>
                                </div>
                            </div>

                        </div>

                    </div>


                    <div className='w-[30%] space-y-5  sticky top-20 h-full'>
                        <div className="basicdetails w-full h-72 py-5 px-5 space-y-2  rounded-md border-[1px] ">
                            <div className="firstrow  rounded-md flex items-center justify-between ">
                                <h1 className='text-xl font-semibold text-[#2e054e]'>{crop?.ProductInfo?.cropName}</h1>

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
                                    <h1 className='text-base font-semibold text-[#64566f]'>{`${crop?.ProductInfo?.quantityAvailable} kg `}</h1>
                                </div>

                                <div className='flex items-center gap-2'>
                                    <h1 className='text-base font-semibold text-[#2e054e]'>Varity : </h1>
                                    <h1 className='text-base font-semibold text-[#64566f]'>{crop?.ProductInfo?.variety} </h1>
                                </div>
                            </div>

                            <div className="secondrow flex items-center gap-8">
                                <h1 className='text-2xl font-bold text-[#2e054e]'>{`₹ ${crop?.ProductInfo?.expectedPrice} / ${crop?.ProductInfo?.units}`}</h1>
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
                                        ` ${crop?.LocationInfo.village}, ${crop?.LocationInfo.districtCity},${crop?.LocationInfo.state},${crop?.LocationInfo.pincode}`
                                    }</span>
                                </div>
                            </div>

                        </div>

                        <div className="profile w-full  py-5 px-5 space-y-3  rounded-md border-[1px] ">

                            <div className="profile flex items-center gap-3">
                                <div className="image w-14 h-14 rounded-full bg-indigo-700">

                                </div>
                                <div className='space-y-1'>
                                    <h1 className='text-xl font-semibold text-[#2e054e]'>{crop?.User.name}</h1>

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
                                    ` ${crop?.LocationInfo.village}, ${crop?.LocationInfo.districtCity},${crop?.LocationInfo.state},${crop?.LocationInfo.pincode}`
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

            <div className="listedProduct my-20 px-20">
                <div className=' mx-32 relative border-b-2 flex justify-center  border-[#2e054e] '>
                    <div className=' absolute -bottom-9 bg-white p-4 text-3xl text-[#2e054e] font-semibold text-center'>
                        Freqenty Asked Qustion
                    </div>
                </div>
                <Faq />
            </div>

            <div className='w-full h-60 bg-green-400 flex  items-center justify-center'>
                <h1>Footer</h1>
            </div>
        </div>
    )
}

export default Page