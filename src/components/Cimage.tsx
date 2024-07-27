
"use client"
import { CldImage } from 'next-cloudinary'
import React from 'react'
type imageType= React.ComponentProps<typeof CldImage>
function CImage(props:imageType) {
  return (
    <CldImage
    {...props}
/>
  )
}

export default CImage