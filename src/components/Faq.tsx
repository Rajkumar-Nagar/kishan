"use client"

import React, { useEffect, useRef, useState } from 'react'
import Title from './ui/title';
import DropdownIcon from './ui/dropdown-icon';

const faq = [
    {
        question: "What is the purpose of the platform?",
        answer: "Our platform allows farmers to list their crops for sale and participate in an organized online mandi where they can sell their crops directly to buyers."
    },
    {
        question: "How can I list my crops for sale?",
        answer: "To list your crops, simply sign up or log in to your account, navigate to the 'List New Product' section, and provide the necessary details about your crops. Once submitted, your crops will be listed in the online mandi."
    },
    {
        question: "How does the online mandi work?",
        answer: "The online mandi is a virtual marketplace where listed crops are displayed for buyers to view and bid on. Farmers can receive bids from multiple buyers and choose the best offer to sell their crops."
    },
    {
        question: "What services does the platform offer besides crop listing and online mandi?",
        answer: "In addition to crop listing and online mandi, our platform offers services such as crop rate dashboards, AI bot assistance, transport booking, labor booking, farmer community, and land transactions."
    },
    {
        question: "Is there a fee to use the platform?",
        answer: "The platform may charge a nominal fee for certain services such as premium listings or additional support. However, basic crop listing and participation in the online mandi are free for farmers."
    }
]

interface FaqfieldProps {
    item: {
        question: string;
        answer: string;
    };
    askqustied: string;
    setaskqustied: (askqustied: string) => void;
}

const Faqfield = ({ item, setaskqustied, askqustied }: FaqfieldProps) => {


    const ref = useRef<HTMLDivElement>(null)

    const [maxHeight, setMaxheight] = useState("0px")
    const [show, setshow] = useState(false);

    const handelshow = () => {
        setaskqustied(item.question)
        setshow(!show)
    }

    const isopened = (askqustied == item.question) && show

    useEffect(() => {

        const height = ref.current?.scrollHeight
        setMaxheight(!isopened ? "0px" : height + "px")

    }, [isopened])


    return (
        <button onClick={handelshow} className="faq w-full border-b-2 py-3 ">
            <div className='flex items-center justify-between'>
                <h1 className='text-[#2e054e] test-xl text-left font-semibold'> {`Q. ${item.question}`}</h1>
                <DropdownIcon condition={isopened} />
            </div>
            <div className='text-[#888] text-start px-4 overflow-hidden transition-all duration-150 ease-in-out'
                ref={ref}
                style={{ maxHeight }}
            >
                {item.answer}
            </div>
        </button>
    )
}


function Faq() {

    const [askqustied, setaskqustied] = useState("")

    return (

        <div className="listedProduct my-20 px-6 sm:px-20 container max-w-screen-lg" id='faqs'>
            <Title content='Freqenty Asked Qustion' />
            <div className='my-10'>
                {
                    faq.map((item, index) => (
                        <Faqfield item={item} key={index} askqustied={askqustied} setaskqustied={setaskqustied} />
                    ))
                }
            </div>
        </div>
    )
}

export default Faq