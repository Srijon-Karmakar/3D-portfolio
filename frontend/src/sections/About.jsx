import React from "react";
import SectionTitle from "../components/SectionTitle";

export default function About() {
  return (
    <section className="section-stacked bg-[#050505]">
      <div className="container-minimal">
        <SectionTitle title="About." />
        <p className="subtitle-minimal">
          I'm a Full Stack Developer with a deep love for building cinematic digital experiences. 
          My work sits at the intersection of powerful engineering and refined design.
        </p>
        <p className="text-lg text-white/40 mt-8 max-w-2xl leading-relaxed">
          I specialize in React, Node.js, and high-performance 3D visuals. 
          Every project is an opportunity to push the boundaries of what's possible on the web.
        </p>
      </div>
    </section>
  );
}
