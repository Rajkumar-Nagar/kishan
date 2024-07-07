import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"

export function Product_details_slider() {
    return (
        <Carousel className="w-[70%] h-96 bg-slate-400 relative">
            <CarouselContent>
                {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index}>
                        <div className=" h-96 w-full relative">
                            <Image
                                className="w-full h-full"
                                src="/Ai.jpg"
                                alt="reload"
                                // width={600}
                                // height={600}
                                fill={true}
                                objectFit="contain"
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
