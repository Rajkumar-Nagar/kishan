"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Link from "next/link";
import { Button } from "./ui/button";
import { CldImage } from "next-cloudinary";
import { useAppDispatch, useAppSelector } from "@/lib/redux";
import { productActions } from "@/lib/redux/features";


export function ThreeDCardDemo({ item }) {

    const dispatch = useAppDispatch();
    const savedItem = useAppSelector((state) => state.product);


    const handleSavedItem = () => {
        dispatch(productActions.addSavedItem(item))
    }

    const ischecked = savedItem.saved_item.findIndex((items) => items.id === item.id);

    console.log("this is status", item?.id)

    console.log("Saved item is this : ", savedItem.saved_item)

    const [product, setproduct] = useState(null)
    const [loading, setloading] = useState(true)

    const fetchdata = async () => {
        try {
            setloading(true)
            const response = await fetch("http://localhost:3000/api/fetchProduct", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    item
                )
            })
            if (!response.ok) {
                throw new Error("product Fethcing unsuccesfully")
            }
            const data = await response.json();
            setproduct(data);
        } catch (error) {
            console.log(error)
        } finally {
            setloading(false)
        }
    }

    useEffect(() => {
        fetchdata()
    }, [])




    return (
        <CardContainer className="inter-var relative min-w-80 ">
            {
                loading &&
                <CardItem translateZ="100" className="w-full absolute h-full flex items-center justify-center bg-gray-300 z-30 bg-opacity-85 rounded-md">
                    <h1 className="text-black text-xl font-semibold">Loading...</h1>
                </CardItem>
            }


            <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">

                <CardItem translateZ="100" className="w-full" as="button">

                    <CldImage
                        alt="Uploaded Image"
                        src={product?.Media.photos[0]}
                        width={"1000"}
                        height={"1000"}
                        className="h-48 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                        crop={{
                            type: 'auto',
                            source: true
                        }}
                    />
                    {/* <Image
                        src="/LaborAi.jpg"
                        height="1000"
                        width="1000"
                        className="h-48 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                        alt="thumbnail"
                    /> */}
                </CardItem>


                <div className="space-y-3">

                    <div className="flex justify-between items-center mt-2">
                        <CardItem
                            translateZ="50"
                            className="text-base font-bold text-[#2e054e] dark:text-white"
                        >
                            {`${product?.ProductInfo.cropName}  /  ${product?.ProductInfo.quantityAvailable}(kg)`}
                        </CardItem>

                        <CardItem
                            translateZ="50"
                        >
                            <button onClick={handleSavedItem}>
                                <Image
                                    src={ischecked === -1 ? "/heart.png" : "/heart1.png"}
                                    height="25"
                                    width="25"
                                    className=""
                                    alt="thumbnail"
                                />
                            </button>
                        </CardItem>
                    </div>


                    <div className="flex items-center gap-2 pb-2">
                        <CardItem
                            translateZ="60"
                            className="text-sm font-semibold text-[#74667f] dark:text-white"
                        >
                            {`₹ ${product?.ProductInfo.expectedPrice} (${product?.ProductInfo.units}),`}
                        </CardItem>

                        <CardItem
                            translateZ="60"
                            className="text-sm font-semibold text-[#74667f] dark:text-white"
                        >
                            {product?.ProductInfo.variety}
                        </CardItem>

                        <CardItem
                            translateZ="60"
                            className="text-sm font-semibold text-[#74667f] dark:text-white"
                        >
                            {product?.ProductInfo.purity === 'No Grading is not complete' ? ", Graded(Yes)" : ", Graded(No)"}
                        </CardItem>
                    </div>

                    <CardItem
                        translateZ="60"
                        className="w-full"
                        as={Link}
                        href={`http://localhost:3000/products/${product?.id}`}
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
                        <span className="text-xs w-full font-semibold  text-[#74667f] dark:text-white">{
                            ` ${product?.LocationInfo.village}, ${product?.LocationInfo.districtCity},${product?.LocationInfo.state},${product?.LocationInfo.pincode}`
                        }</span>

                    </CardItem>

                </div>
            </CardBody>
        </CardContainer>
    );
}
