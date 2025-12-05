import React from "react";

// 1️⃣ Base styles FIRST
// import "../styles.css";

// 2️⃣ Mobile overrides for sidebar in a separate file
import "./Sidebar.css";

const LABELS = {
  overview: "Overview",
  skills: "Skills",
  projects: "Projects",
  personal: "Personal Details",
  contact: "Contact",
};

export default function Sidebar({ activeSection, setActiveSection, sections }) {
  return (
    <aside className="sidebar neumorphic">
      {/* PROFILE TOP CENTER */}
      <div className="sidebar-profile-block">
        <div className="sidebar-avatar-shell neumorphic-inset neumo-press">
          <img
            src="/me.jpg"
            className="sidebar-profile-img"
            alt="Profile"
          />
        </div>

        <div className="sidebar-profile-info">
          <h3 className="profile-name neumo-press">Srijon Karmakar</h3>
          <p className="profile-id neumo-press">Fullstack Developer</p>
        </div>
      </div>

      {/* MENU */}
      <nav className="sidebar-menu">
        {sections.map((key) => {
          const isActive = activeSection === key;
          return (
            <button
              key={key}
              className={`sidebar-menu-item neumo-press ${
                isActive ? "sidebar-menu-active" : ""
              }`}
              onClick={() => setActiveSection(key)}
            >
              {LABELS[key]}
            </button>
          );
        })}
      </nav>

      {/* FOOTER BOTTOM BUTTONS */}
      <div className="sidebar-footer-icons">
        <button className="neumo-icon-btn neumorphic-inset" />
        <button className="neumo-icon-btn neumorphic-inset" />
      </div>

      



    </aside>
  );
}
