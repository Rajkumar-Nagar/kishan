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
import { Chart } from "./chart"

type Bidder = {
    id: string
    name: string
    status: "pending" | "processing" | "success" | "failed"
    email: string
    state: string
    mandi: "mini-mandi" | "all-india-mandi"
}


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
                    <Chart />
                </div>
            </div>
        </div>
    )
}
