"use client"

import { CldImage, CldVideoPlayer } from 'next-cloudinary'
import Image from 'next/image'
import React, { useState } from 'react'
import { getBgImageUser } from '@/actions/getBgImageUser'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

type FileUploaderProps = {
    onUpload?: (imageId: string) => void
    onDelete?: (imageId: string) => void
    profile?: boolean
    imageUploader?: boolean
    profileUploader?: boolean
    type?: "image" | "video"
}

const FileUploader = ({
    onUpload,
    onDelete,
    profile,
    imageUploader,
    profileUploader,
    type = "image"
}: FileUploaderProps) => {

    const _id = Math.random().toString(36).substring(7);
    const [publicId, setPublicId] = useState("")
    const [error, setError] = useState('');
    const [isloading, setIsloading] = useState(false)
    const router = useRouter()
    const { data: session, status } = useSession()

    const handleDelete = () => {
        onDelete?.(publicId)
        setPublicId("")
    };

    const uploadImage = async (file: File, type: 'video' | 'image') => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'rajkumar264');
        const endpoint = type === 'video' ? 'video' : 'image';
        try {
            setIsloading(true)
            const res = await fetch(`https://api.cloudinary.com/v1_1/de12ytbyw/${endpoint}/upload`, {
                method: 'POST',
                body: formData
            });

            if (!res.ok) {
                throw new Error(`Upload failed with status ${res.status}`);
            }
            const data = await res.json();
            return data.public_id
        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : 'An error occurred');
        }
    };

    const handleProfilechange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const data = await uploadImage(file, type);
            if (status === "authenticated") {
                if (!profile) {
                    const updateduser = await getBgImageUser(session?.user.id, data)
                    router.refresh()
                    //redux added 
                }
                onUpload?.(data);
                setIsloading(false)
            }
        }
    };

    const handleFileChangeforImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const data = await uploadImage(file, type);
            setPublicId(data);
            onUpload?.(data);
            setIsloading(false)
        }
    };


    return (

        <>

            {
                profileUploader && (
                    <>
                        <label htmlFor={`${_id}`} className='h-full w-full cursor-pointer flex items-center justify-center'>
                            {
                                isloading ? "Loding ...." : (
                                    <Image width={20} height={20} src={"/photo.png"} alt='reload' />
                                )
                            }
                        </label>
                        <input
                            type="file"
                            id={`${_id}`}
                            className='hidden'
                            onChange={handleProfilechange} />
                    </>
                )
            }
            {
                imageUploader &&
                <div className="photobox1 relative w-28 h-28 border-2 flex items-center justify-center rounded-md">
                    {
                        (publicId) &&
                        <button onClick={handleDelete} className='absolute -top-2 -right-2'>
                            <Image alt="reload" width={20} height={20} src={"/remove.png"} />
                        </button>
                    }

                    {
                        publicId ? (
                            <CldImage
                                alt="Uploaded Image"
                                src={publicId}
                                width={"112"}
                                height={"112"}
                                className='w-full h-full '
                                crop={{
                                    type: 'auto',
                                    source: true
                                }}
                            />

                        ) : (
                            <>
                                <label htmlFor={`${_id}`} className='h-full w-full cursor-pointer flex items-center justify-center'>
                                    {
                                        isloading ? "Loding ...." : (
                                            <Image width={30} height={30} src={"/photo.png"} alt='reload' />
                                        )
                                    }
                                </label>

                                <input
                                    type="file"
                                    id={`${_id}`}
                                    className='hidden'
                                    onChange={handleFileChangeforImage} />
                            </>
                        )
                    }

                </div >
            }

            {error && <p className="text-red-500 mt-2">{error}</p>}
        </>
    )
}

export default FileUploader
