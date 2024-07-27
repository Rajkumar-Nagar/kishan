import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {

    try {
        const {
            id,
            pesonalInfoId,
            productInfoId,
            locationInfoId,
            qualityMetricsId,
            harvestStorageId,
            mediaId,
            additionalServicesId } = await request.json();

      
        if (!id || !productInfoId || !locationInfoId || !pesonalInfoId || !qualityMetricsId || !harvestStorageId || !mediaId || !additionalServicesId) {
            return NextResponse.json({ error: "mongoDb server error" }, { status: 400 });
        }

        const ProductInfo = await prisma.productInfo?.findUnique({
            where: {
                id: productInfoId
            },
        })


        if (!ProductInfo) {
            return NextResponse.json({ error: "product info is not found" }, { status: 400 });
        }

        const User = await prisma.user?.findUnique({
            where: {
                id: pesonalInfoId
            },
            select: {
                id: true,
                name: true,
                phoneNumber: true,
                email: true,
                address: true,
                licence: true,
                additional_number: true
            }
        })



        if (!User) {
            return NextResponse.json({ error: "User info is not found" }, { status: 400 });
        }


        const LocationInfo = await prisma.locationInfo?.findUnique({
            where: {
                id: locationInfoId
            },
        })

        if (!LocationInfo) {
            return NextResponse.json({ error: "product info is not found" }, { status: 400 });
        }



        const QualityMetrics = await prisma.qualityMetrics?.findUnique({
            where: {
                id: qualityMetricsId
            },
        })

        if (!QualityMetrics) {
            return NextResponse.json({ error: "QualityMetrics info is not found" }, { status: 400 });
        }



        const HarvestStorage = await prisma.harvestStorage?.findUnique({
            where: {
                id: harvestStorageId
            },
        })

        if (!HarvestStorage) {
            return NextResponse.json({ error: "HarvestStorage info is not found" }, { status: 400 });
        }


        const Media = await prisma.media?.findUnique({
            where: {
                id: mediaId
            },
        })

        if (!Media) {
            return NextResponse.json({ error: "Media info is not found" }, { status: 400 });
        }


        const AdditionalServices = await prisma.additionalServices?.findUnique({
            where: {
                id: additionalServicesId
            },
        })

        if (!AdditionalServices) {
            return NextResponse.json({ error: "AdditionalServices info is not found" }, { status: 400 });
        }


        const product = {
            id,
            User,
            ProductInfo,
            LocationInfo,
            QualityMetrics,
            HarvestStorage,
            Media,
            AdditionalServices,
        }

        
        return NextResponse.json(product, { status: 201 })
    } catch (error) {
        console.log("error is ", error)
        return NextResponse.json({ error: "Prduct details is not found" }, { status: 500 });
    }
}


