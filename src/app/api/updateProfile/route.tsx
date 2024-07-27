import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
    try {
        const { name, phoneNumber, email, address, _id, avatar } = await request.json();

        if (!name || !phoneNumber || !address || !avatar) {
            return NextResponse.json({ error: "Please provide necessary fields" }, { status: 400 });
        }

        const updatedUser = await prisma.user.update({
            where: { id: _id },
            data: { name, phoneNumber, email, address, avatar },
        });

        if (!updatedUser) {
            return NextResponse.json({ error: "User update failed" }, { status: 500 });
        }

        console.log("New updated user", updatedUser);
        return NextResponse.json({ updatedUser }, { status: 200 });

    } catch (error) {
        console.error('Error updating profile:', error);
        return NextResponse.json({ error: 'Error updating profile' }, { status: 500 });
    }
}
