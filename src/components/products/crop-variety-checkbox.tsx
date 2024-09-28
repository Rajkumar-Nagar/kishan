"use client"
import DropdownIcon from "@/components/ui/dropdown-icon";
import { crops } from "@/data";
import { useAppDispatch, useAppSelector } from "@/lib/redux";
import { cropFilterActions } from "@/lib/redux/features";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

interface CheckBoxProps {
    crop: keyof typeof crops;
}

export const CropVarietyCheckBox = ({ crop }: CheckBoxProps) => {
    const searchParams = useSearchParams();

    const filterVarity = useAppSelector((state) => state.cropFilters.cropVariety);
    const isSelected = filterVarity[crop].length === crops[crop].length;

    const [show, setShow] = useState(false);
    const dispatch = useAppDispatch();

    const handleShortVarity = (crop: string, variety: string) => {
        dispatch(cropFilterActions.updateCropVariety({ crop, variety }))
    };

    const handleVarity = () => {
        dispatch(cropFilterActions.setCropVariety({ crop, deleted: isSelected }))
    }

    const ref = React.useRef<HTMLDivElement>(null);
    const [maxHeight, setMaxheight] = React.useState("0px")

    React.useEffect(() => {
        const height = ref.current?.scrollHeight;
        setMaxheight(!show ? "0px" : height + "px");
    }, [show]);

    return (
        <div className="containerbox space-y-2">
            <div className="top w-full flex items-center justify-between">
                <div className="left flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={handleVarity}
                        className="w-5 h-5"
                        name={crop}
                        id={crop}
                    />
                    <label htmlFor={crop} className="cursor-pointer">
                        {crop}
                    </label>
                </div>w
                <button onClick={() => setShow(!show)} className="right flex gap-4 items-center">
                    <h1>106</h1>
                    <DropdownIcon condition={show} />
                </button>
            </div>

            <div className="space-y-2 transition-all duration-200 ease-in-out overflow-hidden"
                ref={ref}
                style={{
                    maxHeight
                }}
            >
                {crops[crop].map((variety, index) => (
                    <div key={index} className="top flex items-center justify-between pl-3">
                        <div className="left flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={filterVarity[crop]?.includes(variety)}
                                onChange={() => handleShortVarity(crop, variety)}
                                className="w-5 h-5"
                                name="crop"
                                id={`${crop}-${variety}-${index}`}
                            />
                            <label htmlFor={`${crop}-${variety}-${index}`}>{variety}</label>
                        </div>
                        <h1>106</h1>
                    </div>
                ))}
            </div>
        </div>
    );
};