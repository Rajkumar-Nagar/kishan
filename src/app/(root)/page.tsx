// "use client"

import CarouselDemo from '@/components/Carousel'
import { Carousel } from '@/components/ui/carousel'
import React from 'react'
import { useSession } from "next-auth/react"
import { auth } from '@/auth'
async function page() {


const user=await auth();
console.log(user)

  return (
    <div className='w-full h-full !overflow-x-hidden'>
      <CarouselDemo />

      <div className='w-full h-96 bg-pink-600'>

      </div>
    </div>

  )
}

export default page