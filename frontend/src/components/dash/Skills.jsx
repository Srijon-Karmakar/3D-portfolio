import React from "react";
import "./Skills.css";
import { resumeSkills } from "../../data/resumeData";

const skillGroups = resumeSkills;

function SkillBar({ name, level }) {
  return (
    <div className="skill-bar-row">
      <div className="skill-bar-top">
        <span className="skill-name">{name}</span>
        <span className="skill-value">{level}%</span>
      </div>

      <div className="skill-bar-track neumorphic-inset">
        <div className="skill-bar-fill" style={{ "--level": `${level}%` }} />
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section className="section-root">
      <h1 className="section-title">Skills</h1>
      <p className="section-text">
        CV-based skill areas across programming, frontend systems, backend logic,
        databases, and delivery-focused soft skills.
      </p>

      <div className="skills-grid skills-grid-full">
        {skillGroups.map((group) => (
          <div key={group.title} className="skills-card neumorphic-inset">
            <h3>{group.title}</h3>
            <div className="skills-bars">
              {group.skills.map((skill) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
