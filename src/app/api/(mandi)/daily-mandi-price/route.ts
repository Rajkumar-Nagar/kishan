import { getMandiPrice } from "@/actions/mandi.actions";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/daily-mandi-price?offset=0&limit=15&state=state&district=district&market=market&commodity=commodity&variety=variety&grade=grade
export const GET = async (request: Request) => {
    const { searchParams } = new URL(request.url);
    const offset = +(searchParams.get('offset') ?? 0);
    const limit = +(searchParams.get('limit') ?? 15);
    const state = searchParams.get('state');
    const district = searchParams.get('district');
    const market = searchParams.get('market');
    const commodity = searchParams.get('commodity');
    const variety = searchParams.get('variety');
    const grade = searchParams.get('grade');
    const arrival_date = searchParams.get('arrival_date');

    const today = new Date();
    const arrival_date1 = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();

    try {
        const res = await prisma.mandiPrice.findMany({
            skip: offset,
            take: limit,
            where: {
                state: state ? { equals: state } : undefined,
                district: district ? { equals: district } : undefined,
                market: market ? { equals: market } : undefined,
                commodity: commodity ? { equals: commodity } : undefined,
                variety: variety ? { equals: variety } : undefined,
                grade: grade ? { equals: grade } : undefined,
                arrival_date: arrival_date ?? arrival_date1
            }
        });

        return NextResponse.json({
            created_date: new Date().toISOString(),
            updated_date: new Date().toISOString(),
            status: "success",
            total: res.length,
            count: res.length,
            records: res
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error!" }, { status: 500 });
    }
}