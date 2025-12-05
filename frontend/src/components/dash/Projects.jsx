// src/components/sections/Projects.jsx
import React from "react";

const projects = [
  {
    name: "Dashboard Portfolio",
    description:
      "A non-scroll neumorphic portfolio dashboard built with React + Vite.",
    stack: ["React", "Vite", "CSS"],
  },
  {
    name: "E-commerce UI",
    description:
      "Modern product listing, filters, and cart with attention to UX details.",
    stack: ["React", "Tailwind", "Node.js"],
  },
  {
    name: "Analytics Panel",
    description:
      "Custom charts and KPIs for monitoring performance in real-time.",
    stack: ["React", "Recharts", "API Integration"],
  },
];

export default function Projects() {
  return (
    <section className="section-root">
      <h1 className="section-title">Projects</h1>
      <p className="section-text">
        A few highlight projects that represent my style and capabilities.
      </p>

      <div className="projects-grid">
        {projects.map((project) => (
          <article key={project.name} className="project-card neumorphic-inset">
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <div className="project-tags">
              {project.stack.map((tag) => (
                <span key={tag} className="project-tag">
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
