"use client";

import { useSocket } from "@/providers/socket-provider";
import {
    ControlBar,
    GridLayout,
    LayoutContextProvider,
    LiveKitRoom,
    ParticipantTile,
    RoomAudioRenderer,
    VideoConference,
    useParticipants,
    useTracks,
} from "@livekit/components-react";
import { Track } from "livekit-client";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

const LiveKitComp = ({ token, room }: { token: string; room: string }) => {

    const searchParams = useSearchParams();


    const { socket } = useSocket();

    const handleRoomJoin = useCallback(() => {
        if (!socket) return;
        socket.emit('join-room', { room, name: searchParams?.get('name') });
    }, [socket, room, searchParams])

    const handleRoomLeave = useCallback(() => {
        if (!socket) return;
        socket.emit('leave-room', { room, name: searchParams?.get('name') });
    }, [socket, room, searchParams])

    const handleJoinRoom = useCallback((data: unknown) => {
        console.log('join-room', data);
    }, []);

    const handleLeaveRoom = useCallback((data: unknown) => {
        console.log('leave-room', data);
    }, []);

    useEffect(() => {
        if (!socket) return;
        socket.on('join-room', handleJoinRoom);

        socket.on('leave-room', handleLeaveRoom);

        window.addEventListener('beforeunload', handleRoomLeave);

        return () => {
            window.removeEventListener('beforeunload', handleRoomLeave);
            socket.off('join-room', handleJoinRoom);
            socket.off('leave-room', handleLeaveRoom);
        }
    }, [socket, handleRoomLeave])



    return (
        <LayoutContextProvider>
            <LiveKitRoom
                video={false}
                audio={false}
                token={token}
                serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
                data-lk-theme="default"
                style={{ height: '100dvh' }}
                onConnected={handleRoomJoin}
                onDisconnected={handleRoomLeave}
            >
                <VideoConference />
                {/* <RoomAudioRenderer /> */}
                {/* <ControlBar /> */}
            </LiveKitRoom>
        </LayoutContextProvider>
    )
}

function MyVideoConference() {
    // `useTracks` returns all camera and screen share tracks. If a user
    // joins without a published camera track, a placeholder track is returned.
    const tracks = useTracks(
        [
            { source: Track.Source.Camera, withPlaceholder: true },
            { source: Track.Source.ScreenShare, withPlaceholder: false },
        ],
        { onlySubscribed: true },
    );
    const participants = useParticipants();
    console.log(participants.map(p => p.identity));

    return (
        <GridLayout tracks={tracks} style={{ height: 'calc(100vh - var(--lk-control-bar-height))' }}>
            {/* The GridLayout accepts zero or one child. The child is used
      as a template to render all passed in tracks. */}
            <ParticipantTile />
        </GridLayout>
    );
}


export default LiveKitComp
