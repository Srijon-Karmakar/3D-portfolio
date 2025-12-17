// src/components/sections/PersonalDetails.jsx
import React from "react";
import "./details.css";

export default function PersonalDetails() {
  return (
    <section className="section-root">
      <h1 className="section-title">Personal Details</h1>
      <p className="section-text">
        A little bit more about who I am beyond the code.
      </p>

      <div className="personal-grid">
        <div className="personal-card neumorphic-inset">
          <h3>About Me</h3>
          <p>
            I enjoy designing clean interfaces, exploring new tech, and turning
            ideas into working products. I love combining design and engineering.
          </p>
        </div>

        <div className="personal-card neumorphic-inset">
          <h3>Interests</h3>
          <p>
            Design systems, performance optimization, developer experience, and
            interactive UI animations.
          </p>
        </div>

        <div className="personal-card neumorphic-inset">
          <h3>Location & Availability</h3>
          <p>
            Based in Kolkata, India. <br /> Open to remote opportunities and collaborations.
          </p>
        </div>
      </div>
    </section>
  );
}
