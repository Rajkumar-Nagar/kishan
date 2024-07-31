import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
const bcrypt = require('bcrypt');

export async function POST(request: NextRequest) {

    try {
        await prisma.$connect();
        console.log(prisma)
        console.log(
            console.log(process.env.DATABASE_URL)
        )
        console.log("hellow this is working")
        return NextResponse.json({ message: 'usser registered successfully' }, { status: 200 });
    } catch (error) {

    }
}
