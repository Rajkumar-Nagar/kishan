"use client"

import { cn } from "@/lib/utils"
import { Slider } from "@/components/ui/slider"
import { useEffect, useState } from "react";

type SliderProps = React.ComponentProps<typeof Slider>
export function SliderDemo({ className, onValueChange, min, value, max, step, defaultValue, ...props }: SliderProps) {

    return (
        <Slider
            max={max}
            value={value}
            min={min}
            step={step}
            className={cn("w-[100%]", className)}
            onValueChange={onValueChange} />
    )
}