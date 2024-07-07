// "use client"

import CarouselDemo from '@/components/Carousel'
import { Carousel } from '@/components/ui/carousel'
import React from 'react'
import { useSession } from "next-auth/react"
import { auth } from '@/auth'
import { ThreeDCardDemo } from '@/components/addProduct'
import Image from 'next/image'
import { Prisma } from '@prisma/client'

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

        <div >
          <div className=" croplist flex overflow-x-scroll scrollbar-hide  gap-10 px-6">

            {
              product?.map((item, index) => (
                <ThreeDCardDemo key={index} item={item} />
              ))
            }


          </div>

          <button className='flex items-center justify-center gap-2 w-full  text-[#2e054e] text-base '>
            <span>See more</span>
            <Image width={10} height={10} alt={"reload"} src={"/down.png"} />
          </button>

        </div>

      </div>

    </div>

  )
}

export default page