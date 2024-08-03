import React from 'react'

function page({ params }: { params: { miniState: string,minidistict:string } }) {
  return (
    <div>{`Mini mandi of ${params.miniState} , ${params.minidistict}`}</div>
  )
}

export default page