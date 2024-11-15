"use client";
import React, { useState } from 'react'
import AutoHeightTextarea from '../auto-height-textarea'
import Image from 'next/image';
import { useWindowSize } from '@/hooks';

const ViewersChat = () => {
    const { width } = useWindowSize();

    const [message, setMessage] = useState("");

    const handleSendMessage = () => {
        if (message.trim() !== "") {
            console.log("Message sent:", message);
            setMessage("");
        }
    };
    if (width < 1440) return null;

    return (
        <div className="maincontainer flex h-full flex-col gap-2 bg-gray-300 p-2">
            <h1 className='border-b text-lg border-b-[silver] text-zinc-500'>Chat with other viewers</h1>
            <div className="messagebox flex-1 overflow-y-auto">
                {/* Message content will be displayed here */}
            </div>

            <div className="buttonsPart bg-gray-200 rounded-xl flex items-center justify-between px-3 py-3 gap-2">
                <AutoHeightTextarea
                    id="prompt-textarea"
                    placeholder="Message with Bidders"
                    className="w-full flex resize-none focus:outline-none bg-gray-200 items-center overflow-hidden"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={{ maxHeight: "120px" }}
                />

                <button onClick={handleSendMessage}>
                    <Image
                        width={28}
                        height={28}
                        src={"/sendmessage.png"}
                        className="w-5 h-5"
                        alt="send"
                    />
                </button>
            </div>
        </div>
    )
}

export default ViewersChat
