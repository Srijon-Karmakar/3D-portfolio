// src/components/sections/Overview.jsx
import React from "react";
import "./Overview.css";

// ================== CONFIG DATA ==================

const kpiCards = [
  { label: "Total Projects", value: 24, sub: "↑ From last month" },
  { label: "Ended Projects", value: 10, sub: "↑ From last month" },
  { label: "Running Projects", value: 12, sub: "On track" },
  { label: "Pending Projects", value: 2, sub: "Needs attention" },
];




const reminders = [
  {
    title: "Meeting with Arc Company",
    time: "02:00 – 04:00 PM",
    note: "Sprint planning & review",
  },
];

const projectsList = [
  { title: "Build Dashboard", status: "In Progress", color: "accent" },
  { title: "Optimize Page Load", status: "In Progress", color: "accent-soft" },
  { title: "Onboarding Flow", status: "Pending", color: "warning" },
  { title: "Cross-Browser Testing", status: "Pending", color: "neutral" },
];

const teamMembers = [
  {
    name: "Alexandra Deff",
    role: "GitHub project repository",
  },
  {
    name: "Edwin Adenike",
    role: "User auth integration",
  },
  {
    name: "Isaac Oluwatemilorun",
    role: "Search & filter functionality",
  },
  {
    name: "David Oshodi",
    role: "Responsive layout for homepage",
  },
];

const progressData = {
  completed: 41,
  inProgress: 38,
  pending: 21,
};

// ================== SMALL COMPONENTS ==================

function KpiRow() {
  return (
    <div className="overview-kpi-row ">
      {kpiCards.map((card) => (
        <div
          key={card.label}
          className={`overview-kpi-card neumo-card neumo-press ${
            card.label === "Total Projects" ? "overview-kpi-main" : ""
          }`}
        >
          <div className="kpi-label neumo-press">{card.label}</div>
          <div className="kpi-value">{card.value}</div>
          <div className="kpi-sub">{card.sub}</div>
        </div>
      ))}
    </div>
  );
}



function ProjectAnalytics() {
  // Hardcoded values for visible bars
  const bars = [
    { day: "S", height: 40 },
    { day: "M", height: 80 },
    { day: "T", height: 95 },
    { day: "W", height: 30 },
    { day: "T", height: 110 },
    { day: "F", height: 20 },
    { day: "S", height: 10 },
  ];

  return (
    <div className="neumo-card overview-block neumo-press">
      <div className="block-header">
        <span className="block-title">Project Analytics</span>
        <span className="block-sub">Last 7 days</span>
      </div>

      <div className="pa-wrapper">
        {bars.map((b) => (
          <div key={b.day} className="pa-col">
            <div
              className="pa-bar"
              style={{ height: `${b.height}px` }}
            ></div>
            <span className="pa-label">{b.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}




function RemindersCard() {
  const reminder = reminders[0];
  return (
    <div className="neumo-card overview-block neumo-press">
      <div className="block-header neumo-press">
        <span className="block-title neumo-press">Reminders</span>
        <span className="block-sub neumo-press">Today</span>
      </div>

      <div className="reminder-card ">
        <div className="reminder-title">{reminder.title}</div>
        <div className="reminder-time">{reminder.time}</div>
        <div className="reminder-note">{reminder.note}</div>

        <button className="primary-chip-button ">Start Meeting</button>
      </div>
    </div>
  );
}

function ProjectList() {
  return (
    <div className="neumo-card overview-block neumo-press">
      <div className="block-header">
        <span className="block-title">Projects</span>
        <button className="tiny-pill neumo-press">+ New</button>
      </div>

      <ul className="project-list">
        {projectsList.map((p) => (
          <li key={p.title} className="project-item">
            <span className={`project-dot dot-${p.color}`} />
            <div className="project-text">
              <span className="project-title">{p.title}</span>
              <span className="project-status">{p.status}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TeamCollaboration() {
  return (
    <div className="neumo-card overview-block neumo-press">
      <div className="block-header neumo-press">
        <span className="block-title">Team Collaboration</span>
        <button className="tiny-pill ">+ Add Member</button>
      </div>

      <ul className="team-list ">
        {teamMembers.map((m) => (
          <li key={m.name} className="team-item">
            <div className="team-avatar neumo-press">{m.name.charAt(0)}</div>
            <div className="team-text neumo-press">
              <span className="team-name">{m.name}</span>
              <span className="team-role">{m.role}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProjectProgress() {
  const total =
    progressData.completed + progressData.inProgress + progressData.pending || 1;
  const percent = progressData.completed;
  return (
    <div className="neumo-card overview-block progress-block neumo-press">
      <div className="block-header">
        <span className="block-title neumo-press">Project Progress</span>
      </div>

      <div className="progress-inner ">
        <div className="progress-ring " style={{ "--percent": percent }}>
          <div className="progress-center neumo-press">
            <span className="progress-value">{percent}%</span>
            <span className="progress-label neumo-press">Completed</span>
          </div>
        </div>

        <ul className="progress-legend ">
          <li>
            <span className="legend-badge badge-completed" />
            <span>Completed</span>
          </li>
          <li>
            <span className="legend-badge badge-progress" />
            <span>In Progress</span>
          </li>
          <li>
            <span className="legend-badge badge-pending" />
            <span>Pending</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

function TimeTracker() {
  return (
    <div className="neumo-card overview-block time-block neumo-press">
      <div className="block-header">
        <span className="block-title neumo-press">Time Tracker</span>
      </div>

      <div className="time-inner">
        <div className="time-display neumo-press">01:24:08</div>
        <div className="time-controls">
          <button className="round-btn neumo-press">▶</button>
          <button className="round-btn round-btn-stop neumo-press">■</button>
        </div>
      </div>
    </div>
  );
}

// ================== PAGE ==================

export default function Overview() {
  return (
    <section className="section-root overview-layout">
      {/* Header row like "Dashboard" */}
      <div className="overview-header-row">
        <div className="dashb">
          <h1 className="section-title">Overview</h1>
          <p className="overview-subtitle">
            Plan, prioritize, and showcase your work at a glance.
          </p>
        </div>
      </div>

      
{/* Top KPI row */}
      <KpiRow />
      {/* Middle row: analytics + reminders + project list */}
      <div className="overview-middle-row">
        <ProjectAnalytics />
        <RemindersCard />
        <ProjectList />
        
      </div>
      

      {/* Bottom row: team + progress + time tracker */}
      <div className="overview-bottom-row">
        <TeamCollaboration />
        <ProjectProgress />
        <TimeTracker />
        
      </div>
      
    </section>
  );
}
