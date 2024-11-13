import { getMandiPrice } from "@/actions/mandi.actions";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
    const { records } = await getMandiPrice({
        limit: 30000
    });

    if (!records || records.length === 0) {
        return NextResponse.json({ message: "No records to update!" }, { status: 200 });
    }

    try {
        await prisma.mandiPrice.deleteMany({
            where: {
                arrival_date: {
                    equals: records[0].arrival_date
                }
            }
        });

        await prisma.mandiPrice.createMany({
            data: records,
        });

        return NextResponse.json({ message: "Successfully updated daily mandi price!" }, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Internal Server Error!" }, { status: 500 });
    }
}