"use server"
import { auth } from "@/auth"
import { error } from "console"


export const MakeBid = async ({ price, cropId }: { price: number, cropId: string }) => {
    const session = await auth()
    console.log(price)
    if (!session?.user) {
        return {
            error: "unauthorized"
        }
    }
    const bidDetails = await prisma?.bidDetails.findFirst({
        where: {
            cropId
        }
    })

    if (!bidDetails) {
        return {
            error: "envalid Bid"
        }
    }

    if (!bidDetails.lowestBid) {
        const bidDetails = await prisma?.bidDetails.update({
            where: {
                cropId
            },
            data: {
                lowestBid:price
            }
        })

    }

    const Bid = await prisma?.bids.create({
        data: {
            bidderId: session.user.id!,
            price,
            bidDetailsId: bidDetails.id
        }
    })

    return { Bid }
}


export const WinningBid = async ({ cropId, highestBid,winning_bidderId }:{
    cropId:string;
    highestBid:number;
    winning_bidderId:string
}) => {
    const session = await auth()
    if (!session?.user) {
        return {
            error: "unauthorized"
        }
    }

    const bidDetails = await prisma?.bidDetails.update({
        where: {
            cropId
        },
        data: {
            highestBid,
            winning_bidderId
        }
    })

    if(bidDetails){
        return {bidDetails}
    }
}
