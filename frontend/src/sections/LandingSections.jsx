import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { insertContactMessage } from "../lib/supabaseContact";
import "./LandingSections.css";

const experience = [
  {
    company: "House Of MUSA",
    location: "Kolkata, WB",
    role: "Full Stack Developer",
    period: "April 2025 - Present",
    points: [
      "Designed and maintained full-stack web applications with React.js and Node.js, focused on scalable architecture and clean APIs.",
      "Built REST APIs with MongoDB, authentication, role-based access control, and data validation for production-ready features.",
      "Handled delivery end-to-end from requirement analysis to deployment, improving reliability, load time, and component reuse.",
    ],
  },
  {
    company: "Webguru Infosystem",
    location: "Salt Lake, Sector V, Kolkata",
    role: "Python Developer",
    period: "November 2024 - January 2025",
    points: [
      "Developed Django-based applications with dashboard-heavy backend workflows and data-driven service layers.",
      "Worked with product, customer success, and finance teams to build survey workflows and backend logic.",
    ],
  },
];

const skillGroups = [
  {
    title: "Languages",
    icon: "code",
    items: ["C", "Java", "Python", "JavaScript", "HTML", "CSS"],
  },
  {
    title: "Frontend",
    icon: "window",
    items: ["React.js", "Responsive UI", "UI/UX", "Component systems", "Mobile-first layouts"],
  },
  {
    title: "Backend",
    icon: "stack",
    items: ["Node.js", "Django", "NestJS", "REST APIs", "Authentication", "Role-based access"],
  },
  {
    title: "Data",
    icon: "grid",
    items: ["MySQL", "PostgreSQL", "MongoDB", "Data validation", "Dashboard workflows"],
  },
];

const projects = [
  {
    title: "Cloud-based Code Editor Online",
    role: "Full Stack Developer",
    description:
      "Built a React + Node.js online editor for writing, learning, and practising code with secure authentication and database-backed storage.",
    tags: ["React", "Node.js", "Auth", "Database"],
  },
  {
    title: "Online Tool System",
    role: "Full Stack Developer",
    description:
      "Created a media utility platform with backend processing, URL validation, and secure file handling for downloads.",
    tags: ["React", "Node.js", "Processing", "Validation"],
    href: "https://toolit-y4pd.onrender.com/",
  },
  {
    title: "Online Testing Portal",
    role: "Full Stack Developer",
    description:
      "Developed a NestJS-based proctoring system for tests and assignments with role-based authentication and secure data handling.",
    tags: ["NestJS", "Proctoring", "Roles", "Security"],
    href: "https://snv-etester.onrender.com/",
  },
  {
    title: "Restaurant Website",
    role: "Other Project",
    description:
      "A modern interactive restaurant site built with React and Node.js with a stronger focus on presentation and user flow.",
    tags: ["React", "Node.js", "Brand UI"],
    href: "https://resturang.onrender.com/",
  },
  {
    title: "Agency Portfolio",
    role: "Other Project",
    description:
      "Dynamic portfolio experience for an agency, built to present services and brand identity with a sharper visual rhythm.",
    tags: ["Portfolio", "Motion", "Presentation"],
    href: "https://www.senevon.in/",
  },
  {
    title: "Cricket Game App & Web",
    role: "Other Project",
    description:
      "3D cricket work using three.js, TypeScript, cannon-es, and Blender for a more immersive interaction layer.",
    tags: ["Three.js", "TypeScript", "Cannon-es", "Blender"],
    href: "https://pov-cricket.onrender.com/",
  },
  {
    title: "Sports Management System",
    role: "Other Project",
    description:
      "Multi-role ERP-style system for managing sports clubs with admin-facing workflows and structured control.",
    tags: ["ERP", "Multi-role", "Management"],
    href: "https://esm-9x3l.onrender.com/",
  },
];

const services = [
  "Full-stack web apps with React, Node.js, or Django",
  "Responsive landing pages and portfolio websites",
  "Dashboard and workflow interfaces with clean UX",
  "Authentication, API integration, and role-based systems",
];

const proofCards = [
  {
    title: "Cross-functional Delivery",
    text: "Worked closely with designers, product stakeholders, customer success, and finance teams to turn requirements into shipping features.",
  },
  {
    title: "Production Mindset",
    text: "Experience includes architecture, APIs, validation, deployment, performance improvement, and reusable component design.",
  },
];

const writingCards = [
  {
    title: "Workshops & Exhibitions",
    text: "Interested in learning through workshops, exhibitions, and practical exposure outside the screen.",
  },
  {
    title: "Open Source & Design",
    text: "Explores open-source contributions and graphic design to keep both code quality and visual taste evolving.",
  },
];

const contactLinks = [
  {
    label: "LinkedIn",
    value: "linkedin.com/in/srijon-karmakar",
    href: "https://www.linkedin.com/in/srijon-karmakar/",
    action: "Open LinkedIn",
  },
  {
    label: "Email",
    value: "srijonkarmakar.dev@gmail.com",
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=srijonkarmakar.dev@gmail.com",
    action: "Open Gmail",
  },
  {
    label: "Website",
    value: "srijons.onrender.com",
    href: "https://srijons.onrender.com/",
    action: "Visit website",
  },
  {
    label: "Phone",
    value: "+91 7439498882",
    href: "tel:+917439498882",
    action: "Call now",
  },
];

function Glyph({ type }) {
  if (type === "code") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M24 18 10 32l14 14" />
        <path d="m40 18 14 14-14 14" />
        <path d="M36 12 28 52" />
      </svg>
    );
  }

  if (type === "window") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <rect x="10" y="14" width="44" height="36" rx="10" />
        <path d="M10 24h44" />
        <circle cx="18" cy="19" r="2" />
        <circle cx="25" cy="19" r="2" />
      </svg>
    );
  }

  if (type === "stack") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="m12 24 20-10 20 10-20 10-20-10Z" />
        <path d="m12 34 20 10 20-10" />
        <path d="m12 42 20 10 20-10" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <rect x="11" y="11" width="16" height="16" rx="4" />
      <rect x="37" y="11" width="16" height="16" rx="4" />
      <rect x="11" y="37" width="16" height="16" rx="4" />
      <rect x="37" y="37" width="16" height="16" rx="4" />
    </svg>
  );
}

export default function LandingSections() {
  const rootRef = useRef(null);
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") {
      return "light";
    }

    return window.localStorage.getItem("landing-theme") || "light";
  });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", text: "" });

  const setField = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: "", text: "" });

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({ type: "error", text: "Please fill all fields." });
      return;
    }

    try {
      setLoading(true);
      await insertContactMessage({
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        message: form.message.trim(),
      });

      setStatus({ type: "success", text: "Message sent successfully." });
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus({ type: "error", text: error?.message || "Failed to send message." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("landing-theme", theme);
    }
  }, [theme]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      return undefined;
    }

    const revealGroups = root.querySelectorAll(".js-reveal-group");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const targets = entry.target.querySelectorAll(".js-reveal");
          gsap.fromTo(
            targets,
            { y: 26, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.72,
              stagger: 0.08,
              ease: "power2.out",
              overwrite: "auto",
            }
          );

          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    );

    revealGroups.forEach((group) => observer.observe(group));

    const glyphs = root.querySelectorAll(".js-glyph-float");
    const glyphAnimations = Array.from(glyphs).map((glyph, index) =>
      gsap.to(glyph, {
        y: index % 2 === 0 ? -10 : 10,
        rotation: index % 2 === 0 ? -5 : 5,
        duration: 4.8 + index * 0.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
    );

    return () => {
      observer.disconnect();
      glyphAnimations.forEach((animation) => animation.kill());
    };
  }, []);

  return (
    <div className={`landing-shell landing-shell-${theme}`} ref={rootRef}>
      <div className="landing-orb landing-orb-a" aria-hidden="true" />
      <div className="landing-orb landing-orb-b" aria-hidden="true" />

      <div className="landing-toolbar">
        <button
          type="button"
          className="theme-toggle"
          onClick={() => setTheme((current) => (current === "light" ? "dark" : "light"))}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
        >
          <span className="theme-toggle-track">
            <span className="theme-toggle-thumb" />
          </span>
          <span className="theme-toggle-label">{theme === "light" ? "Black mode" : "White mode"}</span>
        </button>
      </div>

      <section className="portfolio-section portfolio-section-intro js-reveal-group" id="about">
        <div className="section-heading js-reveal">
          <span className="section-kicker">About</span>
          <h2 className="section-title">Designing with purpose, building with precision.</h2>
          <p className="section-copy">
            Full Stack Developer specializing in high-performance web applications, 
            scalable architectures, and refined user experiences with a focus on 
            clean code and mobile-first logic.
          </p>
        </div>

        <div className="about-layout">
          <article className="about-summary-card js-reveal">
            <div className="about-photo-wrap">
              <img
                className="about-photo"
                src="/me.jpg"
                alt="Srijon Karmakar"
                loading="lazy"
              />
              <div className="about-photo-glyph glyph-card js-glyph-float" aria-hidden="true">
                <Glyph type="window" />
              </div>
            </div>

            <div className="about-summary-copy">
              <p className="about-meta">B.Tech in Computer Science & Engineering, Data Science</p>
              <p className="about-text">
                Brainware University graduate with an 8.6 GPA, building user interfaces
                that stay expressive without becoming heavy. The focus is always clean UX,
                responsive layout behavior, and dependable implementation.
              </p>
            </div>
          </article>

          <div className="fact-grid">
            <article className="info-card js-reveal">
              <p className="info-value">2025</p>
              <p className="info-text">Graduated in July 2025 with a Data Science-focused CSE degree.</p>
            </article>
            <article className="info-card js-reveal">
              <p className="info-value">8.6 GPA</p>
              <p className="info-text">Strong academic foundation backed by practical product and engineering work.</p>
            </article>
            <article className="info-card js-reveal">
              <p className="info-value">UI + Logic</p>
              <p className="info-text">Comfortable shaping both interface detail and backend architecture in the same build.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="portfolio-section js-reveal-group" id="skills">
        <div className="section-heading js-reveal">
          <span className="section-kicker">Skills</span>
          <h2 className="section-title">A modern stack for high-performance products.</h2>
          <p className="section-copy">
            Technical expertise focused on building robust, scalable, and user-centric 
            digital solutions using industry-standard tools and frameworks.
          </p>
        </div>

        <div className="skills-grid-landing">
          {skillGroups.map((group) => (
            <article className="panel-card skill-panel js-reveal" key={group.title}>
              <div className="skill-panel-top">
                <div className="glyph-card js-glyph-float" aria-hidden="true">
                  <Glyph type={group.icon} />
                </div>
                <h3>{group.title}</h3>
              </div>

              <div className="chip-wrap">
                {group.items.map((item) => (
                  <span className="skill-chip" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="portfolio-section portfolio-section-featured js-reveal-group" id="projects">
        <div className="section-heading js-reveal">
          <span className="section-kicker">Projects</span>
          <h2 className="section-title">Selected works and engineering experiments.</h2>
          <p className="section-copy">
            A showcase of technical challenges solved through clean code, 
            innovative design, and practical software engineering principles.
          </p>
        </div>

        <div className="project-grid-landing">
          {projects.map((project, index) => (
            <article className="project-card-landing js-reveal" key={project.title}>
              <div className="project-card-top">
                <div>
                  <div className="project-index">0{index + 1}</div>
                  <h3>{project.title}</h3>
                </div>
                <div className="glyph-card glyph-card-small js-glyph-float" aria-hidden="true">
                  <Glyph type="grid" />
                </div>
              </div>

              <p className="project-role">{project.role}</p>
              <p>{project.description}</p>

              <div className="chip-wrap">
                {project.tags.map((item) => (
                  <span className="skill-chip skill-chip-strong" key={item}>
                    {item}
                  </span>
                ))}
              </div>

              {project.href ? (
                <a className="project-link" href={project.href} target="_blank" rel="noreferrer">
                  Open project
                </a>
              ) : (
                <span className="project-link project-link-muted">Link available on request</span>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="portfolio-section js-reveal-group" id="experience">
        <div className="section-heading js-reveal">
          <span className="section-kicker">Experience</span>
          <h2 className="section-title">Professional journey and technical milestones.</h2>
          <p className="section-copy">
            A timeline of professional growth and contributions to impactful 
            software projects across diverse industries.
          </p>
        </div>

        <div className="timeline">
          {experience.map((item) => (
            <article className="timeline-item js-reveal" key={item.company}>
              <div className="timeline-side">
                <span className="timeline-period">{item.period}</span>
                <p className="timeline-location">{item.location}</p>
              </div>

              <div className="timeline-main">
                <h3>{item.company}</h3>
                <p className="timeline-role">{item.role}</p>
                <ul className="timeline-points">
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="portfolio-section js-reveal-group" id="services">
        <div className="section-heading js-reveal">
          <span className="section-kicker">Services</span>
          <h2 className="section-title">Bringing digital visions to life.</h2>
          <p className="section-copy">
            Comprehensive development services tailored to modern business 
            needs and high user expectations.
          </p>
        </div>

        <div className="service-list">
          {services.map((service) => (
            <article className="service-item js-reveal" key={service}>
              <span className="service-dot" aria-hidden="true" />
              <p>{service}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="portfolio-section js-reveal-group" id="testimonials">
        <div className="section-heading js-reveal">
          <span className="section-kicker">Proof</span>
          <h2 className="section-title">Commitment to excellence and collaboration.</h2>
          <p className="section-copy">
            Validated experience in delivering quality software and working 
            effectively within cross-functional teams to ship successful products.
          </p>
        </div>

        <div className="testimonial-grid">
          {proofCards.map((item) => (
            <article className="panel-card testimonial-card js-reveal" key={item.title}>
              <div className="glyph-card glyph-card-small js-glyph-float" aria-hidden="true">
                <Glyph type="code" />
              </div>
              <div>
                <strong>{item.title}</strong>
                <p className="testimonial-quote">{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="portfolio-section js-reveal-group" id="blog">
        <div className="section-heading js-reveal">
          <span className="section-kicker">Learning</span>
          <h2 className="section-title">Explorations beyond the codebase.</h2>
          <p className="section-copy">
            Continuous learning and creative pursuits that inform my technical 
            and design perspective, keeping the work fresh and innovative.
          </p>
        </div>

        <div className="blog-grid">
          {writingCards.map((post) => (
            <article className="blog-card js-reveal" key={post.title}>
              <span className="blog-pill">From CV</span>
              <h3>{post.title}</h3>
              <p>{post.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="portfolio-section cta-panel js-reveal-group" id="cta">
        <div className="cta-layout">
          <div className="section-heading js-reveal">
            <span className="section-kicker">CTA</span>
            <h2 className="section-title">Let's build something exceptional.</h2>
            <p className="section-copy">
              Transitioning ideas into production-ready reality through 
              distinguished design and engineering excellence.
            </p>
          </div>

          <div className="cta-glyph-wrap js-reveal" aria-hidden="true">
            <div className="glyph-card glyph-card-large js-glyph-float">
              <Glyph type="stack" />
            </div>
          </div>
        </div>

        <div className="cta-actions js-reveal">
          <a className="cta-button cta-button-primary" href="#contact">
            Start a project
          </a>
          <a className="cta-button" href="/Stats">
            View stats
          </a>
        </div>
      </section>

      <section className="portfolio-section js-reveal-group" id="contact">
        <div className="section-heading js-reveal">
          <span className="section-kicker">Contact</span>
          <h2 className="section-title">Start a conversation.</h2>
          <p className="section-copy">
            Reach out to discuss collaborations, upcoming projects, 
            or technical consulting. I'm always open to new opportunities.
          </p>
        </div>

        <div className="contact-grid-landing">
          {contactLinks.map((item) => (
            <article className="contact-card-landing js-reveal" key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
              <a
                className="contact-card-action"
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noreferrer" : undefined}
              >
                {item.action}
              </a>
            </article>
          ))}
        </div>

        <form className="landing-contact-form js-reveal" onSubmit={onSubmit}>
          <div className="landing-contact-row">
            <input
              type="text"
              placeholder="Your name"
              value={form.name}
              onChange={(event) => setField("name", event.target.value)}
            />
            <input
              type="email"
              placeholder="Your email"
              value={form.email}
              onChange={(event) => setField("email", event.target.value)}
            />
          </div>

          <textarea
            rows="5"
            placeholder="Tell me about the project, timeline, or what you need built."
            value={form.message}
            onChange={(event) => setField("message", event.target.value)}
          />

          {status.text ? (
            <p className={`landing-contact-status landing-contact-status-${status.type}`}>
              {status.text}
            </p>
          ) : null}

          <button className="cta-button cta-button-primary landing-contact-submit" type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send message"}
          </button>
        </form>
      </section>

      <footer className="site-footer">
        <p>Srijon Karmakar</p>
        <span>Full Stack Developer based in Kolkata, India.</span>
      </footer>
    </div>
  );
}
