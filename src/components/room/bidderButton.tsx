
"use client"
import { MakeBid } from '@/actions/bid.action'
import { SOCKET_EVENTS } from '@/constants'
import { useAppSelector } from '@/lib/redux'
import { useSocket } from '@/providers/socket-provider'
import { useSession } from 'next-auth/react'
import React, { useCallback, useState } from 'react'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'

interface BidBoxProps {
    money: number
    handlePrice: (money: number) => void
}

const Bidbox = React.memo(({ money, handlePrice }: BidBoxProps) => {
    return (
        <button onClick={() => handlePrice(money)} className={`bg-orange-500 min-w-24 w-max h-10 px-4 text-white rounded-md items-center justify-center focus:border-2 focus:border-black`}>
            {`+ ₹${money}`}
        </button>
    )
})

Bidbox.displayName = 'Bidbox'


function BidderButtons({className}:{className?:string}) {
    const [bidPrice, setbidPrice] = useState(0)

    const { socket } = useSocket();
    const { data } = useSession()
    const { highestBid, product } = useAppSelector(state => state.bidRoom);

    const handlePrice = useCallback(async (money: number) => {
        const lastPrice = highestBid ? highestBid : +product?.productInfo?.expectedPrice!
        const currentPrice = money + lastPrice!
        setbidPrice(currentPrice);

        const bidData = {
            cropId: product?.id!,
            price: currentPrice,
            bidderId: data?.user.id,
            createdAt: new Date().toISOString(),
            room: "slot-1",
        }

        MakeBid(bidData).then(console.log)
        socket?.emit(SOCKET_EVENTS.MAKE_BID, bidData)
    }, [socket, highestBid, product, data?.user.id])


    return (
        <div className={cn("maincontainer py-2 flex flex-col w-full px-4 items-center",className)}>

            <div className='lg:max-w-full md:max-w-sm md:overflow-x-auto md:scollbar'>
                <div className="py-2 flex items-center gap-5">
                    {
                        [50, 100, 200, 500, 1000].map((item, index) => (
                            <Bidbox key={index} money={item} handlePrice={handlePrice} />
                        ))
                    }
                </div>
            </div>


            <div className="customeprize flex items-center gap-4">

                <input
                    type="text"
                    value={bidPrice}
                    placeholder='Enter Price'
                    onChange={(e) => {
                        let value = e.target.value
                        value = value.replace(/\D/g, '')
                        setbidPrice(+value)
                    }}
                    className='h-11 w-32 px-3 border-b-2 text-[#002f34] text-base border-gray-700 py-2 focus:outline-none focus:border-b-2 focus:border-b-blue-300'
                />

                <button
                    onClick={() => handlePrice(bidPrice)}
                    className="inline-flex h-10 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                >
                    BID
                </button>

            </div>

        </div>
    )
}

export default BidderButtons