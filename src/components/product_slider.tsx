import * as React from "react"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { ThreeDCardDemo } from "./addProduct"

export async function CarouselSize() {

    return (
        <Carousel
            opts={{
                align: "start",
            }}
            className="w-full "
        >
            <CarouselContent>
                {Array.from({ length: 10 }).map((_, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                        <ThreeDCardDemo />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}
