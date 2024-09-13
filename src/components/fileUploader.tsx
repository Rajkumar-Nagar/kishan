"use client"

import { CldImage, CldVideoPlayer } from 'next-cloudinary'
import Image from 'next/image'
import React, { useState } from 'react'

type FileUploaderProps = {
    onUpload: (imageId: string) => void
    onDelete?: (imageId: string) => void
    preview?: boolean
    type?: "image" | "video"
}

const FileUploader = ({
    onUpload,
    onDelete,
    preview = true,
    type = "image"
}: FileUploaderProps) => {

    const _id = Math.random().toString(36).substring(7);
    const [publicId, setPublicId] = useState("")
    const [error, setError] = useState('');
    const [isloading, setIsloading] = useState(false)


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


    const handleFileChangeforImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const data = await uploadImage(file, type);
            setPublicId(data);
            onUpload(data);
            setIsloading(false)
            e.target.value = "";
        }
    };

    if (preview && publicId) {
        return (
            <div className="photobox1 relative w-28 h-28 border-2 flex items-center justify-center rounded-md">
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
                <button onClick={handleDelete} className='absolute -top-2 -right-2'>
                    <Image alt="reload" width={20} height={20} src={"/remove.png"} />
                </button>
            </div>
        )
    }

    return (

        <>
            <div className={`photobox1 relative ${preview && "w-28 h-28 border-2"} flex items-center justify-center rounded-md`}>

                <label htmlFor={`${_id}`} className='h-full w-full cursor-pointer flex items-center justify-center'>
                    {isloading ? (
                        <div className='border-2 border-orange-500 border-r-transparent w-6 h-6 rounded-full animate-spin' />
                    ) : (
                        <Image width={20} height={20} src={"/photo.png"} alt='reload' />
                    )}
                </label>

                <input
                    type="file"
                    id={`${_id}`}
                    className='hidden'
                    onChange={handleFileChangeforImage}
                    accept={type === 'video' ? 'video/*' : 'image/*'}
                />
            </div >
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </>
    )
}

export default FileUploader
