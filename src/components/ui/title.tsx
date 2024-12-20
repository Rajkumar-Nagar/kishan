import React from 'react'

interface TitleProps {
  content: string
}

function Title({ content }: TitleProps) {
  return (
    <div className='relative border-b-2 flex justify-center border-[#2e054e] '>
      <div className='absolute -bottom-9 bg-white p-4 text-2xl md:text-3xl text-[#2e054e] font-semibold text-center'>
        {content}
      </div>
    </div>
  )
}

export default Title