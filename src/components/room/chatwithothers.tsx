"use client";

import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';

function Chatwithothers() {
    const [message, setMessage] = useState("");
    const textareaRef = useRef(null);

    useEffect(() => {
        const textarea = textareaRef.current;
        textarea.style.height = "auto"; // Reset the height
        textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`
    }, [message]);

    const handleSendMessage = () => {
        if (message.trim() !== "") {
            // Logic to send the message
            console.log("Message sent:", message);
            setMessage(""); // Clear the textarea after sending
        }
    };

    return (
        <div className="maincontainer">
            <div className="messagebox">
                {/* Message content will be displayed here */}
            </div>

            <div className="buttonsPart absolute bottom-3 bg-gray-200 rounded-xl flex items-center justify-between px-3 py-3 w-[21rem] gap-2">
                <textarea
                    id="prompt-textarea"
                    ref={textareaRef}
                    rows="1"
                    placeholder="Message with Bidders"
                    className="w-full flex resize-none focus:outline-none bg-gray-200 items-center overflow-hidden"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={{ maxHeight: "120px" }}
                ></textarea>

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
    );
}

export default Chatwithothers;
