import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(request: NextRequest) {

    try {

        const {
            mandiType,
            mandiState,
            madiDistict,
            aadhar_number,
            aadharphotos,
            additional_number,
            current_location,
            state,
            distict,
            village,
            city,
            pincode,
            work,
            income,
            storagePlace,
            storageLocation,
            storageImages,
            diclaration,
            terms_condition
        } = await request.json()

        if (!mandiType || !
            mandiState || !
            madiDistict || !
            aadhar_number || !
            aadharphotos || !
            current_location || !
            state || !
            distict || !
            village || !
            city || !
            pincode || !
            work || !
            income || !
            storagePlace || !
            storageLocation || !
            storageImages
        ) {
            return NextResponse.json({ error: "Please provide necessary fields" }, { status: 500 })
        }

        const user = await auth()

        console.log("user is this ", user)

        if (!user) {
            return NextResponse.json({ error: "please loged in first" }, { status: 500 })
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
            return NextResponse.json({ error: "User detailed updatation failed" }, { status: 500 })
        }

        const licenseInfo = await prisma.licence.create({
            data: {
                mandiType,
                mandiState,
                madiDistict,
                state,
                distict,
                village,
                city,
                pincode,
                work,
                income,
                storagePlace,
                storageLocation,
                storageImages,
                diclaration,
                terms_condition
            },
        });

        if (!licenseInfo) {
            return NextResponse.json({ error: "licese create failed" }, { status: 500 })
        }

        console.log(licenseInfo)
        return NextResponse.json(licenseInfo, { status: 200 });

    } catch (error) {
        console.log('Error creating license:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}