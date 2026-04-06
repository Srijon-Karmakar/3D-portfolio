import React from "react";
import SectionTitle from "../components/SectionTitle";

export default function Projects() {
  const projects = [
    { title: "ArtBlock", category: "Web App", color: "#1a1a1a" },
    { title: "Senevon", category: "Brand Identity", color: "#0a0a0a" },
    { title: "Nexus", category: "SaaS Platform", color: "#121212" }
  ];

  return (
    <section className="section-stacked bg-[#090909]">
      <div className="container-minimal w-full">
        <SectionTitle title="Projects ⭐" />
        <div className="flex overflow-x-auto gap-8 mt-12 pb-8 scroll-smooth no-scrollbar">
          {projects.map((project, index) => (
            <div key={index} 
                 className="flex-shrink-0 w-[80vw] md:w-[450px] aspect-[4/3] rounded-3xl overflow-hidden relative group p-1 border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="h-full w-full bg-cover bg-center rounded-[22px]" style={{ backgroundColor: project.color }}>
                <div className="absolute bottom-10 left-10 z-20">
                  <h3 className="text-3xl font-bold tracking-tight text-white mb-2">{project.title}</h3>
                  <span className="text-white/40 uppercase tracking-widest text-xs font-semibold">{project.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
