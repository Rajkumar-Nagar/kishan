import { auth } from '@/auth'
import CImage from '@/components/Cimage'
import { Button } from '@/components/ui/button'
import prisma from '@/lib/prisma'
import { MandiType } from '@prisma/client'
import React from 'react'

const page = async ({
    params
}: {
    params: { id: string }
}) => {
    const session = await auth();
    const bidder = await prisma.user.findFirst({
        where: {
            id: '67051ac26b77cd9a7a800a5a'
        },
        omit: {
            password: true,
        },
        include: {
            licence: true,
        }
    });
    console.log(bidder);
    return (
        <div className='text-foreground flex-1 py-2 px-4'>
            {/* <pre className=''>
                {JSON.stringify(bidder, null, 2)}
            </pre> */}
            <div className="btns flex justify-end gap-3 mb-2">
                <Button variant={'destructive'}>Reject</Button>
                <Button>Approve</Button>
            </div>
            <div className="main space-y-6 divide-y [&>div]:p-2">
                <div className='flex flex-wrap border divide-x py-4 px-2'>
                    <div className="px-2">
                        <CImage src={bidder?.avatar!} alt={bidder?.name!} className='w-48 h-48 rounded-full' />
                    </div>
                    <div className='px-2 flex-1 flex items-center'>
                        <div className="">
                            <p>Name: {bidder?.name}</p>
                            <p>Email: {bidder?.email}</p>
                            <p>Phone Number: {bidder?.phoneNumber}</p>
                            <p>Additional Number: {bidder?.additional_number}</p>
                            <p>Address: {bidder?.address}</p>
                            <p>Status: <span className={`${bidder?.is_licence ? 'text-green-400' : 'text-red-400'}`}>{bidder?.is_licence ? "Approved" : "Pending"}</span></p>
                        </div>
                    </div>
                </div>

                <div className=''>
                    <h1 className='text-2xl'>Private Info</h1>

                    <div><h2>Aadhaar Details</h2>
                        <p>Aadhaar Number: {bidder?.aadhar_number}</p>

                        <div className='flex gap-2 flex-wrap'>
                            {bidder?.aadharphotos?.map((photo, index) => (
                                <CImage key={index} src={photo} alt={`Aadhar Photo ${index}`} className='w-48 h-48' />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="">
                    <h1 className='text-2xl'>Licence Info</h1>
                    <div className='space-y-2'>
                        <div className="[&_span]:text-muted-foreground grid lg:grid-cols-3 md:grid-cols-2">
                            <p>Licence Type: <span>{bidder?.licence?.mandiType}</span></p>
                            {
                                bidder?.licence?.mandiType === MandiType.MINI_MANDI && (
                                    <>
                                        <p>Licence State: <span>{bidder?.licence?.mandiState}</span></p>
                                        <p>Licence District: <span>{bidder?.licence?.madiDistrict}</span></p>
                                    </>
                                )
                            }
                            <p>State: <span>{bidder?.licence?.state}</span></p>
                            <p>District: <span>{bidder?.licence?.district}</span></p>
                            <p>Village: <span>{bidder?.licence?.village}</span></p>
                            <p>City: <span>{bidder?.licence?.city}</span></p>
                            <p>Pincode: <span>{bidder?.licence?.pincode}</span></p>
                            <p>Work: <span>{bidder?.licence?.work}</span></p>
                            <p>Income: <span>{bidder?.licence?.income}</span></p>
                            <p>Storage Place: <span>{bidder?.licence?.storagePlace}</span></p>
                            <p>Storage Location: <span>{bidder?.licence?.storageLocation}</span></p>
                        </div>
                        <h2 className='text-2xl'>
                            Store Images
                        </h2>
                        <div className='flex gap-2 flex-wrap'>
                            {bidder?.licence?.storageImages.map((photo, index) => (
                                <CImage key={index} src={photo} alt={`Aadhar Photo ${index}`} className='w-48 h-48' />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page
