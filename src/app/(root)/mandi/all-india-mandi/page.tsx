import { GlobeDemo } from '@/components/glob'
import NoHeader from '@/components/no-header'
import { testimonials } from '@/components/onlineMandi/review'
import { ExpandableCardDemo } from '@/components/onlineMandi/SoldCrops'
import { ShootingStarsAndStarsBackgroundDemo } from '@/components/onlineMandi/StarBg'
import { CarouselSize } from '@/components/product_slider'
import Link from 'next/link'
import React from 'react'
import SlotCard from './slotCard'
import { HoverEffect } from '@/components/ui/card-hover-effect'
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards'
import { ChevronDown } from 'lucide-react'
import { mandiSlots, projects } from '@/data'


function page() {
    return (
        <div className="maincontianer dark">
            <div className="w-full h-dvh bg-black relative">
                <ShootingStarsAndStarsBackgroundDemo >
                    <GlobeDemo />
                </ShootingStarsAndStarsBackgroundDemo>
            </div>
            <NoHeader />
            <div className="bg-[#1a1a1a] w-full">
                <div className="container max-w-screen-xl py-5 pt-10 sm:px-8 xs:px-4 px-3">
                    <div className="manditime">
                        <h1 className='text-white text-3xl font-semibold'>Mandi Timing Cards</h1>

                        <div className="manidslot py-7 gap-4 sm:gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                            {mandiSlots.map((slot, index) => (
                                <SlotCard key={index} {...slot} />
                            ))}
                        </div>
                    </div>


                    <div className="upcomingProduct mt-4 mb-6 w-full">
                        <h1 className='text-white text-3xl font-semibold'>Upcoming mandi Crops</h1>

                        <div className='w-full py-7 relative container md:px-0'>
                            <CarouselSize />
                        </div>

                        <div className='w-full flex justify-center items-center text-zinc-300'>
                            <Link href={"/products"} className='w-36 py-1 flex items-center justify-center rounded-md  border-[1px] border-zinc-400 gap-2'>
                                <h1 className='text-base font-semibold'>See more</h1>
                                <ChevronDown size={20} />
                            </Link>
                        </div>

                    </div>

                    {/* <div className="soldProduct mt-4">
                        <div className="heading pb-5 flex items-center justify-between ">
                            <h1 className='text-white text-3xl font-semibold'>Sold Crops</h1>
                            <h1 className='text-white text-3xl font-semibold'>Sorted It</h1>
                        </div>
                        <ExpandableCardDemo />
                    </div> */}

                    <div className="soldProduct mt-5">
                        <h1 className='text-white text-3xl font-semibold'>Step to Sold Crops</h1>
                        <div className="w-full mx-auto">
                            <HoverEffect items={projects} className='py-2' />
                        </div>
                    </div>
                </div>
                <div className="py-6 flex flex-col mt-6 antialiased bg-black bg-grid-white/[0.05] relative overflow-hidden">
                    <div className="sm:px-8 xs:px-4 px-3">
                        <h1 className='text-white text-3xl font-semibold pb-2'>Reviews of Farmers</h1>
                    </div>
                    <InfiniteMovingCards
                        items={testimonials}
                        direction="right"
                        speed="slow"
                    />
                </div>
            </div>

        </div >
    )
}
export default page