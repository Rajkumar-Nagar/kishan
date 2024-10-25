import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"
import { ColumnDef } from "@tanstack/react-table"

type Bidder = {
    id: string
    name: string
    status: "pending" | "processing" | "success" | "failed"
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
        status: "processing",
        email: "emal1@example.com",
        state: "Punjab",
        mandi: "all-india-mandi",
    },
    {
        id: "3",
        name: "John Smith",
        status: "success",
        email: "emal1@example.com",
        state: "Haryana",
        mandi: "mini-mandi",
    },
    {
        id: "4",
        name: "Jane Smith",
        status: "failed",
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

const Stats = [
    {
        name: "Total Bidders",
        value: 120,
    },
    {
        name: "Total Crops",
        value: 80,
    },
    {
        name: "Total Bids",
        value: 10,
    }
]

export default function Page() {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                {Stats.map((_, index) => (
                    <Card className="*:p-0 *:py-1 p-6" key={index}>
                        <CardHeader>
                            <CardTitle>{_.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-lg text-muted-foreground">{_.value}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div className="min-h-[100vh] flex-1 md:min-h-min" >
                <div className="flex-1 space-y-2 text-white">
                    <DataTable columns={columns} data={data} />
                </div>
            </div>
        </div>
    )
}
