"use client";
import React from "react";
import { StickyScroll } from "../ui/sticky-scroll-reveal";
import Image from "next/image";

const content = [
    {
        title: "Add Your Crops",
        description:
            "Click on the Add Crops button in the Online Mandi section.Choose between All India Mandi or a Mini Mandi specific to your state and district.Fill in the necessary details about your crops, including quantity, quality, and preferred pricing",
        content: (
            <div className="h-full w-full  flex items-center justify-center text-white">
                <Image
                    src="/LaborAi.jpg"
                    width={500}
                    height={500}
                    className="h-full w-full object-cover"
                    alt="linear board demo"
                />
            </div>
        ),
    },
    {
        title: "Listing Confirmation",
        description:
            "Once you list your crops today, they will be scheduled for sale tomorrow.You will be informed about the three available slots in the mandi.Your crops will be allocated to one of these slots, and you will receive a notification about the specific slot for your crops.",
        content: (
            <div className="h-full w-full  flex items-center justify-center text-white">
                <Image
                    src="/Ai.jpg"
                    width={500}
                    height={500}
                    className="h-full w-full object-cover"
                    alt="linear board demo"
                />
            </div>
        ),
    },
    {
        title: "Bidding Notification",
        description:
            "Before the bidding starts, you will receive a notification on your phone 10 minutes in advance.This allows you to be prepared and monitor the bidding process for your crops",
        content: (
            <div className="h-full w-full  flex items-center justify-center text-white">
                <Image
                    src="/GrouAi.jpg"
                    width={500}
                    height={500}
                    className="h-full w-full object-cover"
                    alt="linear board demo"
                />
            </div>
        ),
    },
    {
        title: "Bidding Process",
        description:
            "Your crops will go for bidding in your chosen mandi at the assigned slot.Buyers will place their bids, and you can watch the competitive process unfold.",
        content: (
            <div className="h-full w-full  flex items-center justify-center text-white">
                <Image
                    src="/welcome.jpg"
                    width={500}
                    height={500}
                    className="h-full w-full object-cover"
                    alt="linear board demo"
                />
            </div>
        ),
    },
    {
        title: "Successful Sale",
        description:
            "Once your crops are sold, you will receive a confirmation.For the next steps and further details, click on More Details to proceed with the post-sale process.",
        content: (
            <div className="h-full w-full  flex items-center justify-center text-white">
                <Image
                    src="/welcoming.jpg"
                    width={500}
                    height={500}
                    className="h-full w-full object-cover"
                    alt="linear board demo"
                />
            </div>
        ),
    },
];

export function StickyScrollRevealDemo() {
    return (
        <div className="p-10">
            <StickyScroll content={content} />
        </div>
    );
}
