"use client";

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";
import HomeTitle from "../HomeTitle";

type testimonialsTypes={
    name: string;
    location: string;
    content: string;

}

const testimonials:testimonialsTypes[] = [
    {
      name: "Rajesh Kumar",
      location: "Jaipur, Rajasthan",
      content: "Kisan's online mandi has completely transformed how I sell my crops. The platform makes it easy to reach buyers across India, ensuring I get the best price for my hard work."
    },
    {
      name: "Suresh Patel",
      location: "Ahmedabad, Gujarat",
      content: "Using the AI assistant on Kisan, I was able to diagnose a pest problem quickly and accurately. This tool saved my crops and helped me avoid a major loss."
    },
    {
      name: "Lakshmi Devi",
      location: "Guntur, Andhra Pradesh",
      content: "Tracking daily crop rates through Kisan's dashboard has made my decision-making process so much more informed. I now feel more confident about when to sell."
    },
    {
      name: "Ramesh Yadav",
      location: "Varanasi, Uttar Pradesh",
      content: "Booking transport for my crops through Kisan is incredibly easy. The process is reliable, and I no longer worry about delays in getting my produce to the mandi."
    },
    {
      name: "Anjali Singh",
      location: "Ludhiana, Punjab",
      content: "Finding labor during the peak season was always a challenge, but Kisan's labor booking service has made it simple. I can now find workers exactly when I need them."
    },
    {
      name: "Mahesh Choudhary",
      location: "Nagpur, Maharashtra",
      content: "Joining the farmer community on Kisan has been one of the best decisions I've made. I've connected with knowledgeable farmers and learned so much from their experiences."
    },
    {
      name: "Pooja Verma",
      location: "Bhopal, Madhya Pradesh",
      content: "I recently purchased a piece of land through Kisan, and the process was seamless. The platform ensured that I got a great deal and handled all the paperwork efficiently."
    },
    {
      name: "Vikram Singh",
      location: "Patna, Bihar",
      content: "Kisan has become an essential tool for my farming business. From selling crops to tracking market trends, I rely on it every day. Highly recommended!"
    },
    {
      name: "Ankit Sharma",
      location: "Kota, Rajasthan",
      content: "The customer support at Kisan is outstanding. They guided me through every step, from listing my crops to ensuring successful sales."
    },
    {
      name: "Meera Joshi",
      location: "Nashik, Maharashtra",
      content: "Kisan has simplified so many aspects of my farming life, from selling crops to buying land. It’s truly a one-stop solution for farmers."
    }
  ];
  

export function InfiniteMovingCardsDemo() {
    return (
        <div className="maincontainer">

        <HomeTitle Title="What Farmers Are Saying"/>
        <div className="h-[25rem] rounded-md my-20 flex flex-col antialiased bg-black bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
            <InfiniteMovingCards
                items={testimonials}
                direction="right"
                speed="slow"
            />
        </div>
        </div >
    );
}




