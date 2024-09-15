import DropdownIcon from "@/components/ui/dropdown-icon";
import { crops } from "@/data";
import { useAppDispatch, useAppSelector } from "@/lib/redux";
import { productActions } from "@/lib/redux/features";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface CheckBoxProps {
    crop: keyof typeof crops;
}

export const CheckBox = ({ crop }: CheckBoxProps) => {
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
                    <DropdownIcon condition={show} />
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

export const SortType = ({ title, sortSelectedType, setsortSelectedType, setshowSortlist }: SortTypeProps) => {

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


interface Drawer {
    setChange: (value: boolean) => void;
    change: boolean,
    title: string
}

export const DrawerControl = ({ setChange, change, title }: Drawer) => {
    return (
        <div className='flex items-center justify-between'>
            <label htmlFor='prize' className='text-[#2e054e] font-semibold text-base cursor-pointer'>{title}</label>
            <button id='prize' onClick={() => { setChange(!change) }} className='text-[#2e054e] font-semibold text-base '>{!change ? "+" : "-"}</button>
        </div>
    )
}

export const FilterTitle = ({ label }:{label:string}) => {
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