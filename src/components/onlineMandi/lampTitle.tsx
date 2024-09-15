"use client";
import React, { PropsWithChildren } from "react";
import { motion } from "framer-motion";
import { LampContainer } from "../ui/lamp";

interface Props {
    children:React.ReactNode
}

export function LampDemo({children}:Props) {
    return (
        <LampContainer>
            <motion.div
                initial={{ opacity: 0.5, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                    delay: 0.3,
                    duration: 0.8,
                    ease: "easeInOut",
                }}
                className="mt-4 bg-gradient-to-br from-slate-300 to-slate-500  bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-6xl"
            >
                {children}
            </motion.div>
        </LampContainer>
    );
}
6