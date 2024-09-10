"use client";
import React from "react";

import Image from "next/image";
import { TracingBeam } from "./ui/tracing-beam";

export function TracingBeamDemo({children}) {
  return (
    <TracingBeam className="px-6">
     {
      children
     }
     
    </TracingBeam>
  );
}


