import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { MandiType } from "@prisma/client";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            mandiType,
            mandiState,
            madiDistrict,
            aadharNumber,
            aadharPhotos,
            additionalNumber,
            currentLocation,
            state,
            district,
            village,
            city,
            pincode,
            work,
            income,
            storagePlace,
            storageLocation,
            storageImages,
            declaration,
            terms_condition
        } = body;

        if (
            !mandiType ||
            (mandiType === MandiType.MINI_MANDI && (!mandiState || !madiDistrict)) ||
            !aadharNumber ||
            !aadharPhotos ||
            !currentLocation ||
            !state ||
            !district ||
            !village ||
            !city ||
            !pincode ||
            !work ||
            !income ||
            !storagePlace ||
            !storageLocation ||
            !storageImages ||
            !declaration ||
            !terms_condition
        ) {
            return NextResponse.json({ error: "Please provide necessary fields" }, { status: 500 })
        }

        const session = await auth()

        if (!session?.user) {
            return NextResponse.json({ error: "please loged in first" }, { status: 500 })
        }

        const licenseInfo = await prisma.licence.create({
            data: {
                mandiType,
                mandiState,
                madiDistrict,
                state,
                district,
                village,
                city,
                pincode,
                work,
                income,
                storagePlace,
                storageLocation,
                storageImages,
                declaration,
                terms_condition
            },
        });
        if (!licenseInfo) {
            return NextResponse.json({ error: "licese create failed" }, { status: 500 })
        }

        console.log(licenseInfo)

        const updateUsers = await prisma.user.updateMany({
            where: {
                phoneNumber: {
                    contains: session.user.phoneNumber,
                },
            },
            data: {
                aadharNumber: aadharNumber,
                currentLocation: currentLocation,
                additionalNumber: additionalNumber,
                aadharPhotos: aadharPhotos,
                licenceId: licenseInfo.id,
            },
        })

        if (!updateUsers) {
            return NextResponse.json({ error: "User detailed updatation failed" }, { status: 500 })
        }

        return NextResponse.json(licenseInfo, { status: 200 });

    } catch (error) {
        console.log('Error creating license:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}