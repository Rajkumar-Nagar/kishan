"use client"
import { useAppDispatch } from '@/lib/redux';
import { aiAction } from '@/lib/redux/features';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function InputBox() {
    const [input, setInput] = useState("");
    const [promptAns, setpromptAns] = useState("");

   const dispatch=useAppDispatch()

    const route = useRouter()
 
    const handlePrompt = async () => {
        try {
            if (!input) {
                return;
            }
        
            dispatch(aiAction.setPrompt(input));
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
                // dispatch(aiAction.addConversation({

                // }))
                route.push(`aiHelper/${res.Conversation.id}`)
                const router=useRouter()
                router.refresh()
            }
        } catch (error) {
            console.error("Error in handlePrompt:", error);
        }
    };

    return (
        <div className="p-4 bg-gray-800 border-t w-full border-gray-700 absolute bottom-0 flex flex-col items-center">
            <div className="flex items-center w-full">
                <input
                    type="text"
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 p-2 bg-gray-700 text-white rounded-lg focus:outline-none"
                />
                <button
                    className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
                    onClick={handlePrompt}
                >
                    Send
                </button>
            </div>
        </div>
    );
}
