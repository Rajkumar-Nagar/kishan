import CarouselDemo from '@/components/Carousel'
import React from 'react'
import Image from 'next/image'
import { CarouselSize } from '@/components/product_slider'
import Link from 'next/link'
import Title from '@/components/ui/title'
import { GlobeDemo } from '@/components/glob'
import { AppleCardsCarouselDemo } from '@/components/appleImageSlider'
import { InfiniteMovingCardsDemo } from '@/components/onlineMandi/review'
import { LayoutGridDemo } from '@/components/quotus'
import { StickyScrollRevealDemo } from '@/components/onlineMandi/StickyScroll'
import { TracingBeamDemo } from '@/components/tracingBeam'
import { CardHoverEffectDemo } from '@/components/onlineMandi/HowToSelll'
import Footer from '@/components/Footer'
import Services from '@/components/services'
import Faq from '@/components/Faq'
import HomeTitle from '@/components/HomeTitle'

async function page() {


  return (
    <div className='w-full h-full'>
      <CarouselDemo />


      <div className="listedProduct md:px-20">


        <Services />
        <TracingBeamDemo>
          <div className="listedCrops">

            <div className=' mt-10 mb-5'>
              <HomeTitle Title={"Listed Crops"} />
            </div>
            {/* <h2 className="text-3xl font-bold text-center text-gray-800 ">
              Listed Crops
            </h2> */}
            <div className='w-full  py-7'>
              <CarouselSize />
            </div>

            <div className='w-full flex justify-center items-center py-2'>
              <Link href={"/products"} className='w-36 py-1 flex items-center justify-center rounded-md  border-[1px] border-gray-500 gap-2'>
                <h1 className='text-[#002f34] text-base font-semibold'>See more</h1>
                <Image width={16} height={1} alt='reload' src={"/down.png"} />
              </Link>
            </div>
          </div>
          <AppleCardsCarouselDemo />
          <LayoutGridDemo />
          {/* <StickyScrollRevealDemo /> */}
          {/* <CardHoverEffectDemo /> */}
        </TracingBeamDemo>
        <InfiniteMovingCardsDemo />
        <Faq />
      </div>

      <Footer />
      {/* <div className="footerpart">
        
      </div> */}
    </div>

  )
}

export default page