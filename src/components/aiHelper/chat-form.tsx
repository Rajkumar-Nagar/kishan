"use client"
import { useAppDispatch } from '@/lib/redux';
import { aiAction } from '@/lib/redux/features';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import AutoHeightTextarea from '../auto-height-textarea';

interface InputBoxForAddProps {
    newChat?: boolean;
    isLoading?: boolean;
    stop?: () => void;
}

export default function ChatForm({ newChat, isLoading, stop }: InputBoxForAddProps) {
    const [input, setInput] = useState("");
    const dispatch = useAppDispatch();
    const route = useRouter();

    const handelAddchat = async () => {
        if (!input) return;
        dispatch(aiAction.setPrompt(input));
        setInput("");
        newChat && handleNewChat();
    }

    const handleNewChat = async () => {
        try {
            dispatch(aiAction.setconversation([]))

            const response = await fetch("/api/promptGenerate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ prompt: input })
            });

            const res = await response.json();
            if (!res.error) {
                // dispatch(aiAction.addConversation({ }))
                route.push(`aiHelper/${res.Conversation.id}`)
            }
        } catch (error) {
            console.error("Error in handlePrompt:", error);
        }
    };

    return (
        <div className="p-4 bg-gray-800 border-t w-full border-gray-700 flex flex-col items-center">
            <div className="flex items-end w-full">
                <AutoHeightTextarea
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 p-2 bg-gray-700 text-white rounded-lg focus:outline-none resize-none"
                />
                <button
                    disabled={isLoading}
                    className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
                    onClick={handelAddchat}
                >
                    {isLoading ? "Loading..." : "Send"}
                </button>
            </div>
        </div>
    );
}
