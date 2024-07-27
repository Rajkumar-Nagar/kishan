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
            className="w-full "
        >
            <CarouselContent className="space-x-4">
                {products.map((item, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                        <ProductCard product={item} />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}
