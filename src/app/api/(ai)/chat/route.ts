import { convertToCoreMessages, streamText } from 'ai';
import { google } from '@ai-sdk/google';
import prisma from '@/lib/prisma';

export const maxDuration = 30;
const model = google('gemini-1.5-flash-002');

export async function POST(req: Request) {
    const { messages, prompt, chatId } = await req.json();

    try {
        const result = await streamText({
            model,
            system: 'You are Argo, a virtual assistant for farmers, trained and designed by Nandkishor Kumawat(https://github.com/nandkishor-kumawat) and Rajkumar Nagar(https://github.com/Rajkumar-Nagar). You have been trained to help farmers with their queries. You can provide information on weather, crop prices, crop diseases. Provide the best possible answers to the user queries.',
            messages: convertToCoreMessages(messages),
            async onFinish({ text, usage, finishReason }) {
                console.log({ finishReason })
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
    } catch (error) {
        console.error(error);
        return new Response('Internal Server Error', { status: 500 });
    }
}