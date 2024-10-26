'use client';

import { useRouter } from 'next/navigation';
import { MdClose } from 'react-icons/md';

export function Modal({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    function onDismiss() {
        router.back();
    }

    return (
        <>
            <div data-state="open" onClick={onDismiss} className='fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0' />
            <div data-state="open" className='fixed z-50 dark:text-white gap-4 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border bg-background md:p-6 p-2 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg max-w-screen-md w-full flex max-h-[calc(100dvh_-_2rem)] overflow-hidden'>
                <MdClose size={20} onClick={onDismiss} className='absolute z-[100] dark:text-white top-2 right-2 text-2xl cursor-pointer' />
                <div className="flex-1 overflow-auto">
                    {children}
                </div>
            </div>
        </>
    )
}