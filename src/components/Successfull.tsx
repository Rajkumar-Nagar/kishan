import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'

function Successfull({ ...props }) {
    return (
        <div className="addedconfirmation w-full h-full"
            style={{
                backgroundImage: `url(${props.imgurl})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
            }}
        >
            <div className=" backdrop-blur-sm flex justify-center items-center w-full h-full  p-8">

                <div className="imagebox w-[80%] overflow-hidden rounded-md h-[80%] bg-white flex items-center">
                    <div className="photo_container  w-1/2  h-full"
                        style={{
                            backgroundImage: `url(${props.imgurl})`,
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            // backgroundPosition: '',
                        }}>

                    </div>

                    <div className=' flex flex-col space-y-3 items-center px-6'>

                        <div className='flex items-center gap-4'>
                            <Image alt="reload" width={150} height={150} src={"/party.png"} />
                            <h1 className='text-green-500 font-semibold text-3xl'> Congratulations!</h1>
                        </div>

                        <h1 className=' text-[#002f34] text-xl'>
                            {
                                props.title
                            }
                        </h1>

                        <p className=' text-[#002f34] text-xs'>
                            Thank you for your contribution. Together, let&apos;s make farming more efficient and profitable!
                        </p>

                        <Link href={"/"} className=' text-[#002f34] text-base underline ' >
                            Go Home
                        </Link>

                        {
                            props?.product &&
                            <Button variant={"Login"} onClick={() => { props?.setConformation(false) }}>
                                Add Another product
                            </Button>
                        }


                    </div>

                </div>
            </div>

        </div >
    )
}

export default Successfull