import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Chart } from "./chart"
import prisma from "@/lib/prisma"

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

export default async function Page() {
    const data = await prisma.$transaction([
        prisma.licence.count(),
        prisma.product.count(),
        prisma.bidDetails.count()
    ])
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                {Stats.map((_, index) => (
                    <Card className="*:p-0 *:py-1 p-6" key={index}>
                        <CardHeader>
                            <CardTitle>{_.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-lg text-muted-foreground">{data[index]}</p>
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
