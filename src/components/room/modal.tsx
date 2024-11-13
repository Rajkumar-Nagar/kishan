import React from 'react'
import { Sheet, SheetContent } from '../ui/sheet'
import Bidders_viewers_list from './bidders-viewers-list'
import Chatwithothers from './chatwithothers'
import BidSummary from './bidSummary'
import Image from 'next/image'

interface ModalProps {
    buttonAcitve: string,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    isOpen: boolean
}

function Modal({ buttonAcitve, setIsOpen, isOpen }: ModalProps) {
    const handleClose = () => {
        setIsOpen(false)
    }
    return (
        <Sheet onOpenChange={setIsOpen} open={isOpen}>
            <SheetContent className='w-full pt-10 bg- border-none sm:pl-0 px-2 sm:px-6'>
                <div className="flex flex-col gap-3 relative w-full bg-white h-full py-5 px-6 rounded-lg border-black">

                    <div className="header flex items-center justify-between ">
                        <h1 className="text-black text-xl">

                            {buttonAcitve == "bid-summary" && "Bid Summary"}
                            {buttonAcitve == "chat" && "Chat With Others"}
                            {buttonAcitve == "bidders-list" && "Biders List"}
                            {buttonAcitve == "viewers-list" && "Viwers List"}

                        </h1>
                        <button onClick={handleClose} className='outline-none'>
                            <Image width={100} height={100} alt="reload" src={"/close.png"} className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="search">
                        <input
                            type="text"
                            placeholder='Search Bidders'
                            className='h-11 w-full rounded-md pl-10 border-2 text-[#002f34] text-base border-gray-400 py-2 focus:outline-none focus:border-2 focus:border-blue-300'
                            style={{
                                backgroundImage: "url(/search.png)",
                                backgroundSize: "18px 18px",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "10px center",
                            }}
                        />
                    </div>

                    <div className="flex-1">

                        {
                            (buttonAcitve == "viewers-list" || buttonAcitve == "bidders-list") &&
                            <Bidders_viewers_list buttonAcitve={buttonAcitve} />
                        }
                        {
                            buttonAcitve == "chat" &&
                            <Chatwithothers />
                        }
                        {
                            buttonAcitve == "bid-summary" &&
                            <BidSummary buttonAcitve={buttonAcitve} />
                        }

                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default Modal