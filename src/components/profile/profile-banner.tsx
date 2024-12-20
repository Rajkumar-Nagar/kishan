"use client"
import CImage from '@/components/Cimage'
import FileUploader from '@/components/fileUploader'
import React, { useState } from 'react'

const ProfileBanner = ({
    userId,
    bgImage
}: {
    userId: string;
    bgImage?: string | null;
}) => {
    const [image, setImage] = useState(bgImage)

    const handleBannerUpload = async (imageId: string) => {
        if (!userId) return
        setImage(imageId)
        //TODO: update user profile with new banner image
        // await getBgImageUser(userId, imageId)
    }

    return (
        <>
            {image && (
                <div className="bgimage w-full h-full absolute">
                    <CImage
                        alt="Uploaded Image"
                        src={image}
                        width={300}
                        height={100}
                        className='w-full h-full'
                        crop={{ type: 'auto', source: true }}
                    />
                </div>
            )}
            <div className="editbutton bg-gray-300 rounded-full p-2 absolute top-3 right-3">
                <FileUploader onUpload={handleBannerUpload} preview={false} />
            </div>
        </>
    )
}

export default ProfileBanner
