import "@livekit/components-styles";
import LiveKitComp from "./_livekit-comp";
import { generateLivekitToken } from "@/actions/livekit.actions";

export default async function Page({
    searchParams
}: {
    searchParams: {
        name: string;
        room: string;
    }
}) {

    const name = searchParams?.name || "quickstart-user";
    const room = searchParams?.room || "quickstart-room";

    const { token } = await generateLivekitToken(room, name);

    return (
        <LiveKitComp token={token} room={room} />
    );
}