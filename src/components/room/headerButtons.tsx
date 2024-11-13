"use client"
import Image from 'next/image'
import React, { useMemo, useState } from 'react'
import Modal from './modal'
import { useAppSelector } from '@/lib/redux'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, MenuIcon } from 'lucide-react'


export enum MandiHeaderOptions {
    bidSummary = "bid-summary",
    chat = "chat",
    biddersList = "bidders-list",
    viewersList = "viewers-list"
}


function HeaderButton() {

    const [buttonAcitve, setbuttonAcitve] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const { bidders } = useAppSelector(state => state.bidRoom);

    const handelModal = (type: string) => {
        setTimeout(() => {
            setbuttonAcitve(type)
            setIsOpen(true)
        }, 0)
    }

    const navItems = useMemo(() => ([
        { name: "Bid Summary", icon: "/summary.png", type: MandiHeaderOptions.bidSummary },
        { name: "Chat", icon: "/chat1.png", type: MandiHeaderOptions.chat, count: 0 },
        { name: "Bidders", icon: "/customber.png", type: MandiHeaderOptions.biddersList, count: bidders.length },
        { name: "Viewers", icon: "/view1.png", type: MandiHeaderOptions.viewersList, count: 0 }
    ]), [bidders]);


    return (
        <>
            <Modal buttonAcitve={buttonAcitve} isOpen={isOpen} setIsOpen={setIsOpen} />

            <div className="block md:hidden">
                <DropdownMenu>
                    <DropdownMenuTrigger className='focus-visible:outline-none focus-visible:border-none'>
                        <MenuIcon color='white' size={24} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='bg-transparent backdrop-blur-lg mt-4 mr-1'>
                        {
                            navItems.map((item, index) => (
                                <DropdownMenuItem className='hover:!bg-white/30' key={index} onClick={() => handelModal(item.type)}>
                                    <Image
                                        width={100}
                                        height={100}
                                        alt='reload'
                                        className="h-6 w-6"
                                        src={item.icon}
                                    />
                                    <DropdownMenuLabel className='text-white'>{item.name}</DropdownMenuLabel>
                                    {
                                        !!item.count && <h1 className="text-white bg-white/30 text-xs w-5 h-5 flex items-center justify-center rounded-full">{item.count}</h1>
                                    }
                                </DropdownMenuItem>
                            ))
                        }

                        <DropdownMenuSeparator />
                        <DropdownMenuItem className='hover:!bg-white/30 text-red-600'>
                            <LogOut size={22} />
                            <DropdownMenuLabel>Leave</DropdownMenuLabel>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="otherbuttons md:flex hidden items-center gap-4">
                <div className="flex items-center gap-4">
                    {
                        navItems.map((item, index) => (
                            <button key={index} onClick={() => handelModal(item.type)} className="relative flex justify-center group hover:bg-[#63a096] hover:rounded-full p-3 active:hover:bg-[#3d9485]">
                                <h1 className="text-white group-hover:block hidden bg-gray-500 text-sm w-32 py-1 rounded-full absolute -bottom-9">{item.name}</h1>
                                {
                                    !!item.count && <h1 className="text-white bg-gray-400 text-xs w-5 h-5 flex items-center justify-center rounded-full absolute -top-2 -right-0">{item.count}</h1>
                                }
                                <Image
                                    width={100}
                                    height={100}
                                    alt='reload'
                                    className="h-6 w-6"
                                    src={item.icon}
                                />
                            </button>
                        ))
                    }
                </div>

                <div className="right">
                    <button className="px-4 py-2 rounded-lg text-white text-base bg-[#357e85] font-semibold">Leave</button>
                </div>
            </div>
        </>
    )
}

export default HeaderButton