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
            <div className='fixed dark:text-white left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg'>
                <MdClose size={20} onClick={onDismiss} className='absolute top-2 right-2 text-2xl cursor-pointer' />
                {children}
            </div>
        </>
    )
}