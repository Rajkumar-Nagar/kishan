"use client"

import React, { useEffect, useState } from 'react';
import NavigationMenuDemo from './Navbarfield';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { User } from '@prisma/client';
import { useScrollWindow } from '@/hooks';
import ProfileMenu from './profile-menu';
import { MandiJoinButton } from './onlineMandi/joinButtion';
import { useRouter } from 'next/navigation';
import { userActions } from '@/actions';
import JoinButton from './JoinButton';

function Navbar() {
    const [user, setuser] = useState<User | null>(null)
    const isScrolled = useScrollWindow();
    const router = useRouter()

    const { data: session, status } = useSession()

    useEffect(() => {
        const handleuser = async () => {
            if (status === "authenticated" && session?.user?.id) {
                const updateduser = await userActions.getUserById(session?.user.id)
                setuser(updateduser)
            }
        }
        handleuser()
    }, [status, session])

    const handelJoinMandi = () => {
        router.push("/mandi/join-mandi")
    }


    return (
        <header className={`navbar ${isScrolled ? 'bg-[#719c8a] text-white sticky' : 'bg-white sticky'} shadow-md top-0 z-[100] flex w-full justify-between py-2 md:px-10 px-3 h-16 transition-[background] duration-300 !pr-4`}>
            <Link href={'/'} className="logo flex items-center ">
                <Image width={500} height={500} className='md:w-32 md:h-16 w-32 h-12 mt-2 shadow-slate-300' alt='Kisan' src={"/logo5.png"} />
            </Link>

            <div className="serveses sm:flex items-center hidden">
                <NavigationMenuDemo />
            </div>

            <div className='flex flex-row items-center gap-2 xs:gap-7'>
                <JoinButton cls={"hidden md:block"} />

                <Link href={"/daily-mandi-price"} className='relative hidden xs:flex items-center justify-center px-1 py-1 gap-2 border rounded-full border-transparent bg-gradient-to-r from-[#719c8a] via-[#a0cba7] to-[#42dc9c] p-[2px]'>
                    <div className="flex items-center justify-center gap-2 px-2 py-1 bg-[#1a2e23] rounded-full">
                        <Image width={200} height={200} className='w-10 h-8' alt='Kisan' src={"/analysis.png"} />
                        <span className='text-sm px-2 text-transparent bg-clip-text bg-gradient-to-r from-[#a0cba7] to-[#719c8a] font-medium'>Market</span>
                    </div>
                </Link>

                {/* <MandiJoinButton onClick={handelJoinMandi} hidden /> */}

                {/* <Button className='flex items-center gap-2' variant={'ghost'}>
                    <Search size={20} />
                    <span className='sr-only'>Search</span>
                </Button> */}

                <ProfileMenu user={user} />
            </div>
        </header>
    );
}

export default Navbar;
