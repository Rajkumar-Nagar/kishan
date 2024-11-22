"use server"
import { auth } from "@/auth"
import prisma from "@/lib/prisma"
import { add } from "date-fns";
import { revalidatePath } from "next/cache";


export const MakeBid = async ({ price, cropId, createdAt }: { price: number, cropId: string, createdAt: string }) => {
    const session = await auth();
    if (!session?.user) {
        return {
            error: "unauthorized"
        }
    }
    const bidDetails = await prisma.bidDetails.findFirst({
        where: {
            cropId
        }
    })

    if (!bidDetails) {
        return {
            error: "Invalid Bid"
        }
    }

    if (!bidDetails.lowestBid) {
        const bidDetails = await prisma.bidDetails.update({
            where: {
                cropId
            },
            data: {
                lowestBid: price
            }
        })
    }

    const Bid = await prisma.bids.create({
        data: {
            bidderId: session.user.id!,
            price,
            bidDetailsId: bidDetails.id,
            createdAt
        }
    })

    return { Bid }
}


export const WinningBid = async ({ cropId, highestBid, winning_bidderId }: {
    cropId: string;
    highestBid: number;
    winning_bidderId: string
}) => {
    const session = await auth()
    if (!session?.user) {
        return {
            error: "unauthorized"
        }
    }

    const product = await prisma.product.findFirst({
        where: {
            id: cropId
        },
        include: {
            productInfo: true
        }
    });

    if (!product) {
        return {
            error: "product not found"
        }
    }

    if (product?.productInfo?.isSold) {
        return {
            error: "product already sold"
        }
    }

    const endedAt = new Date().toISOString();

    const bidDetails = await prisma.bidDetails.update({
        where: {
            cropId
        },
        data: {
            highestBid,
            winning_bidderId,
            endedAt
        }
    });

    await prisma.product.update({
        where: {
            id: cropId
        },
        data: {
            productInfo: {
                update: {
                    isSold: true
                }
            }
        }
    })
    const slotOption = await prisma.slotOption.findFirst({
        where: {
            currCropId: cropId
        }
    });

    if (!slotOption) return {
        error: "Invalid slot"
    }

    if (slotOption?.pendingCrops.length === 0) {
        const st = await prisma.slotOption.update({
            where: {
                id: slotOption?.id!
            },
            data: {
                startTime: null
            }
        })
        return { bidDetails, slotOption: st }
    }
    console.log({ object: slotOption?.pendingCrops[0] })

    const nextCropId = slotOption.pendingCrops[0];

    const nextBid = await prisma.bidDetails.update({
        where: {
            cropId: nextCropId
        },
        data: {
            startedAt: add(new Date(endedAt), { seconds: 30 }).toISOString()
        }
    })

    const slot = await prisma.slotOption.update({
        where: {
            id: slotOption?.id!
        },
        data: {
            currCropId: nextCropId,
            pendingCrops: {
                set: slotOption.pendingCrops.slice(1)
            },
            startTime: add(new Date(endedAt), { seconds: 30 }).toISOString()
        }
    })

    console.log(nextBid, slot)

    return { bidDetails, nextBid, slotOption: slot }
}
