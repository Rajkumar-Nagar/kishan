"use client"

import { SliderDemo } from '@/components/slider'
import { crops } from '@/data'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs';
import { Slider } from '@/components/ui/slider'
import { DatePickerDemo } from '@/components/daterangepicker'
import ProductCard from "@/components/product-card";
import products from '@/data/products.json'
import { ProductType } from '@/lib/types'
import { getProducts } from '@/actions/product.actions'
import { useAppDispatch, useAppSelector } from '@/lib/redux'
import { productActions } from '@/lib/redux/features'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { format } from "date-fns"


interface CheckBoxProps {
    crop: keyof typeof crops;
}

const CheckBox = ({ crop }: CheckBoxProps) => {
    const filterVarity = useAppSelector((state) => state.product.FilterVaritys);
    const FilterData = useAppSelector((state) => state.product.FilterCrops)
    const [show, setShow] = useState(false);
    const [selectedCrop, setSelectedCrop] = useState(filterVarity[crop].length === crops[crop].length);
    const [cropvarity, setCropVarity] = useState<{ [key: string]: string[] }>({}); // Use object to store varieties for different crops

    const dispatch = useAppDispatch()



    const handleCheckButton = (crop: string, varity: string) => {
        return filterVarity[crop]?.includes(varity)
    };

    const handleShortVarity = (crop: string, varity: string) => {
        dispatch(productActions.addvarityFilter({ crop, varity }))
    };

    const handleVarity = () => {
        setSelectedCrop(!selectedCrop)
        dispatch(productActions.handelCrop({ selectedCrop: !selectedCrop, crop }))
    }

    useEffect(() => {
        dispatch(productActions.hadelVarity(filterVarity))
    }, [filterVarity])


    return (
        <div className="containerbox space-y-2">
            <button onClick={() => setShow(!show)} className="top w-full flex items-center justify-between">
                <div className="left flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={selectedCrop}
                        onChange={handleVarity}
                        className="w-5 h-5"
                        name={crop}
                        id={crop}
                    />
                    <label htmlFor={crop} className="cursor-pointer">
                        {crop}
                    </label>
                </div>w
                <div className="right flex gap-4 items-center">
                    <h1>106</h1>
                    <Image
                        width={100}
                        height={100}
                        alt="reload"
                        className="w-3 h-3"
                        src={"/down.png"}
                        style={{ transform: show ? "rotate(180deg)" : "rotate(0deg)" }}
                    />
                </div>
            </button>

            {show && (
                <div className="space-y-2">
                    {crops[crop].map((varity, index) => (
                        <div key={index} className="top flex items-center justify-between pl-3">
                            <div className="left flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={handleCheckButton(crop, varity)}
                                    onChange={() => handleShortVarity(crop, varity)}
                                    className="w-5 h-5"
                                    name="crop"
                                    id={`varity-${index}`}
                                />
                                <h1>{varity}</h1>
                            </div>
                            <h1>106</h1>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};


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


interface Drawer {
    setChange: (value: boolean) => void;
    change: boolean,
    title: string
}

const DrawerControl = ({ setChange, change, title }: Drawer) => {
    return (
        <div className='flex items-center justify-between'>
            <label htmlFor='prize' className='text-[#2e054e] font-semibold text-base cursor-pointer'>{title}</label>
            <button id='prize' onClick={() => { setChange(!change) }} className='text-[#2e054e] font-semibold text-base '>{!change ? "+" : "-"}</button>
        </div>
    )
}

const FilterTitle = ({ label }) => {
    return (
        <div className=' border-[#007fff] border-[1px] py-2 px-5 rounded-md flex items-center gap-3'
            style={{
                backgroundColor: "rgba(0, 123, 229, .05)"
            }}>
            <h1 className='text-[#007fff] text-xs'>{label}</h1>
            <Image width={50} height={50} className='w-2 h-2' alt='reload' src={"/close2.png"} />
        </div>
    )
}


function PrductList() {

    const [products, setproducts] = useState([])
    const dispatch = useAppDispatch()
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams);
    const pathName = usePathname();
    const route = useRouter()


    const [varityLable, setvarityLable] = useState([])
    const FilterData = useAppSelector((state) => state.product.FilterCrops)

    const prizeLimit = useAppSelector(state => state.product.FilterCrops.prize_Range.End);
    const quantiyrange = useAppSelector(state => state.product.FilterCrops.quantity_range.End);
    const HarvestFrom = useAppSelector(state => state.product.FilterCrops.harvest_date.from);
    const HarvestTo = useAppSelector(state => state.product.FilterCrops.harvest_date.to);
    const ListedFrom = useAppSelector(state => state.product.FilterCrops.listed_date.from);
    const ListedTo = useAppSelector(state => state.product.FilterCrops.listed_date.to);


    useEffect(() => {
        getProducts()
            .then((product) => {
                setproducts(product)
            })
    }, [])

    useEffect(() => {
        const searchquery = Object.keys(FilterData.varity_Select).reduce((acc, crop) => {
            if (FilterData.varity_Select[crop].length === crops[crop].length) {
                acc.push(crop);
            } else {
                FilterData.varity_Select[crop].forEach((item) => {
                    acc.push(item);  // assuming `item` is the desired element here
                });
            }
            return acc;
        }, []);
        setvarityLable(searchquery)
    }, [FilterData])

    useEffect(() => {

        // Assuming 'params' is a URLSearchParams instance and 'pathName' is your current route's path
        const params = new URLSearchParams(window.location.search);  // make sure 'params' is initialized correctly
        params.set('query', varityLable.join('+'));
        params.set('prize', `₹ 0 - ${prizeLimit}`)
        params.set('quntity', `kg 0 -${quantiyrange}`)
        params.set('Harvest Date', `${format(HarvestFrom, "PPP")}-${format(harvestEnd, "PPP")}`)
        params.set('Listed Date', `${format(ListedFrom, "PPP")}-${format(ListedTo, "PPP")}`)

        // Ensure route and pathName are defined properly
        route.replace(`${pathName}?${params.toString()}`);
    }, [FilterData]);

    // const [prizeLimit, setPrizeLimit] = useState(FilterData.prize_Range.End)
    const [cropvarityshow, setCropvarityshow] = useState(false)
    const [prizeshow, setPrizeshow] = useState(false)
    const [quntityshow, setQuntityshow] = useState(false)
    const [additionalserviceshow, setAdditionalserviceshow] = useState(false)
    const [gradingshow, setGradingshow] = useState(false)
    const [harvestdateshow, setHarvestdateshow] = useState(false)
    const [listeddateshow, setListeddateshow] = useState(false)

    // const [quantiyrange, setQuantiyrange] = useState(FilterData.quantity_range.End)

    const [harvestStarting, setharvestStarting] = useState(HarvestFrom)
    const [harvestEnd, setHarvestEnd] = useState(HarvestTo)

    const [listedDateStart, setListedDateStart] = useState(ListedFrom)
    const [listedDateEnd, setListedDateEnd] = useState(ListedTo)

    const [showSortlist, setshowSortlist] = useState(false)
    const [sortSelectedType, setsortSelectedType] = useState("Relevance")


    useEffect(() => {
        dispatch(productActions.handelHarvestDate({ Start: harvestStarting, End: harvestEnd }))
    }, [harvestStarting, harvestEnd])

    useEffect(() => {
        dispatch(productActions.handelListedDate({ Start: listedDateStart, End: listedDateEnd }))
    }, [listedDateStart, listedDateEnd])


    const hadelPrizeSlider = (val, type) => {
        console.log("Slider value:", val[0][0], "Type:", type); // Debugging
        dispatch(productActions.handleRange({ type, val }));
    };

    const handleServices = (type) => {
        dispatch(productActions.hanelAdditionalServices(type))
    }



    return (
        <div className="maincontainer w-full py-10 flex gap-6 justify-center relative">
            <div className="leftpart w-[23%] rounded-md space-y-3 sticky top-20 h-full">
                <div className="pricerange  py-3 px-5 border-2 rounded-md">
                    <DrawerControl setChange={setPrizeshow} change={prizeshow} title={"Prize Range"} />
                    {
                        prizeshow && (
                            <div className='flex flex-col space-y-3  py-2'>
                                <div className="prize flex items-center justify-between">
                                    <h1 className='text-[#6300a3] font-semibold text-xl'>{`₹ ${prizeLimit}`}</h1>
                                    <h1 className='text-[#6300a3] font-semibold text-xl'>₹ 20,000</h1>
                                </div>
                                <div>
                                    <SliderDemo
                                        onValueChange={(e) => hadelPrizeSlider([e], "prize")} // For prize slider
                                        min={500}
                                        max={20000}
                                        step={2000}
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
                    <DrawerControl setChange={setCropvarityshow} change={cropvarityshow} title='Crop varity' />
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
                    <DrawerControl setChange={setQuntityshow} change={quntityshow} title='Crop Quntity' />
                    {
                        quntityshow && (
                            <div className='flex flex-col space-y-3  py-2'>
                                <div className="prize flex items-center justify-between">
                                    <h1 className='text-[#6300a3] font-semibold text-xl'>{`${quantiyrange} Kg`}</h1>
                                    <h1 className='text-[#6300a3] font-semibold text-xl'>3000 Kg</h1>
                                </div>
                                <div>
                                    <SliderDemo
                                        onValueChange={(e) => hadelPrizeSlider([e], "quantity")} // For quantity slider
                                        min={100}
                                        max={3000}
                                        step={30}
                                        value={[quantiyrange]}
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
                    <DrawerControl setChange={setHarvestdateshow} change={harvestdateshow} title='Harvest Date' />
                    {
                        harvestdateshow && (
                            <div className="box space-y-3 mt-5">
                                <div className='flex items-center justify-between gap-5'>
                                    <h1 className='text-[#2e054e] font-semibold text-base '>To</h1>
                                    <DatePickerDemo setHarvestDateRange={setharvestStarting} value={HarvestFrom} />
                                </div>
                                <div className='flex items-center gap-5 justify-between'>
                                    <h1 className='text-[#2e054e] font-semibold text-base '>From</h1>
                                    <DatePickerDemo setHarvestDateRange={setHarvestEnd} value={HarvestTo} />
                                </div>
                            </div>
                        )
                    }
                </div>


                <div className="ListedDate  py-3 px-5 border-2 rounded-md">
                    <DrawerControl setChange={setListeddateshow} change={listeddateshow} title='Listed Date' />
                    {
                        listeddateshow && (
                            <div className="box space-y-3 mt-5">
                                <div className='flex items-center justify-between gap-5'>
                                    <h1 className='text-[#2e054e] font-semibold text-base '>To</h1>
                                    <DatePickerDemo setHarvestDateRange={setListedDateStart} value={ListedFrom} />
                                </div>
                                <div className='flex items-center gap-5 justify-between'>
                                    <h1 className='text-[#2e054e] font-semibold text-base '>From</h1>
                                    <DatePickerDemo setHarvestDateRange={setListedDateEnd} value={ListedTo} />
                                </div>
                            </div>
                        )
                    }
                </div>


                <div className="ListedDate  py-3 px-5 border-2 rounded-md">
                    <DrawerControl setChange={setAdditionalserviceshow} change={additionalserviceshow} title='Additional Services' />
                    {
                        additionalserviceshow && (
                            <div className="box space-y-3 mt-5">

                                <div className="Streaming flex items-center justify-between">
                                    <label htmlFor="Streaming">Live Streaming</label>
                                    <input type="checkbox" checked={FilterData.additional_service.liveStreaming} onChange={() => handleServices("liveStreaming")} className='w-5 h-5 ' name="Streaming" id="Streaming" />
                                </div>

                                <div className="Request flex items-center justify-between">
                                    <label htmlFor="Request">Sample Request</label>
                                    <input type="checkbox" checked={FilterData.additional_service.sampleRequest} onChange={() => handleServices("sampleRequest")} className='w-5 h-5 ' name="Request" id="Request" />
                                </div>
                            </div>
                        )
                    }
                </div>


                <div className="ListedDate  py-3 px-5 border-2 rounded-md">
                    <DrawerControl setChange={setPrizeshow} change={prizeshow} title='Grading' />
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

                <div className="FilterContent flex flex-row gap-3 flex-wrap">
                    {
                        varityLable.map((item, index) => (
                            <FilterTitle key={index} label={item} />
                        )
                        )
                    }
                    {
                        FilterData.prize_Range.End != "2000" && (
                            <FilterTitle label={`0 ₹-${prizeLimit} ₹`} />
                        )
                    }
                    {
                        FilterData.prize_Range.End != "1000" && (
                            <FilterTitle label={`0 kg-${quantiyrange} kg`} />
                        )
                    }
                    {
                        harvestStarting && harvestEnd && (
                            <FilterTitle label={`Harvest : ${format(harvestStarting, "PPP")}-${format(harvestEnd, "PPP")}`} />
                        )
                    }
                    {
                        harvestStarting && harvestEnd && (
                            <FilterTitle label={`Listed : ${format(listedDateStart, "PPP")}-${format(listedDateEnd, "PPP")}`} />
                        )
                    }

                </div>

                <div className="listedpart w-full"
                    style={{
                        display: "grid",
                        gap: 5,
                        gridTemplateColumns: "repeat( auto-fit, minmax(300px, 1fr) )",
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