import Image from 'next/image'
import React from 'react'

interface ModalHeadersProps {
    buttonAcitve:string,
    setmodalshow:(val:boolean)=>void
}

function ModalHeaders({ setmodalshow, buttonAcitve }:ModalHeadersProps) {

    const handelButton = () => {
        setmodalshow(false)
    }

    return (
        <div className="header flex items-center justify-between ">
            <h1 className="text-black text-xl">

                {buttonAcitve == "bid-summary" && "Bid Summary"}
                {buttonAcitve == "chat" && "Chat With Others"}
                {buttonAcitve == "bidders-list" && "Biders List"}
                {buttonAcitve == "viewers-list" && "Viwers List"}

            </h1>
            <button onClick={handelButton}>
                <Image width={100} height={100} alt="reload" src={"/close.png"} className="w-4 h-4" />
            </button>
        </div>
    )
}

export default ModalHeaders