"use client"

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

function AiButton() {

    const path = usePathname();

    const show = path == "/contact-us" || path == "/about"

    return (
        <>
            <div className={`fixed bottom-4 right-3 z-40 hidden md:block ${show && "!hidden"}`}>
                <Link href={"/aiHelper"} className="inline-flex items-center justify-center w-28 h-32 bg-gradient-to-r from-teal-400 to-purple-500 rounded-md overflow-hidden shadow-lg transform transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-2xl active:scale-95">
                    <span className="absolute inset-0 bg-white rounded-md transform scale-90"></span>
                    <span className="relative text-gray-700 font-medium flex flex-col items-center space-x-2">
                        <Image alt="AI Icon" src={"/file3.png"} width={200} height={200} className="h-20 w-20" />
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-purple-600">
                            AgroAI
                        </span>
                    </span>
                </Link>
            </div>
            <Link
                href={"/aiHelper"}
                className={`fixed bottom-40 ${show && "!hidden"} right-3 z-50 md:hidden block group`}
            >
                <Image
                    width={300}
                    height={300}
                    className='w-12 h-12 transition-transform duration-200 ease-in-out transform group-hover:scale-110 group-active:scale-95'
                    alt='reload'
                    src={"/ai6.png"}
                />
                <Image
                    width={300}
                    height={300}
                    className='w-10 h-7 absolute -top-7 -left-5 transition-opacity duration-200 ease-in-out opacity-60 group-hover:opacity-100 group-active:opacity-80'
                    alt='reload'
                    src={"/ai5.png"}
                />
            </Link>
        </>
    );
}

export default AiButton;
