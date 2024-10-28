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
        const licence = await prisma.licence.update({
            where: {
                id: licenceId
            },
            data: {
                status: "APPROVED",
                user: {
                    update: {
                        where: {
                            licenceId: licenceId
                        },
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
                        where: {
                            licenceId: licenceId
                        },
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