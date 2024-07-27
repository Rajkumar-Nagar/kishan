
"use server"
import prisma from "@/lib/prisma";
import { cache } from "react";

export const getDataFromId = cache(async (id, title) => {
    try {
        const data = await prisma[title].findUnique({
            where: {
                id
            }
        });
        return data;
    } catch (error) {
        console.error("Internal server error when fetching data by ID", error);
        throw new Error("Internal server error when fetching data by ID");
    }
})


