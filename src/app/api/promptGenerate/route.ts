
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(request: NextRequest) {
    try {
        const user = await auth();

        if (!user) {
            return NextResponse.json({ message: "Unauthorized user" }, { status: 500 })
        }

        const ChatSession = await prisma.chatSession.upsert({
            where: {
                userId: user.user.id
            },
            update: {},
            create: {
                userId: user.user.id,
                sessionName: "Kisan Ai"
            }
        })

        const Conversation = await prisma.conversation.create({
            data: {
                chatSessionId: ChatSession.id,
                title: "New chat",
            }
        })

        if (!Conversation) {
            return NextResponse.json({ message: "user conversation create failed " }, { status: 500 })
        }
        return NextResponse.json({ Conversation, message: "Prompt is saved successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Prompt entry failed", error: "Error" }, { status: 500 });
    }
}