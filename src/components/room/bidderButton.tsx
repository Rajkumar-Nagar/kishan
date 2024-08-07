
"use client"
import React, { useState } from 'react'


const Bidbox = ({ money, setbidPrice, bidPrice }) => {

    const handelPrice = () => {
        setbidPrice(money)
    }

    const change = bidPrice === money

    return (
        <button onClick={handelPrice} className={`bg-orange-500 w-20 h-10 text-white rounded-md items-center justify-center ${change ? 'border-2 border-black' : ''}`}
        >
            {`₹ ${money}`}
        </button>
    )
}


function BidderButtons() {
    const [bidPrice, setbidPrice] = useState("")
    return (
        <div className="maincontainer   py-5 flex flex-col ">

            <div className="preBiuldButtons flex items-center gap-5 flex-wrap">
                {
                    ["50", "100", "200", "500", "1000"].map((item, index) => (
                        <Bidbox key={index} money={item} setbidPrice={setbidPrice} bidPrice={bidPrice} />
                    )
                    )
                }
            </div>

            <div className="customeprize flex items-center gap-4 mt-6">

                <input
                    type="text"
                    value={`₹ ${bidPrice}`}

                    placeholder='Enter Price'
                    onChange={(e) => { setbidPrice(e.target.value) }}
                    className='h-11 w-32  px-3 border-b-2 text-[#002f34] text-base border-gray-700 py-2 focus:outline-none focus:border-b-2 focus:border-b-blue-300'
                />

                <button className="inline-flex h-10 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                    BID
                </button>

            </div>

        </div>
    )
}

export default BidderButtons