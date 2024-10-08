import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
export async function POST(request: NextRequest) {

    try {
        const {


            aadhar_number,
            current_location,
            additional_number,
            aadharphotos,

            cropName,
            units,
            variety,
            quantityAvailable,
            expectedPrice,

            village,
            city,
            pincode,
            districtCity,
            state,

            moistureContent,
            grainSize,
            color,
            purity,

            harvestDate,
            storageLocation,

            photos,
            videos,

            sampleRequest,
            liveStreaming

        } = await request.json()

        if (!aadhar_number ||
            !current_location ||
            !aadharphotos || !cropName || !variety || !units || !quantityAvailable || !expectedPrice ||
            !districtCity || !state ||
            !color || !purity ||
            !harvestDate || !storageLocation ||
            !photos || !sampleRequest || !liveStreaming) {
            return NextResponse.json({ error: "Please provide necessary fields" }, { status: 400 });
        }

        const user = await auth()
        if (!user) {
            return NextResponse.json({ error: "please loged in first" }, { status: 400 })
        }

        const updateUsers = await prisma.user.updateMany({
            where: {
                phoneNumber: {
                    contains: user.user.phoneNumber,
                },
            },
            data: {
                aadhar_number: aadhar_number,
                current_location: current_location,
                additional_number: additional_number,
                aadharphotos: aadharphotos,
            },
        })

        if (!updateUsers) {
            return NextResponse.json({ error: "User detailed updatation failed" }, { status: 400 })
        }

        const [productInfo, locationInfo, qualityMetrics, harvestStorage, media, additionalServices] = await prisma.$transaction([
            prisma.productInfo.create({ data: { cropName, variety, units, quantityAvailable, expectedPrice } }),
            prisma.locationInfo.create({ data: { city, pincode, village, districtCity, state } }),
            prisma.qualityMetrics.create({ data: { moistureContent, grainSize, color, purity } }),
            prisma.harvestStorage.create({ data: { harvestDate: new Date(harvestDate), storageLocation } }),
            prisma.media.create({ data: { photos, videos } }),
            prisma.additionalServices.create({ data: { sampleRequest, liveStreaming } })
        ]);

        const product = await prisma.product.create({
            data: {
                pesonalInfoId: `${user?.user.id}`,
                productInfoId: productInfo.id,
                locationInfoId: locationInfo.id,
                qualityMetricsId: qualityMetrics.id,
                harvestStorageId: harvestStorage.id,
                mediaId: media.id,
                additionalServicesId: additionalServices.id,
            },
            include: {
                pesonalInfo: true,
                ProductInfo: true,
                locationInfo: true,
                qualityMetrics: true,
                harvestStorage: true,
                media: true,
                additionalServices: true,
            },
        });

        console.log(product)
        return NextResponse.json(product, { status: 201 });
    } catch (error) {
        console.error('Error creating product:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}