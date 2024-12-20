"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CircleUserRound, Info, Phone } from "lucide-react"
import React from 'react'
import Image from "next/image"
import { Button } from "./ui/button"
import { CldImage } from "next-cloudinary"
import { account } from "@/data"
import { User } from "@prisma/client"
import Link from "next/link"
import { signOut } from "next-auth/react"
import { SignedIn, SignedOut } from "./auth-component"
import Responsive from "./responsive-component"
import { services } from "@/data/services"

interface ProfileDemoProps {
    user: User | null
}


const ProfileMenu = ({ user }: ProfileDemoProps) => {

    const handleLogout = async () => {
        await signOut({
            redirect: true,
            redirectTo: "/login"
        })
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="outline-none p-2 rounded-full">
                {user?.avatar ?
                    <CldImage
                        alt="Uploaded Image"
                        src={user?.avatar}
                        width={"170"}
                        height={"170"}
                        className='w-10 h-10 rounded-full aspect-square'
                        crop={{
                            type: 'auto',
                            source: true
                        }}
                    /> : <CircleUserRound size={30} />}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="[&_a]:transition-all [&_a]:duration-300 [&_a]:ease-in-out mr-1 mt-2 max-h-body2 overflow-y-auto z-[100]">

                <SignedIn>
                    <div className="box1 w-full py-2 px-1">
                        <div className="topPart flex gap-2 mb-2">

                            {
                                user?.avatar &&
                                <CldImage
                                    alt="Uploaded Image"
                                    src={user?.avatar}
                                    width={"170"}
                                    height={"170"}
                                    className='w-14 h-14 rounded-full'
                                    crop={{
                                        type: 'auto',
                                        source: true
                                    }}
                                />
                            }

                            <div className="content space-y-1">
                                <h1 className="text-xl font-bold text-black">{user?.name}</h1>
                                <p className="text-xs font-semibold text-[#5c5050]">I am a weat farmer and garlic also </p>
                            </div>
                        </div>

                        <Link href={"/profile"}>
                            <DropdownMenuItem className="p-0">
                                <Button variant={"Profile"} >
                                    View Profile
                                </Button>
                            </DropdownMenuItem>
                        </Link>
                    </div>
                </SignedIn>
                <SignedOut>
                    <Link href={"/login"}>
                        <DropdownMenuItem className="p-0">
                            <Button variant={"Login"} >
                                Login
                            </Button>
                        </DropdownMenuItem>
                    </Link>
                </SignedOut>
                < DropdownMenuSeparator className="bg-gray-200" />

                <Responsive.Show below={640}>
                    <DropdownMenuGroup>

                        <Link href={"/"} className="w-full p-1 text-[#002f34] hover:bg-[#7e9dca] hover:[&>*]:text-white flex items-center rounded-md cursor-pointer">
                            <DropdownMenuItem className="w-full !bg-transparent cursor-pointer group">
                                <Image alt='' src={"/home.png"} width={20} height={20} />
                                <span className="text-base group-hover:text-white">Home</span>
                            </DropdownMenuItem>
                        </Link>

                        <Link href="/contact-us">
                            <DropdownMenuItem className="px-2 py-2 rounded-md">
                                <Phone size={20} />
                                <span className="text-base">Contact Us</span>
                            </DropdownMenuItem>
                        </Link>
                        <Link href="/about">
                            <DropdownMenuItem className="px-2 py-2 rounded-md">
                                <Info size={20} />
                                <span className="text-base">About</span>
                            </DropdownMenuItem>
                        </Link>

                        <DropdownMenuSeparator className="bg-gray-200" />
                        <DropdownMenuLabel>
                            Services
                        </DropdownMenuLabel>
                        {services.map((item, index) => (
                            <Link href={item.href} key={index} className="w-full p-1 text-[#002f34] hover:bg-[#7e9dca] hover:[&>*]:text-white flex items-center rounded-md cursor-pointer">
                                <DropdownMenuItem className="w-full !bg-transparent cursor-pointer group" key={index} >
                                    <Image alt='' src={item.image} width={25} height={25} />
                                    <span className="text-base group-hover:text-white">{item.title}</span>
                                </DropdownMenuItem>
                            </Link>
                        ))}
                        <DropdownMenuSeparator className="bg-gray-200" />

                    </DropdownMenuGroup>

                </Responsive.Show>


                {
                    account.slice(1, 4).map((item, index) => (
                        <Link href={item.url} key={index} className="w-full p-1 text-[#002f34] hover:bg-[#7e9dca] hover:[&>*]:text-white flex items-center rounded-md cursor-pointer">
                            <DropdownMenuItem className="w-full !bg-transparent cursor-pointer group" key={index} >
                                <Image alt='' src={item.image} width={25} height={25} />
                                <span className="text-base group-hover:text-white">{item.title}</span>
                            </DropdownMenuItem>
                        </Link>
                    ))
                }

                <DropdownMenuSeparator className="bg-gray-200" />

                {
                    account.slice(5, 7).map((item, index) => (
                        <Link href={item.url} key={index} className="w-full p-1 text-[#002f34] hover:bg-[#7e9dca] hover:[&>*]:text-white flex items-center rounded-md cursor-pointer">
                            <DropdownMenuItem className="w-full !bg-transparent cursor-pointer group" key={index} >
                                <Image alt='' src={item.image} width={25} height={25} />
                                <span className="text-base group-hover:text-white">{item.title}</span>
                            </DropdownMenuItem>
                        </Link>
                    ))
                }





                <SignedIn>
                    <DropdownMenuSeparator className="bg-gray-200" />
                    <DropdownMenuItem onClick={handleLogout} className="px-4 cursor-pointer py-2 rounded-md flex items-center gap-2 ">
                        <Image alt='' src={"/logout.png"} width={20} height={20} />
                        <span className="text-base">Logout</span>
                    </DropdownMenuItem>
                </SignedIn>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}

export default ProfileMenu
