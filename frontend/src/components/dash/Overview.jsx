import React, { useEffect, useState } from "react";
import "./Overview.css";
import {
  resumeExperience,
  resumeMilestones,
  resumeOverviewMetrics,
  resumeProfile,
  resumeProgressData,
  resumeProjectStates,
} from "../../data/resumeData";

const kpiCards = resumeOverviewMetrics;
const profileSummary = resumeProfile;
const projectsList = resumeProjectStates;
const recentActivities = resumeMilestones;
const progressData = resumeProgressData;

function KpiRow() {
  return (
    <div className="overview-kpi-row">
      {kpiCards.map((card) => (
        <KpiCard key={card.label} {...card} />
      ))}
    </div>
  );
}

function KpiCard({ label, value, sub }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const numericValue = Number(value);
    const isDecimal = !Number.isInteger(numericValue);
    const step = Math.max(isDecimal ? 0.1 : 1, Math.floor(numericValue / 30) || (isDecimal ? 0.1 : 1));

    const interval = setInterval(() => {
      start += step;
      if (start >= numericValue) {
        setCount(numericValue);
        clearInterval(interval);
      } else {
        setCount(isDecimal ? Number(start.toFixed(1)) : Math.round(start));
      }
    }, 18);

    return () => clearInterval(interval);
  }, [value]);

  return (
    <div className={`overview-kpi-card neumo-card neumo-press ${label === "Total Projects" ? "overview-kpi-main" : ""}`}>
      <div className="kpi-label">{label}</div>
      <div className="kpi-value">{Number.isInteger(Number(value)) ? count : Number(count).toFixed(1)}</div>
      <div className="kpi-sub">{sub}</div>
    </div>
  );
}

function ProjectAnalytics() {
  const bars = [
    { day: "React", height: 104 },
    { day: "Node", height: 92 },
    { day: "UI", height: 88 },
    { day: "Django", height: 72 },
    { day: "DB", height: 78 },
    { day: "3D", height: 58 },
    { day: "API", height: 84 },
  ];

  return (
    <div className="neumo-card overview-block neumo-press">
      <div className="block-header">
        <span className="block-title">Core Stack Focus</span>
        <span className="block-sub">CV skill emphasis</span>
      </div>

      <div className="pa-wrapper">
        {bars.map((b) => (
          <div key={b.day} className="pa-col">
            <div className="pa-bar" style={{ height: `${b.height}px` }} />
            <span className="pa-label">{b.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfileSummary() {
  return (
    <div className="neumo-card overview-block neumo-press">
      <div className="block-header">
        <span className="block-title">Profile Summary</span>
      </div>

      <div className="profile-summary">
        <div className="profile-name">{profileSummary.name}</div>
        <div className="profile-role">{profileSummary.role}</div>
        <div className="profile-focus">{profileSummary.focus}</div>
        <div className="profile-status">
          <span className="status-dot" />
          {profileSummary.status}
        </div>
        <div className="profile-focus">
          {profileSummary.location} • GPA {profileSummary.gpa} • {profileSummary.graduation}
        </div>
      </div>
    </div>
  );
}

function ProjectList() {
  return (
    <div className="neumo-card overview-block neumo-press">
      <div className="block-header">
        <span className="block-title">Featured Builds</span>
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

function RecentActivity() {
  return (
    <div className="neumo-card overview-block neumo-press">
      <div className="block-header">
        <span className="block-title">Career Timeline</span>
      </div>

      <ul className="activity-list">
        {recentActivities.map((a) => (
          <li key={`${a.action}-${a.time}`} className="activity-item">
            <div className="activity-dot" />
            <div className="activity-text">
              <span className="activity-action">{a.action}</span>
              <span className="activity-detail">{a.detail}</span>
            </div>
            <span className="activity-time">{a.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProjectProgress() {
  const target = progressData.completed;
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    let p = 0;
    const interval = setInterval(() => {
      p += 1;
      if (p >= target) {
        setPercent(target);
        clearInterval(interval);
      } else {
        setPercent(p);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [target]);

  return (
    <div className="neumo-card overview-block progress-block neumo-press">
      <div className="block-header">
        <span className="block-title">Portfolio Completion</span>
      </div>

      <div className="progress-inner">
        <div className="progress-ring" style={{ "--percent": percent }}>
          <div className="progress-center">
            <span className="progress-value">{percent}%</span>
            <span className="progress-label">Completed</span>
          </div>
        </div>

        <ul className="progress-legend">
          <li>
            <span className="legend-badge badge-completed" />
            <span>Completed work</span>
          </li>
          <li>
            <span className="legend-badge badge-progress" />
            <span>Improvement track</span>
          </li>
          <li>
            <span className="legend-badge badge-pending" />
            <span>Pending work</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

function Clock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const time = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const date = now.toLocaleDateString([], {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  return (
    <div className="neumo-card overview-block time-block neumo-press">
      <div className="block-header">
        <span className="block-title">Local Time</span>
      </div>

      <div className="time-inner">
        <div className="time-display">{time}</div>
        <div className="time-sub">{date}</div>
        <div className="time-sub">{resumeExperience[0].location}</div>
      </div>
    </div>
  );
}

export default function Overview() {
  return (
    <section className="section-root overview-layout">
      <div className="overview-header-row">
        <div className="dashb">
          <h1 className="section-title">Overview</h1>
        </div>
      </div>

      <KpiRow />

      <div className="overview-middle-row">
        <ProjectAnalytics />
        <ProfileSummary />
        <ProjectList />
      </div>

      <div className="overview-bottom-row">
        <RecentActivity />
        <ProjectProgress />
        <Clock />
      </div>
    </section>
  );
}
