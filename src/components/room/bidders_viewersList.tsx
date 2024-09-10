
import Image from 'next/image'
import React, { useState } from 'react'
import ModalHeaders from './modalHeaders'
import ModalContent from './modalContent'

function Bidder_viewer({ product, buttonAcitve, setmodalshow }) {
    return (

        <div className="BidderList absolute w-full h-full py-7 flex px-10 justify-end   inset-0 bg-gray-800  bg-opacity-50  z-50 ">
            <div className="biddrelistbox  w-96 relative  bg-white h-full py-5 px-6  rounded-lg border-black">

                <ModalHeaders buttonAcitve={buttonAcitve} setmodalshow={setmodalshow} />

                <div className="search mt-8">
                    <input
                        type="text"
                        // value={`₹ ${bidPrice}`}
                        placeholder='Search Bidders'
                        // onChange={(e) => { setbidPrice(e.target.value) }}
                        className='h-11 w-full rounded-md pl-10 border-2 text-[#002f34] text-base border-gray-400 py-2 focus:outline-none focus:border-2 focus:border-blue-300'
                        style={{
                            backgroundImage: "url(/search.png)",
                            backgroundSize: "18px 18px", // Adjust size as needed
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "10px center", // Position the image on the left
                        }}
                    />
                </div>

                <ModalContent product={product} buttonAcitve={buttonAcitve} />

            </div>
        </div>

    )
}
export default Bidder_viewer