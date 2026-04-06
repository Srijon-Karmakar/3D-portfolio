import React from "react";
import SectionTitle from "../components/SectionTitle";

export default function Skills() {
  const skills = [
    "React", "Node.js", "Three.js", "GSAP", "TailwindCSS", "Next.js", "MongoDB", "SQL"
  ];

  return (
    <section className="section-stacked bg-[#070707]">
      <div className="container-minimal">
        <SectionTitle title="Skills." />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 w-full max-w-4xl">
          {skills.map((skill) => (
            <div key={skill} className="p-6 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-md">
              <span className="text-xl font-medium tracking-tight text-white/80">{skill}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
