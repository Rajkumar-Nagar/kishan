import { DataTable } from '@/components/ui/data-table'
import React from 'react'

// crop name, variety, price, quantity, state, city, pincode

type ICrop = {
    crop: string
    variety: string
    price: number
    quantity: number
    state: string
    city: string
    pincode: number
}

const columns = [
    {
        accessorKey: "crop",
        header: "Crop",
    },
    {
        accessorKey: "variety",
        header: "Variety",
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
        accessorKey: "state",
        header: "State",
    },
    {
        accessorKey: "city",
        header: "City",
    },
    {
        accessorKey: "pincode",
        header: "Pincode",
    },
]

const data: ICrop[] = [
    {
        crop: "Rice",
        variety: "Basmati",
        price: 1000,
        quantity: 100,
        state: "Rajasthan",
        city: "Jaipur",
        pincode: 302021,
    },
    {
        crop: "Wheat",
        variety: "Sharbati",
        price: 1500,
        quantity: 200,
        state: "Punjab",
        city: "Chandigarh",
        pincode: 160001,
    },
    {
        crop: "Maize",
        variety: "Yellow",
        price: 800,
        quantity: 50,
        state: "Haryana",
        city: "Gurugram",
        pincode: 122001,
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
