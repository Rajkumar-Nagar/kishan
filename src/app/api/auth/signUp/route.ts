import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt'

export async function POST(request: NextRequest) {
  try {

    const body = await request.json();

    const { name, phoneNumber, email, address, password } = body

    if (!name || !phoneNumber || !address || !password) {
      return NextResponse.json({ error: 'Please fill all required filled' }, { status: 500 });
    }

    const findUser = await prisma.user.findUnique({
      where: {
        phoneNumber,
      }
    })

    if (findUser) {
      return NextResponse.json({ error: 'user is already resistered' }, { status: 500 });
    }

    const saltRounds = parseInt(process.env.SALT_ROUND!, 10);
    if (isNaN(saltRounds)) {
      throw new Error('Invalid SALT_ROUND environment variable');
    }

    const hashPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await prisma.user.create({
      data: {
        name,
        phoneNumber,
        email,
        address,
        password: hashPassword,
      }
    });

    return NextResponse.json({ message: 'usser resister successfully', user: newUser }, { status: 200 });

  } catch (error) {

    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
