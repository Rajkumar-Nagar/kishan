import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


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

export default function layout({
    children,
}: {
    children: React.ReactNode;
}) {
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
            <div className="flex-1">
                {children}
            </div>
        </div>
    )
}
