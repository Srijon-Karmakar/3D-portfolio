// src/components/sections/Skills.jsx
import React from "react";
import "./Skills.css"

const skillGroups = [
  {
    title: "Languages",
    skills: [
      { name: "C", level: 75 },
      { name: "C++", level: 70 },
      { name: "Python", level: 80 },
      { name: "JavaScript", level: 85 },
    ],
  },
  {
    title: "Frontend",
    skills: [
      { name: "React", level: 90 },
      { name: "Vite", level: 85 },
      { name: "CSS (Neumorphism)", level: 88 },
      { name: "Django Templates", level: 70 },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", level: 75 },
      { name: "Python (Django)", level: 80 },
    ],
  },
  {
    title: "Database",
    skills: [
      { name: "MongoDB", level: 70 },
      { name: "PostgreSQL", level: 65 },
      { name: "SQL", level: 75 },
    ],
  },
  {
    title: "Design & 3D",
    skills: [
      { name: "Figma", level: 85 },
      { name: "Photoshop", level: 75 },
      { name: "Spline", level: 80 },
      { name: "Blender", level: 70 },
    ],
  },
];


function SkillBar({ name, level }) {
  return (
    <div className="skill-bar-row">
      <div className="skill-bar-top">
        <span className="skill-name">{name}</span>
        <span className="skill-value">{level}%</span>
      </div>

      <div className="skill-bar-track neumorphic-inset">
        <div
          className="skill-bar-fill"
          style={{ "--level": `${level}%` }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section className="section-root">
      <h1 className="section-title">Skills</h1>
      <p className="section-text">
        A snapshot of the technologies I work with across development, backend
        systems, and 3D design — blending engineering with visual creativity.
      </p>


      <div className="skills-grid skills-grid-full">
        {skillGroups.map((group) => (
          <div key={group.title} className="skills-card neumorphic-inset">
            <h3>{group.title}</h3>
            <div className="skills-bars">
              {group.skills.map((skill) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
