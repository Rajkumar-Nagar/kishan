"use client";
import React, { useState, useRef, useEffect } from "react";
import { LayoutGrid } from "../components/ui/layout-grid";
import HomeTitle from "./HomeTitle";

export function LayoutGridDemo() {
  return (
    <div className="maincontainer">
      <HomeTitle Title="WHY KISAN IS ESSENTIAL" />
      <div className="h-screen  w-full">
        <LayoutGrid cards={cards} />
      </div>
    </div>
  );
}

const SkeletonOne = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        Empower Your Crop Pricing
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Why let others decide your crop’s value? With Kisan, you control the price and engage directly in the mandi process. Maximize your profits by cutting out the middlemen and getting a fair deal for your hard-earned produce.
      </p>
    </div>
  );
};

const SkeletonTwo = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        Stay Ahead with Real-Time Insights
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Adapt to the dynamic agricultural market with real-time crop rates and AI-driven insights. Kisan’s tools keep you informed, helping you make smarter decisions that enhance productivity and secure better returns.
      </p>
    </div>
  );
};
const SkeletonThree = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        Effortless Transportation and Labor Booking
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Simplify your farming operations with easy online booking for transport and labor. Kisan’s user-friendly platform lets you manage logistics from anywhere, so you can focus on growing and selling without the stress.
      </p>
    </div>
  );
};
const SkeletonFour = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        Expand Your Opportunities Beyond Local Boundaries
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Unlock new farming potential by exploring land options across different regions. Kisan makes it easy to buy, sell, or rent land beyond your local area, boosting your opportunities and contributing to a thriving agricultural sector.
      </p>
    </div>
  );
};

const cards = [
  {
    id: 1,
    content: <SkeletonOne />,
    className: "md:col-span-2",
    thumbnail: "/reason1.jpg",
  },
  {
    id: 2,
    content: <SkeletonTwo />,
    className: "col-span-1",
    thumbnail:
      "/reason2.jpg"
  },
  {
    id: 3,
    content: <SkeletonThree />,
    className: "col-span-1",
    thumbnail:
      "/reason3.jpg"
  },
  {
    id: 4,
    content: <SkeletonFour />,
    className: "md:col-span-2",
    thumbnail:
      "/reason4.jpg"
  },
];
