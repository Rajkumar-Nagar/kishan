"use server"

import { signIn } from "@/auth";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt"
import { revalidatePath } from "next/cache";

export const login = async (formdata: FormData) => {
    const { phoneNumber, password } = Object.fromEntries(formdata.entries());

    const result = await signIn('credentials', {
        redirect: false,
        phoneNumber,
        password,
        callbackUrl: '/',
    });
    revalidatePath('/', 'layout');
    if (result.error) {
        throw Error("invalid credintial")
    }
}

export const signUp = async (formdata: { name: string, phoneNumber: string, email: string, address: string, password: string }) => {
    const { name, phoneNumber, email, address, password } = formdata;

    if (!name || !phoneNumber || !address || !password) {
        throw new Error('Please fill all required filled')
    }

    const findUser = await prisma.user.findUnique({
        where: {
            phoneNumber,
        }
    })

    if (findUser) {
        throw new Error('user is already registered')
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

    // const result = await signIn('credentials', {
    //     redirect: false,
    //     phoneNumber,
    //     password
    // });

    return {
        message: "user registered successfully",
        // result
    }

}
