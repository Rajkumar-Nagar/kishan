"use server"

import { AccessToken } from "livekit-server-sdk";

export async function generateLivekitToken(room: string, username: string) {

    if (!room) {
        throw new Error('Missing "room" query parameter');
    }
    if (!username) {
        throw new Error('Missing "username" query parameter');
    }

    const apiKey = process.env.LIVEKIT_API_KEY;
    const apiSecret = process.env.LIVEKIT_API_SECRET;
    const wsUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL;

    if (!apiKey || !apiSecret || !wsUrl) {
        throw new Error("Server misconfigured");
    }

    const at = new AccessToken(apiKey, apiSecret, { identity: username });

    at.addGrant({ room, roomJoin: true, canPublish: true, canSubscribe: true });

    return { token: await at.toJwt() };
}