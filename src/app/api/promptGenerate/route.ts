
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { PromtAns } from "@/actions/prompt.actions";
import prisma from "@/lib/prisma";
import { create } from "domain";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";


const genAI = new GoogleGenerativeAI("AIzaSyBG5phnK2u_bjmENghqWsOCC4jSPfVI9ns");

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { prompt } = body;

        const user = await auth();

        if (!user) {
            return NextResponse.json({ message: "Unauthorized user" }, { status: 500 })
        }

        // const {ans} = await PromtAns(body)

        // if (!ans) {
        //     return NextResponse.json({ message: "Technical Error prompt ans not recieving" }, { status: 500 })
        // }

        // const title = await prompt(` make this prompt title in few words ${ans}`)

        // if (!title) {
        //     return NextResponse.json({ message: "Technical Error prompt title not recieving" }, { status: 500 })
        // }

        const ChatSession = await prisma.chatSession.upsert({
            where: {
                userId: user.user.id
            },
            update: {

            },
            create: {

                userId: user.user.id,
                sessionName: "Kisan Ai"

            }
        })

        if (!ChatSession) {
            return NextResponse.json({ message: "user chatSession not found" }, { status: 500 })
        }

        const Conversation = await prisma.conversation.create({
            data: {
                chatSessionId: ChatSession.id,
                title: "New chat",
            }
        })

        if (!Conversation) {
            return NextResponse.json({ message: "user conversation create failed " }, { status: 500 })
        }

        // const createdPrompt = await prisma.prompt.create({
        //     data: {
        //         conversationId: Conversation.id,
        //         question: prompt,
        //         answer: ans
        //     }
        // })

        // if (!createdPrompt) {
        //     return NextResponse.json({ message: "prompt creation  failed" }, { status: 500 })
        // }
        revalidatePath(`/aiHelper/${ChatSession.id}`);
        return NextResponse.json({ Conversation, message: "Prompt is saved successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Prompt entry failed", error: error.message }, { status: 500 });
    }
}