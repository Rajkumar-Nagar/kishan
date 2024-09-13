import * as React from "react"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import ProductCard from "@/components/product-card";
import { getProducts } from "@/actions/product.actions";

export async function CarouselSize() {

    const products = await getProducts()

    return (
        <Carousel
            opts={{
                align: "start",
            }}
            className="w-full"
        >
            <CarouselContent className="space-x-4">
                {[...products, ...products].map((item, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4 min-w-60 sm:min-w-80">
                        <ProductCard product={item} />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="2xl:-left-12 xl:-left-8 -left-6" />
            <CarouselNext className="2xl:-right-12 xl:-right-8 -right-6" />
        </Carousel>
    )
}
