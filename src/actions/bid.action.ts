"use server"
import { auth } from "@/auth"
import prisma from "@/lib/prisma"


export const MakeBid = async ({ price, cropId, createdAt }: { price: number, cropId: string, createdAt: string }) => {
    const session = await auth()

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

    const bidDetails = await prisma.bidDetails.update({
        where: {
            cropId
        },
        data: {
            highestBid,
            winning_bidderId
        }
    })

    if (bidDetails) {
        return { bidDetails }
    }
}
