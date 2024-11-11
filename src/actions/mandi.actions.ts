"use server"
import { auth } from "@/auth";
import { STATES } from "@/data";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";

interface MandiPriceReq {
    offset?: number;
    limit?: number | 'all';
    state: keyof typeof STATES;
    district: string;
    market: string;
    commodity: string;
    variety: string;
    grade: string;
}

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
    price_unit: string;
}

interface MandiPriceResponse {
    created_date: string;
    updated_date: string;
    status: string;
    total: number;
    count: number;
    records: IRecord[];
}

export const getMandiPrice = async ({
    offset = 0,
    limit = 15,
    state,
    district,
    market,
    commodity,
    variety,
    grade
}: Partial<MandiPriceReq>) => {
    const apiKey = process.env.DATA_GOV_IN_API_KEY;

    const search = {
        'api-key': apiKey,
        format: 'json',
        offset,
        limit,
        'filters[state.keyword]': state,
        'filters[district]': district,
        'filters[market]': market,
        'filters[commodity]': commodity,
        'filters[variety]': variety,
        'filters[grade]': grade
    };

    const nonEmptySearch = Object.entries(search).reduce((acc, [key, value]) => {
        if (value?.toString()) {
            acc[key] = value;
        }
        return acc;
    }, {} as any);

    const searchParamsString = new URLSearchParams(nonEmptySearch).toString();

    const res = await fetch(`https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?${searchParamsString}`).then(res => res.json());

    const { created_date, updated_date, status, total, count, records } = res as MandiPriceResponse;
    // return records.map(r => r.state).filter((v, i, a) => a.indexOf(v) === i);

    return {
        created_date,
        updated_date,
        status,
        total,
        count,
        records
    }
}


export const verifyToken = async (token: string="v", role: string) => {

    const session = await auth();
    if (!session?.user) {
        return { error: "user unauthorized" }
    }


    if (role === "bidder") {

       const user= await prisma.user.findFirst({
            where: {
                id: session.user.id,
                role: "BIDDER",
                licence: {
                    some: {
                        token
                    }
                }
            }
        })

        if(!user){
            return {error:"Invalid Token"}
        }
    }

    if(role==="seller"){

        const product=await prisma.product.findFirst({
            where:{
               personalInfoId:session.user.id, 
               token,
               productInfo:{
                isSold:false
               },

            }
        })

        if(!product){
            return {error:"Invalid token"}
        }


    }

    const data={
        role,
        token,
        userId:session.user.id
    }
    const cookieStore = cookies();
    cookieStore.set({
        name:"allindiamandi",
        value:JSON.stringify(data)
    })

}


