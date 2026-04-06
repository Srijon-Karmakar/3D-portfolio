import React from "react";

export default function SectionTitle({ title, className = "" }) {
  return (
    <h2 className={`font-bold text-5xl md:text-7xl lg:text-8xl tracking-tighter uppercase mb-8 md:mb-12 gradient-violet-yellow ${className}`}>
      {title}
    </h2>
  );
}
