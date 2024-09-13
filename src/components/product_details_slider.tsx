
"use client"
import * as React from "react"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
import { CldImage } from "next-cloudinary"
import { ProductType } from "@/lib/types"

interface Product_details_sliderProps {
    product: ProductType
    height: number
}

export function Product_details_slider({ product, height }: Product_details_sliderProps,) {

    const media = product?.media?.photos ?? []

    return (
        <Carousel className=" w-full h-full relative rounded-md overflow-hidden">
            <CarouselContent>
                {media.map((item, index) => (
                    <CarouselItem key={index}>
                        <div className="w-full relative"
                            style={{
                                height: `${height}rem`
                            }}>
                            <div className="blackgradianrt absolute top-0 rounded-bl-lg right-0 py-3 px-3  flex items-center justify-center"
                                style={{ background: 'linear-gradient(0deg, #00000080, #0000)' }}
                            >

                                <h1 className='text-white text-2xl'>#22800</h1>

                            </div>
                            <CldImage
                                alt="Uploaded Image"
                                src={item}
                                width={"1000"}
                                height={"1000"}
                                className="h-full w-full object-cover rounded-xl group-hover/card:shadow-xl"
                                crop={{
                                    type: 'auto',
                                    source: true
                                }}
                            />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-5" />
            <CarouselNext className="absolute right-5" />
        </Carousel>
    )
}
