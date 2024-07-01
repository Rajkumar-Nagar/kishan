"use client"
import { CallingState, ParticipantView, StreamCall, StreamTheme, StreamVideoParticipant, useCall, useCallStateHooks, useStreamVideoClient } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'

const page = () => {
  const client = useStreamVideoClient();
  const call = client?.call("default", "user1");
  const [isCallStarted, setIsCallStarted] = useState(false)
  call?.join({ create: true });
  // useEffect(() => {
  //   if (call && !isCallStarted) {
  //     call.getOrCreate({ data: { starts_at: new Date().toISOString() } })
  //     setIsCallStarted(true)
  //   }
  // }, [call])


  return (
    <StreamCall call={call}>
      <MyUILayout />
    </StreamCall>
  )
}


export const MyUILayout = React.memo(() => {
  const {
    useCallCallingState,
    useLocalParticipant,
    useRemoteParticipants,
  } = useCallStateHooks();

  const callingState = useCallCallingState();
  const localParticipant = useLocalParticipant();
  const remoteParticipants = useRemoteParticipants();
  console.log(remoteParticipants)

  if (callingState !== CallingState.JOINED) {
    return <div>Loading2...</div>;
  }

  return (
    <StreamTheme>
      <MyParticipantList participants={remoteParticipants} />
      <MyFloatingLocalParticipant participant={localParticipant} />
    </StreamTheme>
  );
});

export const MyParticipantList = (props: { participants: StreamVideoParticipant[] }) => {
  const { participants } = props;
  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
      {participants.map((participant) => (
        <ParticipantView participant={participant} key={participant.sessionId} />
      ))}
    </div>
  );
};

export const MyFloatingLocalParticipant = (props: { participant?: StreamVideoParticipant }) => {
  const { participant } = props;
  return (
    <div
      style={{
        position: 'absolute',
        top: '15px',
        left: '15px',
        width: '240px',
        height: '135px',
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 10px 3px',
        borderRadius: '12px',
      }}
    >
      <ParticipantView participant={participant!} />
    </div>
  );
};

export default page
