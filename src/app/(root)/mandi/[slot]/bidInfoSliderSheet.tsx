"use client"
import React, { useEffect, useState } from 'react'

import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import BidInfo from './BidInfo'
import { useWindowSize } from '@/hooks'
import { cn } from '@/lib/utils'

function BidInfoSliderSheet({
    className
}: {
    className?: string
}) {
    const { width } = useWindowSize();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (width > 768) setIsOpen(false);
    }, [width]);

    return (
        <Sheet onOpenChange={setIsOpen} open={isOpen}>
            <SheetTrigger className={cn(
                'fixed md:hidden block right-0 top-0 bg-green-500 px-4 py-2',
                className
            )}>Open</SheetTrigger>
            <SheetContent className='w-full pt-10'>
                <BidInfo />
            </SheetContent>
        </Sheet>
    )
}

export default BidInfoSliderSheet