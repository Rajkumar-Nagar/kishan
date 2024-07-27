import * as React from "react"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { ThreeDCardDemo } from "./addProduct"
import prisma from "@/lib/prisma"

export async function CarouselSize() {

    const product = await prisma?.product.findMany()

    return (
        <Carousel
            opts={{
                align: "start",
            }}
            className="w-full "
        >
            <CarouselContent className="space-x-4">
                {product?.map((item,index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                        <ThreeDCardDemo item={item}/>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}
