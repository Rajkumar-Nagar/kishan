import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const page = ({
    pending,
    approved
}: {
    pending: JSX.Element,
    approved: JSX.Element
}) => {
    return (
        <div className="flex-1">
            <Tabs defaultValue="pending">
                <TabsList>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="approved">Approved</TabsTrigger>
                </TabsList>
                <TabsContent value="pending">{pending}</TabsContent>
                <TabsContent value="approved">{approved}</TabsContent>
            </Tabs>
        </div>
    )
}

export default page
