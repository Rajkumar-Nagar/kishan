"use client";
import React from "react";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";

type Props = {
    children:React.ReactNode
}

export function ShootingStarsAndStarsBackgroundDemo({ children }:Props) {
    return (
        <div className="h-[50rem] rounded-md bg-neutral-900 flex flex-col items-center justify-center relative w-full">

            {children}
            <ShootingStars />
            <StarsBackground />
        </div>
    );
}
