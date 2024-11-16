"use client";

import React, { useEffect, useRef, useState } from "react";
import Title from "./ui/title";
import DropdownIcon from "./ui/dropdown-icon";

const faq = [
    {
        question: "What is the purpose of the platform?",
        answer: "Our platform allows farmers to list their crops for sale and participate in an organized online mandi where they can sell their crops directly to buyers.",
    },
    {
        question: "How can I list my crops for sale?",
        answer: "To list your crops, simply sign up or log in to your account, navigate to the 'List New Product' section, and provide the necessary details about your crops. Once submitted, your crops will be listed in the online mandi.",
    },
    {
        question: "How does the online mandi work?",
        answer: "The online mandi is a virtual marketplace where listed crops are displayed for buyers to view and bid on. Farmers can receive bids from multiple buyers and choose the best offer to sell their crops.",
    },
    {
        question: "What services does the platform offer besides crop listing and online mandi?",
        answer: "In addition to crop listing and online mandi, our platform offers services such as crop rate dashboards, AI bot assistance, transport booking, labor booking, farmer community, and land transactions.",
    },
    {
        question: "Is there a fee to use the platform?",
        answer: "The platform may charge a nominal fee for certain services such as premium listings or additional support. However, basic crop listing and participation in the online mandi are free for farmers.",
    },
];

interface FaqFieldProps {
    item: {
        question: string;
        answer: string;
    };
    activeQuestion: string;
    setActiveQuestion: (question: string) => void;
}

const FaqField: React.FC<FaqFieldProps> = ({ item, activeQuestion, setActiveQuestion }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [maxHeight, setMaxHeight] = useState("0px");

    const isOpen = activeQuestion === item.question;

    const handleToggle = () => {
        setActiveQuestion(isOpen ? "" : item.question);
    };

    useEffect(() => {
        const height = ref.current?.scrollHeight || 0;
        setMaxHeight(isOpen ? `${height}px` : "0px");
    }, [isOpen]);

    return (
        <button onClick={handleToggle} className="faq w-full border-b-2 py-3">
            <div className="flex items-center justify-between">
                <h1 className="text-[#2e054e] text-left font-semibold">{`Q. ${item.question}`}</h1>
                <DropdownIcon condition={isOpen} />
            </div>
            <div
                className="text-[#888] text-start px-4 overflow-hidden transition-all duration-150 ease-in-out"
                ref={ref}
                style={{ maxHeight }}
            >
                {item.answer}
            </div>
        </button>
    );
};

const Faq: React.FC = () => {
    const [activeQuestion, setActiveQuestion] = useState("");

    return (
        <div className="listedProduct my-20 px-6 sm:px-20 container max-w-screen-lg" id="faqs">
            <Title content="Frequently Asked Questions" />
            <div className="my-10">
                {faq.map((item, index) => (
                    <FaqField
                        item={item}
                        key={index}
                        activeQuestion={activeQuestion}
                        setActiveQuestion={setActiveQuestion}
                    />
                ))}
            </div>
        </div>
    );
};

export default Faq;
