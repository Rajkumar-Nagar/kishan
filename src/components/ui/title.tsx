import React from 'react'

function Title({ content }) {
  return (
    <div className=' mx-20 relative flex justify-center items-center'>
      <div className='absolute w-full border-b-[1px] border-[#726d76]'></div>
      <div className='bg-white p-4 z-40 text-3xl text-[#2e054e] font-semibold text-center'>
        {content}
      </div>
    </div>
  )
}

export default Title