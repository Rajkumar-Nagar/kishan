"use client";
import Image from "next/image";
import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import HomeTitle from "./HomeTitle";
import { SkelAppleCard } from "./skelton/skeltHomePage";

export function AppleCardsCarouselDemo() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />

  ));

  return (
    <div className="w-full h-full container mt-5">
      <HomeTitle Title="Why Choose Us" />
      <Carousel items={cards} />
    </div>
  );
}

const DummyContent = () => {
  return (
    <>
      {[...new Array(3).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                The first rule of Apple club is that you boast about Apple club.
              </span>{" "}
              Keep a journal, quickly jot down a grocery list, and take amazing
              class notes. Want to convert those notes to text? No problem.
              Langotiya jeetu ka mara hua yaar is ready to capture every
              thought.
            </p>
            <Image
              src="/Image1.jpg"
              alt="Macbook mockup from Aceternity UI"
              height="500"
              width="500"
              className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
            />
          </div>
        );
      })}
    </>
  );
};



const data = [
  {
    category: "Online Mandi",
    title: "List and sell crops across India.",
    src: "/i9.jpg",
    content: <DummyContent />,
  },
  {
    category: "AI Assistance",
    title: "Get instant farming solutions.",
    src: "/i8.jpg",
    content: <DummyContent />,
  },
  {
    category: "Daily Crop Rates",
    title: "Real-time crop prices.",
    src: "/i7.jpg",
    content: <DummyContent />,
  },

  {
    category: "Transport Booking",
    title: "Easy Transport.",
    src: "/i6.jpg",
    content: <DummyContent />,
  },
  {
    category: "Labor Booking",
    title: "Quickly find farm workers",
    src: "/i4.jpg",
    content: <DummyContent />,
  },
  {
    category: "Farmer Community",
    title: "Join a farmer network.",
    src: "/i2.jpg",
    content: <DummyContent />,
  },
  {
    category: "Land Transactions",
    title: "Secure farmland deals.",
    src: "/i1.jpg",
    content: <DummyContent />,
  },
];
