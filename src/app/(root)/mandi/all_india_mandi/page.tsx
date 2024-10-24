import { GlobeDemo } from '@/components/glob'
import NoHeader from '@/components/no-header'
import { CardHoverEffectDemo } from '@/components/onlineMandi/HowToSelll'
import { HoverBorderGradientDemo } from '@/components/onlineMandi/joinButtion'
import { InfiniteMovingCardsDemo } from '@/components/onlineMandi/review'
import { ExpandableCardDemo } from '@/components/onlineMandi/SoldCrops'
import { ShootingStarsAndStarsBackgroundDemo } from '@/components/onlineMandi/StarBg'
import { CarouselSize } from '@/components/product_slider'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import SlotCard from './slotCard'

const mandiSlots = [
    {
        slotName: "Morning Slot",
        date: "2024-10-17", // Example date, this should be dynamic if needed
        startTime: 16, // 10 AM
        endTime: 18,   // 11 AM
        backgroundImage: "/down.jpg",
        icon: "/sunrise.png"
    },
    {
        slotName: "Afternoon Slot",
        date: "2024-10-17",
        startTime: 13, // 1 PM
        endTime: 14,   // 2 PM
        backgroundImage: "/natural.jpg",
        icon: "/morning.png"
    },
    {
        slotName: "Evening Slot",
        date: "2024-10-17",
        startTime: 15, // 3 PM
        endTime: 16,   // 4 PM
        backgroundImage: "/license.jpg",
        icon: "/evening.png"
    }
];



function page() {
    return (
        <div className="maincontianer dark">
            <div className="w-[100%] h-body bg-black">

                <ShootingStarsAndStarsBackgroundDemo >
                    <GlobeDemo />
                </ShootingStarsAndStarsBackgroundDemo>
            </div>
            <NoHeader />
            <div className="afterHeader bg-[#1a1a1a] w-full py-5 pt-10 px-24">


                <div className="manditime">
                    <h1 className='text-white text-3xl font-semibold'>Mandi Timing Cards</h1>

                    <div className="manidslot flex items-center justify-between py-7">
                        {mandiSlots.map((slot, index) => (
                            <SlotCard key={index} {...slot} />
                        ))}
                    </div>
                </div>


                <div className="upcomingProduct mt-4">
                    <h1 className='text-white text-3xl font-semibold'>Upcoming mandi Crops</h1>

                    <div className='w-full py-7'>
                        <CarouselSize />
                    </div>

                    <div className='w-full flex justify-center items-center '>
                        <Link href={"/products"} className='w-36 py-1 flex items-center justify-center rounded-md  border-[1px] border-white gap-2'>
                            <h1 className='text-[white] text-base font-semibold'>See more</h1>
                            <Image width={16} height={1} alt='reload' src={"/down.png"} />
                        </Link>
                    </div>

                </div>

                <div className="soldProduct mt-4">
                    <div className="heading pb-5 flex items-center justify-between ">
                        <h1 className='text-white text-3xl font-semibold'>Sold Crops</h1>
                        <h1 className='text-white text-3xl font-semibold'>Sorted It</h1>
                    </div>
                    <ExpandableCardDemo />
                </div>

                <div className="soldProduct mt-4">
                    <h1 className='text-white text-3xl font-semibold pb-5'>Step to Sold Crops</h1>
                    <CardHoverEffectDemo />
                </div>

                <div className="soldProduct mt-4">
                    <h1 className='text-white text-3xl font-semibold pb-5'>Reviews of Farmers</h1>
                    <InfiniteMovingCardsDemo />
                </div>

            </div>
        </div >
    )
}
export default page