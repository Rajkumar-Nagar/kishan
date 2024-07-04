"use client"

import Dropdown from '@/components/ui/Dropdown';
import { IStatesWithDistricts, statesWithDistricts, crops } from '@/data';
import Image from 'next/image';
import React, { useState } from 'react'


const Quantity = [
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
    "1000",
    "2000",
    "3000",
    "5000",
    "10000"
]


function Page() {

    const [selectProduct, setselectProduct] = useState("")
    const [quantity, setquantity] = useState("")
    const [mandiOption, setmandiOption] = useState("")
    const [grading, setgrading] = useState("false")

    const [state, setstate] = useState<IStatesWithDistricts>("Rajasthan")
    const [distict, setdistict] = useState("")


    return (
        <div className="maincontainer flex  justify-center w-full ">
            <div className="frombox w-[70%] rounded-3xl border-2 overflow-hidden my-4">
                <div className="header h-32 w-full flex flex-row "
                    style={{
                        backgroundImage: "url(/natural.jpg)",
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                    }}
                >
                    <div className=" w-full h-full flex p-8 text-white">

                    </div>

                </div>

                <div className="titlek w-full border-b-[1px]">
                    <h1 className="tagline text-center text-[#002f34] font-semibold text-3xl my-3">Add Product Deatils</h1>
                </div>

                <div className="basicInformation px-14 py-10 border-b-[1px]">
                    <h1 className="tagline  text-[#002f34] font-semibold text-2xl ">Crop Information</h1>

                    <div className="basicInformationField mt-4 px-5 space-y-2">

                        <div className="cropName">
                            <h1 className=" text-[#002f34] text-xl my-2">Crop Name</h1>

                            <Dropdown
                                Setquantity={setselectProduct}
                                quntity={selectProduct}
                                fields={crops}
                                nameDrop="Product" />
                        </div>

                        <div className="varity_quantity flex justify-between items-center">
                            <div className="varity w-[48%]">
                                <h1 className=" text-[#002f34] text-xl my-2">varity</h1>
                                <input type="text" className='Pinput w-full' />
                            </div>

                            <div className="quantity w-[48%] ">
                                <div className='flex items-center'>
                                    <h1 className=" text-[#002f34] text-xl my-2">Availble Quantity</h1>
                                    <h1 className=" text-[#65d73b] text-xl my-2">(Kg)</h1>
                                </div>

                                <Dropdown
                                    Setquantity={setquantity}
                                    quntity={quantity}
                                    fields={Quantity}
                                    nameDrop="Quantity" />
                            </div>

                        </div>


                        <div className="Expected_prize_SellingOption flex items-center justify-between">
                            <div className="expectedPrize w-[48%]">
                                <div className='flex items-center'>
                                    <h1 className=" text-[#002f34] text-xl my-2">Expected Prize</h1>
                                    <h1 className=" text-[#65d73b] text-xl my-2">(₹)</h1>
                                </div>
                                <div className='relative'>
                                    <input type="text" className='Pinput w-full' />
                                </div>
                            </div>

                            <div className="sellingoption w-[48%]">
                                <h1 className=" text-[#002f34] text-xl my-2">Selling Option</h1>
                                <Dropdown
                                    Setquantity={setmandiOption}
                                    quntity={mandiOption}
                                    fields={["Online All india Mandi", "Online Mini Mandi", "Direct to Vendor"]}
                                    nameDrop="Option" />
                            </div>

                        </div>

                    </div>

                </div>

                <div className="LocationInformatin px-14 py-10 border-b-[1px]">
                    <h1 className="tagline  text-[#002f34] font-semibold text-2xl ">Location Details</h1>

                    <div className="Distict_state mt-4 px-5 space-y-2">

                        <div className=" flex items-center justify-between">

                            <div className="sellingoption w-[48%]">
                                <h1 className=" text-[#002f34] text-xl my-2">State</h1>
                                <Dropdown
                                    Setquantity={(v: string) => setstate(v as IStatesWithDistricts)}
                                    quntity={state}
                                    fields={Object.keys(statesWithDistricts)}
                                    nameDrop="Option" />
                            </div>

                            <div className="sellingoption w-[48%]">
                                <h1 className=" text-[#002f34] text-xl my-2">Distict</h1>
                                <Dropdown
                                    Setquantity={setdistict}
                                    quntity={distict}
                                    fields={statesWithDistricts[state]}
                                    nameDrop="Option" />
                            </div>

                        </div>

                    </div>

                    <div className="farmLocatin mt-4 px-5 space-y-2">
                        <h1 className=" text-[#002f34] text-xl my-2">Farm Location</h1>
                        <input type="text" className='Pinput w-full' />
                    </div>

                </div>

                <div className="QualityParameter px-14 py-10 border-b-[1px]">

                    <h1 className="tagline  text-[#002f34] font-semibold text-2xl ">Qulity Parameter</h1>

                    <div className="basicInformationField mt-4 px-5 space-y-2">

                        <div className="color_grading  flex justify-between items-center">

                            <div className="color w-[48%]">
                                <h1 className=" text-[#002f34] text-xl my-2">Color</h1>
                                <input type="text" className='Pinput w-full' />
                            </div>

                            <div className="grading w-[48%] ">

                                <h1 className=" text-[#002f34] text-xl my-2">Granding Of crop</h1>

                                <Dropdown
                                    Setquantity={setgrading}
                                    quntity={grading}
                                    fields={["Yes Grading is complete", "No Grading is not complete"]}
                                    nameDrop="Grading" />
                            </div>
                        </div>

                        <div className="GrainSize_Moisturecontent  flex justify-between items-center">

                            <div className=" GrainSize color w-[48%]">
                                <h1 className=" text-[#002f34] text-xl my-2">Grain Size</h1>
                                <input type="text" className='Pinput w-full' />
                            </div>

                            <div className="Moisturecontent w-[48%] ">
                                <h1 className=" text-[#002f34] text-xl my-2">Moisture content</h1>
                                <input type="text" className='Pinput w-full' />
                            </div>
                        </div>

                    </div>

                </div>



                <div className="harvest_storage px-14 py-10 border-b-[1px]">

                    <h1 className="tagline  text-[#002f34] font-semibold text-2xl ">Harvest & Storage</h1>

                    <div className="harvest_storagefield mt-4 px-5 space-y-2 ">

                        <div className="harvest_storage flex justify-between">
                            <div className=" harvest color w-[48%]">
                                <h1 className=" text-[#002f34] text-xl my-2">Harvest Date</h1>
                                <input type="text" className='Pinput w-full' />
                            </div>

                            <div className=" sotorage color w-[48%]">
                                <h1 className=" text-[#002f34] text-xl my-2">storage Location</h1>
                                <input type="text" className='Pinput w-full' />
                            </div>
                        </div>

                    </div>
                </div>


                <div className="media px-14 py-10 border-b-[1px]">

                    <h1 className="tagline  text-[#002f34] font-semibold text-2xl ">Video & Photos</h1>

                    <div className="mediafield mt-4 px-5 space-y-2 ">

                        <div className='flex flex-col space-y-4'>
                            <div className="photos">
                                <h1 className=" text-[#002f34] text-xl my-2">Photos</h1>
                                <div className="photobox flex flex-wrap gap-4">
                                    <div className="photobox1 w-28 h-28 border-2 flex items-center justify-center rounded-md">
                                        <Image width={30} height={30} src={"/photo.png"} alt='reload' />
                                    </div>
                                    <div className="photobox1 w-28 h-28 border-2 flex items-center justify-center rounded-md">
                                        <Image width={30} height={30} src={"/photo.png"} alt='reload' />
                                    </div>
                                    <div className="photobox1 w-28 h-28 border-2 flex items-center justify-center rounded-md">
                                        <Image width={30} height={30} src={"/photo.png"} alt='reload' />
                                    </div>
                                    <div className="photobox1 w-28 h-28 border-2 flex items-center justify-center rounded-md">
                                        <Image width={30} height={30} src={"/photo.png"} alt='reload' />
                                    </div>
                                    <div className="photobox1 w-28 h-28 border-2 flex items-center justify-center rounded-md">
                                        <Image width={30} height={30} src={"/photo.png"} alt='reload' />
                                    </div>
                                    <div className="photobox1 w-28 h-28 border-2 flex items-center justify-center rounded-md">
                                        <Image width={30} height={30} src={"/photo.png"} alt='reload' />
                                    </div>
                                    <div className="photobox1 w-28 h-28 border-2 flex items-center justify-center rounded-md">
                                        <Image width={30} height={30} src={"/photo.png"} alt='reload' />
                                    </div>
                                    <div className="photobox1 w-28 h-28 border-2 flex items-center justify-center rounded-md">
                                        <Image width={30} height={30} src={"/photo.png"} alt='reload' />
                                    </div>
                                    <div className="photobox1 w-28 h-28 border-2 flex items-center justify-center rounded-md">
                                        <Image width={30} height={30} src={"/photo.png"} alt='reload' />
                                    </div>
                                    <div className="photobox1 w-28 h-28 border-2 flex items-center justify-center rounded-md">
                                        <Image width={30} height={30} src={"/photo.png"} alt='reload' />
                                    </div>
                                    <div className="photobox1 w-28 h-28 border-2 flex items-center justify-center rounded-md">
                                        <Image width={30} height={30} src={"/photo.png"} alt='reload' />
                                    </div>
                                    <div className="photobox1 w-28 h-28 border-2 flex items-center justify-center rounded-md">
                                        <Image width={30} height={30} src={"/photo.png"} alt='reload' />
                                    </div>
                                    <div className="photobox1 w-28 h-28 border-2 flex items-center justify-center rounded-md">
                                        <Image width={30} height={30} src={"/photo.png"} alt='reload' />
                                    </div>
                                    <div className="photobox1 w-28 h-28 border-2 flex items-center justify-center rounded-md">
                                        <Image width={30} height={30} src={"/photo.png"} alt='reload' />
                                    </div>

                                </div>
                            </div>

                            <div className="videos">
                                <h1 className=" text-[#002f34] text-xl my-2">Videos</h1>
                                <div className="video flex flex-wrap gap-4">
                                    <div className="photobox1 w-28 h-28 border-2 flex items-center justify-center rounded-md">
                                        <Image width={30} height={30} src={"/video.png"} alt='reload' />
                                    </div>
                                    <div className="photobox1 w-28 h-28 border-2 flex items-center justify-center rounded-md">
                                        <Image width={30} height={30} src={"/video.png"} alt='reload' />
                                    </div>
                                </div>
                            </div>
                        </div>



                    </div>

                </div>

            </div>
        </div>
    )

}

export default Page

