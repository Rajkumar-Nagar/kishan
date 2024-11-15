"use client"
import React, { useRef } from 'react'
//@ts-ignore
import MarkdownPreview, { MarkdownPreviewRef } from '@uiw/react-markdown-preview';
import { useSession } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { getCldImageUrl } from 'next-cloudinary';
import remarkGfm from 'remark-gfm'
import rehypeSanitize from "rehype-sanitize";
import { CoreMessage } from 'ai';


interface Props {
    chat: {
        id: string;
        content: string;
        role: CoreMessage['role'];
        createdAt: Date;
    };
}

const PreviewMessage = ({ chat }: Props) => {
    const { data: session } = useSession()

    const markdownPreviewRef = useRef<MarkdownPreviewRef>(null);

    const imageUrl = getCldImageUrl({
        src: session?.user.avatar as string,
        width: 100,
        height: 100,
    });

    return (
        <div className='w-full mb-4'>
            <div className="px-4 py-2 justify-center text-base md:gap-6 m-auto">
                <div className="flex flex-1 text-base mx-auto gap-3 md:px-5 lg:px-1 xl:px-5 w-full group">
                    {chat.role === 'user' ? (
                        <div className='relative flex ml-auto rounded-lg bg-gray-700 px-4 py-2 flex-col max-w-[80%]'>
                            {/* <div className='pb-2'>{'You'}</div> */}
                            <div className="flex overflow-hidden overflow-x-auto">
                                <p className='whitespace-pre-wrap text-[#c9d1d9]'>{chat.content.toString()}</p>
                            </div>

                            {/* {model === MODELS.VISION && images && (
                                <div className="mt-3 flex flex-wrap gap-3">
                                    {
                                        images?.map((image, index) => {
                                            return <Image
                                                key={index}
                                                width={200}
                                                height={200}
                                                alt={'image'}
                                                src={`data:${image.mimeType};base64,${image.data}`}
                                                className="object-contain w-2/3 h-auto"
                                            />
                                        })
                                    }
                                </div>
                            )} */}
                        </div>
                    ) : (
                        <>
                            <div className='flex-shrink-0 flex flex-col relative items-end'>
                                <div>
                                    <Avatar>
                                        <AvatarImage src={''} />
                                        <AvatarFallback>{'AI'}</AvatarFallback>
                                    </Avatar>
                                </div>
                            </div>

                            <div className='relative flex w-full flex-col'>
                                {/* <div className='pb-2'>{'AI'}</div> */}
                                <div className="flex-1 overflow-x-auto">
                                    <div className="">
                                        {chat && <div className="overflow-hidden no-tailwindcss">
                                            <MarkdownPreview
                                                ref={markdownPreviewRef}
                                                source={chat.content}
                                                // @ts-ignore
                                                rehypeRewrite={(node, index, parent) => {
                                                    //   if (node.tagName === "a" && parent && /^h(1|2|3|4|5|6)/.test(parent.tagName)) {
                                                    //     parent.children = parent.children.slice(1)
                                                    //   }
                                                    if (node.type === "element" && node.tagName === "a") {
                                                        node.properties = {
                                                            ...node.properties,
                                                            target: "_blank",
                                                            rel: "noopener noreferrer",
                                                        }
                                                    }
                                                }}
                                                className='no-tailwindcss overflow-hidden'
                                                style={{
                                                    backgroundColor: 'transparent',
                                                }}

                                            />
                                        </div>}
                                    </div>
                                </div>

                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default PreviewMessage