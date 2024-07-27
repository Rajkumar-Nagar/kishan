"use client"

import { CldImage, CldVideoPlayer } from 'next-cloudinary'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { getBgImageUser } from '@/actions/getBgImageUser'
import { useSession } from 'next-auth/react'


const FileUploader = ({ setUploadImages, profile, setbackgroundImage, handelBgImage, imageUploader, profileUploader, _id }) => {

    const [imageId, setImageId] = useState("")
    const [videoId, setVideoId] = useState("")
    const [error, setError] = useState('');
    const [isloading, setIsloading] = useState(false)

    const { data: session, status } = useSession()


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
              console.log(data)
            return data.public_id
        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : 'An error occurred');
        }
    };

    const handleProfilechange = async (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const data = await uploadImage(file, "image");
            if (status === "authenticated") {
                if (!profile) {

                    const updateduser = await getBgImageUser(session?.user.id, data)
                    //redux added 
                }
               if(setbackgroundImage){
                setbackgroundImage(data)
               }
                setIsloading(false)
            }
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
                        (imageId) &&
                        <button onClick={handleDelete} className='absolute -top-2 -right-2'>
                            <Image alt="reload" width={20} height={20} src={"/remove.png"} />
                        </button>
                    }

                    {
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
                    }

                </div >
            }

            {error && <p className="text-red-500 mt-2">{error}</p>}
        </>
    )
}

export default FileUploader
