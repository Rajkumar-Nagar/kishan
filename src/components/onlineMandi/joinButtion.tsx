"use client";
import React from "react";
import { HoverBorderGradient } from "../ui/hover-border-gradient";

export function MandiJoinButton({ ...props }) {
    return (

        <HoverBorderGradient
            containerClassName="rounded-full p-0"
            {...props}
            as="button"
            className="dark:bg-black bg-white group text-black dark:text-white hover:bg-green-300 flex items-center space-x-2 transition duration-200 ease-in-out"
        >
            <div className="circle w-5 h-5 rounded-full bg-green-500 shadow-2xl shadow-green-500">
            </div>
            <span className="text-[#002f34] text-base group-hover:text-white font-semibold">Join</span>
        </HoverBorderGradient>

    );
}