import React from "react";
import "./details.css";
import { resumePersonalCards, resumeProfile } from "../../data/resumeData";

export default function PersonalDetails() {
  return (
    <section className="section-root">
      <h1 className="section-title">Personal Details</h1>
      <p className="section-text">
        Personal context pulled from the CV: education, interests, and where I am based.
      </p>

      <div className="personal-grid">
        <div className="personal-card neumorphic-inset">
          <h3>Education</h3>
          <p>
            {resumeProfile.education}
            <br />
            Graduation Date: {resumeProfile.graduation}
            <br />
            GPA: {resumeProfile.gpa}
          </p>
        </div>

        {resumePersonalCards.map((card) => (
          <div key={card.title} className="personal-card neumorphic-inset">
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
