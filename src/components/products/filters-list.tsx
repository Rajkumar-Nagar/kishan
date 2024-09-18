"use client"
import { useAppDispatch, useAppSelector } from '@/lib/redux';
import { format } from 'date-fns';
import Image from "next/image";
import React, { useCallback, useEffect } from 'react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce';
import { ISearchFilter, setFilterOptions } from '@/lib/redux/features';


const FilterTitle = ({ label }: { label: string }) => {
    return (
        <div className='border-[#007fff] border-[1px] py-2 px-5 rounded-md flex items-center gap-3 bg-[rgba(0,123,229,.05)]'>
            <h1 className='text-[#007fff] text-xs'>{label}</h1>
            <Image width={50} height={50} className='w-2 h-2' alt='reload' src={"/close2.png"} />
        </div>
    )
}

const FiltersList = () => {
    const searchParams = useSearchParams();

    const pathName = usePathname();
    const route = useRouter();
    const dispatch = useAppDispatch();

    const FilterData = useAppSelector((state) => state.cropFilters)
    const { priceRange, quantityRange, harvestDate, listedDate, varietyList, filterOptions } = FilterData;
    const HarvestFrom = harvestDate.from;
    const HarvestTo = harvestDate.to;
    const ListedFrom = listedDate.from;
    const ListedTo = listedDate.to;

    const handleSearchParams = useCallback(useDebouncedCallback(() => {
        const params = new URLSearchParams(searchParams ?? {});

        if (Object.keys(filterOptions).length) {
            params.set('filterOptions', JSON.stringify(filterOptions));
        } else {
            params.delete('filterOptions');
        }

        const pt = decodeURIComponent(params.toString());
        const pt1 = params.toString();
        route.replace(`${pathName}?${pt}`, { scroll: false });
    }, 300), [filterOptions]);

    useEffect(() => {
        handleSearchParams();
    }, [filterOptions]);


    useEffect(() => {
        const FilterData: ISearchFilter = JSON.parse(searchParams?.get('filterOptions') || '{}');
        dispatch(setFilterOptions(FilterData));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    return (
        <div className="FilterContent flex flex-row gap-3 flex-wrap">
            {
                varietyList.map((item, index) => (
                    <FilterTitle key={index} label={item} />
                ))
            }
            {
                priceRange.max != 2000 && (
                    <FilterTitle label={`0 ₹-${priceRange.max} ₹`} />
                )
            }
            {
                quantityRange.max != 1000 && (
                    <FilterTitle label={`0 kg-${quantityRange.max} kg`} />
                )
            }
            {
                HarvestFrom && HarvestTo && (
                    <FilterTitle label={`Harvest: ${format(HarvestFrom, "PPP")} - ${format(HarvestTo, "PPP")}`} />
                )
            }
            {
                ListedFrom && ListedTo && (
                    <FilterTitle label={`Listed: ${format(ListedFrom, "PPP")} - ${format(ListedTo, "PPP")}`} />
                )
            }

        </div>
    )
}

export default FiltersList
