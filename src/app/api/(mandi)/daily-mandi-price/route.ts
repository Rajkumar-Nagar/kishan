import { getMandiPrice } from "@/actions/mandi.actions";
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

    try {
        const res = await getMandiPrice({
            offset,
            limit,
            state: state as any,
            district: district as any,
            market: market as any,
            commodity: commodity as any,
            variety: variety as any,
            grade: grade as any
        });

        return NextResponse.json(res, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error!" }, { status: 500 });
    }
}