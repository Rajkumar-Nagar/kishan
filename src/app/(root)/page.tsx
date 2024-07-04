// "use client"

import CarouselDemo from '@/components/Carousel'
import { Carousel } from '@/components/ui/carousel'
import React from 'react'
import { useSession } from "next-auth/react"
import { auth } from '@/auth'
async function page() {


  const user = await auth();
  console.log(user)

  return (
    <div className='w-full h-full'>
      <CarouselDemo />

      <div className='bg-pink-600'>
        {new Array(10).fill(0).map((_, i) => (
          <div key={i} className='p-4'>
            <h1>hello world</h1>
          </div>
        ))}
      </div>
    </div>

  )
}

export default page