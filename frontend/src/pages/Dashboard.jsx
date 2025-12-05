// src/pages/Home.jsx
import React, { useState } from "react";
import Header from "../components/dash/Header.jsx";
import Sidebar from "../components/dash/Sidebar.jsx";

import Overview from "../components/dash/Overview.jsx";
import Skills from "../components/dash/Skills.jsx";
import Projects from "../components/dash/Projects.jsx";
import PersonalDetails from "../components/dash/details.jsx";
import Contact from "../components/dash/Contact.jsx";

const SECTIONS = ["overview", "skills", "projects", "personal", "contact"];

export default function Home({ onCycleTheme, themeIndex }) {
  const [activeSection, setActiveSection] = useState("overview");

  const renderSection = () => {
    switch (activeSection) {
      case "skills":
        return <Skills />;
      case "projects":
        return <Projects />;
      case "personal":
        return <PersonalDetails />;
      case "contact":
        return <Contact />;
      case "overview":
      default:
        return <Overview />;
    }
  };

  return (
    <div className="dashboard-container ">
      <Header onCycleTheme={onCycleTheme} themeIndex={themeIndex} />

      <div className="dashboard-main ">
        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          sections={SECTIONS}
        />

        <main className="dashboard-content neumorphic ">
          {renderSection()}
        </main>
      </div>
    </div>
  );
}
