"use client"

import { SliderDemo } from '@/components/slider'
import { crops } from '@/data'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs';
import { Slider } from '@/components/ui/slider'
import { DatePickerDemo } from '@/components/daterangepicker'
import { ThreeDCardDemo } from '@/components/addProduct'


const CheckBox = ({ crop }) => {

    const [show, setshow] = useState(false)

    useEffect(() => {

    }, [])

    const fsdj = {
        "Wheat (गेहूं)": { "HD 2967": false, "PBW 343": false, "WH 1105": false, "DBW 88": false },
    }

    const [selectedCrop, setselectedCrop] = useState(false)
    const [cropvarity, setcropvarity] = useState([])


    useEffect(() => {

    }, [])


    return (
        <div className="containerbox space-y-2">
            <button onClick={() => { setshow(!show) }} className="top w-full flex items-center justify-between">
                <div className="left flex items-center gap-2">
                    <input type="checkbox" checked={selectedCrop} onChange={() => { setselectedCrop(!selectedCrop) }} className='w-5 h-5 ' name="crop" id="crop" />
                    <label htmlFor='crop' className='cursor-pointer'>{crop}</label>
                </div>

                <div className='right flex gap-4 items-center'>
                    <h1>106</h1>
                    {
                        show ? (
                            <Image width={16} height={16} alt='reload' src={"/arrow.png"} />
                        ) : (
                            <Image width={16} height={16} alt='reload' src={"/down.png"} />
                        )
                    }
                </div>
            </button>

            {
                show && <div className='space-y-2'>
                    {crops[crop].map((varity, index) => (
                        <div key={index} className="top flex items-center justify-between pl-3">
                            <div className="left flex items-center gap-2">
                                <input type="checkbox" className='w-5 h-5 ' name="crop" id="crop" />
                                <h1>{varity}</h1>
                            </div>
                            <h1>106</h1>

                        </div>

                    ))}
                </div>
            }

        </div>
    )
}


const SortType = ({ title, sortSelectedType, setsortSelectedType, setshowSortlist }) => {



    const handeltype = () => {
        setsortSelectedType(title)
        setshowSortlist(false)
    }

    return (
        <button onClick={handeltype} className='flex items-center justify-between w-full py-2  px-4 border-b-2'>
            <h1 className='text-base font-semibold'
                style={{
                    color: sortSelectedType == title ? "#6300a3" : "#2e054e"
                }}
            >
                {title}
            </h1>

            {
                sortSelectedType == title &&
                <Image width={16} height={1} alt='reload' src={"/check-mark.png"} />
            }
        </button>
    )
}

function PrductList() {

    const [prizeLimit, setPrizeLimit] = useState("")


    const [cropvarityshow, setCropvarityshow] = useState(false)
    const [prizeshow, setPrizeshow] = useState(false)
    const [quntityshow, setQuntityshow] = useState(false)
    const [additionalserviceshow, setAdditionalserviceshow] = useState(false)
    const [gradingshow, setGradingshow] = useState(false)
    const [harvestdateshow, setHarvestdateshow] = useState(false)
    const [listeddateshow, setListeddateshow] = useState(false)

    const [quantiyrange, setQuantiyrange] = useState("")

    const [harvestStarting, setharvestStarting] = useState(Date())
    const [harvestEnd, setHarvestEnd] = useState(Date())

    const [listedDateStart, setListedDateStart] = useState(Date())
    const [listedDateEnd, setListedDateEnd] = useState(Date())

    const [showSortlist, setshowSortlist] = useState(false)
    const [sortSelectedType, setsortSelectedType] = useState("Relevance")

    return (
        <div className="maincontainer w-full py-10 flex gap-6 justify-center relative">
            <div className="leftpart w-[23%] rounded-md space-y-3 sticky top-20 h-full">

                <div className="pricerange  py-3 px-5 border-2 rounded-md">
                    <div className='flex items-center justify-between'>
                        <label htmlFor='prize' className='text-[#2e054e] font-semibold text-base cursor-pointer'>Prize Range</label>
                        {
                            prizeshow ? (
                                <button id='prize' onClick={() => { setPrizeshow(false) }} className='text-[#2e054e] font-semibold text-base '>-</button>
                            ) :
                                (
                                    <button id='prize' onClick={() => { setPrizeshow(true) }} className='text-[#2e054e] font-semibold text-base '>+</button>
                                )
                        }

                    </div>
                    {
                        prizeshow && (
                            <div className='flex flex-col space-y-3  py-2'>
                                <div className="prize flex items-center justify-between">
                                    <h1 className='text-[#6300a3] font-semibold text-xl'>{`₹ ${prizeLimit}`}</h1>
                                    <h1 className='text-[#6300a3] font-semibold text-xl'>₹ 20,000</h1>
                                </div>
                                <div>
                                    <SliderDemo setPrizeLimit={setPrizeLimit} min={500} max={20000} step={500} defult={2000} />
                                </div>

                                <div className="prize flex items-center justify-between">
                                    <h1 className='text-[#2e054e] font-semibold text-sm'>Mimimum</h1>
                                    <h1 className='text-[#2e054e] font-semibold text-sm'>Maximum</h1>
                                </div>

                            </div>
                        )
                    }


                </div>

                <div className="coropandVarity px-5 py-3 border-2 rounded-md">
                    <div className='flex items-center justify-between'>
                        <label htmlFor='varity' className='text-[#2e054e] font-semibold text-base cursor-pointer'>Crop + varity</label>
                        {
                            cropvarityshow ? (
                                <button id='varity' onClick={() => { setCropvarityshow(false) }} className='text-[#2e054e] font-semibold text-base '>-</button>
                            ) :
                                (
                                    <button id='varity' onClick={() => { setCropvarityshow(true) }} className='text-[#2e054e] font-semibold text-base '>+</button>
                                )
                        }

                    </div>

                    {
                        cropvarityshow &&

                        <div className="cropcontainer py-4 space-y-4">
                            {
                                Object.keys(crops).map((item, index) => (
                                    <CheckBox crop={item} key={index} />
                                )
                                )
                            }
                        </div>
                    }
                </div>

                <div className="pricerange  py-3  px-5 border-2 rounded-md">
                    <div className='flex items-center justify-between'>
                        <label htmlFor='Qantity' className='text-[#2e054e] font-semibold text-base cursor-pointer'>Qantity Range</label>
                        {
                            quntityshow ? (
                                <button id='Qantity' onClick={() => { setQuntityshow(false) }} className='text-[#2e054e] font-semibold text-base '>-</button>
                            ) :
                                (
                                    <button id='Qantity' onClick={() => { setQuntityshow(true) }} className='text-[#2e054e] font-semibold text-base '>+</button>
                                )
                        }

                    </div>

                    {
                        quntityshow && (

                            <div className='flex flex-col space-y-3  py-2'>
                                <div className="prize flex items-center justify-between">
                                    <h1 className='text-[#6300a3] font-semibold text-xl'>{`${quantiyrange} Kg`}</h1>
                                    <h1 className='text-[#6300a3] font-semibold text-xl'>3000 Kg</h1>
                                </div>
                                <div>
                                    <SliderDemo setPrizeLimit={setQuantiyrange} min={100} max={3000} step={30} defult={200} />
                                </div>

                                <div className="prize flex items-center justify-between">
                                    <h1 className='text-[#2e054e] font-semibold text-sm'>Mimimum</h1>
                                    <h1 className='text-[#2e054e] font-semibold text-sm'>Maximum</h1>
                                </div>

                            </div>
                        )
                    }

                </div>


                <div className="HarvestDate  py-3 px-5 border-2 rounded-md">
                    <div className='flex items-center justify-between'>
                        <label htmlFor='Harvest' className='text-[#2e054e] font-semibold text-base cursor-pointer'>Harvest Date</label>
                        {
                            harvestdateshow ? (
                                <button id='Harvest' onClick={() => { setHarvestdateshow(false) }} className='text-[#2e054e] font-semibold text-base '>-</button>
                            ) :
                                (
                                    <button id='Harvest' onClick={() => { setHarvestdateshow(true) }} className='text-[#2e054e] font-semibold text-base '>+</button>
                                )
                        }

                    </div>

                    {
                        harvestdateshow && (
                            <div className="box space-y-3 mt-5">

                                <div className='flex items-center justify-between gap-5'>
                                    <h1 className='text-[#2e054e] font-semibold text-base '>To</h1>
                                    <DatePickerDemo setHarvestDateRange={setharvestStarting} />
                                </div>
                                <div className='flex items-center gap-5 justify-between'>
                                    <h1 className='text-[#2e054e] font-semibold text-base '>From</h1>
                                    <DatePickerDemo setHarvestDateRange={setHarvestEnd} />
                                </div>
                            </div>
                        )
                    }


                </div>


                <div className="ListedDate  py-3 px-5 border-2 rounded-md">
                    <div className='flex items-center justify-between'>
                        <label htmlFor='Listed' className='text-[#2e054e] font-semibold text-base cursor-pointer'>Listed Date</label>
                        {
                            listeddateshow ? (
                                <button id='Listed' onClick={() => { setListeddateshow(false) }} className='text-[#2e054e] font-semibold text-base '>-</button>
                            ) :
                                (
                                    <button id='Listed' onClick={() => { setListeddateshow(true) }} className='text-[#2e054e] font-semibold text-base '>+</button>
                                )
                        }

                    </div>

                    {
                        listeddateshow && (
                            <div className="box space-y-3 mt-5">

                                <div className='flex items-center justify-between gap-5'>
                                    <h1 className='text-[#2e054e] font-semibold text-base '>To</h1>
                                    <DatePickerDemo setHarvestDateRange={setListedDateStart} />
                                </div>
                                <div className='flex items-center gap-5 justify-between'>
                                    <h1 className='text-[#2e054e] font-semibold text-base '>From</h1>
                                    <DatePickerDemo setHarvestDateRange={setListedDateEnd} />
                                </div>
                            </div>
                        )

                    }

                </div>


                <div className="ListedDate  py-3 px-5 border-2 rounded-md">
                    <div className='flex items-center justify-between'>
                        <label htmlFor='Additional' className='text-[#2e054e] font-semibold text-base cursor-pointer'>Additional Services</label>
                        {
                            additionalserviceshow ? (
                                <button id='Additional' onClick={() => { setAdditionalserviceshow(false) }} className='text-[#2e054e] font-semibold text-base '>-</button>
                            ) :
                                (
                                    <button id='Additional' onClick={() => { setAdditionalserviceshow(true) }} className='text-[#2e054e] font-semibold text-base '>+</button>
                                )
                        }

                    </div>

                    {
                        additionalserviceshow && (
                            <div className="box space-y-3 mt-5">

                                <div className="Streaming flex items-center justify-between">
                                    <label htmlFor="Streaming">Live Streaming</label>
                                    <input type="checkbox" className='w-5 h-5 ' name="Streaming" id="Streaming" />
                                </div>

                                <div className="Request flex items-center justify-between">
                                    <label htmlFor="Request">Sample Request</label>
                                    <input type="checkbox" className='w-5 h-5 ' name="Request" id="Request" />
                                </div>
                            </div>
                        )
                    }

                </div>


                <div className="ListedDate  py-3 px-5 border-2 rounded-md">
                    <div className='flex items-center justify-between'>
                        <label htmlFor='Grading' className='text-[#2e054e] font-semibold text-base cursor-pointer'>Grading</label>
                        {
                            gradingshow ? (
                                <button id='Grading' onClick={() => { setGradingshow(false) }} className='text-[#2e054e] font-semibold text-base '>-</button>
                            ) :
                                (
                                    <button id='Grading' onClick={() => { setGradingshow(true) }} className='text-[#2e054e] font-semibold text-base '>+</button>
                                )
                        }

                    </div>

                    {
                        gradingshow && (
                            <div className="box space-y-3 mt-5">
                                <div className="Yes flex items-center justify-between">
                                    <label htmlFor="yes">Graded Crops</label>
                                    <input type="checkbox" className='w-5 h-5 ' name="yes" id="yes" />
                                </div>

                                <div className="No flex items-center justify-between">
                                    <label htmlFor="No">Non Graded Crops</label>
                                    <input type="checkbox" className='w-5 h-5 ' name="No" id="No" />
                                </div>
                            </div>
                        )

                    }

                </div>


            </div>

            <div className="rightpart w-[65%] rounded-md border-2  px-5 py-4">

                <div className="headerpart flex z-30 items-center justify-between">

                    <div className="left flex items-center gap-2">
                        <h1 className='text-[#2e054e] font-semibold'>1048</h1>
                        <h1 className='text-[#2e054e] text-sm'>Farmers in Katawer</h1>
                    </div>

                    <button onClick={() => { setshowSortlist(!showSortlist) }} className="right rounded-md border-2 py-2 px-4 relative flex items-center justify-between  gap-5">

                        <h1 className='flex items-center justify-center text-[#2e054e] font-semibold' >{`sort by : ${sortSelectedType}`}</h1>
                        {
                            showSortlist ? (
                                <Image width={16} height={1} alt='reload' src={"/upload1.png"} />
                            ) : (
                                <Image width={20} height={2} alt='reload' src={"/upload2.png"} />
                            )
                        }


                        {
                            showSortlist && (
                                <div className="dropdowncontainer z-50 shadow-xl w-60 bg-white border-[1px] rounded-md top-12 right-3 absolute">

                                    <SortType title={"Relevance"} sortSelectedType={sortSelectedType} setsortSelectedType={setsortSelectedType} setshowSortlist={setshowSortlist} />
                                    <SortType title={"Price : low to high"} sortSelectedType={sortSelectedType} setsortSelectedType={setsortSelectedType} setshowSortlist={setshowSortlist} />
                                    <SortType title={"Price : Hight to low"} sortSelectedType={sortSelectedType} setsortSelectedType={setsortSelectedType} setshowSortlist={setshowSortlist} />
                                    <SortType title={"time : New to Old"} sortSelectedType={sortSelectedType} setsortSelectedType={setsortSelectedType} setshowSortlist={setshowSortlist} />
                                    <SortType title={"Newest first"} sortSelectedType={sortSelectedType} setsortSelectedType={setsortSelectedType} setshowSortlist={setshowSortlist} />
                                </div>
                            )
                        }


                    </button>

                </div>

                <div className="listedpart w-full "
                    style={{
                        display: "grid",
                        gap: 5,
                        gridTemplateColumns: "repeat( auto-fit, minmax(300px, 1fr) )",
                    }}
                >
                    <ThreeDCardDemo />
                    <ThreeDCardDemo />
                    <ThreeDCardDemo />
                    <ThreeDCardDemo />
                    <ThreeDCardDemo />
                    <ThreeDCardDemo />
                    <ThreeDCardDemo />
                    <ThreeDCardDemo />

                </div>

            </div>
        </div>
    )
}

export default PrductList