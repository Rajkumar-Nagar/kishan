import React from "react";
import { FlipWords } from "../ui/flip-words";

export function FlipWordsDemo() {
    const words = ["successful", "prosperous", "thriving", "sustainable", "rewarding"];

    return (
        <div className="flex justify-center items-center px-4">
            <div className="text-4xl mx-auto font-normal ">
                Make Farmer More
                <FlipWords words={words} />
            
            </div>
        </div>
    );
}
