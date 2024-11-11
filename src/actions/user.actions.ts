
"use server"
import prisma from "@/lib/prisma";
import { cache } from "react";

export const getUserById = cache(async (id: string) => {
    try {
        const data = await prisma.user.findUnique({
            where: {
                id
            },
        });
        return data;
    } catch (error) {
        console.error("Internal server error when fetching data by ID", error);
        throw new Error("Internal server error when fetching data by ID");
    }
})