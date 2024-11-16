import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { Slot } from "@prisma/client"

export async function POST(request: NextRequest) {

    try {
        const {

            aadharNumber,
            currentLocation,
            additionalNumber,
            aadharPhotos,

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

        if (!aadharNumber ||
            !currentLocation ||
            !aadharPhotos || !cropName || !variety || !units || !quantityAvailable || !expectedPrice ||
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
                aadharNumber: aadharNumber,
                currentLocation: currentLocation,
                additionalNumber: additionalNumber,
                aadharPhotos: aadharPhotos,
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

        const lastProduct = await prisma.product.findMany({
            orderBy: {
                createdAt: "desc"
            },
            take: 1
        })

        const token = lastProduct[0].token ? +lastProduct[0].token + 1 : 10500

        const product = await prisma.product.create({
            data: {
                personalInfoId: `${user?.user.id}`,
                productInfoId: productInfo.id,
                locationInfoId: locationInfo.id,
                qualityMetricsId: qualityMetrics.id,
                harvestStorageId: harvestStorage.id,
                mediaId: media.id,
                token: token.toString(),
                additionalServicesId: additionalServices.id,
            },
            include: {
                personalInfo: true,
                productInfo: true,
                locationInfo: true,
                qualityMetrics: true,
                harvestStorage: true,
                media: true,
                additionalServices: true,
            },
        });

        for (const item of Object.keys(Slot)) {
            const allBids = await prisma.bidDetails.findMany({
                where: {
                    biddingSlot: Slot[item as keyof typeof Slot]
                }
            });

            if (allBids.length < 10) {
                await prisma.bidDetails.create({
                    data: {
                        biddingSlot: Slot[item as keyof typeof Slot],
                        cropId: product.id,
                    }
                });

                const slotOption = await prisma.slotOption.upsert({
                    where: {
                        type: Slot[item as keyof typeof Slot]
                    },
                    create: {
                        currCropId: product.id,
                        status: "pending",
                        pendingCrops: [product.id],
                        type: Slot[item as keyof typeof Slot],
                        startTime: new Date(new Date().setHours(10, 0, 0, 0)),
                    },
                    update: {
                        pendingCrops: {
                            push: product.id
                        }
                    }
                })
                break;
            }
        }


        console.log(product)
        return NextResponse.json({ product, token }, { status: 201 });
    } catch (error) {
        console.error('Error creating product:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}