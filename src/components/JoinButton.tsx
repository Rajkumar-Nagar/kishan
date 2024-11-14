import Link from 'next/link';
import React from 'react';
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

function JoinButton() {
    return (
        <Link href={"/mandi/join-mandi"} className='fixed sm:hidden scale-1 active:scale-95 transition-all duration-200 ease-in-out bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 p-1 rounded-full bg-gradient-to-r from-green-400 via-yellow-400 to-orange-400'>
            <div className='flex items-center gap-2 px-6 py-2 text-black rounded-full backdrop-blur-sm bg-white/70'>
                <span>JOIN</span>
                <MdOutlineKeyboardDoubleArrowRight size={24} />
            </div>
        </Link>
    );
}

export default JoinButton;
