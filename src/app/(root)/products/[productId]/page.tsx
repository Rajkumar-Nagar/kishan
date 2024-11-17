import Faq from '@/components/Faq'
import { Product_details_slider } from '@/components/product_details_slider'
import { CarouselSize } from '@/components/product_slider'
import Image from 'next/image'
import Link from 'next/link'
import Title from '@/components/ui/title'
import { getProductById } from '@/actions/product.actions'
import MoreDetails from '@/components/room/moreDetails'
import CImage from '@/components/Cimage'
import { auth } from '@/auth'


async function Page({ params }: { params: { productId: string } }) {
    const product = await getProductById(params.productId)
    const session=await auth()

    
    if (!product) {
        throw new Error("product details fetching failed")
    }

    return (
        <div className="maincontainer w-full h-full">
            <div className="crousalcontainer w-full justify-center flex md:px-10 lg:px-20 px-2 xs:px-4 py-2 md:py-8">
                <div className="topbox w-full h-full flex lg:flex-row flex-col justify-center gap-5 relative">

                    <div className='h-full space-y-3'>
                        <div className="w-full lg:max-w-screen-sm">
                            <Product_details_slider product={product} height={26} />
                        </div>
                        {/* <button className="hidButoon">
                            <Image src={"/down.png"} width={80} height={80} alt='relaod' className='w-5 h-5' />
                        </button> */}
                        <div className='hidden md:block'>
                            <MoreDetails product={product} />
                        </div>
                    </div>

                    <div className='space-y-5  md:sticky top-20 h-full'>
                        <div className="basicdetails w-full py-5 px-5 space-y-2  rounded-md border-[1px] ">
                            <div className="firstrow  rounded-md flex items-center justify-between ">
                                <h1 className='text-xl font-semibold text-[#2e054e]'>{product.productInfo?.cropName}</h1>

                                <div className='flex items-center gap-4'>
                                    <Image
                                        width={23}
                                        height={23}
                                        alt='reload'
                                        src={"/heart.png"}
                                    />
                                    <Image
                                        width={23}
                                        height={23}
                                        alt='reload'
                                        src={"/share.png"}
                                    />
                                </div>
                            </div>

                            <div className="secondrow flex flex-wrap items-center justify-between gap-2 text-base font-semibold ">
                                <p className='text-[#2e054e]'>
                                    Quantity:{" "}
                                    <span className='text-[#64566f]'>{`${product.productInfo?.quantityAvailable} kg`}</span>
                                </p>
                                <p className='text-[#2e054e]'>Variety:{" "}
                                    <span className='text-[#64566f]'>{product.productInfo?.variety}</span>
                                </p>
                            </div>

                            <div className="secondrow flex items-center gap-8">
                                <h1 className='text-2xl font-bold text-[#2e054e]'>{`₹ ${product.productInfo?.expectedPrice} / ${product.productInfo?.units}`}</h1>
                            </div>

                            <div className="locationpart border-t-2">

                                <div className="secondrow py-3">
                                    <div className='flex items-center gap-2'>
                                        <Image
                                            width={45}
                                            height={20}
                                            alt='reload'
                                            src={"/live.png"}
                                        />
                                        <p className='text-[#2e054e] text-base font-semibold'>
                                            Live Streaming:{" "}
                                            <span className='text-[#64566f]'>Available</span>
                                        </p>
                                    </div>

                                    <div className='flex items-center gap-2'>
                                        <Image
                                            width={35}
                                            height={20}
                                            alt='reload'
                                            src={"/sample.png"}
                                        />

                                        <p className='text-[#2e054e] text-base font-semibold'>
                                            Sample Request:{" "}
                                            <span className='text-[#64566f]'>Available</span>
                                        </p>
                                    </div>
                                </div>


                                <div className='flex gap-3 border-t-2 pt-3'>
                                    <Image
                                        src="/location1.png"
                                        height="15"
                                        width="15"
                                        alt="thumbnail"
                                    />
                                    <span className="text-xs w-full font-semibold text-[#74667f] dark:text-white">
                                        {`${product.locationInfo.village}, ${product.locationInfo.districtCity},${product.locationInfo.state},${product.locationInfo.pincode}`}
                                    </span>
                                </div>
                            </div>

                        </div>

                        <div className="profile w-full p-2 xs:p-5 space-y-3 rounded-md border-[1px] ">

                            <div className="profile flex items-center gap-3">
                                {
                                   session?. user?.avatar ?
                                        <CImage
                                            alt="Uploaded Image"
                                            src={session?.user?.avatar}
                                            width={"170"}
                                            height={"170"}
                                            className='w-20 h-20 rounded-full'
                                            crop={{
                                                type: 'auto',
                                                source: true
                                            }}
                                        /> : (
                                            <div className="profile w-24 h-24 rounded-full bg-gray-600 flex items-center justify-center">
                                                <h1 className="text-[#002f34] text-xl font-semibold">{session?.user?.name?.slice(0, 1)}</h1>
                                            </div>
                                        )
                                }

                                <div className='space-y-1'>
                                    <h1 className='text-xl font-semibold text-[#2e054e]'>{product.personalInfo.name}</h1>

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
                            </div>


                            <div className="chatandcall flex flex-wrap gap-3">
                                <div className="chat flex-grow flex items-center text-base hover:bg-[#5ddbbc] hover:text-[#ffff] hover:border-black cursor-pointer font-semibold text-[#2e054e] justify-center py-1  border-2 rounded-md gap-4">
                                    <Image
                                        width={30}
                                        height={30}
                                        alt='reload'
                                        src={"/message1.png"}
                                    />
                                    <span>Message</span>
                                </div>

                                <div className="chat flex-grow flex items-center text-base hover:bg-[#5ddbbc] hover:text-[#ffff] hover:border-black cursor-pointer font-semibold text-[#2e054e] justify-center py-1  border-2 rounded-md gap-4">
                                    <Image
                                        width={20}
                                        height={20}
                                        alt='reload'
                                        src={"/phone3.png"}
                                    />
                                    <span >Phone</span>
                                </div>
                            </div>

                            <div className='flex gap-3 border-t-2 pt-3'>
                                <Image
                                    src="/location1.png"
                                    height="15"
                                    width="15"
                                    alt="thumbnail"
                                />
                                <span className="text-xs w-full font-semibold  text-[#74667f] dark:text-white">
                                    {`${product.locationInfo.village}, ${product.locationInfo.districtCity},${product.locationInfo.state},${product.locationInfo.pincode}`}
                                </span>
                            </div>

                        </div>
                    </div>

                    <div className='block md:hidden'>
                        <MoreDetails product={product} />
                    </div>

                </div>
            </div>

            <div className="listedProduct my-10 ">

                <Title content={"Similar Crops"} />

                <div className='w-full md:px-20 px-6 py-7'>
                    <CarouselSize />
                </div>

                <div className='w-full flex justify-center items-center '>
                    <Link href={"/products"} className='w-36 py-1 flex items-center justify-center rounded-md  border-[1px] border-gray-500 gap-2'>
                        <h1 className='text-[#002f34] text-base font-semibold'>See more</h1>
                        <Image width={16} height={1} alt='reload' src={"/down.png"} />
                    </Link>
                </div>

            </div>

            <Faq />
        </div>
    )
}

export default Page