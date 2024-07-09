"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Link from "next/link";
import { Button } from "./ui/button";

export function ThreeDCardDemo() {

    return (
        <CardContainer className="inter-var  w-80 ">
            <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">

                <CardItem translateZ="100" className="w-full" as="button">
                    <Image
                        src="/LaborAi.jpg"
                        height="1000"
                        width="1000"
                        className="h-48 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                        alt="thumbnail"
                    />
                </CardItem>


                <div className="space-y-3">

                    <div className="flex justify-between items-center mt-3">
                        <CardItem
                            translateZ="50"
                            className="text-base font-bold text-[#2e054e] dark:text-white"
                        >
                            Wheat(5kg)
                        </CardItem>

                        <CardItem
                            translateZ="50"

                        >
                            <Image
                                src="/heart.png"
                                height="25"
                                width="25"
                                className=""
                                alt="thumbnail"
                            />

                        </CardItem>
                    </div>


                    <div className="flex items-center gap-2 ">
                        <CardItem
                            translateZ="60"
                            className="text-sm font-semibold text-[#74667f] dark:text-white"
                        >
                            ₹ 5000(kg),
                        </CardItem>

                        <CardItem
                            translateZ="60"
                            className="text-sm font-semibold text-[#74667f] dark:text-white"
                        >
                            Basmati,
                        </CardItem>

                        <CardItem
                            translateZ="60"
                            className="text-sm font-semibold text-[#74667f] dark:text-white"
                        >
                            Graded
                        </CardItem>
                    </div>



                    <CardItem
                        translateZ="60"
                        className="w-full"
                        as={Link}
                        href="http://localhost:3000/product/45809421"
                    >
                        <Button variant={"Login"}>
                            Details
                        </Button>
                    </CardItem>



                    <CardItem
                        translateZ="60"
                        className="flex w-full pt-2 mt-2 gap-2 items-center border-t-[2px]"
                    >
                        <Image
                            src="/location1.png"
                            height="15"
                            width="15"
                            alt="thumbnail"
                        />
                        <span className="text-xs w-full font-semibold  text-[#74667f] dark:text-white">katawer,baran,rajsathan,325223</span>

                    </CardItem>

                </div>




                {/* <div className="flex justify-between items-center mt-20">
                    <CardItem
                        translateZ={20}
                        as={Link}
                        href="https://twitter.com/mannupaaji"
                        target="__blank"
                        className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                    >
                        Try now →
                    </CardItem>
                    <CardItem
                        translateZ={20}
                        as="button"
                        className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                    >
                        Sign up
                    </CardItem>
                </div> */}
            </CardBody>
        </CardContainer>
    );
}
