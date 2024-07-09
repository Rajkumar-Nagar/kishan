import * as React from "react"

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
        <Carousel className=" w-full h-full relative rounded-md overflow-hidden">
            <CarouselContent>
                {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index}>
                        <div className="w-full h-[550px] bg-black relative">
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
