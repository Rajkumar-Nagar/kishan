
"use server"

import { GoogleGenerativeAI } from "@google/generative-ai";
import { error } from "console";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

const genAI = new GoogleGenerativeAI("AIzaSyBG5phnK2u_bjmENghqWsOCC4jSPfVI9ns");

export const PromtAns = async (content: string) => {
    try {
        if (!content) {
            throw new Error("please provid valid prompt");
        }

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(content);
        const response = await result.response;
        const text = await response.text();
        return text

    } catch (error) {
        console.log(error)
        return { error }
    }
}


export const CreateChatSession = async () => {

    try {
        const user = await auth();
        if (!user) {
            throw new Error("user is not authenticated")
        }
        const ChatSession = await prisma?.chatSession?.create(
            {
                data: {
                    userId: user.user.id,
                    sessionName: "Kisan Ai"
                }
            }
        )
        if (!ChatSession) {
            throw new Error("chatsession made failed")
        }
    } catch (error) {
        console.log(error)
        return { error }
    }

}


export const AddChat = async (chatid: string, content: string) => {
    try {
        if (!content) {
            throw new Error("prompt is empty")
        }
        console.log({ chatid })

        const conversation = prisma.conversation.findFirst({
            where: {
                id: chatid
            }
        })

        if (!conversation) {
            throw new Error("Invalid conversation")
        }

        const ans = await PromtAns(content)

        if (!ans) {
            throw new Error("internal server error")
        }

        const updatedTitle = await PromtAns(` give me directley only one title not other things give me Title for given prompt in simple plain text ,this is ${content} `)
        const updateConversation = await prisma.conversation.update({
            where: {
                id: chatid
            },
            data: {
                title: updatedTitle
            }
        })

        if (!updateConversation) {
            throw new Error("internal server error")
        }

        const createdPrompt = await prisma.prompt.create({
            data: {
                conversationId: chatid,
                question: content,
                answer: ans,
            }
        })

        if (!createdPrompt) {
            throw new Error("prompt ans not generated")
        }

        revalidatePath('/aiHelper', "layout")

        return { createdPrompt }

    } catch (error) {
        console.log(error)
        return { error: "Error" }
    }
}


export const getChats = async (chatid: string) => {

    try {

        if (!chatid) {
            throw new Error("chatId not recieve")
        }

        const conversation = await prisma.conversation.findFirst({
            where: {
                id: chatid
            },
            include: {
                prompts: true
            }
        })

        return { conversation }

    } catch (error) {

    }
}



