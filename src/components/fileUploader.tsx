"use client"

import { CldImage, CldVideoPlayer } from 'next-cloudinary'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'


const FileUploader = ({ setUploadImages, setUploadVideos, videoFile, _id }) => {

    const [imageId, setImageId] = useState("")
    const [videoId, setVideoId] = useState("")
    const [error, setError] = useState('');
    const [isloading, setIsloading] = useState(false)


    const handleDelete = () => {
        setUploadImages((prev) => {
            const allcrops = [...prev]
            const newCard = allcrops.filter((id) => id !== imageId);
            return newCard;
        });
        setImageId("")
    };
    
    useEffect(() => {
        if (imageId) {
            setUploadImages((prev) => [...prev, imageId]);
        }
    }, [imageId]);

    useEffect(() => {
        if (imageId) {
            setUploadVideos((prev) => [...prev, videoId]);
        }
    }, [videoId]);


    const uploadImage = async (file, type) => {
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

    const handleFileChangeforImage = async (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const data = await uploadImage(file, "image");
            setImageId(data)
            setIsloading(false)
        }
    };

    const handleFileChangeforVideo = async (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const data = await uploadImage(file, "video");
            setVideoId(data)
            setIsloading(false)
        }
    };

    return (

        <>
            <div className="photobox1 relative w-28 h-28 border-2 flex items-center justify-center rounded-md">

                {
                    (imageId || videoId) &&
                    <button onClick={handleDelete} className='absolute -top-2 -right-2'>
                        <Image alt="reload" width={20} height={20} src={"/remove.png"} />
                    </button>
                }

                {
                    !videoFile ? (
                        imageId ? (

                            <CldImage
                                alt="Uploaded Image"
                                src={imageId}
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
                    ) : (

                        videoId ? (

                            <CldVideoPlayer
                                width="200"
                                height="200"
                                src={videoId}
                            />

                        ) : (

                            <>
                                <label htmlFor={`${_id}`} className='h-full w-full cursor-pointer flex items-center justify-center'>
                                    {
                                        isloading ? "Loding ...." : (
                                            <Image width={30} height={30} src={"/video.png"} alt='reload' />
                                        )
                                    }
                                </label>

                                <input
                                    type="file"
                                    id={`${_id}`}
                                    className="hidden"
                                    accept="video/*"
                                    onChange={handleFileChangeforVideo}
                                />
                            </>
                        )

                    )}
            </div >

            {error && <p className="text-red-500 mt-2">{error}</p>}
        </>
    )
}

export default FileUploader
