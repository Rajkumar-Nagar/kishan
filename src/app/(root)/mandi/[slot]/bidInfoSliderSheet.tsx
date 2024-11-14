"use client"
import React, { useEffect, useState } from 'react'

import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import BidInfo from './BidInfo'
import { useWindowSize } from '@/hooks'

function BidInfoSliderSheet() {
    const { width } = useWindowSize();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (width > 768) setIsOpen(false);
    }, [width]);

    return (
        <Sheet onOpenChange={setIsOpen} open={isOpen}>
            <SheetTrigger className='fixed md:hidden block right-0 top-12 bg-green-500 px-4 py-2'>Open</SheetTrigger>
            <SheetContent className='w-full pt-10'>
                <BidInfo />
            </SheetContent>
        </Sheet>
    )
}

export default BidInfoSliderSheet