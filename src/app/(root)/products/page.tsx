"use client"

import { SliderDemo } from '@/components/slider'
import { crops } from '@/data'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { DatePickerDemo } from '@/components/daterangepicker'
import ProductCard from "@/components/product-card";
import { ProductType } from '@/lib/types'
import { getProducts } from '@/actions/product.actions'
import DropdownIcon from '@/components/ui/dropdown-icon'
import { CheckCircle, CheckCircle2, CheckCircle2Icon, CheckCircleIcon } from 'lucide-react'

interface CheckBoxProps {
    crop: keyof typeof crops;
}

const CheckBox = ({ crop }: CheckBoxProps) => {

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
                    <DropdownIcon condition={show} />
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


interface SortTypeProps {
    title: string;
    sortSelectedType: string;
    setsortSelectedType: (value: string) => void;
    setshowSortlist: (value: boolean) => void;
}

const SortType = ({ title, sortSelectedType, setsortSelectedType, setshowSortlist }: SortTypeProps) => {

    const handeltype = () => {
        setsortSelectedType(title)
        setshowSortlist(false)
    }

    return (
        <div onClick={handeltype} className='flex items-center justify-between w-full py-2  px-4 border-b-2'>
            <h1 className='text-base font-semibold'
                style={{
                    color: sortSelectedType == title ? "#6300a3" : "#2e054e"
                }}
            >
                {title}
            </h1>

            {sortSelectedType == title && <CheckCircle2 size={18} className='text-[#6300a3]' />}
        </div>
    )
}


function PrductList() {

    const [products, setproducts] = useState<ProductType[]>([])

    useEffect(() => {
        getProducts()
            .then((product) => {
                setproducts(product)
            })
    }, [])

    const [prizeLimit, setPrizeLimit] = useState(0)

    const [cropvarityshow, setCropvarityshow] = useState(false)
    const [prizeshow, setPrizeshow] = useState(false)
    const [quntityshow, setQuntityshow] = useState(false)
    const [additionalserviceshow, setAdditionalserviceshow] = useState(false)
    const [gradingshow, setGradingshow] = useState(false)
    const [harvestdateshow, setHarvestdateshow] = useState(false)
    const [listeddateshow, setListeddateshow] = useState(false)

    const [quantiyrange, setQuantiyrange] = useState(200)

    const [harvestStarting, setharvestStarting] = useState(new Date())
    const [harvestEnd, setHarvestEnd] = useState(new Date())

    const [listedDateStart, setListedDateStart] = useState(new Date())
    const [listedDateEnd, setListedDateEnd] = useState(new Date())

    const [showSortlist, setshowSortlist] = useState(false)
    const [sortSelectedType, setsortSelectedType] = useState("Relevance")

    return (
        <div className="maincontainer w-full py-10 flex gap-6 justify-center relative">
            <div className="leftpart w-[23%] rounded-md space-y-3 sticky top-20 h-full">

                <div className="pricerange  py-3 px-5 border-2 rounded-md">
                    <div className='flex items-center justify-between'>
                        <label htmlFor='prize' className='text-[#2e054e] font-semibold text-base cursor-pointer'>Price Range</label>
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
                                    <SliderDemo
                                        onValueChange={([val]) => setPrizeLimit(val)}
                                        min={500}
                                        max={20000}
                                        step={500}
                                        defaultValue={[2000]}
                                        value={[prizeLimit]}
                                    />
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
                        <label htmlFor='varity' className='text-[#2e054e] font-semibold text-base cursor-pointer'>Crop + variety</label>
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
                                    <CheckBox crop={item as keyof typeof crops} key={index} />
                                ))
                            }
                        </div>
                    }
                </div>

                <div className="pricerange  py-3  px-5 border-2 rounded-md">
                    <div className='flex items-center justify-between'>
                        <label htmlFor='Qantity' className='text-[#2e054e] font-semibold text-base cursor-pointer'>Quantity Range</label>
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
                                    <SliderDemo
                                        value={[quantiyrange]}
                                        onValueChange={([val]) => setQuantiyrange(val)}
                                        min={100}
                                        max={3000}
                                        step={30}
                                        defaultValue={[200]}
                                    />
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

            <div className="rightpart w-[65%] rounded-md border-2 space-y-2 px-5 py-4">

                <div className="headerpart flex z-30 items-center justify-between">

                    <div className="left flex items-center gap-2">
                        <h1 className='text-[#2e054e] font-semibold'>1048</h1>
                        <h1 className='text-[#2e054e] text-sm'>Farmers in Katawer</h1>
                    </div>

                    <button onClick={() => { setshowSortlist(!showSortlist) }} className="right rounded-md border-2 py-2 px-4 relative flex items-center justify-between  gap-5">

                        <h1 className='flex items-center justify-center text-[#2e054e] font-semibold' >{`sort by : ${sortSelectedType}`}</h1>
                        <DropdownIcon condition={showSortlist} />
                        {
                            showSortlist && (
                                <div className="dropdowncontainer z-50 shadow-xl w-60 bg-white border-[1px] rounded-md top-12 right-3 absolute">
                                    <SortType title={"Relevance"} sortSelectedType={sortSelectedType} setsortSelectedType={setsortSelectedType} setshowSortlist={setshowSortlist} />
                                    <SortType title={"Price: low to high"} sortSelectedType={sortSelectedType} setsortSelectedType={setsortSelectedType} setshowSortlist={setshowSortlist} />
                                    <SortType title={"Price: Hight to low"} sortSelectedType={sortSelectedType} setsortSelectedType={setsortSelectedType} setshowSortlist={setshowSortlist} />
                                    <SortType title={"time: New to Old"} sortSelectedType={sortSelectedType} setsortSelectedType={setsortSelectedType} setshowSortlist={setshowSortlist} />
                                    <SortType title={"Newest first"} sortSelectedType={sortSelectedType} setsortSelectedType={setsortSelectedType} setshowSortlist={setshowSortlist} />
                                </div>
                            )
                        }

                    </button>

                </div>

                <div className="listedpart w-full"
                    style={{
                        display: "grid",
                        gap: 5,
                        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr) )",
                    }}
                >
                    {products.map((product, index) => (
                        <ProductCard product={product as any} key={index} />
                    ))}

                </div>

            </div>
        </div>
    )
}

export default PrductList