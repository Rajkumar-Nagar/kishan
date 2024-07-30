
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
}

export function Product_details_slider({ product }: Product_details_sliderProps) {

    const media = product?.media?.photos ?? []

    return (
        <Carousel className=" w-full h-full relative rounded-md overflow-hidden">
            <CarouselContent>
                {media.map((item, index) => (
                    <CarouselItem key={index}>
                        <div className="w-full h-[550px] relative">
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
