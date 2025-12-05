// src/components/sections/Skills.jsx
import React from "react";
import "./Skills.css"

const skillGroups = [
  {
    title: "Frontend",
    skills: [
      { name: "React", level: 90 },
      { name: "Vite", level: 80 },
      { name: "TypeScript", level: 75 },
      { name: "CSS / Neumorphism", level: 85 },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", level: 70 },
      { name: "Express", level: 65 },
      { name: "MongoDB", level: 60 },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "Git", level: 80 },
      { name: "Figma", level: 70 },
      { name: "Postman", level: 65 },
    ],
  },
];

function SkillBar({ name, level }) {
  return (
    <div className="skill-bar-row ">
      <div className="skill-bar-top">
        <span className="skill-name">{name}</span>
        <span className="skill-value">{level}%</span>
      </div>
      <div className="skill-bar-track neumorphic-inset neumo-press">
        <div
          className="skill-bar-fill"
          style={{ width: `${level}%` }}
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
        A quick view of my primary technical skills and tools. All values are
        editable percentages.
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
