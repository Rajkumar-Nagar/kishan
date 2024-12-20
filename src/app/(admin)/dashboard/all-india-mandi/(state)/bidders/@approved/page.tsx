import { DataTable } from '@/components/ui/data-table'
import React from 'react'
import { ColumnDef } from "@tanstack/react-table"
import prisma from '@/lib/prisma'

type Bidder = {
    id: string
    name: string
    status: "pending" | "approved"
    email: string
    state: string
    mandi: "mini-mandi" | "all-india-mandi"
}

const columns: ColumnDef<Bidder>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "state",
        header: "State",
    },
    {
        accessorKey: "mandi",
        header: "Mandi",
    },
    {
        accessorKey: "status",
        header: "Status",
    },
]


const data: Bidder[] = [
    {
        id: "1",
        name: "John Doe",
        status: "pending",
        email: "emal1@example.com",
        state: "Rajasthan",
        mandi: "mini-mandi",
    },
    {
        id: "2",
        name: "Jane Doe",
        status: "approved",
        email: "emal1@example.com",
        state: "Punjab",
        mandi: "all-india-mandi",
    },
    {
        id: "3",
        name: "John Smith",
        status: "approved",
        email: "emal1@example.com",
        state: "Haryana",
        mandi: "mini-mandi",
    },
    {
        id: "4",
        name: "Jane Smith",
        status: "approved",
        email: "emal1@example.com",
        state: "Himachal Pradesh",
        mandi: "all-india-mandi",
    },
    {
        id: "5",
        name: "John Doe",
        status: "pending",
        email: "emal1@example.com",
        state: "Rajasthan",
        mandi: "mini-mandi",
    },
]

const page = async () => {
    const a = await prisma.licence.findMany({
        where: {
            status: "APPROVED"
        },
        include: {
            user: {
                omit: {
                    password: true
                }
            }
        }
    })



    return (
        <div className="flex-1 space-y-2 text-white">
            <DataTable columns={columns} data={data.filter(s => s.status === "approved")} route='./bidders' />
            {/* {data.filter(s => s.status === "approved").map((bidder) => (
                <Link href={`/dashboard/all-india-mandi/bidders/${bidder.id}`} key={bidder.id} scroll={false}>
                    <div key={bidder.id} className="flex space-x-2 bg-gray-800 py-2 px-4 mb-2">
                        <div>{bidder.name}</div>
                        <div>{bidder.email}</div>
                        <div>{bidder.state}</div>
                        <div>{bidder.mandi}</div>
                        <div>{bidder.status}</div>
                    </div>
                </Link>
            ))} */}
        </div>
    )
}

export default page
