import { Prisma } from "@prisma/client";

export const productOptions: Prisma.ProductSelect = {
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
            additional_number: true,
            avatar: true,
        }
    },
    ProductInfo: true,
}