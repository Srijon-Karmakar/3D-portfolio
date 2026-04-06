import React from "react";
import "./Projects.css";
import { resumeProjects } from "../../data/resumeData";

const projects = resumeProjects;

export default function Projects() {
  return (
    <section className="section-root">
      <h1 className="section-title">Projects</h1>
      <p className="section-text">
        Projects listed in the CV, from full-stack utilities to portals, immersive 3D work, and ERP-style systems.
      </p>

      <div className="projects-grid">
        {projects.map((project) => {
          const content = (
            <article className="project-card neumorphic-inset">
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <div className="project-tags">
                {project.stack.map((tag) => (
                  <span key={tag} className="project-tag">
                    {tag}
                  </span>
                ))}
              </div>
              <p style={{ marginTop: 12, fontSize: 12, opacity: 0.72 }}>
                {project.link ? project.status : "Link available on request"}
              </p>
            </article>
          );

          if (!project.link) {
            return (
              <div key={project.name} className="project-card-link">
                {content}
              </div>
            );
          }

          return (
            <a
              key={project.name}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card-link"
            >
              {content}
            </a>
          );
        })}
      </div>
    </section>
  );
}
