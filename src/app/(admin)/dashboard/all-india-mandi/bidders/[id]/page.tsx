import { auth } from '@/auth'
import CImage from '@/components/Cimage'
import DImage from '@/components/DImage'
import prisma from '@/lib/prisma'
import { LicenceStatus, MandiType } from '@prisma/client'
import React from 'react'
import LicenceActionButtons from './licence-action-btn'
import { isValidObjectId } from '@/lib/utils'
import { notFound } from 'next/navigation'

const page = async ({
    params
}: {
    params: { id: string }
}) => {
    // if (!isValidObjectId(params.id)) notFound();

    const session = await auth();
    const licence = await prisma.licence.findFirst({
        where: {
            userId: '67051ac26b77cd9a7a800a5a',
        },
        include: {
            user: {
                omit: {
                    password: true,
                },
            },
        }
    });
    if (!licence) notFound();
    const bidder = licence.user;

    return (
        <div className='flex-1 py-2 px-4'>
            <div className="btns flex justify-end gap-3 mb-2">
                <LicenceActionButtons id={params.id} />
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
                            <p>Additional Number: {bidder?.additionalNumber}</p>
                            <p>Address: {bidder?.address}</p>
                            <p>Status: <span className={`${licence?.status === LicenceStatus.APPROVED ? 'text-green-400' : 'text-red-400'}`}>{licence?.status}</span></p>
                        </div>
                    </div>
                </div>

                <div className=''>
                    <h1 className='text-2xl'>Private Info</h1>

                    <div><h2>Aadhaar Details</h2>
                        <p>Aadhaar Number: {bidder?.aadharNumber}</p>

                        <div className='flex gap-2 flex-wrap'>
                            {bidder?.aadharPhotos?.map((photo, index) => (
                                <DImage key={index} src={photo} alt={`Aadhar Photo ${index}`} className='w-auto border h-48' />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="">
                    <h1 className='text-2xl'>Licence Info</h1>
                    <div className='space-y-2'>
                        <div className="[&_span]:text-muted-foreground grid lg:grid-cols-3 md:grid-cols-2">
                            <p>Licence Type: <span>{licence?.mandiType}</span></p>
                            {
                                licence?.mandiType === MandiType.MINI_MANDI && (
                                    <>
                                        <p>Licence State: <span>{licence?.mandiState}</span></p>
                                        <p>Licence District: <span>{licence?.madiDistrict}</span></p>
                                    </>
                                )
                            }
                            <p>State: <span>{licence?.state}</span></p>
                            <p>District: <span>{licence?.district}</span></p>
                            <p>Village: <span>{licence?.village}</span></p>
                            <p>City: <span>{licence?.city}</span></p>
                            <p>Pincode: <span>{licence?.pincode}</span></p>
                            <p>Work: <span>{licence?.work}</span></p>
                            <p>Income: <span>{licence?.income}</span></p>
                            <p>Storage Place: <span>{licence?.storagePlace}</span></p>
                            <p>Storage Location: <span>{licence?.storageLocation}</span></p>
                        </div>
                        <h2 className='text-2xl'>
                            Store Images
                        </h2>
                        <div className='flex gap-2 flex-wrap'>
                            {licence?.storageImages.map((photo, index) => (
                                <DImage key={index} src={photo} alt={`Aadhar Photo ${index}`} className='w-auto h-48 border' />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page
