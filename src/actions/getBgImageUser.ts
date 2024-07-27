
"use server"
import prisma from "@/lib/prisma";

export const getBgImageUser = async (id, backgroundImage) => {
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
        console.log("updated user is this ", data)
        return data;
    } catch (error) {
        console.error("Internal server error when set bg image", error);
        throw new Error("Internal server error when set bg image");
    }
}


