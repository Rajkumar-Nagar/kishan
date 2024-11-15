"use client"
import { AddChat } from '@/actions/prompt.actions';
import { useAppDispatch } from '@/lib/redux';
import { aiAction } from '@/lib/redux/features';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function InputBoxForAdd({ chatid }) {
    const [input, setInput] = useState("");
    const [promptAns, setpromptAns] = useState("");
    const dispatch = useAppDispatch()

    const handelAddchat = async () => {
        try {
            dispatch(aiAction.setPrompt(input))
            return
            console.log(input)
            if (!input) {
                return
            }

            const data = await AddChat(chatid, input)
            console.log(data)

        } catch (error) {
            console.log(error)
        }
    }


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
                    onClick={handelAddchat}
                >
                    Send
                </button>
            </div>
        </div>
    );
}
