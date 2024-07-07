// "use client"

import CarouselDemo from '@/components/Carousel'
import { Carousel } from '@/components/ui/carousel'
import React from 'react'
import { useSession } from "next-auth/react"
import { auth } from '@/auth'
import { ThreeDCardDemo } from '@/components/addProduct'
import Image from 'next/image'
import { Prisma } from '@prisma/client'
import { CarouselSize } from '@/components/product_slider'
import Link from 'next/link'

async function page() {

  const product = await prisma?.product.findMany()

  return (
    <div className='w-full h-full'>
      <CarouselDemo />

      <div className="listedProduct">

        <div className=' mx-20 relative border-b-2 flex justify-center  border-[#2e054e] '>
          <div className=' absolute -bottom-9 bg-white p-4 text-3xl text-[#2e054e] font-semibold text-center'>
            Recentaly listed Crops
          </div>
        </div>

        <div className='w-full px-20'>
          <CarouselSize />
        </div>

        <div className='w-full flex justify-center items-center '>
          <Link href={"/"} className='w-36 py-1 flex items-center justify-center rounded-md  border-[1px] border-gray-500 gap-2'>
            <h1 className='text-[#002f34] text-base font-semibold'>See more</h1>
            <Image width={16} height={1} alt='reload' src={"/down.png"} />
          </Link>
        </div>

      </div>

    </div>

  )
}

export default page