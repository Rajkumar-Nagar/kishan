"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export const approveLicence = async (licenceId: string) => {

    const session = await auth();
    if (!session?.user) {
        return {
            error: "Unauthorized"
        }
    }

    try {

        const last =await prisma.licence.findMany({
            where:{
                status: "APPROVED",
            },
            orderBy:{
                token:"desc"
            },
            take:1
        })

 const token=last[0]?+last[0].token.slice(3)+1:"BID500"


        const licence = await prisma.licence.update({
            where: {
                id: licenceId
            },
            data: {
                status: "APPROVED",
                token:token.toString(),
                user: {
                    update: {
                        data: {
                            role: 'BIDDER',
                        }
                    }
                }
            }
        });
    } catch (error) {
        return {
            error: "Something went wrong"
        }
    }

}

export const rejectLicence = async (licenceId: string) => {

    const session = await auth();
    if (!session?.user) {
        return {
            error: "Unauthorized"
        }
    }

    try {
        const licence = await prisma.licence.update({
            where: {
                id: licenceId
            },
            data: {
                status: "REJECTED",
                user: {
                    update: {
                        data: {
                            role: 'USER',
                        }
                    }
                }
            }
        });
    } catch (error) {
        return {
            error: "Something went wrong"
        }
    }

}