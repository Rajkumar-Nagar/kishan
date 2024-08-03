import { GlobeDemo } from '@/components/glob'
import { CardHoverEffectDemo } from '@/components/onlineMandi/HowToSelll'
import { HoverBorderGradientDemo } from '@/components/onlineMandi/joinButtion'
import { InfiniteMovingCardsDemo } from '@/components/onlineMandi/review'
import { ExpandableCardDemo } from '@/components/onlineMandi/SoldCrops'
import { ShootingStarsAndStarsBackgroundDemo } from '@/components/onlineMandi/StarBg'
import { CarouselSize } from '@/components/product_slider'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function page() {
    return (
        <div className="maincontianer">
            <div className="w-[100%]  h-[50rem]   bg-black">

                <ShootingStarsAndStarsBackgroundDemo >
                    <GlobeDemo />
                </ShootingStarsAndStarsBackgroundDemo>
            </div>



            <div className="afterHeader bg-[#1a1a1a] w-full py-5 pt-10 px-24">

                <div className="manditime">
                    <h1 className='text-white text-3xl font-semibold'>Mandi Timing Cards</h1>

                    <div className="manidslot flex items-center justify-between py-7">
                        <div className="slot-1 bg-[#282828] w-96 h-60 rounded-xl overflow-hidden">
                            <div className="upperpart h-40 relative"
                                style={{
                                    backgroundImage: "url(/down.jpg)",
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center',
                                }}
                            >
                                <div className="blackgradianrt absolute bottom-0 h-14 w-full flex items-end justify-end"
                                    style={{ background: 'linear-gradient(0deg, #00000080, #0000)' }}
                                >
                                    <div className="content flex items-center gap-2 py-2 px-4 ">
                                        <Image width={100} height={100} alt='reload' src={"/clock.png"} className='w-4 h-4' />
                                        <h1 className='text-white text-base'>Start in 5h 3m 2s</h1>
                                    </div>
                                </div>
                            </div>

                            <div className='flex items-center justify-between '>
                                <div className="bottompart px-3 py-2 space-y-1">
                                    <div className="moring flex items-center gap-2 ">
                                        <Image width={100} height={100} alt='reload' src={"/sunrise.png"} className='w-6 h-6' />
                                        <h1 className='text-white text-xl font-semibold'>Morning Slot-1</h1>
                                    </div>
                                    <p className='text-[#b9bcbd] text-sm '>Sunday from 10 AM-11 AM</p>
                                </div>
                                {/* <HoverBorderGradientDemo /> */}
                            </div>

                        </div>

                        <div className="slot-2 bg-[#282828] w-96 h-60 rounded-xl overflow-hidden">
                            <div className="upperpart h-40 relative"
                                style={{
                                    backgroundImage: "url(/natural.jpg)",
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center',
                                }}
                            >
                                <div className="blackgradianrt absolute bottom-0 h-14 w-full flex items-end justify-end"
                                    style={{ background: 'linear-gradient(0deg, #00000080, #0000)' }}
                                >

                                    {/* <div className="content flex items-center gap-2 py-2 px-4 ">
                                    <Image width={100} height={100} alt='reload' src={"/clock.png"} className='w-4 h-4' />
                                    <h1 className='text-white text-base'>Start in 5h 3m 2s</h1>
                                </div> */}
                                    <div className="content flex items-center gap-2 py-2 px-4 ">
                                        <Image width={600} height={600} alt='reload' src={"/online1.png"} className='w-16 h-16' />
                                        <h1 className='text-white text-base'></h1>
                                    </div>

                                </div>
                            </div>

                            <div className='flex items-center justify-between px-4'>
                                <div className="bottompart py-3 space-y-1">
                                    <div className="moring flex items-center gap-2 ">
                                        <Image width={100} height={100} alt='reload' src={"/morning.png"} className='w-6 h-6' />
                                        <h1 className='text-white text-xl font-semibold'>Afternoon Slot-2</h1>
                                    </div>
                                    <p className='text-[#b9bcbd] text-sm '>Sunday from 1 PM-2 PM</p>
                                </div>

                                <HoverBorderGradientDemo />
                            </div>
                        </div>



                        <div className="slot-3 bg-[#282828] w-96 h-60 rounded-xl overflow-hidden">
                            <div className="upperpart h-40 relative"
                                style={{
                                    backgroundImage: "url(/license.jpg)",
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center',
                                }}
                            >
                                <div className="blackgradianrt absolute bottom-0 h-14 w-full flex items-end justify-end"
                                    style={{ background: 'linear-gradient(0deg, #00000080, #0000)' }}
                                >
                                    <div className="content flex items-center gap-2 py-2 px-4 ">
                                        <Image width={100} height={100} alt='reload' src={"/clock.png"} className='w-4 h-4' />
                                        <h1 className='text-white text-base'>Start in 5h 3m 2s</h1>
                                    </div>
                                </div>
                            </div>

                            <div className='flex items-center justify-between px-4'>
                                <div className="bottompart  py-4 space-y-1">
                                    <div className="moring flex items-center gap-2 ">
                                        <Image width={100} height={100} alt='reload' src={"/evening.png"} className='w-6 h-6' />
                                        <h1 className='text-white text-xl font-semibold'>Evening Slot-3</h1>
                                    </div>
                                    <p className='text-[#b9bcbd] text-sm '>Sunday from 4 PM-5 PM</p>
                                </div>

                                {/* <HoverBorderGradientDemo /> */}
                            </div>

                        </div>
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
        </div>
    )
}
export default page