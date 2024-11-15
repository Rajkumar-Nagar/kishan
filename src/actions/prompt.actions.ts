
"use server"

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { generateText } from 'ai';
import { google } from '@ai-sdk/google';

const model = google('gemini-1.5-flash');


export const promptAns = async (prompt: string) => {
    const result = await generateText({
        model,
        prompt
    })
    return result.text;
}


export const createChatSession = async () => {

    try {
        const session = await auth();
        if (!session) {
            throw new Error("user is not authenticated")
        }
        const ChatSession = await prisma.chatSession.upsert({
            where: {
                userId: session?.user.id,
            },
            create: {
                userId: session?.user.id,
                sessionName: "Kisan Ai",
            },
            update: {}
        });

        return ChatSession;
    } catch (error) {
        console.log(error)
        return { error }
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


export const createTitle = async (chatid: string, content: string) => {
    try {
        if (!content) {
            throw new Error("prompt is empty")
        }

        const conversation = prisma.conversation.findFirst({
            where: {
                id: chatid
            }
        })

        if (!conversation) {
            throw new Error("Invalid conversation")
        }

        const updatedTitle = await promptAns(`give me directley only one title not other things give me Title for given prompt in simple plain text ,this is ${content} `)
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

        revalidatePath('/aiHelper', "layout")

        return { updateConversation }

    } catch (error) {
        console.log(error)
        return { error: "Error" }
    }
}
