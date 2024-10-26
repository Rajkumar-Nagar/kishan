import prisma from "@/lib/prisma";
import { Product_details_slider } from "@/components/product_details_slider";
import BasicDetails from "@/components/room/basicDetails";
import HeaderButton from "@/components/room/headerButtons";
import { productOptions } from "@/actions/include.options";
import NoHeader from "@/components/no-header";
import NoFooter from "@/components/no-footer";
import { Slot, User } from "@prisma/client";
import { notFound } from "next/navigation";
import BidInfo from "./BidInfo";
import BidSocketAction from "./BidSocketAction";
import { auth } from "@/auth";


const SLOTS = {
    'slot-1': Slot.First,
    'slot-2': Slot.Second,
    'slot-3': Slot.Third
}

export default async function Page({
    params
}: {
    params: {
        slot: keyof typeof SLOTS
    }
}) {
    const st = params.slot

    if (!(st in SLOTS)) notFound();
    let slot = SLOTS[st];

    const session = await auth();

    const slotOption = await prisma.slotOption.findFirst({
        where: { Type: slot }
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

    return (

        <div className="maincontainer h-dvh">
            <BidSocketAction product={product as any} room={slot} user={session?.user as User} />
            <NoHeader />
            <NoFooter />
            <div className="mainbox relative h-full flex flex-col">
                <div className="header sticky bg-[#6cbdaf] h-16 top-0 w-full flex items-center justify-between px-10">
                    <div className="left">
                        <h1 className="text-white text-3xl font-semibold">Kota,Rajashtan mandi</h1>
                    </div>
                    <HeaderButton product={product} />
                </div>

                <div className="afterHeader flex-1 flex h-full overflow-hidden">
                    <div className="flex-1 flex px-10 justify-center gap-5 py-4">
                        <div className="product_slider max-w-md h-full flex flex-col overflow-y-auto">
                            <Product_details_slider product={product} height={20} />
                            <div className="otherDetails">
                                <BasicDetails product={product} />
                            </div>
                        </div>
                        <div className="flex-1">
                            <BidInfo product={product} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}