import { FocusCards } from "@/components/ui/focus-cards";

export function FocusCardsDemo() {


    const cards = [
        {
            title: "Online Mandi",
            src: "/i9.jpg",
        },
        {
            title: "AI Assistance",
            src: "/i8.jpg",

        },
        {
            title: "Daily Crop Rates",

            src: "/i7.jpg",

        },

        {
            title: "Transport Booking",

            src: "/i6.jpg",

        },
        {
            title: "Labor Booking",

            src: "/i4.jpg",

        },
        {
            title: "Farmer Community",

            src: "/i2.jpg",

        },
    ];


    return <FocusCards cards={cards} />;
}
