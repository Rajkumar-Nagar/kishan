"use client"

import React, { useEffect, useState } from 'react';
import NavigationMenuDemo from './Navbarfield';
import Image from 'next/image';
import Link from 'next/link';
import ProfileDemo from './ProfileDropDown';

function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            setScrolled(offset > 15);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={`navbar ${scrolled ? 'bg-green-200' : 'bg-white'} sticky top-0 z-50 flex w-full justify-between py-2 md:px-12 px-6 h-16 transition-all ease-linear duration-150`}>
            <div className="logo">
                <div>
                    <span className='text-3xl font-bold text-[#3aed269c]'>Kis</span>
                    <span className='text-3xl font-bold text-[#5a4e4e9c]'>an</span>
                </div>
                <div>
                    <p className='text-[10px] font-sans text-[#3432329c]'>Making Farming Easy</p>
                </div>
            </div>


            <div className="serveses flex items-center">
                <NavigationMenuDemo />
            </div>

            <div className='flex flex-row items-center gap-10'>

                <ProfileDemo />

                <Link href={"/"} className="search border border-black h-10 w-48 flex flex-row px-3 rounded-md items-center gap-3">
                    <Image alt='' src={"/search.png"} width={20} height={20} />
                    <span>Search</span>
                </Link>

                <Link href={"/ai"} className="Kalyaan flex items-center justify-center gap-1">
                    <Image alt='' src={"/sun.png"} width={30} height={30} />
                    <span className='text-2xl font-bold text-[#4a9129]'>Ai</span>
                </Link>
            </div>




            {/* <div className="profile flex items-center justify-center gap-1">
                <Image alt='' src={"/user.png"} width={30} height={30} />
                <Link href={"/login"} className='font-semibold underline text-[#4a9129]'>Login</Link>
            </div> */}
        </div>
    );
}

export default Navbar;
