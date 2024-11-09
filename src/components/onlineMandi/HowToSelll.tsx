"use client"
import { HoverEffect } from "../ui/card-hover-effect";

export function CardHoverEffectDemo() {
    return (
        <div className="w-full mx-auto px-8">
            <HoverEffect items={projects} />
        </div>
    );
}
export const projects = [
    {
        title: "List Your Crop",
        description:
            "Start by listing your crop on the Kisan platform, choosing either the All India Mandi for national reach or a specific Mini Mandi for local sales. Ensure all necessary crop details are included to attract bidders.",
        link: "https://kisan.com/list-crop",
    },
    {
        title: "Bidding",
        description:
            "Participate in real-time online bidding for your crop, where potential buyers can place competitive bids in front of you. This live bidding process helps secure the best price for your produce.",
        link: "https://kisan.com/bidding",
    },
    {
        title: "Sample or Live Stream Request",
        description:
            "After bidding, your crop may be requested for sample verification or live streaming, allowing bidders to assess the crop quality virtually before finalizing the purchase.",
        link: "https://kisan.com/sample-request",
    },
    {
        title: "Bid Confirmation",
        description:
            "Once a bidder confirms their bid, your crop is reserved for them. This step ensures a clear commitment from the buyer to proceed with the transaction.",
        link: "https://kisan.com/bid-confirmation",
    },
    {
        title: "Transportation to Bidder",
        description:
            "Following bid confirmation, your crop is transported to the bidder's location. Our platform facilitates secure logistics to ensure a smooth delivery process.",
        link: "https://kisan.com/transportation",
    },
    {
        title: "Payment Completion",
        description:
            "Upon successful delivery, payment is securely processed, completing the transaction. This final step ensures prompt and guaranteed payment for your crop.",
        link: "https://kisan.com/payment",
    },
];

