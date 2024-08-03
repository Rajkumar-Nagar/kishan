import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
    try {
        const { user_id, product_id } = await request.json();

        if (!user_id || !product_id) {
            return NextResponse.json({ error: "Please provide user ID and product ID" }, { status: 400 });
        }

        let responseItem;
        let issaved=false

        const savedCheck = await prisma.savedProduct.findFirst({
            where: {
                userId: user_id,
                productId: product_id
            }
        });

        if (!savedCheck) {
            issaved=true
            responseItem = await prisma.savedProduct.create({
                data: {
                    user: {
                        connect: { id: user_id }
                    },
                    product: {
                        connect: { id: product_id }
                    }
                },
            });
        } else {
            issaved=false
            responseItem = await prisma.savedProduct.delete({
                where: {
                    id: savedCheck.id
                }
            });
        }

        return NextResponse.json({responseItem,issaved},{status: 201 });
    } catch (error) {
        console.log("Error: ", error);
        return NextResponse.json({ error: "Product details not found" }, { status: 500 });
    }
}
