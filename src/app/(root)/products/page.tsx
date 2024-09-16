"use client"

import { SliderDemo } from '@/components/slider'
import { crops, ICrops } from '@/data'
import React, { useEffect, useState } from 'react'
import { DatePickerDemo } from '@/components/daterangepicker'
import ProductCard from "@/components/product-card";
import { ProductType } from '@/lib/types'
import { getProducts } from '@/actions/product.actions'
import DropdownIcon from '@/components/ui/dropdown-icon'
import { useAppDispatch, useAppSelector } from '@/lib/redux'
import { productActions } from '@/lib/redux/features'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { format } from "date-fns"
import { CheckBox, DrawerControl, FilterTitle, SortType } from './_component'



function PrductList() {

    const [products, setproducts] = useState<ProductType[]>([])

    const dispatch = useAppDispatch()
    const searchParams = useSearchParams()
    //@ts-ignore
    const params = new URLSearchParams(searchParams);
    const pathName = usePathname();
    const route = useRouter()


    const [varityLable, setvarityLable] = useState<string[]>([])
    const FilterData = useAppSelector((state) => state.product.FilterCrops)

    const prizeLimit = FilterData.prize_Range.End;
    const quantiyrange = FilterData.quantity_range.End;
    const HarvestFrom = FilterData.harvest_date.from;
    const HarvestTo = FilterData.harvest_date.to;
    const ListedFrom = FilterData.listed_date.from;
    const ListedTo = FilterData.listed_date.to;


    useEffect(() => {
        getProducts()
            .then((product) => {
                setproducts(product)
            })
    }, [])

    useEffect(() => {
        const searchquery = Object.keys(FilterData.varity_Select).reduce((acc, crop) => {
            if (FilterData.varity_Select[crop].length === crops[crop as ICrops].length) {
                acc.push(crop);
            } else {
                FilterData.varity_Select[crop].forEach((item) => {
                    acc.push(item);
                });
            }
            return acc;
        }, [] as string[]);
        setvarityLable(searchquery)
    }, [FilterData])

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        params.set('query', varityLable.join('+'));
        params.set('prize', `₹ 0 - ${prizeLimit}`)
        params.set('quntity', `kg 0 -${quantiyrange}`)
        if (HarvestFrom && HarvestTo)
            params.set('Harvest Date', `${format(HarvestFrom, "PPP")}-${format(harvestEnd, "PPP")}`)
        if (ListedFrom && ListedTo)
            params.set('Listed Date', `${format(ListedFrom, "PPP")}-${format(ListedTo, "PPP")}`)

        route.replace(`${pathName}?${params}`, { scroll: false });
    }, [varityLable, prizeLimit, quantiyrange, HarvestFrom, HarvestTo, ListedFrom, ListedTo]);

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


    const hadelPrizeSlider = (val: number[], type: string) => {
        console.log("Slider value:", val[0], "Type:", type); // Debugging
        dispatch(productActions.handleRange({ type, val }));
    };

    const handleServices = (type: string) => {
        dispatch(productActions.hanelAdditionalServices(type))
    }



    return (
        <div className="container max-w-screen-2xl w-full min-h-body flex gap-6 justify-center relative py-4">
            <div className="leftpart w-[clamp(300px,_25vw,_360px)] max-h-body-2 rounded-md space-y-3 sticky top-20 overflow-y-auto">
                <div className="pricerange py-3 px-5 border-2 rounded-md">
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
                                        onValueChange={(e) => hadelPrizeSlider(e, "prize")} // For prize slider
                                        min={500}
                                        max={20000}
                                        step={2000}
                                        value={[+prizeLimit]}
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
                                        onValueChange={(e) => hadelPrizeSlider(e, "quantity")} // For quantity slider
                                        min={100}
                                        max={3000}
                                        step={30}
                                        value={[+quantiyrange]}
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
                                    <DatePickerDemo setHarvestDateRange={(date: string) => setharvestStarting(date)} value={HarvestFrom} />
                                </div>
                                <div className='flex items-center gap-5 justify-between'>
                                    <h1 className='text-[#2e054e] font-semibold text-base '>From</h1>
                                    <DatePickerDemo setHarvestDateRange={(date: string) => setHarvestEnd(date)} value={HarvestTo} />
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
                                    <DatePickerDemo setHarvestDateRange={(date: string) => setListedDateStart(date)} value={ListedFrom} />
                                </div>
                                <div className='flex items-center gap-5 justify-between'>
                                    <h1 className='text-[#2e054e] font-semibold text-base '>From</h1>
                                    <DatePickerDemo setHarvestDateRange={(date: string) => setListedDateEnd(date)} value={ListedTo} />
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

            <div className="rightpart flex-1 rounded-md border-2 space-y-2 px-5 py-4">
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

                <div className="FilterContent flex flex-row gap-3 flex-wrap">
                    {
                        varityLable.map((item, index) => (
                            <FilterTitle key={index} label={item} />
                        ))
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
                        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
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