import { auth } from "@/auth";
import BiddingBoard from "./_bidding-board";
import BiddingPriceButton from "./_bidding-price-btn";

export default async function Page({
    searchParams
}: {
    searchParams: {
        name: string;
        room: string;
        userId: string;
    }
}) {

    const name = searchParams?.name || "quickstart-user";
    const room = searchParams?.room || "quickstart-room";

    const session = await auth();
    const userId = session?.user?.id || searchParams?.userId || Math.random().toString(36).substring(7);

    return (
        <div className="h-full w-full p-4">
            <BiddingBoard room={room} name={name} userId={userId} />
        </div>
    );
}