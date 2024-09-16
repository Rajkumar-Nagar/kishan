import CarouselDemo from '@/components/Carousel'
import React from 'react'
import Image from 'next/image'
import { CarouselSize } from '@/components/product_slider'
import Link from 'next/link'
import { AppleCardsCarouselDemo } from '@/components/appleImageSlider'
import { InfiniteMovingCardsDemo } from '@/components/onlineMandi/review'
import { LayoutGridDemo } from '@/components/quotus'
import Footer from '@/components/Footer'
import Services from '@/components/services'
import Faq from '@/components/Faq'
import HomeTitle from '@/components/HomeTitle'
import { TracingBeam } from '@/components/ui/tracing-beam'
import { ChevronDown } from 'lucide-react'

async function page() {
  return (
    <div className='w-full h-full'>
      <CarouselDemo />

      <div className="listedProduct space-">

        <Services />

        <TracingBeam>

          <div className="listedCrops container py-6 px-0">

            <div className='mb-5 text-center mt-5'>
              <HomeTitle Title={"Listed Crops"} />
            </div>

            <div className='w-full py-7 container'>
              <CarouselSize />
            </div>

            <div className='w-full flex justify-center items-center py-2'>
              <Link href={"/products"} className='w-36 py-1 flex items-center justify-center rounded-md  border-[1px] border-gray-500 gap-2'>
                <h1 className='text-[#002f34] text-base font-semibold'>See more</h1>
                <ChevronDown size={20} />
              </Link>
            </div>
          </div>

          <AppleCardsCarouselDemo />
          <LayoutGridDemo />
          {/* <StickyScrollRevealDemo /> */}
          {/* <CardHoverEffectDemo /> */}
        </TracingBeam>

        <InfiniteMovingCardsDemo />
        <Faq />
      </div>

    </div>

  )
}

export default page