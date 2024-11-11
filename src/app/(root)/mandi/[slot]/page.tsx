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
import BidderButtons from "@/components/room/bidderButton";
import BidInfoSliderSheet from "./bidInfoSliderSheet";


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
                    <div className="flex-1 md:flex-row flex-col flex px-4 md:px-6 lg:px-8 xl:px-10 justify-center gap-5 py-4">
                        <div className="product_slider lg:max-w-md md:max-w-sm h-full flex w-full flex-col overflow-y-auto">
                            <Product_details_slider product={product} height={20} />
                            <div className="otherDetails">
                                <BasicDetails product={product} />
                            </div>
                            <BidInfoSliderSheet/>
                            <BidderButtons className="fixed bottom-0 flex md:hidden bg-gray-500/50 left-0 right-0 " />
                        </div>
                        <div className="flex-1 hidden md:block">
                            <BidInfo />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}