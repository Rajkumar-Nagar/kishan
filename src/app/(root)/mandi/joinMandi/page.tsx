import Allindiamandijoin from '@/components/onlineMandi/Allindiamandijoin'
import JoinPageSlider from '@/components/onlineMandi/joinPageSlider'
import MiniMandiSelect from '@/components/onlineMandi/MiniMandiSelect'
import { StickyScrollRevealDemo } from '@/components/onlineMandi/StickyScroll'
import { TracingBeam } from '@/components/ui/tracing-beam'
import Image from 'next/image'
import React from 'react'

function page() {

    return (
        <div className="Mainconainer">
            <div className="mainbox w-[80%] mx-auto">

                <div className="header mt-10">
                    <JoinPageSlider />
                </div>

                <div className="afterHeader py-10">
                    <div className="heading_dis space-y-4">
                        <div className="heading flex justify-center items-center gap-2 ">
                            <div>
                                <span className='text-5xl text-[#e7a137] font-semibold'>Wel</span>
                                <span className='text-5xl text-[#0d0d0d] font-semibold'>come</span>
                            </div>
                            <span className='text-5xl text-[#30ab55] font-semibold'>to Kisan</span>
                            <span className='text-5xl text-[#30ab55] font-semibold'>Online Mandi</span>
                        </div>

                        <div className="dis max-w-5xl mx-auto">
                            <p className='text-gray-400 '>
                                your ultimate destination for buying and selling crops with ease and efficiency. Our platform connects farmers across India to a wide network of mandis, ensuring fair prices and transparent transactions. Whether you are a small-scale farmer or a large producer, Kisan Online Mandi is here to help you maximize your profits and streamline your sales process.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="next">
                    <TracingBeam>
                        <div className="AllINdiamandi">
                            <div className="max-w-3xl mx-auto antialiased pt-4 relative">
                                <div className="text-sm  prose prose-sm dark:prose-invert">
                                    <Image
                                        src={"/Mandi.jpg"}
                                        alt="blog thumbnail"
                                        height="1000"
                                        width="1000"
                                        className="rounded-lg mb-4 object-cover"
                                    />
                                    <h1 className=' text-black font-semibold text-4xl py-4'>
                                        All India Mandi
                                    </h1>
                                    <p className=' text-gray-500 font-semibold text-base '>
                                        Join our All India Mandi to connect with buyers from every corner of the country. This unique platform allows you to sell your crops on a national scale, ensuring you get the best prices and widest reach. With a single mandi catering to the entire nation, you can be assured of a highly competitive and transparent bidding process, giving you the best value for your produce.</p>

                                    <Allindiamandijoin />
                                </div>
                            </div>
                        </div>

                        <div className="minimandi mt-7">
                            <div className="max-w-3xl mx-auto antialiased pt-4 relative">
                                <div className="text-sm  prose prose-sm dark:prose-invert">
                                    <Image
                                        src={"/natural.jpg"}
                                        alt="blog thumbnail"
                                        height="1000"
                                        width="1000"
                                        className="rounded-lg mb-4 object-cover"
                                    />
                                    <h1 className=' text-black font-semibold text-4xl py-4'>
                                        Mini Mandis
                                    </h1>
                                    <p className=' text-gray-500 font-semibold text-base '>
                                        Our Mini Mandis are designed for farmers who prefer to trade within their specific states and districts. Each mini mandi is strategically located to cater to the unique needs of its region. With multiple mini mandis spread across different states and districts, you can enjoy localized trading that saves time and reduces transportation costs. Each mini mandi location is supported by a dedicated Kisan Center, providing essential services and support to farmers</p>

                                    <MiniMandiSelect />

                                </div>
                            </div>
                        </div>

                        <div className="MandiQstion mt-10">
                            <div className="title py-4">
                                <div>
                                    <span className='text-5xl text-[#e7a137] font-semibold'>How To </span>
                                    <span className='text-5xl text-[#0d0d0d] font-semibold'>Sell</span>
                                </div>
                                <span className='text-5xl text-[#30ab55] font-semibold'>Crops</span>
                                <span className='text-5xl text-[#30ab55] font-semibold'>  in Online Mandi</span>
                            </div>

                            <StickyScrollRevealDemo />
                        </div>

                    </TracingBeam>



                </div>
            </div>
        </div>
    )
}

export default page