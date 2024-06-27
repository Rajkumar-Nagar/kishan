"use client"
import { CallControls, SpeakerLayout, StreamCall, useStreamVideoClient } from '@stream-io/video-react-sdk'
import React, { useEffect } from 'react'

const page = () => {
  const client = useStreamVideoClient();
  console.log('object')
  const call = client?.call("default", "user1");
  useEffect(() => {
    call?.getOrCreate({
      data: {
        starts_at: new Date().toISOString(),
      }
    }).then((call) => {
      console.log(call)
    })
  }, [])
  return (
    <p>sdfjhsd;lfkhjkh</p>
  )
}

export default page
