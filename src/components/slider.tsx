"use client"

import { cn } from "@/lib/utils"
import { Slider } from "@/components/ui/slider"
import { useEffect, useState } from "react";

type SliderProps = React.ComponentProps<typeof Slider>

export function SliderDemo({ className,setPrizeLimit,min,max,step,defult, ...props }: SliderProps) {

    const [val, setVal] = useState([defult]);

    useEffect(() => {
        setPrizeLimit(val)
    }, [val])


    return (
        <Slider
            max={20000}
            value={val}
            min={500}
            step={500}
            className={cn("w-[100%]", className)}
            onValueChange={(i) => setVal(i)} />
    )
}