import React from 'react'

const page = ({
    params
}: {
    params: { id: string }
}) => {
    return (
        <div className='bg-green-500 flex-1 px-2'>
            <h1 className='text-white'>Page: {params.id}</h1>
        </div>
    )
}

export default page
