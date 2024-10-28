
"use client"
import { CldImage } from 'next-cloudinary'
import React, { useRef } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'

type imageType = React.ComponentProps<typeof CldImage>

function DImage(props: imageType) {

    const scale = useRef(1.2);

    const handleMouseOver = (e: React.MouseEvent<HTMLImageElement>) => {
        e.currentTarget.style.transform = `scale(${scale.current})`;
    }

    const handleMouseOut = (e: React.MouseEvent<HTMLImageElement>) => {
        e.currentTarget.style.transform = 'scale(1)';
    }

    const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;
        const xPercent = (x / width) * 100;
        const yPercent = (y / height) * 100;
        e.currentTarget.style.transformOrigin = `${xPercent}% ${yPercent}%`;
    }

    const handleScroll = (e: React.WheelEvent<HTMLImageElement>) => {
        const delta = Math.sign(e.deltaY);
        if (delta === 1 && scale.current > 1) {
            scale.current -= 0.1;
        } else if (delta === -1 && scale.current < 5) {
            scale.current += 0.1;
        }
        e.currentTarget.style.transform = `scale(${scale.current})`;
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <CldImage
                    width={100}
                    height={100}
                    {...props}
                />
            </DialogTrigger>
            <DialogContent className='md:w-fit w-[calc(100vw_-_2rem)] md:p-6 p-2 flex flex-col items-center overflow-hidden'>
                <DialogHeader>
                    <DialogTitle></DialogTitle>
                    <DialogDescription>
                    </DialogDescription>
                </DialogHeader>
                <CldImage
                    width={600}
                    height={600}
                    loading='lazy'
                    {...props}
                    className='flex-1 h-auto w-auto'
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                    onMouseMove={handleMouseMove}
                    onWheel={handleScroll}
                />
            </DialogContent>
        </Dialog>
    )
}

export default DImage