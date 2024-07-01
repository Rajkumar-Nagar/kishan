"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Image from "next/image"



const services: { title: string; href: string;image: string ;description: string }[]  = [
  {
    title: "Online Mandi",
    href: "/service/Mandi",
    image: "/shopingCart.png",
    description: "Sell and buy your crops online. Licensed individuals can place bids for buying crops.",
  },
  {
    title: "Crop Rate Dashboard",
    href: "/service/Croprate",
    image: "/chart.png",
    description: "View and analyze crop rates with graphs. Check today's rates for different mandis.",
  },
  {
    title: "AI Bot Assistance",
    href: "/service/Aihelper",
    image: "/ai.png",
    description: "Ask any question and get solutions. Upload images to diagnose and find solutions for crop diseases.",
  },
  {
    title: "Transport Booking",
    href: "/service/Transport",
    image: "/truck.png",
    description: "Book trucks or pickups for transportation to mandis. Options to book individually or with partners.",
  },
  {
    title: "Labor Booking",
    href: "/service/Labor",
    image: "/workers.png",
    description: "Hire labor for farming work.",
  },
  {
    title: "Farmer Community",
    href: "/service/Community",
    image: "/shopingCart.png",
    description: "Ask questions and communicate with other farmers.",
  },
  {
    title: "Land Transactions",
    href: "/service/Land",
    image: "/location.png",
    description: "Buy farming land on a permanent basis. Annual rental options with bidding available.",
  },
];



export default function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>

      <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>


        <NavigationMenuItem>
          <NavigationMenuTrigger>Services</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {services.map((component) => (
                <ListItem
                key={component.title}
                title={component.title}
                href={component.href}
                imageUrl={component.image} 
              >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/ContactUs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Contact 
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>


        <NavigationMenuItem>
          <Link href="/About" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              About 
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
       
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children,imageUrl, ...props }, ref) => {
 console.log(imageUrl)
  return (
    <li className="flex items-center transition-colors rounded-md cursor-pointer hover:bg-accent hover:text-accent-foreground">

      <Image src={imageUrl} width={50} height={50} className="px-2" alt={"reload"}/>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none   focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
