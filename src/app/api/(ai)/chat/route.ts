import { convertToCoreMessages, streamText } from 'ai';
import { google } from '@ai-sdk/google';
import prisma from '@/lib/prisma';

export const maxDuration = 30;
const model = google('gemini-1.5-flash');

export async function POST(req: Request) {
    const { messages, prompt, chatId } = await req.json();

    const result = await streamText({
        model,
        system: 'You are a helpful assistant.',
        messages: convertToCoreMessages(messages),
        async onFinish({ text, usage }) {
            await prisma.prompt.create({
                data: {
                    conversationId: chatId,
                    question: prompt,
                    answer: text,
                }
            }).then(console.log)
        },
    });

    return result.toDataStreamResponse();
}