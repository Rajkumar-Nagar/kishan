import { mandiActions } from '@/actions';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table'
import React from 'react'

interface IRecord {
    state: string;
    district: string;
    market: string;
    commodity: string;
    variety: string;
    grade: string;
    arrival_date: string;
    min_price: string;
    max_price: string;
    modal_price: string;
}
const columns: ColumnDef<IRecord>[] = [
    {
        header: 'Commodity',
        accessorKey: 'commodity'
    },
    {
        header: 'Variety',
        accessorKey: 'variety'
    },
    {
        header: 'State',
        accessorKey: 'state'
    },
    {
        header: 'District',
        accessorKey: 'district'
    },
    {
        header: 'Market',
        accessorKey: 'market'
    },
    {
        header: 'Grade',
        accessorKey: 'grade'
    },
    {
        header: 'Arrival Date',
        accessorKey: 'arrival_date'
    },
    {
        header: 'Min Price',
        accessorKey: 'min_price'
    },
    {
        header: 'Max Price',
        accessorKey: 'max_price'
    },
    {
        header: 'Modal Price',
        accessorKey: 'modal_price'
    },
]

const page = async () => {
    const data = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/daily-mandi-price`,{
        cache:'no-cache'
    }).then(res => res.json());
    return (
        <div className='container py-3 max-w-screen-xl'>
            <h1 className='text-3xl my-3'>Mandi Prices</h1>
            <DataTable columns={columns} data={data.records ?? []} />
        </div>
    )
}

export default page
