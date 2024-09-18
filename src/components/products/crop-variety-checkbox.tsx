"use client"
import DropdownIcon from "@/components/ui/dropdown-icon";
import { crops } from "@/data";
import { useAppDispatch, useAppSelector } from "@/lib/redux";
import { cropFilterActions } from "@/lib/redux/features";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

interface CheckBoxProps {
    crop: keyof typeof crops;
}


export const CropVarietyCheckBox = ({ crop }: CheckBoxProps) => {
    const searchParams = useSearchParams();

    const filterVarity = useAppSelector((state) => state.cropFilters.cropVariety);

    const [selectedCrop, setSelectedCrop] = useState(filterVarity[crop].length === crops[crop].length);
    const [show, setShow] = useState(false);

    const dispatch = useAppDispatch();

    const handleCheckButton = (crop: string, variety: string) => {
        return filterVarity[crop]?.includes(variety)
    };

    const handleShortVarity = (crop: string, variety: string) => {
        dispatch(cropFilterActions.updateCropVariety({ crop, variety }))
    };

    const handleVarity = () => {
        setSelectedCrop(!selectedCrop)
        dispatch(cropFilterActions.setCropVariety(crop))
    }


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