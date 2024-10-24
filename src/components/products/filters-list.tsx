"use client"
import { useAppDispatch, useAppSelector } from '@/lib/redux';
import { format } from 'date-fns';
import React, { useCallback, useEffect, useMemo } from 'react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce';
import { cropFilterActions, IFilterOptions, ISearchFilter, setFilterOptions } from '@/lib/redux/features';
import { MdClose } from 'react-icons/md';

const FilterTitle = ({ type, value }: { type: keyof IFilterOptions; value: any }) => {
    let label = useMemo(() => {
        switch (type) {
            case 'priceRange':
                return `${value.min} ₹ - ${value.max} ₹`;
            case 'quantityRange':
                return `${value.min} kg - ${value.max} kg`;
            case 'harvestDate':
                return `Harvest Date: ${format(value.from, 'PPP')} - ${format(value.to, 'PPP')}`;
            case 'listedDate':
                return `Listed Date: ${format(value.from, 'PPP')} - ${format(value.to, 'PPP')}`;
            case 'cropVariety':
                return value;
            case 'additionalServices':
                return value;
            default:
                return '';
        }
    }, [type, value]);

    const dispatch = useAppDispatch();

    const handleRemove = useCallback(() => {
        switch (type) {
            case 'priceRange':
                dispatch(cropFilterActions.setPriceRange({ min: 0, max: 2000 }));
                break;
            case 'quantityRange':
                dispatch(cropFilterActions.setQuantityRange({ min: 0, max: 1000 }));
                break;
            case 'harvestDate':
                dispatch(cropFilterActions.setHarvestDate({ from: "", to: "" }));
                break;
            case 'listedDate':
                dispatch(cropFilterActions.setListedDate({ from: "", to: "" }));
                break;
            case 'cropVariety':
                dispatch(cropFilterActions.removeCropVariety(value));
                break;
            case 'additionalServices':
                dispatch(cropFilterActions.setAdditionalServices(value));
                break;
            default:
                break;
        }
    }, [type, value, dispatch]);

    if (!label) return null;

    return (
        <div className='border-[#007fff] text-[#007fff]  border-[1px] py-2 px-3 rounded-md flex items-center gap-2 bg-[rgba(0,123,229,.05)]'>
            <h1 className='text-xs'>{label}</h1>
            <button onClick={handleRemove}>
                <MdClose />
            </button>
        </div>
    )
}

const FiltersList = () => {
    const searchParams = useSearchParams();

    const pathName = usePathname();
    const route = useRouter();
    const dispatch = useAppDispatch();

    const { filterOptions } = useAppSelector((state) => state.cropFilters);

    const handleSearchParams = useDebouncedCallback(() => {
        const params = new URLSearchParams(searchParams ?? {});

        if (Object.keys(filterOptions).length) {
            params.set('filterOptions', JSON.stringify(filterOptions));
        } else {
            params.delete('filterOptions');
        }

        const pt = decodeURIComponent(params.toString());
        const pt1 = params.toString();
        route.replace(`${pathName}?${pt}`, { scroll: false });
    }, 300);

    // Update search params on filter options change
    useEffect(() => {
        handleSearchParams();
    }, [filterOptions, handleSearchParams]);


    // Set filter options from search params
    useEffect(() => {
        const FilterData: ISearchFilter = JSON.parse(searchParams?.get('filterOptions') || '{}');
        dispatch(setFilterOptions(FilterData));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <div className="FilterContent flex flex-row gap-3 flex-wrap">

            {Object.keys(filterOptions).map((key, index) => {
                if (key === 'cropVariety' || key === 'additionalServices') {
                    return filterOptions[key]?.map((item, index) => (
                        <FilterTitle key={index} type={key as keyof IFilterOptions} value={item} />
                    ))
                }
                return (
                    <FilterTitle key={index} type={key as keyof IFilterOptions} value={filterOptions[key as keyof ISearchFilter]} />
                )
            })}

        </div>
    )
}

export default FiltersList
