import prisma from "@/lib/prisma";
import { Product_details_slider } from "@/components/product_details_slider";
import BasicDetails from "@/components/room/basicDetails";
import HeaderButton from "@/components/room/headerButtons";
import { productOptions } from "@/actions/include.options";
import { Slot, User } from "@prisma/client";
import { notFound } from "next/navigation";
import BidInfo from "./BidInfo";
import BidSocketAction from "./BidSocketAction";
import { auth } from "@/auth";
import BidderButtons from "@/components/room/bidderButton";
import BidInfoSliderSheet from "./bidInfoSliderSheet";
import BidTimer from "./bid-timer";
import ViewersChat from "@/components/room/viewers-chat";
import WinningScreen from "./winning-screen";


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
    // await prisma.productInfo.updateMany({ data: { isSold: false } })
    // await prisma.bids.deleteMany()
    // await prisma.slotOption.updateMany({ data: { status: "pending", "currCropId": "6694ddb18c662d052e6c2f37", "startTime": "2024-11-16T04:30:00.000Z", "pendingCrops": ["66a1310a1757b75b88f0fddf", "6710e3012d1f632d373f6d69", "6693cf898c662d052e6c2f30", "66e25168d2f6656e26b5d0a0"], "type": "First" } })

    const session = await auth();

    const slotOption = await prisma.slotOption.findFirst({
        where: { type: slot }
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
                    winning_bidder: {
                        select: {
                            id: true,
                            name: true,
                            role: true,
                            avatar: true,
                            backgroundImage: true,
                        }
                    }
                }
            },

        }
    })

    console.log(slotOption)

    if (!product) return <p>No product found</p>

    if (product.productInfo.isSold && slotOption.pendingCrops.length === 0) {
        return (
            <p>There is no crops in this slot</p>
        )
    }

    return (

        <div className="maincontainer h-dvh">
            <BidSocketAction product={{ ...product, hasNext: slotOption.pendingCrops.length > 0 } as any} room={slot} user={session?.user as User} />

            <div className="mainbox relative h-full flex flex-col">

                <div className="header sticky bg-[#6cbdaf] h-16 top-0 w-full flex items-center justify-between px-4 md:px-10">
                    <div className="left">
                        <h1 className="text-white text-3xl font-semibold">Kota,Rajashtan mandi</h1>
                    </div>
                    <HeaderButton />
                </div>

                <div className="afterHeader flex-1 flex h-full overflow-hidden relative">
                    <div className="absolute inset-0 md:hidden block backdrop-blur-sm z-50">
                        <div className="absolute z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                            <BidTimer />
                        </div>
                        <BidInfoSliderSheet />
                        <BidderButtons className="fixed bottom-0 flex md:hidden bg-gray-500/50 left-0 right-0 z-[53]" />
                    </div>


                    <div className={`flex-1 md:flex-row flex-col flex px-4 md:px-6 lg:px-8 xl:px-10 justify-center gap-5 py-4 ${session?.user.role === 'USER' && "!pr-4"}`}>
                        <div className="product_slider lg:max-w-md md:max-w-sm h-full flex w-full flex-col overflow-y-auto">
                            <Product_details_slider product={product} height={20} />
                            <div className="otherDetails">
                                <BasicDetails product={product} />
                            </div>
                        </div>

                        <div className="flex-1 hidden md:block">
                            <BidInfo />
                        </div>


                        {/* {session?.user.role !== 'BIDDER' && (
                            <ViewersChat />
                        )} */}


                        <WinningScreen />

                    </div>
                </div>
            </div>
        </div>
    );
}