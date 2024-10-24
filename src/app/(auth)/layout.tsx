import React from 'react'

const layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div className='h-[100dvh]'>
            {children}
        </div>
    )
}

export default layout
