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
import Autoplay from "embla-carousel-autoplay"
import Link from "next/link"
import { Button } from "./ui/button"



const servicesData = [
  {
    title: "About Kisan",
    description: "Kisan is your dedicated farming partner, providing a range of tools and services to empower farmers and enhance agricultural productivity.",
    imgurl: "/down.jpg",
    url: "/"
  },
  {
    title: "Online Mandi",
    description: "Experience the convenience of buying and selling crops online through Kisan's integrated mandi platform. Farmers can list their produce for sale, and licensed buyers can place bids, ensuring fair and efficient transactions.",
    href: "/",
    imgurl: "/Mandi.jpg"
  },
  {
    title: "Crop Rate Dashboard",
    description: "Stay informed with Kisan's comprehensive crop rate dashboard. Access real-time market data, including price trends and fluctuations across various mandis. Make informed decisions based on insightful graphs and analytics.",
    href: "/",
    imgurl: "/ChartAi.jpg"

  },
  {
    title: "AI Bot Assistance",
    description: "Get instant solutions to your farming queries with Kisan's AI-powered bot. Ask questions related to crop management, pest control, or irrigation strategies. Upload images of diseased crops for accurate diagnosis and recommended treatments.",
    href: "/",
    imgurl: "/Ai.jpg"
  },
  {
    title: "Transport Booking",
    description: "Effortlessly book transportation for your crops with Kisan's reliable truck and pickup booking service. Whether you need individual transport or prefer to collaborate with partners, Kisan ensures timely and secure delivery to mandis.",
    href: "/",
    imgurl: "/TransporntAi.jpg"
  },
  {
    title: "Labour Booking",
    description: "Streamline your farming operations by hiring skilled labour through Kisan's easy booking system. Choose from a pool of verified workers for tasks such as planting, harvesting, and irrigation, ensuring efficiency and productivity.",
    href: "/",
    imgurl: "/LaborAi.jpg"
  },
  {
    title: "Farmer Community",
    description: "Connect and collaborate with fellow farmers through Kisan's vibrant community platform. Share knowledge, exchange ideas, and seek advice on agricultural practices, fostering a supportive environment for continuous learning and growth.",
    href: "/",
    imgurl: "/GroupAi.jpg"
  },
  {
    title: "Land Transactions",
    description: "Explore opportunities to buy or rent agricultural land through Kisan's transparent and secure platform. Participate in auctions for permanent land purchases or annual lease options, facilitated with fair bidding processes.",
    href: "/",
    imgurl: "/LandAi.jpg"

  },
];



export default function CarouselDemo() {

  return (
    <Carousel className="w-full relative h-full z-10"
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}>
      <CarouselContent>
        {servicesData.map((item, index) => (
          <CarouselItem key={index}>
            <div className="h-body w-full ">
              <div
                className="relative h-full w-full object-cover"
                style={{
                  backgroundImage: `url(${item.imgurl})`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                }}
              >
                <div
                  className="absolute inset-0 bg-gray-800  bg-opacity-50 blur-md"
                  style={{ zIndex: 1 }}
                />
                <div
                  className="absolute inset-0 flex pt-40 sm:pt-20 sm:items-center items-start justify-center px-5 sm:px-10"
                  style={{ zIndex: 1 }}
                >
                  <div className="w-full max-w-md md:max-w-screen-sm text-white space-y-4 px-6 py-6 backdrop-blur-sm shadow-2xl bg-black/30 rounded-lg">
                    <h1 className="text-3xl sm:text-5xl font-bold text-balance">{item.title}</h1>
                    <p className="text-base text-balance">{item.description}</p>

                    <Button variant={"outline"} className="text-black">
                      <Link href={`${item.href}`}>Explore More</Link>
                    </Button>
                  </div>
                </div>
              </div>

            </div>

          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-2 md:left-5" />
      <CarouselNext className="absolute right-2 md:right-5" />
    </Carousel >
  )
}
