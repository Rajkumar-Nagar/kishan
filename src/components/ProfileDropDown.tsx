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
import { Button } from "./ui/button"


const account = [
    {
        title: "Add New Crop",
        url: "/product/add-product",
        image: "/plus.png"
    },
    {
        title: "Saved Crops",
        url: "/",
        image: "/save.png"
    },
    {
        title: "Apply for License",
        url: "/",
        image: "/licence.png"
    },
    {
        title: "Your Listed Products",
        url: "/",
        image: "/report.png"
    },

]

const security = [
    {
        title: "Help",
        url: "/",
        image: "/help.png"
    },
    {
        title: "Setting",
        url: "/",
        image: "/settings.png"
    },
    {
        title: "Terms & Condition",
        url: "/",
        image: "/terms.png"
    },
]


export default function ProfileDemo() {

    
    return (
        <NavigationMenu>
            <NavigationMenuList>

                <NavigationMenuItem>
                    <NavigationMenuTrigger>Profile</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        {/* <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
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
                        </ul> */}

                        <div className="profile">

                            <div className="box w-72 border-black">

                                <div className="box1 w-full border-b-[1px] border-gray-500 py-2 px-1">
                                    <div className="topPart flex gap-2">

                                        <div className="image w-10 h-10 rounded-full bg-pink-400">

                                        </div>

                                        <div className="content space-y-1">
                                            <h1 className="text-xl font-bold text-black">Rajkumar Nagar</h1>
                                            <p className="text-xs font-semibold text-[#5c5050]">I am a weat farmer and garlic also </p>
                                        </div>
                                    </div>

                                    <div className="profilebutton px-2 mt-2">
                                        <Button variant={"Profile"}>
                                            <Link href={"/"}>View Profile</Link>
                                        </Button>
                                    </div>
                                </div>


                                <div className="box2 flex flex-col  py-4 border-b-[1px] border-gray-500">

                                    {
                                        account.map((item, index) => (
                                            <Link key={index} href={item.url} className="px-4 py-2 hover:bg-gray-500 gap-2 hover:text-[#fff] rounded-md flex items-center cursor-pointer">
                                                <Image alt='' src={item.image} width={25} height={25} />
                                                <span className="    text-[#002f34] text-base ">{item.title}</span>
                                            </Link>
                                        ))
                                    }

                                </div>

                                <div className="box2 flex flex-col  py-4 border-b-[1px] border-gray-500">
                                    {
                                        security.map((item, index) => (
                                            <Link key={index} href={item.url} className="px-4 py-2 hover:bg-gray-500 gap-2 hover:text-[#fff] rounded-md flex items-center cursor-pointer">
                                                <Image alt='' src={item.image} width={20} height={20} />
                                                <span className="    text-[#002f34] text-base ">{item.title}</span>
                                            </Link>
                                        ))
                                    }
                                </div>

                                <div className=" text-center flex hover:bg-gray-500 gap-2 cursor-pointer  hover:text-[#fff] items-center justify-center py-1">
                                    <Link href={"/"} className="px-2 py-2  rounded-md flex items-center gap-2 ">
                                        <Image alt='' src={"/logout.png"} width={20} height={20} />
                                        <span className="    text-[#002f34] text-base ">Logout</span>
                                    </Link>
                                </div>




                            </div>

                        </div>
                    </NavigationMenuContent>
                </NavigationMenuItem>

            </NavigationMenuList>
        </NavigationMenu>
    )
}

interface ListItemProps extends React.ComponentPropsWithoutRef<"a"> {
    imageUrl: string
}


const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    ListItemProps
>(({ className, title, children, imageUrl, ...props }, ref) => {
    console.log(imageUrl)
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
