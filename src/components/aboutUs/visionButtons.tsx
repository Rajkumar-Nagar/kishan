"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import Particles from "../ui/particles";
import Image from "next/image";

export function ParticlesDemo({ title, ImageUrl }: { title: string, ImageUrl: string }) {
    const { theme } = useTheme();
    const [color, setColor] = useState("#ffffff");

    useEffect(() => {
        setColor(theme === "dark" ? "#ffffff" : "#000000");
    }, [theme]);

    return (
        <div className="relative flex h-[300px] w-full dark flex-col items-center justify-center bg-cover bg-center  overflow-hidden rounded-lg border bg-background md:shadow-xl"

            style={{
                backgroundImage: `url(${ImageUrl})`,

            }}
        >

            <div className="temp absolute w-full h-full z-20 bg-[#071925] opacity-80"></div>
            {/* <Image
                width={300}
                height={300}
                className="w-full h-20 rounded-xl m-3 "
                src={ImageUrl}
                alt="relaod"
            /> */}
            <span className="pointer-events-none z-50 whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-5xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
                {title}
            </span>
            <Particles
                className="absolute inset-0"
                quantity={100}
                ease={80}
                color={color}
                refresh
            />
        </div>
    );
}
