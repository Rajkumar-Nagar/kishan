import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function AiButton() {
    return (
        <Link 
            href={"/aiHelper"} 
            className='fixed bottom-40 right-3 z-50 md:hidden block group'
        >
            <Image 
                width={300} 
                height={300} 
                className='w-12 h-12 transition-transform duration-200 ease-in-out transform group-hover:scale-110 group-active:scale-95' 
                alt='reload' 
                src={"/ai6.png"} 
            />
            <Image 
                width={300} 
                height={300} 
                className='w-10 h-7 absolute -top-7 -left-5 transition-opacity duration-200 ease-in-out opacity-60 group-hover:opacity-100 group-active:opacity-80' 
                alt='reload' 
                src={"/ai5.png"} 
            />
        </Link>
    );
}

export default AiButton;
