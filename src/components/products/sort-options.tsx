"use client"
import React, { useState } from 'react'
import DropdownIcon from '../ui/dropdown-icon'
import { CheckCircle2 } from "lucide-react";

interface SortTypeProps {
    title: ISortOptions;
    selectedValue: ISortOptions;
    handleSelect: (value: ISortOptions) => void;
}

const SortType = ({ title, selectedValue, handleSelect }: SortTypeProps) => {

    const handeltype = () => handleSelect(title)
    const isSelected = selectedValue == title;

    return (
        <div onClick={handeltype} className='flex items-center justify-between w-full py-2 px-4'>
            <h1 className={`text-base font-semibold text-[${isSelected ? "#6300a3" : "#2e054e"}]`}>
                {title}
            </h1>

            {isSelected && <CheckCircle2 size={18} className='text-[#6300a3]' />}
        </div>
    )
}


const sortOptions = ["Relevance", "Price: low to high", "Price: Hight to low", "time: New to Old", "Newest first"] as const;
type ISortOptions = typeof sortOptions[number];

const SortOptions = () => {
    const [showSortlist, setshowSortlist] = useState(false)
    const [sortSelectedType, setsortSelectedType] = useState<ISortOptions>(sortOptions[0]);

    const handleSelect = (type: ISortOptions) => {
        setsortSelectedType(type)
        setshowSortlist(false)
    }

    return (
        <>
            <button onClick={() => { setshowSortlist(!showSortlist) }} className="right rounded-md border-2 py-2 px-4 relative flex items-center justify-between  gap-5">

                <h1 className='flex items-center justify-center text-[#2e054e] font-semibold' >{`sort by: ${sortSelectedType}`}</h1>
                <DropdownIcon condition={showSortlist} />
                {
                    showSortlist && (
                        <div className="dropdowncontainer z-50 shadow-xl w-60 bg-white border-[1px] rounded-md top-12 right-3 absolute divide-y-2">
                            {
                                sortOptions.map((title, index) => (
                                    <SortType
                                        key={index}
                                        title={title}
                                        selectedValue={sortSelectedType}
                                        handleSelect={handleSelect}
                                    />
                                ))
                            }
                        </div>
                    )
                }
            </button>
        </>
    )
}

export default SortOptions
