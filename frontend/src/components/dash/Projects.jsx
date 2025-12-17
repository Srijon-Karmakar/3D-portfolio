// src/components/sections/Projects.jsx
import React from "react";
import "./Projects.css"

const projects = [
  {
  name: "Sports Management System",
  description:
    "Developed a comprehensive sports management system with a React-based frontend, enabling efficient management of players, teams, and performance data through an intuitive and scalable interface.",
  stack: ["React", "Node", "Mongo DB"],
},
  {
    name: "Cloud-based Code-editor",
    description:
      "A cloud-based online code editor using React and Node.js, enabling users to write, learn & practise code with secure authentication and database-backed storage.",
    stack: ["React", "Tailwind", "Node.js"],
  },
  {
    name: "Online Tools(Remote access)",
    description:
      "A Python + Django–based web application to download and social media videos and audios, implementing backend processing, URL validation, and secure file handling.",
    stack: ["Python", "Django", "API Integration"],
  },
 {
  name: "Fashion E-commerce",
  description:
    "Implemented a scalable fashion e-commerce frontend using React, integrating external APIs for product data and analytics visualization through Recharts to monitor performance and user engagement.",
  stack: ["React", "Node js"],
},
{
  name: "3D Service Website",
  description:
    "Developed an interactive 3D service website using React, featuring immersive visuals, smooth animations, and a scalable architecture, with a Node.js backend for handling data and service requests.",
  stack: ["React", "Node.js"],
  link: "house-of-musa-gixs.onrender.com",
}
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
            <a
      key={project.name}
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="project-card-link"
    >
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
          </a>
        ))}
      </div>
    </section>
  );
}
