import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { Product_details_slider } from "@/components/product_details_slider";
import Image from "next/image";
import { CldImage } from "next-cloudinary";
import BasicDetails from "@/components/room/basicDetails";
import BidderButtons from "@/components/room/bidderButton";
import HeaderButton from "@/components/room/headerButtons";
import { productOptions } from "@/actions/include.options";

export default async function Page({
    searchParams
}: {
    searchParams: {
        name: string;
        room: string;
        userId: string;
    }
}) {

    const name = searchParams?.name || "quickstart-user";
    const room = searchParams?.room || "quickstart-room";

    const session = await auth();
    const userId = session?.user?.id || searchParams?.userId || Math.random().toString(36).substring(7);

    const product = await prisma.product.findFirst({
        include: productOptions
    })


    return (

        <div className="maincontainer">
            <div className="mainbox relative">


                <div className="header bg-[#6cbdaf] h-20 w-full flex items-center justify-between px-10">
                    <div className="left">
                        <h1 className="text-white text-3xl font-semibold">Kota,Rajashtan mandi</h1>
                    </div>

                    <HeaderButton product={product} />

                </div>

                <div className="afterHeader flex  mt-5 px-10 justify-center gap-5">

                    <div className="product_slider w-[40%] flex flex-col">
                        <Product_details_slider product={product!} height={20} />
                        <div className="otherDetails">

                            <BasicDetails product={product!} />

                        </div>
                    </div>
                    <div className="rightpart w-[50%]">

                        <div className="topright flex border-[1px] rounded-md w-full h-72"
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(6, 1fr)",
                                gridTemplateRows: "repeat(6, 1fr)"
                            }}>

                            <div
                                className="flex col-start-1 col-end-4 row-start-1 row-end-5 items-center justify-center border-b-[1px] border-r-[1px]">
                                <div className="timer w-40 h-40  bg-[#6cbdaf] rounded-full flex items-center justify-center ">
                                    <h1 className="text-white text-5xl font-bold">30</h1>
                                </div>
                            </div>

                            <div className="price col-start-1 col-end-4 row-start-5 row-end-7 flex items-center justify-center gap-1 border-r-[1px]"
                            >
                                <Image
                                    width={100}
                                    height={100}
                                    alt='reload'
                                    className="h-10 w-10"
                                    src={"/party.png"}
                                />
                                <h1 className="text-[#002f34] text-4xl font-bold">₹5000</h1>
                                <h1 className="text-gray-400 text-xl font-semibold">(BP:₹5000)</h1>
                            </div>

                            <div className="profile col-start-4 col-end-7 row-start-1 row-end-3 flex items-center justify-center px-6 py-4 gap-3 px border-b-[1px]"
                            >
                                {
                                    product?.pesonalInfo.avatar ?
                                        <CldImage
                                            alt="Uploaded Image"
                                            src={product?.pesonalInfo.avatar}
                                            width={"170"}
                                            height={"170"}
                                            className='w-32 h-32 rounded-full'
                                            crop={{
                                                type: 'auto',
                                                source: true
                                            }}
                                        /> : (
                                            <div className="profile w-14 h-14 rounded-full bg-gray-600 flex items-center justify-center">
                                                <h1 className="text-[white] text-xl font-semibold">{product?.pesonalInfo?.name.slice(0, 1)}</h1>
                                            </div>
                                        )
                                }
                                <div className='space-y-1'>
                                    <h1 className='text-xl font-semibold text-[#2e054e]'>{product?.pesonalInfo.name}</h1>
                                    <div className='flex items-center gap-2'>
                                        <span className='text-base text-[#2e054e]'>5</span>
                                        <Image
                                            width={20}
                                            height={20}
                                            alt='reload'
                                            src={"/star.png"}
                                        />

                                        <span className='text-base text-[#2e054e]'>(10 user)</span>
                                    </div>
                                </div>

                                <Image
                                    width={100}
                                    height={100}
                                    alt='reload'
                                    className="h-14 w-14"
                                    src={"/King.png"}
                                />
                            </div>
                            <div className="lastbid col-start-4 col-end-7 row-start-3 row-end-5 flex items-center px-10 gap-2 border-b-[1px]"
                            >
                                <Image
                                    width={100}
                                    height={100}
                                    alt='reload'
                                    className="w-12 h-12"
                                    src={"/salary.png"}
                                />
                                <div className="flex items-center gap-1">
                                    <h1 className="text-gray-400 text-xl">Last Bid :</h1>
                                    <h1 className="text-[#002f34] text-xl font-bold">₹300</h1>
                                </div>
                            </div>

                            <div className="col-start-4 col-end-7 row-start-5 row-end-7 flex items-center justify-center">
                                <div className="flex items-center justify-center">
                                    <button className="w-40 h-9 rounded-md bg-orange-500 text-white font-semibold">Bid Summary</button>
                                </div>
                            </div>
                        </div>

                        <div className="selfProfilePart px-10 ">

                            <div className="profile col-start-4 col-end-7 row-start-1 row-end-3 flex items-center  px-6  pt-10 gap-3  "
                            >
                                {
                                    product?.pesonalInfo.avatar ?
                                        <CldImage
                                            alt="Uploaded Image"
                                            src={product?.pesonalInfo.avatar}
                                            width={"170"}
                                            height={"170"}
                                            className='w-32 h-32 rounded-full'
                                            crop={{
                                                type: 'auto',
                                                source: true
                                            }}
                                        /> : (
                                            <div className="profile w-20 h-20 rounded-full bg-gray-600 flex items-center justify-center">
                                                <h1 className="text-[white] text-xl font-semibold">{product?.pesonalInfo?.name.slice(0, 1)}</h1>
                                            </div>
                                        )
                                }
                                <div className='space-y-1'>
                                    <h1 className='text-xl font-semibold text-[#2e054e]'>You</h1>
                                    <div className='flex items-center gap-2'>
                                        <span className='text-base text-[#2e054e]'>5</span>
                                        <Image
                                            width={20}
                                            height={20}
                                            alt='reload'
                                            src={"/star.png"}
                                        />
                                        <span className='text-base text-[#2e054e]'>(10 user)</span>
                                    </div>
                                </div>

                                <div className="biddupdate">
                                    <div className="flex items-center gap-1">
                                        <h1 className="text-gray-400 text-base">Your Last Bid :</h1>
                                        <h1 className="text-[#002f34] text-base font-semibold">₹300</h1>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <h1 className="text-gray-400 text-base">Your total Bid :</h1>
                                        <h1 className="text-[#002f34] text-base font-semibold">2</h1>
                                    </div>
                                </div>

                                {/* 
                                <Image
                                    width={100}
                                    height={100}
                                    alt='reload'
                                    className="h-14 w-14"
                                    src={"/King.png"}
                                /> */}
                            </div>

                            <BidderButtons />

                        </div>



                    </div>
                </div>
            </div>
        </div>
    );
}