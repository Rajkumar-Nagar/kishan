"use client"
import { crops, ICrops } from '@/data';
import { useAppDispatch, useAppSelector } from '@/lib/redux';
import { format } from 'date-fns';
import Image from "next/image";
import React, { useEffect, useMemo, useState } from 'react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce';
import { cropFilterActions } from '@/lib/redux/features';


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

    //@ts-ignore
    const params = new URLSearchParams(searchParams);
    const pathName = usePathname();
    const route = useRouter();
    const dispatch = useAppDispatch();

    const FilterData = useAppSelector((state) => state.cropFilters)
    const { additionalServices, priceRange, quantityRange, harvestDate, listedDate, cropVariety } = FilterData;

    const HarvestFrom = harvestDate.from;
    const HarvestTo = harvestDate.to;
    const ListedFrom = listedDate.from;
    const ListedTo = listedDate.to;

    const varityLable = useMemo(() => {
        const searchquery = Object.keys(cropVariety).reduce((acc, crop) => {
            if (cropVariety[crop].length === crops[crop as ICrops].length) {
                acc.push(crop);
            } else {
                cropVariety[crop].forEach((item) => {
                    acc.push(item);
                });
            }
            return acc;
        }, [] as string[]);
        return searchquery;
    }, [cropVariety]);


    useEffect(() => {

        const updateSearchParams = () => {

            const params = new URLSearchParams(searchParams ?? {});
            const { cropVariety, ...rest } = FilterData;
            const filterOptions = Object.keys(rest).reduce((acc, key) => {
                if (key === 'additionalServices') {
                    const services = Object.keys(additionalServices).filter((service) => additionalServices[service as keyof typeof additionalServices]);
                    if (services.length) {
                        acc[key] = services;
                    }
                } else if (key === 'priceRange') {
                    if (priceRange.min !== 0 || priceRange.max !== 2000) {
                        acc[key] = priceRange;
                    }
                } else if (key === 'quantityRange') {
                    if (quantityRange.min !== 0 || quantityRange.max !== 1000) {
                        acc[key] = quantityRange;
                    }
                } else if (key === 'harvestDate') {
                    if (harvestDate.from && harvestDate.to) {
                        acc[key] = harvestDate;
                    }
                } else if (key === 'listedDate') {
                    if (listedDate.from && listedDate.to) {
                        acc[key] = listedDate;
                    }
                }
                return acc;
            }, {} as any);

            const opts = {
                ...filterOptions,
                ...(varityLable.length && { cropVariety: varityLable })
            };

            if (Object.keys(filterOptions).length) {
                params.set('filterOptions', JSON.stringify(opts));
            } else {
                params.delete('filterOptions');
            }

            const pt = decodeURIComponent(params.toString());
            const pt1 = params.toString();
            route.replace(`${pathName}?${pt}`, { scroll: false });
        }

        const timeout = setTimeout(updateSearchParams, 300);
        return () => clearTimeout(timeout);

    }, [varityLable, FilterData, pathName]);

    useEffect(() => {
        const FilterData = JSON.parse(searchParams?.get('filterOptions') || '{}');
        if (!FilterData) return;
        const { cropVariety } = FilterData;
        cropVariety.forEach((item: string) => {
            if (item in crops) {
                dispatch(cropFilterActions.setCropVariety(item as keyof typeof crops))
            } else {
                (Object.keys(crops) as ICrops[]).forEach((crop) => {
                    if (crops[crop].includes(item)) {
                        dispatch(cropFilterActions.updateCropVariety({ crop: crop, variety: item }))
                    }
                })
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    return (
        <div className="FilterContent flex flex-row gap-3 flex-wrap">
            {
                varityLable.map((item, index) => (
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
                    <FilterTitle label={`Harvest : ${format(HarvestFrom, "PPP")}-${format(HarvestTo, "PPP")}`} />
                )
            }
            {
                ListedFrom && ListedTo && (
                    <FilterTitle label={`Listed : ${format(ListedFrom, "PPP")}-${format(ListedTo, "PPP")}`} />
                )
            }

        </div>
    )
}

export default FiltersList
