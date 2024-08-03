import CarouselDemo from '@/components/Carousel'
import React from 'react'
import Image from 'next/image'
import { CarouselSize } from '@/components/product_slider'
import Link from 'next/link'
import Title from '@/components/ui/title'
import { GlobeDemo } from '@/components/glob'

async function page() {


  return (
    <div className='w-full h-full'>
      <CarouselDemo />

     
      <div className="listedProduct">

        <Title content={"Listed Crops"} />

        <div className='w-full px-20 py-7'>
          <CarouselSize />
        </div>

        <div className='w-full flex justify-center items-center '>
          <Link href={"/products"} className='w-36 py-1 flex items-center justify-center rounded-md  border-[1px] border-gray-500 gap-2'>
            <h1 className='text-[#002f34] text-base font-semibold'>See more</h1>
            <Image width={16} height={1} alt='reload' src={"/down.png"} />
          </Link>
        </div>

      </div>

    </div>

  )
}

export default page