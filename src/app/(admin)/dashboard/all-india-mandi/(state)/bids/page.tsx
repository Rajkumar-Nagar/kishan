import { DataTable } from '@/components/ui/data-table'
import React from 'react'
import { ColumnDef } from '@tanstack/react-table'

// crop name, price, quantity, status, start date, end date, Highest bid, lowest bid 

type IBid = {
    crop: string
    price: number
    quantity: number
    status: string
    startDate: string
    endDate: string
    highestBid: number
    lowestBid: number
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
        accessorKey: "startDate",
        header: "Start Date",
    },
    {
        accessorKey: "endDate",
        header: "End Date",
    },
    {
        accessorKey: "highestBid",
        header: "Highest Bid",
    },
    {
        accessorKey: "lowestBid",
        header: "Lowest Bid",
    },
]

const data: IBid[] = [
    {
        crop: "Rice",
        price: 1000,
        quantity: 100,
        status: "pending",
        startDate: "2021-09-01",
        endDate: "2021-09-30",
        highestBid: 1100,
        lowestBid: 900
    },
    {
        crop: "Wheat",
        price: 1500,
        quantity: 200,
        status: "processing",
        startDate: "2021-09-01",
        endDate: "2021-09-30",
        highestBid: 1600,
        lowestBid: 1400
    },
    {
        crop: "Barley",
        price: 1200,
        quantity: 150,
        status: "success",
        startDate: "2021-09-01",
        endDate: "2021-09-30",
        highestBid: 1300,
        lowestBid: 1100
    },
]

const page = async () => {


    return (
        <div className="flex-1 space-y-2 text-white">
            <DataTable columns={columns} data={data} />
        </div>
    )
}

export default page
