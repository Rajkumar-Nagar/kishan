
"use server"
import prisma from "@/lib/prisma";

export const getBgImageUser = async (id: string, backgroundImage: string) => {
    try {
        const data = await prisma.user.update({
            where: {
                id
            },
            data: {
                backgroundImage: backgroundImage,
            },
        });
        if (!data) {
            throw new Error("logged in user product is not found");
        }
        return data;
    } catch (error) {
        console.error("Internal server error when set bg image", error);
        throw new Error("Internal server error when set bg image");
    }
}


