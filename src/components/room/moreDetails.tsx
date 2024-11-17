import { ProductType } from '@/lib/types'
import { Dateconverter } from '@/utils/dateconverter'
import Image from 'next/image'
import React from 'react'

function MoreDetails({ product }: { product: ProductType }) {
    return (

        <>
            <div className="secondrow py-3 px-7 sm:text-base text-sm border rounded-md">
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

            <div className="moredetails w-full h-72 mt-4  border rounded-md *:*:sm:scale-100 *:*:scale-90 *:text-center"
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gridTemplateRows: "repeat(4, 1fr)"
                }}>
                <div className="detailsbox flex flex-col items-center justify-center border-b-2 "
                    style={{
                        gridColumn: "1 / 2",
                        gridRow: "1 / 2",
                    }}>
                    <h1 className='text-[#888]'>Harvest Date</h1>
                    <h1 className='text-[#2e054e]'>{Dateconverter(product.harvestStorage.harvestDate)}</h1>
                </div>

                <div className="detailsbox flex flex-col items-center justify-center border-b-2 "
                    style={{
                        gridColumn: "2 / 3",
                        gridRow: "1 / 2"
                    }}>
                    <h1 className='text-[#888]'>Listed Date</h1>
                    <h1 className='text-[#2e054e]'>{Dateconverter(product.createdAt)}</h1>
                </div>
                <div className="detailsbox flex flex-col justify-center items-center border-b-2 "
                    style={{
                        gridColumn: "3 / 4",
                        gridRow: "1 / 2"
                    }}>

                    <h1 className='text-[#888]'>Storage Location</h1>
                    <h1 className='text-[rgb(46,5,78)]'>{product.harvestStorage?.storageLocation}</h1>
                </div>
                <div className="detailsbox border-b-2 flex flex-col justify-center items-center"
                    style={{
                        gridColumn: "1 / 2",
                        gridRow: "2 / 3"
                    }}>
                    <h1 className='text-[#888]'>Grading </h1>
                    <h1 className='text-[#2e054e]'>{product.qualityMetrics?.purity === 'Yes Grading is complete' ? "Yes" : "No"}</h1>
                </div>
                <div className="detailsbox border-b-2 flex items-center justify-center flex-col"
                    style={{
                        gridColumn: "2 / 3",
                        gridRow: "2 / 3"
                    }}>
                    <h1 className='text-[#888]'>Color</h1>
                    <h1 className='text-[#2e054e]'>{product.qualityMetrics?.color}</h1>
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
                    <h1 className='text-[#2e054e]'>{product.locationInfo?.state}</h1>
                </div>
                <div className="detailsbox border-b-2 flex flex-col justify-center items-center"
                    style={{
                        gridColumn: "2 / 3",
                        gridRow: "4 / 5"
                    }}>
                    <h1 className='text-[#888]'>village</h1>
                    <h1 className='text-[#2e054e]'>{product.locationInfo?.village}</h1>
                </div>
                <div className="detailsbox border-b-2 flex flex-col justify-center items-center"
                    style={{
                        gridColumn: "3 / 4",
                        gridRow: " 4/ 5"
                    }}>
                    <h1 className='text-[#888]'>district</h1>
                    <h1 className='text-[#2e054e]'>{product.locationInfo?.districtCity}</h1>
                </div>
            </div>

        </>


    )
}

export default MoreDetails