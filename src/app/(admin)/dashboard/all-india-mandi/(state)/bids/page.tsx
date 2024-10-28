import { DataTable } from '@/components/ui/data-table'
import React from 'react'
import { ColumnDef } from '@tanstack/react-table'
import prisma from '@/lib/prisma'
import { Slot } from '@prisma/client'

// crop name, price, quantity, status, start date, end date, Highest bid, lowest bid 

type IBid = {
    id: string
    crop: string
    price: number
    quantity: number | string
    status: string
    startDate: string
    endDate: string
    highestBid: number
    lowestBid: number
    slot: Slot
}

const columns: ColumnDef<IBid>[] = [
    {
        accessorKey: "crop",
        header: "Crop",
    },
    {
        accessorKey: "price",
        header: "Price",
    },
    {
        accessorKey: "quantity",
        header: "Quantity",
    },
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        accessorKey: "slot",
        header: "Slot",
    },
    {
        accessorKey: "startDate",
        header: "Start Date",
    },
    {
        accessorKey: "highestBid",
        header: "Highest Bid",
    }
]

const data: IBid[] = [
    {
        id: "1",
        crop: "Rice",
        price: 1000,
        quantity: 100,
        status: "pending",
        startDate: "2021-09-01",
        endDate: "2021-09-30",
        highestBid: 1100,
        lowestBid: 900,
        slot: Slot.First
    },
    {
        id: "2",
        crop: "Wheat",
        price: 1500,
        quantity: 200,
        status: "processing",
        startDate: "2021-09-01",
        endDate: "2021-09-30",
        highestBid: 1600,
        lowestBid: 1400,
        slot: Slot.Second
    },
    {
        id: "3",
        crop: "Barley",
        price: 1200,
        quantity: 150,
        status: "success",
        startDate: "2021-09-01",
        endDate: "2021-09-30",
        highestBid: 1300,
        lowestBid: 1100,
        slot: Slot.Third
    },
]

const page = async () => {

    const bidDetails = await prisma.bidDetails.findMany({
        include: {
            crop: {
                include: {
                    productInfo: true,
                }
            }
        }
    })

    const transformedData = bidDetails.map(bid => {
        return {
            id: bid.id,
            crop: bid.crop.productInfo.cropName,
            price: +bid.crop.productInfo.expectedPrice,
            quantity: bid.crop.productInfo.quantityAvailable + ' ' + bid.crop.productInfo.units,
            status: "pending",
            startDate: (bid.startedAt ?? new Date()).toDateString(),
            endDate: (bid.endedAt ?? "-").toString(),
            highestBid: bid.highestBid ?? 0,
            lowestBid: bid.lowestBid ?? 0,
            slot: bid.biddingSlot
        }
    })

    return (
        <div className="flex-1 space-y-2 text-white">
            <DataTable columns={columns} data={transformedData} route='./bids' />
        </div>
    )
}

export default page
