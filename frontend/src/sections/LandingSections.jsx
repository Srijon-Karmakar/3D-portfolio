

// // 2nd attempt: 
// import { useEffect, useRef, useState } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { insertContactMessage } from "../lib/supabaseContact";
// import "./LandingSections.css";

// gsap.registerPlugin(ScrollTrigger);

// const experience = [
//   {
//     company: "House Of MUSA",
//     location: "Kolkata, WB",
//     role: "Full Stack Developer",
//     period: "April 2025 - Present",
//     points: [
//       "Built scalable full-stack applications using React.js and Node.js.",
//       "Designed REST APIs with MongoDB, authentication, role-based access control, and validation.",
//       "Delivered features end-to-end from requirement analysis to deployment and optimization.",
//     ],
//   },
//   {
//     company: "Webguru Infosystem",
//     location: "Salt Lake, Sector V, Kolkata",
//     role: "Python Developer",
//     period: "November 2024 - January 2025",
//     points: [
//       "Developed Django-based applications and backend workflows for dashboard-driven systems.",
//       "Worked across teams to implement survey workflows and backend business logic.",
//     ],
//   },
// ];

// const skillRailOne = [
//   { label: "React.js", icon: "window" },
//   { label: "Node.js", icon: "stack" },
//   { label: "JavaScript", icon: "code" },
//   { label: "Python", icon: "code" },
//   { label: "MongoDB", icon: "grid" },
//   { label: "REST APIs", icon: "stack" },
//   { label: "Authentication", icon: "shield" },
//   { label: "UI/UX", icon: "spark" },
//   { label: "Responsive Design", icon: "window" },
//   { label: "Django", icon: "stack" },
//   { label: "NestJS", icon: "stack" },
//   { label: "PostgreSQL", icon: "grid" },
// ];

// const skillRailTwo = [
//   { label: "HTML", icon: "code" },
//   { label: "CSS", icon: "spark" },
//   { label: "Java", icon: "code" },
//   { label: "C", icon: "code" },
//   { label: "MySQL", icon: "grid" },
//   { label: "RBAC", icon: "shield" },
//   { label: "Data Validation", icon: "shield" },
//   { label: "Full Stack", icon: "stack" },
//   { label: "Frontend", icon: "window" },
//   { label: "Backend", icon: "stack" },
//   { label: "API Integration", icon: "stack" },
//   { label: "System Design", icon: "grid" },
// ];

// const projects = [
//   {
//     title: "Cloud-based Code Editor",
//     role: "Full Stack Developer",
//     description:
//       "Cloud-based code editor with authentication, backend execution, and persistent storage.",
//     tags: ["React", "Node.js", "Auth", "Storage"],
//   },
//   {
//     title: "Online Tool System",
//     role: "Full Stack Developer",
//     description:
//       "Media processing platform with secure file handling and URL validation.",
//     tags: ["React", "Node.js", "Processing", "Validation"],
//     href: "https://toolit-y4pd.onrender.com/",
//   },
//   {
//     title: "Online Testing Portal",
//     role: "Full Stack Developer",
//     description:
//       "Online testing platform with proctoring and role-based access control.",
//     tags: ["NestJS", "Proctoring", "RBAC", "Security"],
//     href: "https://snv-etester.onrender.com/",
//   },
//   {
//     title: "Restaurant Website",
//     role: "Project",
//     description:
//       "Responsive restaurant website built for modern presentation and smooth user flow.",
//     tags: ["React", "Node.js", "UI", "Responsive"],
//     href: "https://resturang.onrender.com/",
//   },
//   {
//     title: "Agency Portfolio",
//     role: "Project",
//     description:
//       "Dynamic portfolio website designed to present services, projects, and brand identity.",
//     tags: ["Portfolio", "Branding", "UI", "Frontend"],
//     href: "https://www.senevon.in/",
//   },
//   {
//     title: "Cricket Game App & Web",
//     role: "Project",
//     description:
//       "3D cricket experience built with Three.js, TypeScript, Cannon-es, and Blender.",
//     tags: ["Three.js", "TypeScript", "Cannon-es", "Blender"],
//     href: "https://pov-cricket.onrender.com/",
//   },
//   {
//     title: "Sports Management System",
//     role: "Project",
//     description:
//       "Multi-role ERP-style system for managing sports clubs and operational workflows.",
//     tags: ["ERP", "Multi-role", "Management", "System Design"],
//     href: "https://esm-9x3l.onrender.com/",
//   },
// ];

// const PROJECT_ACCENTS = [
//   "linear-gradient(135deg, #6d28d9, #8b5cf6)",
//   "linear-gradient(135deg, #4f46e5, #7c3aed)",
//   "linear-gradient(135deg, #7c3aed, #c084fc)",
//   "linear-gradient(135deg, #5b21b6, #8b5cf6)",
//   "linear-gradient(135deg, #6d28d9, #a855f7)",
//   "linear-gradient(135deg, #4338ca, #7c3aed)",
//   "linear-gradient(135deg, #7c3aed, #a78bfa)",
// ];

// const services = [
//   {
//     title: "Full-Stack Dev",
//     description:
//       "End-to-end web applications built with React.js, Node.js, and Django. From system architecture to deployment, I own the full lifecycle.",
//     tags: ["React.js", "Node.js", "Django", "REST APIs", "PostgreSQL"],
//     image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=900&q=80&fit=crop",
//   },
//   {
//     title: "Backend Systems",
//     description:
//       "Scalable server-side architecture, REST API design, database modelling, and role-based authentication built for real production loads.",
//     tags: ["Node.js", "Express", "PostgreSQL", "MongoDB", "JWT"],
//     image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&q=80&fit=crop",
//   },
//   {
//     title: "UI & Interfaces",
//     description:
//       "Clean, responsive dashboards and workflow interfaces with a strong focus on performance, usability, and modern interaction design.",
//     tags: ["React.js", "Tailwind", "GSAP", "Framer Motion"],
//     image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=900&q=80&fit=crop",
//   },
//   {
//     title: "Data & Automation",
//     description:
//       "Data-driven applications, visualisation dashboards, and Python-based automation workflows grounded in a Data Science foundation.",
//     tags: ["Python", "Data Science", "Django", "Automation"],
//     image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80&fit=crop",
//   },
// ];

// const contactLinks = [
//   {
//     label: "LinkedIn",
//     value: "linkedin.com/in/srijon-karmakar",
//     href: "https://www.linkedin.com/in/srijon-karmakar/",
//     action: "Open LinkedIn",
//   },
//   {
//     label: "Email",
//     value: "srijonkarmakar.dev@gmail.com",
//     href: "https://mail.google.com/mail/?view=cm&fs=1&to=srijonkarmakar.dev@gmail.com",
//     action: "Open Gmail",
//   },
//   {
//     label: "Website",
//     value: "srijons.onrender.com",
//     href: "https://srijons.onrender.com/",
//     action: "Visit website",
//   },
//   {
//     label: "Phone",
//     value: "+91 7439498882",
//     href: "tel:+917439498882",
//     action: "Call now",
//   },
// ];

// function Glyph({ type }) {
//   if (type === "code") {
//     return (
//       <svg viewBox="0 0 64 64" aria-hidden="true">
//         <path d="M24 18 10 32l14 14" />
//         <path d="m40 18 14 14-14 14" />
//         <path d="M36 12 28 52" />
//       </svg>
//     );
//   }

//   if (type === "window") {
//     return (
//       <svg viewBox="0 0 64 64" aria-hidden="true">
//         <rect x="10" y="14" width="44" height="36" rx="10" />
//         <path d="M10 24h44" />
//         <circle cx="18" cy="19" r="2" />
//         <circle cx="25" cy="19" r="2" />
//       </svg>
//     );
//   }

//   if (type === "stack") {
//     return (
//       <svg viewBox="0 0 64 64" aria-hidden="true">
//         <path d="m12 24 20-10 20 10-20 10-20-10Z" />
//         <path d="m12 34 20 10 20-10" />
//         <path d="m12 42 20 10 20-10" />
//       </svg>
//     );
//   }

//   if (type === "shield") {
//     return (
//       <svg viewBox="0 0 64 64" aria-hidden="true">
//         <path d="M32 10 48 16v13c0 11-7 18-16 25-9-7-16-14-16-25V16l16-6Z" />
//         <path d="m24 32 5 5 11-12" />
//       </svg>
//     );
//   }

//   if (type === "spark") {
//     return (
//       <svg viewBox="0 0 64 64" aria-hidden="true">
//         <path d="M32 10 36 24 50 28 36 32 32 46 28 32 14 28 28 24 32 10Z" />
//       </svg>
//     );
//   }

//   return (
//     <svg viewBox="0 0 64 64" aria-hidden="true">
//       <rect x="11" y="11" width="16" height="16" rx="4" />
//       <rect x="37" y="11" width="16" height="16" rx="4" />
//       <rect x="11" y="37" width="16" height="16" rx="4" />
//       <rect x="37" y="37" width="16" height="16" rx="4" />
//     </svg>
//   );
// }

// export default function LandingSections() {
//   const rootRef = useRef(null);
//   const [theme, setTheme] = useState(() => {
//     if (typeof window === "undefined") {
//       return "light";
//     }

//     return window.localStorage.getItem("landing-theme") || "light";
//   });
//   const [form, setForm] = useState({ name: "", email: "", message: "" });
//   const [loading, setLoading] = useState(false);
//   const [status, setStatus] = useState({ type: "", text: "" });

//   const setField = (key, value) => {
//     setForm((current) => ({ ...current, [key]: value }));
//   };

//   const onSubmit = async (event) => {
//     event.preventDefault();
//     setStatus({ type: "", text: "" });

//     if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
//       setStatus({ type: "error", text: "Please fill all fields." });
//       return;
//     }

//     try {
//       setLoading(true);
//       await insertContactMessage({
//         name: form.name.trim(),
//         email: form.email.trim().toLowerCase(),
//         message: form.message.trim(),
//       });

//       setStatus({ type: "success", text: "Message sent successfully." });
//       setForm({ name: "", email: "", message: "" });
//     } catch (error) {
//       setStatus({ type: "error", text: error?.message || "Failed to send message." });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       window.localStorage.setItem("landing-theme", theme);
//     }
//   }, [theme]);

//   useEffect(() => {
//     const root = rootRef.current;
//     if (!root) return undefined;

//     const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

//     // Instant reveal for accessibility — no animation at all
//     if (prefersReducedMotion) {
//       root.querySelectorAll(".js-reveal").forEach((el) => {
//         gsap.set(el, { opacity: 1, y: 0, x: 0, scale: 1, clearProps: "transform" });
//       });
//       return undefined;
//     }

//     // gsap.context() scopes all animations + ScrollTriggers to root.
//     // ctx.revert() kills everything on unmount — no manual tracking needed.
//     let motionObserver;
//     const ctx = gsap.context(() => {

//       const mm = gsap.matchMedia();

//       mm.add(
//         { mobile: "(max-width: 767px)", desktop: "(min-width: 768px)" },
//         (context) => {
//           const { mobile } = context.conditions;

//           const Y    = mobile ? 24 : 44;
//           const dur  = mobile ? 0.9 : 1.1;
//           const stgr = mobile ? 0.1 : 0.13;
//           const ease = "power3.out";
//           // On mobile trigger a bit earlier (element barely in view is enough)
//           const start = mobile ? "top 92%" : "top 85%";

//           // ── Core reveal: each .js-reveal-group triggers its children ──
//           // CSS hides .js-reveal elements; GSAP animates them in when their
//           // parent group enters the viewport, with a stagger between items.
//           gsap.utils.toArray(".js-reveal-group", root).forEach((group) => {
//             const items = gsap
//               .utils
//               .toArray(".js-reveal", group)
//               .filter((item) => !item.classList.contains("proj-card") && !item.classList.contains("timeline-item"));
//             if (!items.length) return;

//             gsap.fromTo(
//               items,
//               { opacity: 0, y: Y },
//               {
//                 opacity: 1,
//                 y: 0,
//                 duration: dur,
//                 stagger: stgr,
//                 ease,
//                 scrollTrigger: { trigger: group, start, once: true },
//               }
//             );
//           });

//           // ── Project cards: also animate scale ─────────────────
//           const projectCards = gsap.utils.toArray(".proj-card", root);
//           const projectGrid = root.querySelector(".proj-grid");
//           if (projectCards.length && projectGrid) {
//             gsap.fromTo(
//               projectCards,
//               { opacity: 0, y: Y, scale: 0.96 },
//               {
//                 opacity: 1,
//                 y: 0,
//                 scale: 1,
//                 duration: dur,
//                 stagger: stgr,
//                 ease,
//                 overwrite: "auto",
//                 scrollTrigger: {
//                   trigger: projectGrid,
//                   start,
//                   once: true,
//                 },
//               }
//             );
//           }

//           // ── Timeline items: slide from alternating sides on desktop ──
//           const timelineItems = gsap.utils.toArray(".timeline-item", root);
//           const experienceSection = root.querySelector("#experience");
//           if (timelineItems.length && experienceSection) {
//             gsap.fromTo(
//               timelineItems,
//               {
//                 opacity: 0,
//                 y: mobile ? Y : 0,
//                 x: (_, itemIndex) => (mobile ? 0 : itemIndex % 2 === 0 ? -30 : 30),
//               },
//               {
//                 opacity: 1,
//                 y: 0,
//                 x: 0,
//                 duration: dur,
//                 stagger: stgr,
//                 ease,
//                 overwrite: "auto",
//                 scrollTrigger: {
//                   trigger: experienceSection,
//                   start,
//                   once: true,
//                 },
//               }
//             );
//           }
//         }
//       );

//       // ── Glyph floats — continuous idle animation ─────────────
//       gsap.utils.toArray(".js-glyph-float", root).forEach((glyph, i) =>
//         gsap.to(glyph, {
//           y:        i % 2 === 0 ? -10 : 10,
//           rotation: i % 2 === 0 ? -5  : 5,
//           duration: 4.8 + i * 0.5,
//           repeat:   -1,
//           yoyo:     true,
//           ease:     "sine.inOut",
//         })
//       );

//       // ── Service cards: sticky stacking + scroll-scrub scale ──
//       const serviceWraps = gsap.utils.toArray(".service-wrap", root);

//       serviceWraps.slice(0, -1).forEach((wrap, i) => {
//         const card     = wrap.querySelector(".service-card");
//         const nextWrap = serviceWraps[i + 1];
//         if (!card || !nextWrap) return;

//         gsap.to(card, {
//           scale: 0.97,
//           filter: "brightness(0.92)",
//           ease: "none",
//           transformOrigin: "center top",
//           scrollTrigger: {
//             trigger: nextWrap,
//             start: "top 88%",
//             end: "top 30%",
//             scrub: 0.6,
//           },
//         });
//       });

//       const serviceCards = gsap.utils.toArray(".service-card", root);
//       gsap.set(serviceCards, { opacity: 0, y: 52, scale: 0.98, transformOrigin: "center top" });

//       ScrollTrigger.batch(serviceCards, {
//         start: "top 90%",
//         once:  true,
//         onEnter: (batch) =>
//           gsap.to(batch, {
//             opacity: 1,
//             y:       0,
//             scale:   1,
//             duration: 0.95,
//             ease:    "power3.out",
//             stagger: { each: 0.1, from: "start" },
//           }),
//       });

//       motionObserver = new IntersectionObserver(
//         (entries) => {
//           entries.forEach((entry) => {
//             entry.target.dataset.inview = entry.isIntersecting ? "true" : "false";
//           });
//         },
//         {
//           threshold: 0.01,
//           rootMargin: "120px 0px 120px 0px",
//         }
//       );

//       gsap.utils.toArray(".js-pausable-motion", root).forEach((node) => {
//         node.dataset.inview = "true";
//         motionObserver.observe(node);
//       });

//     }, root);

//     return () => {
//       motionObserver?.disconnect();
//       ctx.revert();
//     };
//   }, []);

//   return (
//     <div className={`landing-shell landing-shell-${theme}`} ref={rootRef}>
//       <div className="landing-orb landing-orb-a" aria-hidden="true" />
//       <div className="landing-orb landing-orb-b" aria-hidden="true" />

//       <div className="landing-toolbar">
//         <button
//           type="button"
//           className="theme-toggle"
//           onClick={() => setTheme((current) => (current === "light" ? "dark" : "light"))}
//           aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
//         >
//           <span className="theme-toggle-track">
//             <span className="theme-toggle-thumb" />
//           </span>
//           <span className="theme-toggle-label">
//             {theme === "light" ? "Black mode" : "White mode"}
//           </span>
//         </button>
//       </div>

//       <section className="portfolio-section portfolio-section-intro js-reveal-group" id="about">
//         <div className="section-heading js-reveal">
//           <span className="section-kicker">About</span>
//           <h2 className="section-title">I build scalable digital products.</h2>
//           <p className="section-copy">
//             Full Stack Developer with hands-on experience building scalable web applications
//             using React.js, Node.js, and modern backend systems. Focused on delivering
//             production-ready solutions with clean architecture, optimized performance,
//             and strong user experience across devices.
//           </p>
//         </div>

//         <div className="about-layout">
//           <article className="about-summary-card js-reveal">
//             <div className="about-photo-deck">
//               <div className="about-photo-stack">
//                 <img
//                   className="about-photo-stacked"
//                   src="/me.jpg"
//                   alt="Srijon Karmakar"
//                   loading="lazy"
//                   decoding="async"
//                 />
//               </div>
//             </div>

//             <div className="about-summary-copy">
//               <p className="about-meta">
//                 B.Tech in Computer Science & Engineering, Data Science
//               </p>
//               <p className="about-text">
//                 Based in Kolkata. Computer Science graduate with a focus on Data Science.
//                 I work across frontend and backend to create clean, efficient, and scalable systems.
//               </p>
//             </div>
//           </article>

//           <div className="fact-grid">
//             <article className="info-card js-reveal">
//               <p className="info-value">2025</p>
//               <p className="info-text">Graduated in July 2025 from Brainware University.</p>
//             </article>
//             <article className="info-card js-reveal">
//               <p className="info-value">8.6 GPA</p>
//               <p className="info-text">Strong academic foundation in Computer Science and Data Science.</p>
//             </article>
//             <article className="info-card js-reveal">
//               <p className="info-value">Full Stack</p>
//               <p className="info-text">Builds complete systems from interface to backend logic and database design.</p>
//             </article>
//           </div>
//         </div>
//       </section>

     



// <section className="portfolio-section js-reveal-group" id="skills">
//   <div className="section-heading js-reveal">
//     <span className="section-kicker">Skills</span>
//     <h2 className="section-title">Tools I work with.</h2>
//     <p className="section-copy">
//       A focused stack for building modern web applications.
//     </p>
//   </div>

//   <div className="skills-rail-wrap js-reveal">
//     <div className="skills-rail-fade skills-rail-fade-left" aria-hidden="true" />
//     <div className="skills-rail-fade skills-rail-fade-right" aria-hidden="true" />

//     <div className="skills-rail skills-rail-one">
//       <div className="skills-rail-track js-pausable-motion">
//         {[...skillRailOne, ...skillRailOne].map((item, index) => (
//           <span className="skills-rail-chip" key={`rail-one-${item.label}-${index}`}>
//             <span className="skills-rail-chip-icon" aria-hidden="true">
//               <Glyph type={item.icon} />
//             </span>
//             <span>{item.label}</span>
//           </span>
//         ))}
//       </div>
//     </div>

//     <div className="skills-rail skills-rail-two">
//       <div className="skills-rail-track js-pausable-motion">
//         {[...skillRailTwo, ...skillRailTwo].map((item, index) => (
//           <span className="skills-rail-chip" key={`rail-two-${item.label}-${index}`}>
//             <span className="skills-rail-chip-icon" aria-hidden="true">
//               <Glyph type={item.icon} />
//             </span>
//             <span>{item.label}</span>
//           </span>
//         ))}
//       </div>
//     </div>
//   </div>
// </section>




//       <section className="portfolio-section portfolio-section-featured proj-section js-reveal-group" id="projects">
//         <div className="section-heading proj-header js-reveal">
//           <span className="section-kicker">Projects</span>
//           <h2 className="section-title">Selected projects.</h2>
//           <p className="section-copy">
//             Real-world applications built with performance, scalability, and usability in mind.
//           </p>
//         </div>

//         <div className="proj-grid">
//           {projects.map((project, index) => (
//             <article
//               className={`proj-card js-reveal${index === 0 ? " proj-card--featured" : ""}`}
//               key={project.title}
//             >
//               {/* Gradient top accent */}
//               <div className="proj-card__accent" style={{ background: PROJECT_ACCENTS[index] }} />

//               {/* Watermark number */}
//               <span className="proj-card__watermark" aria-hidden="true">
//                 {String(index + 1).padStart(2, "0")}
//               </span>

//               <div className="proj-card__inner">
//                 {/* Top row: index + ext link */}
//                 <div className="proj-card__top">
//                   <span className="proj-card__num">{String(index + 1).padStart(2, "0")}</span>
//                   {project.href && (
//                     <a
//                       className="proj-card__ext"
//                       href={project.href}
//                       target="_blank"
//                       rel="noreferrer"
//                       aria-label={`Open ${project.title}`}
//                       onClick={(e) => e.stopPropagation()}
//                     >
//                       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
//                         <path d="M7 17L17 7M17 7H7M17 7v10" />
//                       </svg>
//                     </a>
//                   )}
//                 </div>

//                 {/* Body */}
//                 <div className="proj-card__body">
//                   <p className="proj-card__role">{project.role}</p>
//                   <h3 className="proj-card__title">{project.title}</h3>
//                   <p className="proj-card__desc">{project.description}</p>
//                 </div>

//                 {/* Footer: tags + CTA */}
//                 <div className="proj-card__footer">
//                   <div className="proj-card__tags">
//                     {project.tags.map((tag) => (
//                       <span key={tag}>{tag}</span>
//                     ))}
//                   </div>
//                   {project.href ? (
//                     <a className="proj-card__link" href={project.href} target="_blank" rel="noreferrer">
//                       Open project <span className="proj-card__arrow">↗</span>
//                     </a>
//                   ) : (
//                     <span className="proj-card__link proj-card__link--muted">Link on request</span>
//                   )}
//                 </div>
//               </div>
//             </article>
//           ))}
//         </div>
//       </section>

//       <section className="portfolio-section js-reveal-group" id="experience">
//         <div className="section-heading js-reveal">
//           <span className="section-kicker">Experience</span>
//           <h2 className="section-title">Experience.</h2>
//           <p className="section-copy">
//             Building production systems and delivering real-world applications.
//           </p>
//         </div>

//         <div className="timeline">
//           {experience.map((item) => (
//             <article className="timeline-item js-reveal" key={item.company}>
//               <div className="timeline-side">
//                 <span className="timeline-period">{item.period}</span>
//                 <p className="timeline-location">{item.location}</p>
//               </div>

//               <div className="timeline-main">
//                 <h3>{item.company}</h3>
//                 <p className="timeline-role">{item.role}</p>
//                 <ul className="timeline-points">
//                   {item.points.map((point) => (
//                     <li key={point}>{point}</li>
//                   ))}
//                 </ul>
//               </div>
//             </article>
//           ))}
//         </div>
//       </section>

//       <section className="services-section" id="services">
//         <h2 className="sr-only">What I do</h2>

//         {/* Marquee rail */}
//         <div className="services-marquee" aria-hidden="true">
//           <div className="services-marquee-track js-pausable-motion">
//             {[...services, ...services].map((s, i) => (
//               <span key={`${s.title}-${i}`} className="services-marquee-item">
//                 {s.title}
//                 <span className="services-marquee-sep" aria-hidden="true">·</span>
//               </span>
//             ))}
//           </div>
//         </div>

//         {/* Sticky stacking cards */}
//         <div className="services-stack">
//           {services.map((service, index) => (
//             <div
//               className="service-wrap"
//               key={service.title}
//               style={{ "--ci": index, zIndex: index + 1 }}
//             >
//               <article className="service-card">
//                 <div className="service-card-content">
//                   <div className="service-card-left">
//                     <span className="service-card-num">0{index + 1}</span>
//                     <h3 className="service-card-title">{service.title}</h3>
//                     <p className="service-card-desc">{service.description}</p>
//                     <div className="service-card-tags">
//                       {service.tags.map((tag) => (
//                         <span key={tag} className="service-card-tag">{tag}</span>
//                       ))}
//                     </div>
//                   </div>
//                   <div className="service-card-right">
//                     <img
//                       className="service-card-img"
//                       src={service.image}
//                       alt={service.title}
//                       loading="lazy"
//                       decoding="async"
//                       fetchPriority="low"
//                     />
//                   </div>
//                 </div>
//               </article>
//             </div>
//           ))}
//         </div>
//       </section>


//       {/* <section className="portfolio-section js-reveal-group" id="approach">
//         <div className="section-heading js-reveal">
//           <span className="section-kicker">Approach</span>
//           <h2 className="section-title">How I work.</h2>
//           <p className="section-copy">
//             Practical development with a strong focus on clarity, delivery, and system quality.
//           </p>
//         </div>

//         <div className="testimonial-grid">
//           {proofCards.map((item) => (
//             <article className="panel-card testimonial-card js-reveal" key={item.title}>
//               <div className="glyph-card glyph-card-small js-glyph-float" aria-hidden="true">
//                 <Glyph type="code" />
//               </div>
//               <div>
//                 <strong>{item.title}</strong>
//                 <p className="testimonial-quote">{item.text}</p>
//               </div>
//             </article>
//           ))}
//         </div>
//       </section> */}


//       {/* <section className="portfolio-section js-reveal-group" id="blog">
//         <div className="section-heading js-reveal">
//           <span className="section-kicker">Beyond Code</span>
//           <h2 className="section-title">Beyond code.</h2>
//           <p className="section-copy">
//             Learning, design, and continuous exploration shape the way I build.
//           </p>
//         </div>

//         <div className="blog-grid">
//           {writingCards.map((post) => (
//             <article className="blog-card js-reveal" key={post.title}>
//               <span className="blog-pill">From CV</span>
//               <h3>{post.title}</h3>
//               <p>{post.text}</p>
//             </article>
//           ))}
//         </div>
//       </section> */}

//       <section className="portfolio-section cta-panel js-reveal-group" id="cta">
//         <div className="cta-layout">
//           <div className="section-heading js-reveal">
//             <span className="section-kicker">Contact</span>
//             <h2 className="section-title">Let’s build something great.</h2>
//             <p className="section-copy">
//               Open to full-time roles, freelance projects, and collaborations where I can
//               contribute to building scalable and impactful digital products.
//             </p>
//           </div>

//           <div className="cta-glyph-wrap js-reveal" aria-hidden="true">
//             <div className="glyph-card glyph-card-large js-glyph-float">
//               <Glyph type="stack" />
//             </div>
//           </div>
//         </div>

//         <div className="cta-actions js-reveal">
//           <a className="cta-button cta-button-primary" href="#contact">
//             Start a conversation
//           </a>
//           <a className="cta-button" href="/Stats">
//             View stats
//           </a>
//         </div>
//       </section>

//       <section className="portfolio-section js-reveal-group" id="contact">
//         <div className="section-heading js-reveal">
//           <span className="section-kicker">Get in touch</span>
//           <h2 className="section-title">Get in touch.</h2>
//           <p className="section-copy">
//             Feel free to reach out for opportunities, collaborations, or project discussions.
//             I’m available for full-time roles and freelance work.
//           </p>
//         </div>

//         <div className="contact-grid-landing">
//           {contactLinks.map((item) => (
//             <article className="contact-card-landing js-reveal" key={item.label}>
//               <span>{item.label}</span>
//               <strong>{item.value}</strong>
//               <a
//                 className="contact-card-action"
//                 href={item.href}
//                 target={item.href.startsWith("http") ? "_blank" : undefined}
//                 rel={item.href.startsWith("http") ? "noreferrer" : undefined}
//               >
//                 {item.action}
//               </a>
//             </article>
//           ))}
//         </div>

//         <form className="landing-contact-form js-reveal" onSubmit={onSubmit}>
//           <div className="landing-contact-row">
//             <input
//               type="text"
//               placeholder="Your name"
//               value={form.name}
//               onChange={(event) => setField("name", event.target.value)}
//             />
//             <input
//               type="email"
//               placeholder="Your email"
//               value={form.email}
//               onChange={(event) => setField("email", event.target.value)}
//             />
//           </div>

//           <textarea
//             rows="5"
//             placeholder="Tell me about the project, role, or collaboration."
//             value={form.message}
//             onChange={(event) => setField("message", event.target.value)}
//           />

//           {status.text ? (
//             <p className={`landing-contact-status landing-contact-status-${status.type}`}>
//               {status.text}
//             </p>
//           ) : null}

//           <button className="cta-button cta-button-primary landing-contact-submit" type="submit" disabled={loading}>
//             {loading ? "Sending..." : "Send message"}
//           </button>
//         </form>
//       </section>

//       <footer className="mega-footer">

//         {/* ── Dark rounded card with marquee ── */}
//         <div className="mega-footer__dark">
//           <div className="mega-footer__ticker" aria-hidden="true">
//             <div className="mega-footer__ticker-track js-pausable-motion">
//               {[...Array(2)].map((_, i) => (
//                 <span key={i} className="mega-footer__ticker-group">
//                   <span className="mega-footer__ticker-item">Hire me ↗</span>
//                   <span className="mega-footer__ticker-sep">·</span>
//                   <span className="mega-footer__ticker-item">Let's work together ↗</span>
//                   <span className="mega-footer__ticker-sep">·</span>
//                   <span className="mega-footer__ticker-item">Open to opportunities ↗</span>
//                   <span className="mega-footer__ticker-sep">·</span>
//                   <span className="mega-footer__ticker-item">Get in touch ↗</span>
//                   <span className="mega-footer__ticker-sep">·</span>
//                 </span>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* ── Light footer body ── */}
//         <div className="mega-footer__light">

//           {/* 4-column grid */}
//           <div className="mega-footer__cols">
//             <div className="mega-footer__col">
//               <p className="mega-footer__col-heading">Portfolio</p>
//               <a href="#projects">Projects</a>
//               <a href="#experience">Experience</a>
//               <a href="#about">About</a>
//               <a href="#services">Services</a>
//             </div>
//             <div className="mega-footer__col">
//               <p className="mega-footer__col-heading">Skills</p>
//               <a href="#skills">Frontend</a>
//               <a href="#skills">Backend</a>
//               <a href="#skills">Databases</a>
//               <a href="#skills">3D &amp; Motion</a>
//             </div>
//             <div className="mega-footer__col">
//               <p className="mega-footer__col-heading">Connect</p>
//               <a href="https://www.linkedin.com/in/srijon-karmakar/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
//               <a href="https://mail.google.com/mail/?view=cm&fs=1&to=srijonkarmakar.dev@gmail.com" target="_blank" rel="noreferrer">Email ↗</a>
//               <a href="https://github.com/srijon57" target="_blank" rel="noreferrer">GitHub ↗</a>
//             </div>
//             <div className="mega-footer__col">
//               <p className="mega-footer__col-heading">Availability</p>
//               <span className="mega-footer__available">
//                 <span className="mega-footer__dot" aria-hidden="true" />
//                 Open to work
//               </span>
//               <a href="https://mail.google.com/mail/?view=cm&fs=1&to=srijonkarmakar.dev@gmail.com" target="_blank" rel="noreferrer">Hire me</a>
//               <a href="https://mail.google.com/mail/?view=cm&fs=1&to=srijonkarmakar.dev@gmail.com" target="_blank" rel="noreferrer">Freelance</a>
//             </div>
//           </div>

//           {/* Bottom bar */}
//           <div className="mega-footer__bottom">
//             <span>© 2026 Srijon Karmakar</span>
//             <span className="mega-footer__role">Kolkata, India</span>
//             <div className="mega-footer__socials">
//               <a href="https://www.linkedin.com/in/srijon-karmakar/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
//                 <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
//               </a>
//               <a href="https://github.com/srijon57" target="_blank" rel="noreferrer" aria-label="GitHub">
//                 <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>
//               </a>
//               <a href="https://mail.google.com/mail/?view=cm&fs=1&to=srijonkarmakar.dev@gmail.com" target="_blank" rel="noreferrer" aria-label="Email">
//                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
//               </a>
//             </div>
//           </div>

//         </div>
//       </footer>
//     </div>
//   );
// }



























































































































// 3rd attempt
import { useEffect, useId, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { insertContactMessage } from "../lib/supabaseContact";
import { getDeviceProfile } from "../utils/performanceProfile";
import "./LandingSections.css";

gsap.registerPlugin(ScrollTrigger);

const experience = [
  {
    company: "House Of MUSA",
    location: "Kolkata, WB",
    role: "Full Stack Developer",
    period: "April 2025 - Present",
    points: [
      "Built scalable full-stack applications using React.js and Node.js.",
      "Designed REST APIs with MongoDB, authentication, role-based access control, and validation.",
      "Delivered features end-to-end from requirement analysis to deployment and optimization.",
    ],
  },
  {
    company: "Webguru Infosystem",
    location: "Salt Lake, Sector V, Kolkata",
    role: "Python Developer",
    period: "November 2024 - January 2025",
    points: [
      "Developed Django-based applications and backend workflows for dashboard-driven systems.",
      "Worked across teams to implement survey workflows and backend business logic.",
    ],
  },
];

const skillRailOne = [
  { label: "React.js", icon: "window" },
  { label: "Node.js", icon: "stack" },
  { label: "JavaScript", icon: "code" },
  { label: "Python", icon: "code" },
  { label: "MongoDB", icon: "grid" },
  { label: "REST APIs", icon: "stack" },
  { label: "Authentication", icon: "shield" },
  { label: "UI/UX", icon: "spark" },
  { label: "Responsive Design", icon: "window" },
  { label: "Django", icon: "stack" },
  { label: "NestJS", icon: "stack" },
  { label: "PostgreSQL", icon: "grid" },
];

const skillRailTwo = [
  { label: "HTML", icon: "code" },
  { label: "CSS", icon: "spark" },
  { label: "Java", icon: "code" },
  { label: "C", icon: "code" },
  { label: "MySQL", icon: "grid" },
  { label: "RBAC", icon: "shield" },
  { label: "Data Validation", icon: "shield" },
  { label: "Full Stack", icon: "stack" },
  { label: "Frontend", icon: "window" },
  { label: "Backend", icon: "stack" },
  { label: "API Integration", icon: "stack" },
  { label: "System Design", icon: "grid" },
];

const projects = [
  {
    title: "Cloud-based Code Editor",
    role: "Full Stack Developer",
    description:
      "Cloud-based code editor with authentication, backend execution, and persistent storage.",
    tags: ["React", "Node.js", "Auth", "Storage"],
  },
  {
    title: "Online Tool System",
    role: "Full Stack Developer",
    description:
      "Media processing platform with secure file handling and URL validation.",
    tags: ["React", "Node.js", "Processing", "Validation"],
    href: "https://toolit-y4pd.onrender.com/",
  },
  {
    title: "Online Testing Portal",
    role: "Full Stack Developer",
    description:
      "Online testing platform with proctoring and role-based access control.",
    tags: ["NestJS", "Proctoring", "RBAC", "Security"],
    href: "https://snv-etester.onrender.com/",
  },
  {
    title: "Restaurant Website",
    role: "Project",
    description:
      "Responsive restaurant website built for modern presentation and smooth user flow.",
    tags: ["React", "Node.js", "UI", "Responsive"],
    href: "https://resturang.onrender.com/",
  },
  {
    title: "Agency Portfolio",
    role: "Project",
    description:
      "Dynamic portfolio website designed to present services, projects, and brand identity.",
    tags: ["Portfolio", "Branding", "UI", "Frontend"],
    href: "https://www.senevon.in/",
  },
  {
    title: "Cricket Game App & Web",
    role: "Project",
    description:
      "3D cricket experience built with Three.js, TypeScript, Cannon-es, and Blender.",
    tags: ["Three.js", "TypeScript", "Cannon-es", "Blender"],
    href: "https://pov-cricket.onrender.com/",
  },
  {
    title: "Sports Management System",
    role: "Project",
    description:
      "Multi-role ERP-style system for managing sports clubs and operational workflows.",
    tags: ["ERP", "Multi-role", "Management", "System Design"],
    href: "https://esm-9x3l.onrender.com/",
  },
];

const PROJECT_ACCENTS = [
  "linear-gradient(135deg, #7c3aed, #22d3ee)",
  "linear-gradient(135deg, #6d28d9, #a855f7)",
  "linear-gradient(135deg, #4f46e5, #8b5cf6)",
  "linear-gradient(135deg, #0ea5e9, #7c3aed)",
  "linear-gradient(135deg, #9333ea, #ec4899)",
  "linear-gradient(135deg, #2563eb, #8b5cf6)",
  "linear-gradient(135deg, #7c3aed, #14b8a6)",
];

const services = [
  {
    title: "Full-Stack Dev",
    description:
      "End-to-end web applications built with React.js, Node.js, and Django. From system architecture to deployment, I own the full lifecycle.",
    tags: ["React.js", "Node.js", "Django", "REST APIs", "PostgreSQL"],
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=80&fit=crop",
  },
  {
    title: "Backend Systems",
    description:
      "Scalable server-side architecture, REST API design, database modelling, and role-based authentication built for real production loads.",
    tags: ["Node.js", "Express", "PostgreSQL", "MongoDB", "JWT"],
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80&fit=crop",
  },
  {
    title: "UI & Interfaces",
    description:
      "Clean, responsive dashboards and workflow interfaces with a strong focus on performance, usability, and modern interaction design.",
    tags: ["React.js", "Tailwind", "GSAP", "Framer Motion"],
    image:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&q=80&fit=crop",
  },
  {
    title: "Data & Automation",
    description:
      "Data-driven applications, visualisation dashboards, and Python-based automation workflows grounded in a Data Science foundation.",
    tags: ["Python", "Data Science", "Django", "Automation"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80&fit=crop",
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

  if (type === "shield") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M32 10 48 16v13c0 11-7 18-16 25-9-7-16-14-16-25V16l16-6Z" />
        <path d="m24 32 5 5 11-12" />
      </svg>
    );
  }

  if (type === "spark") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M32 10 36 24 50 28 36 32 32 46 28 32 14 28 28 24 32 10Z" />
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

function SectionTitle({ text }) {
  const gradientId = useId().replaceAll(":", "");
  const viewWidth = Math.max(480, Math.round(text.length * 42));
  const viewHeight = 140;
  const textBaselineY = 112;

  return (
    <h2 className="section-title" aria-label={text}>
      <svg
        className="section-title-svg"
        viewBox={`0 0 ${viewWidth} ${viewHeight}`}
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient
            id={gradientId}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0%" stopColor="var(--landing-title-stop-1)" />
            <stop offset="22%" stopColor="var(--landing-title-stop-2)" />
            <stop offset="42%" stopColor="var(--landing-title-stop-3)" />
            <stop offset="62%" stopColor="var(--landing-title-stop-4)" />
            <stop offset="82%" stopColor="var(--landing-title-stop-5)" />
            <stop offset="100%" stopColor="var(--landing-title-stop-6)" />
            <animateTransform
              attributeName="gradientTransform"
              type="translate"
              values="-0.35 0;0.35 0;-0.35 0"
              dur="8s"
              repeatCount="indefinite"
            />
          </linearGradient>
        </defs>
        <text
          x="0"
          y={textBaselineY}
          fill={`url(#${gradientId})`}
          className="section-title-svg-text"
        >
          {text}
        </text>
      </svg>
    </h2>
  );
}

export default function LandingSections() {
  const rootRef = useRef(null);
  const [deviceProfile] = useState(() => getDeviceProfile());
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
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
      setStatus({
        type: "error",
        text: error?.message || "Failed to send message.",
      });
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
    if (!root) return undefined;

    root.dataset.motionMode = deviceProfile.isConstrained ? "lite" : "full";

    if (deviceProfile.prefersReducedMotion || deviceProfile.isConstrained) {
      root
        .querySelectorAll(".js-reveal, .proj-card, .timeline-item, .service-card")
        .forEach((el) => {
        gsap.set(el, {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          rotate: 0,
          clearProps: "transform",
        });
      });
      return undefined;
    }

    let motionObserver;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        { mobile: "(max-width: 767px)", desktop: "(min-width: 768px)" },
        (context) => {
          const { mobile } = context.conditions;

          const yDistance = mobile ? 28 : 54;
          const duration = mobile ? 0.9 : 1.1;
          const stagger = mobile ? 0.08 : 0.11;
          const start = mobile ? "top 92%" : "top 84%";

          gsap.utils.toArray(".js-reveal-group", root).forEach((group) => {
            const baseItems = gsap
              .utils
              .toArray(".js-reveal", group)
              .filter(
                (item) =>
                  !item.classList.contains("proj-card") &&
                  !item.classList.contains("timeline-item") &&
                  !item.classList.contains("service-card")
              );

            if (baseItems.length) {
              gsap.fromTo(
                baseItems,
                {
                  opacity: 0,
                  y: yDistance,
                  scale: 0.98,
                },
                {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  duration,
                  stagger,
                  ease: "power3.out",
                  scrollTrigger: {
                    trigger: group,
                    start,
                    once: true,
                  },
                }
              );
            }

          });

          const projectCards = gsap.utils.toArray(".proj-card", root);
          const projectGrid = root.querySelector(".proj-grid");

          if (projectCards.length && projectGrid) {
            gsap.fromTo(
              projectCards,
              {
                opacity: 0,
                y: yDistance,
                scale: 0.94,
                rotateX: 5,
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                rotateX: 0,
                duration,
                stagger: 0.12,
                ease: "power3.out",
                overwrite: "auto",
                scrollTrigger: {
                  trigger: projectGrid,
                  start,
                  once: true,
                },
              }
            );
          }

          const timelineItems = gsap.utils.toArray(".timeline-item", root);
          const experienceSection = root.querySelector("#experience");

          if (timelineItems.length && experienceSection) {
            gsap.fromTo(
              timelineItems,
              {
                opacity: 0,
                y: mobile ? yDistance : 0,
                x: (_, i) => (mobile ? 0 : i % 2 === 0 ? -42 : 42),
              },
              {
                opacity: 1,
                y: 0,
                x: 0,
                duration,
                stagger: 0.14,
                ease: "power3.out",
                overwrite: "auto",
                scrollTrigger: {
                  trigger: experienceSection,
                  start,
                  once: true,
                },
              }
            );
          }

          const serviceCards = gsap.utils.toArray(".service-card", root);
          const servicesStack = root.querySelector(".services-stack");

          if (serviceCards.length && servicesStack) {
            gsap.fromTo(
              serviceCards,
              {
                opacity: 0,
                y: 56,
                scale: 0.975,
                transformOrigin: "center top",
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: mobile ? 0.85 : 1,
                stagger: 0.12,
                ease: "power3.out",
                overwrite: "auto",
                scrollTrigger: {
                  trigger: servicesStack,
                  start: mobile ? "top 94%" : "top 88%",
                  once: true,
                },
              }
            );
          }

          const serviceWraps = gsap.utils.toArray(".service-wrap", root);
          serviceWraps.slice(0, -1).forEach((wrap, i) => {
            const card = wrap.querySelector(".service-card");
            const nextWrap = serviceWraps[i + 1];
            if (!card || !nextWrap) return;

            gsap.to(card, {
              scale: 0.968,
              y: -8,
              filter: "brightness(0.93)",
              ease: "none",
              transformOrigin: "center top",
              scrollTrigger: {
                trigger: nextWrap,
                start: "top 88%",
                end: "top 28%",
                scrub: 0.7,
              },
            });
          });
        }
      );

      gsap.utils.toArray(".js-glyph-float", root).forEach((glyph, i) => {
        gsap.to(glyph, {
          y: i % 2 === 0 ? -12 : 12,
          rotation: i % 2 === 0 ? -6 : 6,
          duration: 5 + i * 0.35,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      const orbA = root.querySelector(".landing-orb-a");
      const orbB = root.querySelector(".landing-orb-b");

      if (orbA) {
        gsap.to(orbA, {
          y: -40,
          x: 30,
          duration: 9,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      if (orbB) {
        gsap.to(orbB, {
          y: 36,
          x: -26,
          duration: 10.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      gsap.utils.toArray(".js-parallax-soft", root).forEach((item, index) => {
        gsap.fromTo(
          item,
          { y: 0 },
          {
            y: index % 2 === 0 ? -26 : -18,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      });

      motionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            entry.target.dataset.inview = entry.isIntersecting ? "true" : "false";
          });
        },
        {
          threshold: 0.01,
          rootMargin: "120px 0px 120px 0px",
        }
      );

      gsap.utils.toArray(".js-pausable-motion", root).forEach((node) => {
        node.dataset.inview = "true";
        motionObserver.observe(node);
      });

      ScrollTrigger.refresh();
    }, root);

    return () => {
      motionObserver?.disconnect();
      ctx.revert();
    };
  }, [deviceProfile]);

  return (
    <div
      className={`landing-shell landing-shell-${theme}`}
      data-motion-mode={deviceProfile.isConstrained ? "lite" : "full"}
      ref={rootRef}
    >
      <div className="landing-noise" aria-hidden="true" />
      <div className="landing-orb landing-orb-a" aria-hidden="true" />
      <div className="landing-orb landing-orb-b" aria-hidden="true" />
      <div className="landing-grid-glow" aria-hidden="true" />

      <div className="landing-toolbar">
        <button
          type="button"
          className="theme-toggle"
          onClick={() =>
            setTheme((current) => (current === "light" ? "dark" : "light"))
          }
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
        >
          <span className="theme-toggle-track">
            <span className="theme-toggle-thumb" />
          </span>
          <span className="theme-toggle-label">
            {theme === "light" ? "Dark mode" : "Light mode"}
          </span>
        </button>
      </div>

      <section
        className="portfolio-section portfolio-section-intro js-reveal-group"
        id="about"
      >
        <div className="section-heading js-reveal">
          <SectionTitle text="I build scalable digital products." />
          <p className="section-copy">
            Full Stack Developer with hands-on experience building scalable web
            applications using React.js, Node.js, and modern backend systems.
            Focused on delivering production-ready solutions with clean
            architecture, optimized performance, and strong user experience
            across devices.
          </p>
        </div>

        <div className="about-layout">
          <article className="about-summary-card js-reveal js-parallax-soft">
            <div className="about-photo-deck">
              <div className="about-photo-stack">
                <img
                  className="about-photo-stacked"
                  src="/me.jpg"
                  alt="Srijon Karmakar"
                  loading="lazy"
                  decoding="async"
                />
                <div className="about-badge about-badge-top">Developer</div>
                <div className="about-badge about-badge-bottom">UI + Backend</div>
              </div>
            </div>

            <div className="about-summary-copy">
              <p className="about-meta">
                B.Tech in Computer Science & Engineering, Data Science
              </p>
              <p className="about-text">
                Based in Kolkata. Computer Science graduate with a focus on Data
                Science. I work across frontend and backend to create clean,
                efficient, and scalable systems.
              </p>
            </div>
          </article>

          <div className="fact-grid">
            <article className="info-card js-reveal">
              <p className="info-value">2025</p>
              <p className="info-text">
                Graduated in July 2025 from Brainware University.
              </p>
            </article>
            <article className="info-card js-reveal">
              <p className="info-value">8.6 GPA</p>
              <p className="info-text">
                Strong academic foundation in Computer Science and Data Science.
              </p>
            </article>
            <article className="info-card js-reveal">
              <p className="info-value">Full Stack</p>
              <p className="info-text">
                Builds complete systems from interface to backend logic and
                database design.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="portfolio-section js-reveal-group" id="skills">
        <div className="section-heading js-reveal">
          <SectionTitle text="Tools I work with." />
          <p className="section-copy">
            A focused stack for building modern web applications.
          </p>
        </div>

        <div className="skills-rail-wrap js-reveal">
          <div
            className="skills-rail-fade skills-rail-fade-left"
            aria-hidden="true"
          />
          <div
            className="skills-rail-fade skills-rail-fade-right"
            aria-hidden="true"
          />

          <div className="skills-rail skills-rail-one">
            <div className="skills-rail-track js-pausable-motion">
              {[...skillRailOne, ...skillRailOne].map((item, index) => (
                <span
                  className="skills-rail-chip"
                  key={`rail-one-${item.label}-${index}`}
                >
                  <span className="skills-rail-chip-icon" aria-hidden="true">
                    <Glyph type={item.icon} />
                  </span>
                  <span>{item.label}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="skills-rail skills-rail-two">
            <div className="skills-rail-track js-pausable-motion">
              {[...skillRailTwo, ...skillRailTwo].map((item, index) => (
                <span
                  className="skills-rail-chip"
                  key={`rail-two-${item.label}-${index}`}
                >
                  <span className="skills-rail-chip-icon" aria-hidden="true">
                    <Glyph type={item.icon} />
                  </span>
                  <span>{item.label}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        className="portfolio-section portfolio-section-featured proj-section js-reveal-group"
        id="projects"
      >
        <div className="section-heading proj-header js-reveal">
          <SectionTitle text="Selected projects." />
          <p className="section-copy">
            Real-world applications built with performance, scalability, and
            usability in mind.
          </p>
        </div>

        <div className="proj-grid">
          {projects.map((project, index) => (
            <article
              className={`proj-card js-reveal js-parallax-soft${
                index === 0 ? " proj-card--featured" : ""
              }`}
              key={project.title}
            >
              <div
                className="proj-card__accent"
                style={{ background: PROJECT_ACCENTS[index] }}
              />

              <span className="proj-card__watermark" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="proj-card__inner">
                <div className="proj-card__top">
                  <span className="proj-card__num">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {project.href && (
                    <a
                      className="proj-card__ext"
                      href={project.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Open ${project.title}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M7 17L17 7M17 7H7M17 7v10" />
                      </svg>
                    </a>
                  )}
                </div>

                <div className="proj-card__body">
                  <p className="proj-card__role">{project.role}</p>
                  <h3 className="proj-card__title">{project.title}</h3>
                  <p className="proj-card__desc">{project.description}</p>
                </div>

                <div className="proj-card__footer">
                  <div className="proj-card__tags">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  {project.href ? (
                    <a
                      className="proj-card__link"
                      href={project.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Open project <span className="proj-card__arrow">↗</span>
                    </a>
                  ) : (
                    <span className="proj-card__link proj-card__link--muted">
                      Link on request
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="portfolio-section js-reveal-group" id="experience">
        <div className="section-heading js-reveal">
          <SectionTitle text="Experience." />
          <p className="section-copy">
            Building production systems and delivering real-world applications.
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

      <section className="services-section" id="services">
        <div className="portfolio-section services-inner js-reveal-group">
          <div className="section-heading js-reveal">
            <SectionTitle text="What I do best." />
            <p className="section-copy">
              Design-forward engineering with strong interfaces, structured
              backend systems, and scalable delivery.
            </p>
          </div>
        </div>

        <div className="services-marquee" aria-hidden="true">
          <div className="services-marquee-track js-pausable-motion">
            {[...services, ...services].map((s, i) => (
              <span key={`${s.title}-${i}`} className="services-marquee-item">
                {s.title}
                <span className="services-marquee-sep" aria-hidden="true">
                  ·
                </span>
              </span>
            ))}
          </div>
        </div>

        <div className="services-stack">
          {services.map((service, index) => (
            <div
              className="service-wrap"
              key={service.title}
              style={{ "--ci": index, zIndex: index + 1 }}
            >
              <article className="service-card">
                <div className="service-card-content">
                  <div className="service-card-left">
                    <span className="service-card-num">0{index + 1}</span>
                    <h3 className="service-card-title">{service.title}</h3>
                    <p className="service-card-desc">{service.description}</p>
                    <div className="service-card-tags">
                      {service.tags.map((tag) => (
                        <span key={tag} className="service-card-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="service-card-right">
                    <img
                      className="service-card-img"
                      src={service.image}
                      alt={service.title}
                      loading="lazy"
                      decoding="async"
                      fetchPriority="low"
                    />
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </section>

      <section className="portfolio-section cta-panel js-reveal-group" id="cta">
        <div className="cta-layout">
          <div className="section-heading js-reveal">
            <SectionTitle text="Let’s build something great." />
            <p className="section-copy">
              Open to full-time roles, freelance projects, and collaborations
              where I can contribute to building scalable and impactful digital
              products.
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
            Start a conversation
          </a>
          <a className="cta-button" href="/Stats">
            View stats
          </a>
        </div>
      </section>

      <section className="portfolio-section js-reveal-group" id="contact">
        <div className="section-heading js-reveal">
          <SectionTitle text="Get in touch." />
          <p className="section-copy">
            Feel free to reach out for opportunities, collaborations, or project
            discussions. I’m available for full-time roles and freelance work.
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
            placeholder="Tell me about the project, role, or collaboration."
            value={form.message}
            onChange={(event) => setField("message", event.target.value)}
          />

          {status.text ? (
            <p
              className={`landing-contact-status landing-contact-status-${status.type}`}
            >
              {status.text}
            </p>
          ) : null}

          <button
            className="cta-button cta-button-primary landing-contact-submit"
            type="submit"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send message"}
          </button>
        </form>
      </section>

      <footer className="mega-footer">
        <div className="mega-footer__dark">
          <div className="mega-footer__ticker" aria-hidden="true">
            <div className="mega-footer__ticker-track js-pausable-motion">
              {[...Array(2)].map((_, i) => (
                <span key={i} className="mega-footer__ticker-group">
                  <span className="mega-footer__ticker-item">Hire me ↗</span>
                  <span className="mega-footer__ticker-sep">·</span>
                  <span className="mega-footer__ticker-item">
                    Let's work together ↗
                  </span>
                  <span className="mega-footer__ticker-sep">·</span>
                  <span className="mega-footer__ticker-item">
                    Open to opportunities ↗
                  </span>
                  <span className="mega-footer__ticker-sep">·</span>
                  <span className="mega-footer__ticker-item">Get in touch ↗</span>
                  <span className="mega-footer__ticker-sep">·</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mega-footer__light">
          <div className="mega-footer__cols">
            <div className="mega-footer__col">
              <p className="mega-footer__col-heading">Portfolio</p>
              <a href="#projects">Projects</a>
              <a href="#experience">Experience</a>
              <a href="#about">About</a>
              <a href="#services">Services</a>
            </div>
            <div className="mega-footer__col">
              <p className="mega-footer__col-heading">Skills</p>
              <a href="#skills">Frontend</a>
              <a href="#skills">Backend</a>
              <a href="#skills">Databases</a>
              <a href="#skills">3D &amp; Motion</a>
            </div>
            <div className="mega-footer__col">
              <p className="mega-footer__col-heading">Connect</p>
              <a
                href="https://www.linkedin.com/in/srijon-karmakar/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn ↗
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=srijonkarmakar.dev@gmail.com"
                target="_blank"
                rel="noreferrer"
              >
                Email ↗
              </a>
              <a
                href="https://github.com/srijon57"
                target="_blank"
                rel="noreferrer"
              >
                GitHub ↗
              </a>
            </div>
            <div className="mega-footer__col">
              <p className="mega-footer__col-heading">Availability</p>
              <span className="mega-footer__available">
                <span className="mega-footer__dot" aria-hidden="true" />
                Open to work
              </span>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=srijonkarmakar.dev@gmail.com"
                target="_blank"
                rel="noreferrer"
              >
                Hire me
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=srijonkarmakar.dev@gmail.com"
                target="_blank"
                rel="noreferrer"
              >
                Freelance
              </a>
            </div>
          </div>

          <div className="mega-footer__bottom">
            <span>© 2026 Srijon Karmakar</span>
            <span className="mega-footer__role">Kolkata, India</span>
            <div className="mega-footer__socials">
              <a
                href="https://www.linkedin.com/in/srijon-karmakar/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a
                href="https://github.com/srijon57"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=srijonkarmakar.dev@gmail.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Email"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  width="16"
                  height="16"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
