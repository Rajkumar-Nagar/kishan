import React from 'react'

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import BidInfo from './BidInfo'

function BidInfoSliderSheet() {
    return (
        <Sheet>
            <SheetTrigger className='fixed right-0 top-0'>Open</SheetTrigger>
            <SheetContent>
               <BidInfo/>
            </SheetContent>
        </Sheet>
    )
}

export default BidInfoSliderSheet