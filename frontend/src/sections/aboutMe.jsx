import React from "react";
import leafImg from "../assets/leaf.jpg";
import TopLeftMask from "../components/TopLeftMask";

export default function HeroStep1() {
  return (
    <section className="min-h-screen w-full bg-[#d8d8d8] flex items-center justify-center p-4 sm:p-8">
      <div className="relative w-full max-w-[1600px] aspect-[2048/1442] overflow-hidden bg-[#d8d8d8]">
        {/* Leaf full background (for preview) */}
        <img
          src={leafImg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          draggable="false"
        />

        {/* Step 1: top-left mask */}
        <TopLeftMask />

        {/* thin border like reference */}
        <div className="pointer-events-none absolute inset-0 ring-1 ring-black/15" />
      </div>
    </section>
  );
}
