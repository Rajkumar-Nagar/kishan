import { DataTable } from '@/components/ui/data-table'
import React from 'react'

// id, crop name, variety, price, quantity, state, city, pincode

type ICrop = {
    id: string
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
        id: "1",
        crop: "Rice",
        variety: "Basmati",
        price: 1000,
        quantity: 100,
        state: "Rajasthan",
        city: "Jaipur",
        pincode: 302021,
    },
    {
        id: "2",
        crop: "Wheat",
        variety: "Sharbati",
        price: 1500,
        quantity: 200,
        state: "Punjab",
        city: "Chandigarh",
        pincode: 160001,
    },
    {
        id: "3",
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
            <DataTable columns={columns} data={data} route='./crops' />
        </div>
    )
}

export default page
