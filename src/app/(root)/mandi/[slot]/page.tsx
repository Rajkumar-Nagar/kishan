import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { Product_details_slider } from "@/components/product_details_slider";
import Image from "next/image";
import { CldImage } from "next-cloudinary";
import BasicDetails from "@/components/room/basicDetails";
import BidderButtons from "@/components/room/bidderButton";
import HeaderButton from "@/components/room/headerButtons";
import { productOptions } from "@/actions/include.options";
import NoHeader from "@/components/no-header";
import NoFooter from "@/components/no-footer";
import { Slot } from "@prisma/client";
import { notFound } from "next/navigation";
import BidInfo from "./BidInfo";
import BidSocketAction from "./BidSocketAction";


export default async function Page({
    searchParams,
    params
}: {
    searchParams: {
        name: string;
        room: string;
        userId: string;
    },
    params: {
        slot: string
    }
}) {
    const name = searchParams?.name || "quickstart-user";
    const room = searchParams?.room || "quickstart-room";
    const st = params.slot

    let slot;

    slot = st == "slot-1" ? Slot.First : st == "slot-2" ? Slot.Second : st == "slot-3" ? Slot.Third : null

    if (!slot) notFound()

    const session = await auth();
    const userId = session?.user?.id || searchParams?.userId || Math.random().toString(36).substring(7);

    const slotOption = await prisma.slotOption.findFirst({
        where: {
            Type: slot as Slot
        }
    })

    if (!slotOption) notFound()

    const product = await prisma.product.findUnique({
        where: {
            id: slotOption?.currCropId
        },
        include: {
            ...productOptions,
            biddingDetails: {
                include: {
                    bids: true,
                }
            },

        }
    })

    if (!product) return <p>No product found</p>
    // console.log(JSON.stringify(product,null,2))
    return (

        <div className="maincontainer h-screen">
            <BidSocketAction product={product as any} room={slot} />
            <NoHeader />
            <NoFooter />
            <div className="mainbox relative h-full flex flex-col gap-4">
                <div className="header sticky bg-[#6cbdaf] h-header top-0 w-full flex items-center justify-between px-10">
                    <div className="left">
                        <h1 className="text-white text-3xl font-semibold">Kota,Rajashtan mandi</h1>
                    </div>
                    <HeaderButton product={product!} />
                </div>

                <div className="afterHeader flex-1 overflow-y-auto flex px-10 justify-center gap-5">
                    <div className="product_slider w-[40%] h-full flex flex-col overflow-y-auto">
                        <Product_details_slider product={product!} height={20} />
                        <div className="otherDetails">
                            <BasicDetails product={product!} />
                        </div>
                    </div>
                    <BidInfo product={product!} />
                </div>
            </div>
        </div>
    );
}