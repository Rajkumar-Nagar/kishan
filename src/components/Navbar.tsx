"use client"

import React, { useEffect, useState } from 'react';
import NavigationMenuDemo from './Navbarfield';
import Image from 'next/image';
import Link from 'next/link';
import ProfileDemo from './ProfileDropDown';
import { useSession } from 'next-auth/react';
import { getDataFromId } from '@/actions/productId.actio';
import { User } from '@prisma/client';
import { Search, CircleUserRound } from 'lucide-react';
import { Button } from './ui/button';
import { useScrollWindow } from '@/hooks';
import ProfileMenu from './profile-menu';
import { HoverBorderGradientDemo } from './onlineMandi/joinButtion';
import { useRouter } from 'next/navigation';

function Navbar() {
    const [user, setuser] = useState<User | null>(null)
    const isScrolled = useScrollWindow();
    const router = useRouter()

    const { data: session, status } = useSession()

    useEffect(() => {
        const handleuser = async () => {
            if (status === "authenticated" && session?.user?.id) {
                const updateduser = await getDataFromId(session?.user.id, "user")
                setuser(updateduser)
            }
        }
        handleuser()
    }, [status, session])

    const handelJoinMandi = () => {
        router.push("/mandi/joinMandi")
    }


    return (
        <div className={`navbar ${isScrolled ? 'bg-[#55648f]' : 'bg-white'} sticky top-0 z-50 flex w-full justify-between py-2 md:px-10 px-6 h-16 transition-all ease-linear duration-150 !pr-4`}>
            <div className="logo">
                <div>
                    <span className='text-3xl font-bold text-[#3aed269c]'>Kis</span>
                    <span className='text-3xl font-bold text-[#5a4e4e9c]'>an</span>
                </div>
                <div>
                    <p className='text-[10px] font-sans text-[#3432329c]'>Making Farming Easy</p>
                </div>
            </div>


            <div className="serveses sm:flex items-center hidden">
                <NavigationMenuDemo />

            </div>

            <div className='flex flex-row items-center gap-4'>
                <HoverBorderGradientDemo onClick={handelJoinMandi} />
                <Link href={"/ai"} className="Kalyaan flex items-center justify-center gap-1">
                    <Image alt='' src={"/sun.png"} width={30} height={30} />
                    <span className='text-2xl font-bold text-[#4a9129]'>Ai</span>
                </Link>

                {/* <Button className='flex items-center gap-2' variant={'ghost'}>
                    <Search size={20} />
                    <span className='sr-only'>Search</span>
                </Button> */}

                <ProfileMenu user={user} />
            </div>
        </div>
    );
}

export default Navbar;
