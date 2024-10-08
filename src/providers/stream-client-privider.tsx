'use client';

import { ReactNode, useEffect, useState } from 'react';
import { StreamVideoClient, StreamVideo } from '@stream-io/video-react-sdk';
import { tokenProvider } from '@/actions/stream.actions';


const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
    const [videoClient, setVideoClient] = useState<StreamVideoClient>();


    useEffect(() => {
        if (!API_KEY) throw new Error('Stream API key is missing');

        const client = new StreamVideoClient({
            apiKey: API_KEY,
            user: {
                id: "user1",
                name: "user1",
                image: "",
            },
            tokenProvider,
        });

        setVideoClient(client);
    }, []);

    if (!videoClient) return <p>Loading...</p>;

    return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default StreamVideoProvider;