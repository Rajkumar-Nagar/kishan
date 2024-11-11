import { Prisma } from "@prisma/client";

export const productOptions: Prisma.ProductSelect = {
    additionalServices: true,
    harvestStorage: true,
    qualityMetrics: true,
    media: true,
    locationInfo: true,
    personalInfo: {
        select: {
            id: true,
            name: true,
            phoneNumber: true,
            email: true,
            address: true,
            licence: true,
            additionalNumber: true,
            avatar: true,
        }
    },
    productInfo: true,
}