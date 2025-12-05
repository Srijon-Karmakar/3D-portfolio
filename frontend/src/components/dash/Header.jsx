import React from "react";
import "./Header.css"; 
import { useNavigate } from "react-router-dom";

export default function Header({ onCycleTheme, themeIndex }) {
  const navigate = useNavigate();
  const themeNames = [
    "Ocean Mist",
    "Sunset Glow",
    "Mint Breeze",
    "Royal Violet",
    "Warm Clay",
    "Midnight Neon",
    "Soft Pastel",
  ];

  return (
    <header className="header neumorphic neumo-press">
      <div className="header-left">
        <div className="logo-badge">P</div>
        <div className="logo-text">
          <span className="logo-title">Portfolio</span>
          {/* <span className="logo-subtitle">Neumorphism Edition</span> */}
        </div>
      </div>

      <div className="header-right">
        <button
          className="theme-button neumorphic-inset"
          onClick={onCycleTheme}
        >
          <span className="theme-dot-row">
            <span className="theme-dot" />
            <span className="theme-dot" />
            <span className="theme-dot" />
          </span>
          {/* <span className="theme-label">Magic Theme</span> */}
        </button>

        <div className="theme-name">
          {themeNames[themeIndex] || "Custom Theme"}
        </div>

       <button className="neumo-card neumo-press" onClick={() => navigate("/")}>
        Home
       </button>


      </div>
    </header>
  );
}

