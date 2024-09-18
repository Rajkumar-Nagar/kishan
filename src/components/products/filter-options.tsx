"use client"
import React, { useEffect, useState } from 'react'
import { DatePickerDemo } from '../daterangepicker'
import { SliderDemo } from '../slider'
import { useAppDispatch, useAppSelector } from '@/lib/redux'
import { cropFilterActions, IFilterOptions } from '@/lib/redux/features'
import { crops } from '@/data'
import { CropVarietyCheckBox } from './crop-variety-checkbox'
import { DrawerControl } from './drawer-control'


const FilterOptions = () => {

    const dispatch = useAppDispatch()

    const FilterData = useAppSelector((state) => state.cropFilters)
    const { additionalServices, priceRange, quantityRange, harvestDate, listedDate } = FilterData;

    const HarvestFrom = harvestDate.from;
    const HarvestTo = harvestDate.to;
    const ListedFrom = listedDate.from;
    const ListedTo = listedDate.to;


    const [harvestStarting, setharvestStarting] = useState(HarvestFrom)
    const [harvestEnd, setHarvestEnd] = useState(HarvestTo)

    const [listedDateStart, setListedDateStart] = useState(ListedFrom)
    const [listedDateEnd, setListedDateEnd] = useState(ListedTo)

    const handlePrice = ([val]: number[]) => {
        dispatch(cropFilterActions.setPriceRange({ min: 0, max: val }))
    };

    const handleQuantity = ([val]: number[]) => {
        dispatch(cropFilterActions.setQuantityRange({ min: 0, max: val }))
    };

    useEffect(() => {
        dispatch(cropFilterActions.setHarvestDate({ from: harvestStarting, to: harvestEnd }))
    }, [harvestStarting, harvestEnd])

    useEffect(() => {
        dispatch(cropFilterActions.setListedDate({ from: listedDateStart, to: listedDateEnd }))
    }, [listedDateStart, listedDateEnd])


    const handleServices = (type: keyof IFilterOptions["additionalServices"]) => {
        dispatch(cropFilterActions.setAdditionalServices(type))
    }


    return (
        <div className="leftpart w-[clamp(300px,_25vw,_360px)] max-h-body-2 rounded-md space-y-3 sticky top-20 overflow-y-auto">

            <DrawerControl title={"Price Range"} >
                <div className='flex flex-col space-y-3'>
                    <div className="prize flex items-center justify-between">
                        <h1 className='text-[#6300a3] font-semibold text-xl'>{`₹ ${priceRange.max}`}</h1>
                        <h1 className='text-[#6300a3] font-semibold text-xl'>₹ 20,000</h1>
                    </div>
                    <div>
                        <SliderDemo
                            onValueChange={handlePrice} // For prize slider
                            min={500}
                            max={20000}
                            step={2000}
                            value={[priceRange.max]}
                        />
                    </div>
                    <div className="prize flex items-center justify-between">
                        <h1 className='text-[#2e054e] font-semibold text-sm'>Mimimum</h1>
                        <h1 className='text-[#2e054e] font-semibold text-sm'>Maximum</h1>
                    </div>
                </div>
            </DrawerControl>

            <DrawerControl title='Crop variety' >
                <div className="cropcontainer space-y-4">
                    {
                        Object.keys(crops).map((item, index) => (
                            <CropVarietyCheckBox crop={item as keyof typeof crops} key={index} />
                        ))
                    }
                </div>
            </DrawerControl>

            <DrawerControl title='Crop Quantity' >
                <div className='flex flex-col space-y-3'>
                    <div className="prize flex items-center justify-between">
                        <h1 className='text-[#6300a3] font-semibold text-xl'>{`${quantityRange.max} Kg`}</h1>
                        <h1 className='text-[#6300a3] font-semibold text-xl'>3000 Kg</h1>
                    </div>
                    <div>
                        <SliderDemo
                            onValueChange={handleQuantity}
                            min={100}
                            max={3000}
                            step={30}
                            value={[quantityRange.max]}
                        />
                    </div>

                    <div className="prize flex items-center justify-between">
                        <h1 className='text-[#2e054e] font-semibold text-sm'>Mimimum</h1>
                        <h1 className='text-[#2e054e] font-semibold text-sm'>Maximum</h1>
                    </div>
                </div>
            </DrawerControl>

            <DrawerControl title='Harvest Date' >
                <div className="box space-y-3">
                    <div className='flex items-center justify-between gap-5'>
                        <h1 className='text-[#2e054e] font-semibold text-base'>To</h1>
                        <DatePickerDemo setHarvestDateRange={(date: string) => setharvestStarting(date)} value={HarvestFrom} />
                    </div>
                    <div className='flex items-center gap-5 justify-between'>
                        <h1 className='text-[#2e054e] font-semibold text-base'>From</h1>
                        <DatePickerDemo setHarvestDateRange={(date: string) => setHarvestEnd(date)} value={HarvestTo} />
                    </div>
                </div>
            </DrawerControl>

            <DrawerControl title='Listed Date' >
                <div className="box space-y-3">
                    <div className='flex items-center justify-between gap-5'>
                        <h1 className='text-[#2e054e] font-semibold text-base '>To</h1>
                        <DatePickerDemo setHarvestDateRange={(date: string) => setListedDateStart(date)} value={ListedFrom} />
                    </div>
                    <div className='flex items-center gap-5 justify-between'>
                        <h1 className='text-[#2e054e] font-semibold text-base '>From</h1>
                        <DatePickerDemo setHarvestDateRange={(date: string) => setListedDateEnd(date)} value={ListedTo} />
                    </div>
                </div>
            </DrawerControl>

            <DrawerControl title='Additional Services' >
                <div className="box space-y-3">

                    <div className="Streaming flex items-center justify-between">
                        <label htmlFor="Streaming">Live Streaming</label>
                        <input type="checkbox" checked={additionalServices.liveStreaming} onChange={() => handleServices("liveStreaming")} className='w-5 h-5 ' name="Streaming" id="Streaming" />
                    </div>

                    <div className="Request flex items-center justify-between">
                        <label htmlFor="Request">Sample Request</label>
                        <input type="checkbox" checked={additionalServices.sampleRequest} onChange={() => handleServices("sampleRequest")} className='w-5 h-5 ' name="Request" id="Request" />
                    </div>
                </div>
            </DrawerControl>

            <DrawerControl title='Grading' >
                <div className="box space-y-3">
                    <div className="Yes flex items-center justify-between">
                        <label htmlFor="yes">Graded Crops</label>
                        <input type="checkbox" className='w-5 h-5' name="yes" id="yes" />
                    </div>

                    <div className="No flex items-center justify-between">
                        <label htmlFor="No">Non Graded Crops</label>
                        <input type="checkbox" className='w-5 h-5 ' name="No" id="No" />
                    </div>
                </div>
            </DrawerControl>
        </div>
    )
}

export default FilterOptions
