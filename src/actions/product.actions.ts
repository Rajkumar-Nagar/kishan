"use server"

import prisma from "@/lib/prisma"
import { productOptions } from "./include.options"


export const getProducts = async (userId?: string) => {
    return prisma.product.findMany({
        ...(userId && {
            where: {
                personalInfoId: userId
            }
        }),
        include: productOptions
    })
}

export const getProductById = async (id: string) => {
    return prisma.product.findUnique({
        where: {
            id
        },
        include: productOptions
    })
}