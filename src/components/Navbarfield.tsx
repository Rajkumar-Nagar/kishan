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



export const services: { title: string; href: string; image: string; description: string }[] = [
  {
    title: "Online Mandi",
    href: "/services/mandi",
    image: "/shopingCart.png",
    description: "Sell and buy your crops online. Licensed individuals can place bids for buying crops.",
  },
  {
    title: "Crop Rate Dashboard",
    href: "/services/crop-rates",
    image: "/chart.png",
    description: "View and analyze crop rates with graphs. Check today's rates for different mandis.",
  },
  {
    title: "AI Bot Assistance",
    href: "/services/ai-helper",
    image: "/ai.png",
    description: "Ask any question and get solutions. Upload images to diagnose and find solutions for crop diseases.",
  },
  {
    title: "Transport Booking",
    href: "/services/transport",
    image: "/truck.png",
    description: "Book trucks or pickups for transportation to mandis. Options to book individually or with partners.",
  },
  {
    title: "Labour Booking",
    href: "/services/labour",
    image: "/workers.png",
    description: "Hire labour for farming work.",
  },
  {
    title: "Farmer Community",
    href: "/services/community",
    image: "/shopingCart.png",
    description: "Ask questions and communicate with other farmers.",
  },
  {
    title: "Land Transactions",
    href: "/services/land",
    image: "/location.png",
    description: "Buy farming land on a permanent basis. Annual rental options with bidding available.",
  },
];



export default function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>

        <NavigationMenuItem className="hidden md:block">
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className="px-4 py-2">
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
          <Link href="/contact-us" legacyBehavior passHref>
            <NavigationMenuLink className="px-4 py-2">
              Contact
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>


        <NavigationMenuItem>
          <Link href="/about" legacyBehavior passHref>
            <NavigationMenuLink className="px-4 py-2">
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
  React.ComponentPropsWithoutRef<"a"> & { imageUrl: string; }
>(({ className, title, children, imageUrl, ...props }, ref) => {
  return (
    <li className="flex items-center transition-colors rounded-md cursor-pointer hover:bg-accent hover:text-accent-foreground">

      <Image src={imageUrl} width={50} height={50} className="px-2" alt={"reload"} />
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
