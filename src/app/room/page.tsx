import BiddingBoard from "./_bidding-board";
import BiddingPriceButton from "./_bidding-price-btn";

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


    return (
        <div className="h-full w-full p-4">
            <div className="flex h-full flex-col shadow-2xl rounded-sm overflow-hidden">
                <div className="flex-1">
                    <BiddingBoard room={room} />
                </div>

                <div className="min-h-10 p-2 bg-blue-300 flex flex-wrap items-center justify-center gap-10">
                    {[5000, 10000, 15000, 20000].map((price) => (
                        <BiddingPriceButton price={price} key={price} />
                    ))}
                </div>
            </div>
        </div>
    );
}