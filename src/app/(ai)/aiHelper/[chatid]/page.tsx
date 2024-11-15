"use client"

import { createTitle, getChats } from '@/actions/prompt.actions';
import InputBoxForAdd from '@/components/aiHelper/chat-form';
import { ChatGpt } from '@/components/skelton/skeltHomePage';
import { useAppDispatch, useAppSelector } from '@/lib/redux';
import { aiAction } from '@/lib/redux/features';
import React, { useEffect } from 'react'
import { useChat } from "ai/react";
import PreviewMessage from '@/components/aiHelper/preview-message';

function Page({ params }: { params: { chatid: string } }) {

    const dispatch = useAppDispatch()

    const { conversation, prompt } = useAppSelector((state) => state.ai)

    useEffect(() => {
        const handelchatdata = async () => {
            const chats = await getChats(params.chatid);
            chats?.conversation && dispatch(aiAction.setconversation(chats?.conversation.prompts))
        }
        handelchatdata()
    }, [params.chatid])

    const { messages, handleSubmit, input, setInput, isLoading, stop, setMessages } = useChat({
        id: params.chatid,
        initialMessages: conversation.reduce((acc, item) => {
            acc.push({ id: item.id + '-user', content: item.question, role: 'user', createdAt: new Date(item.createdAt) })
            acc.push({ id: item.id, content: item.answer, role: 'assistant', createdAt: new Date(item.createdAt) })
            return acc
        }, [] as any)
    });

    useEffect(() => {
        if (!(params.chatid || prompt)) return;
        const setPrompt = async () => {
            setInput(prompt);
            dispatch(aiAction.setPrompt(""));
        }
        const timeout = setTimeout(setPrompt, 0);
        return () => clearTimeout(timeout)
    }, [prompt, params.chatid])

    useEffect(() => {
        if (input) {
            handleSubmit({}, {
                body: {
                    chatId: params.chatid,
                    prompt: input
                }
            })
        }
    }, [input, params.chatid]);

    useEffect(() => {
        if (params.chatid && prompt && messages.length === 0) {
            createTitle(params.chatid, prompt).then(console.log)
        }
    }, [prompt, params.chatid, messages]);


    const messagesEndRef = React.useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [messages])

    return (
        <div className="relative flex flex-col overflow-hidden w-full max-h-dvh">
            <div className="chats flex-1 overflow-y-auto px-6 py-10 space-y-4">
                {messages.map(message => (
                    <PreviewMessage key={message.id} chat={message as any} />
                ))}

                {isLoading && messages[messages.length - 1].role !== "assistant" && (
                    <ChatGpt />
                )}
                <div ref={messagesEndRef} />
            </div>

            <InputBoxForAdd isLoading={isLoading} />
        </div>
    );
}

export default Page