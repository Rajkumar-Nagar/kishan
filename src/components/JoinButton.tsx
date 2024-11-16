import { cn } from '@/utils/cn';
import Link from 'next/link';
import React from 'react';
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

function JoinButton({ cls }: { cls?: string }) {
    return (
        <Link
            href={"/mandi/join-mandi"}
            className={cn(
                'scale-1 active:scale-95 transition-all duration-200 ease-in-out bottom-4 z-50 flex items-center gap-2 p-1 rounded-full bg-gradient-to-r from-[#45ffb1] via-[#30945a] to-[#f1c27d]', // Complementary gradient border colors
                cls
            )}
        >
            <div className='flex items-center gap-2 px-6 py-2 rounded-full backdrop-blur-sm bg-white/70'>
                <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#47c8ff] via-[#1f3227] to-[#f1c27d] font-medium'>JOIN</span> {/* Text gradient */}
                <MdOutlineKeyboardDoubleArrowRight size={24} className='text-[#719c8a]' /> {/* Icon color for consistency */}
            </div>
        </Link>
    );
}

export default JoinButton;
