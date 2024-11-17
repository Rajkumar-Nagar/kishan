"use client"
import { useWindowSize } from '@/hooks';
import { Settings } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React, { PropsWithChildren, useEffect, useState } from 'react'
import { MdClose } from 'react-icons/md';


const SideBar: React.FC<PropsWithChildren> = ({
    children
}) => {
    const { width } = useWindowSize();
    const [isOpened, setIsOpened] = useState(false);
    const handleClick = () => {
        setIsOpened(p => !p)
    }

    const pathname = usePathname();

    useEffect(() => {
        setIsOpened(false)
    }, [pathname])

    if (width > 768) return children;

    return (
        <div className='relative '>
            <button className='p-2 sticky top-[calc(var(--header-height)_+_0.5rem)]' onClick={handleClick}>
                <Settings />
            </button>
            {isOpened && <div className='w-screen h-screen z-40 bg-black/15 fixed inset-0' onClick={handleClick} />}
            <div className={`sidebar fixed h-screen overflow-y-scroll pb-12 bg-white z-50 p-4`}
                style={{
                    left: isOpened ? -0 : -400,
                    top: 'var(--header-height)',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                    transition: 'left 0.3s ease-in-out',
                }}
            >
                <MdClose className='ml-auto mb-4 cursor-pointer' onClick={handleClick} />
                {children}
            </div>
        </div>
    )
}

export default SideBar
