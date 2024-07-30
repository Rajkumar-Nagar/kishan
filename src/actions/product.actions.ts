"use server"

import prisma from "@/lib/prisma"

const productOptions = {
    additionalServices: true,
    harvestStorage: true,
    qualityMetrics: true,
    media: true,
    locationInfo: true,
    pesonalInfo: {
        select: {
            id: true,
            name: true,
            phoneNumber: true,
            email: true,
            address: true,
            licence: true,
            additional_number: true
        }
    },
    ProductInfo: true,
}

export const getProducts = async (userId?: string) => {
    return prisma.product.findMany({
        where: {
            pesonalInfoId: userId
        },
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