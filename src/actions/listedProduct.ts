
"use server"
import prisma from "@/lib/prisma";

export const getListedproduct = async (id) => {
    try {
        const data = await prisma.user.findUnique({
            where: {
                id
            },
            include: {
                Product: true
            }
        });

        if(!data){
            throw new Error("logged in user product is not found");
        }
      
        const listedProduct=data.Product
        return listedProduct;
    } catch (error) {
        console.error("Internal server error when fetching data by ID", error);
        throw new Error("Internal server error when fetching data by ID");
    }
}


