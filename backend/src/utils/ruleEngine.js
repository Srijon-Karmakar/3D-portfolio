/**
 * Rule-based fallback for when the Gemini API is unavailable or quota is exceeded.
 * Built entirely from Srijon's CV and portfolio context.
 */

const rules = [
  // ── Greeting ────────────────────────────────────────────────────
  {
    tags: ["hello", "hi ", "hey ", "hey!", "howdy", "good morning", "good evening", "what's up", "sup ", "yo "],
    response:
      "Hey! I'm Srijon's AI assistant. Ask me about his skills, projects, experience, or how to get in touch — I'm happy to help!",
  },

  // ── Who is Srijon / About ────────────────────────────────────────
  {
    tags: ["who is srijon", "tell me about srijon", "about srijon", "introduce", "who are you", "about yourself", "about him"],
    response:
      "Srijon Karmakar is a Full Stack Developer based in Kolkata, India. He graduated with a B.Tech in Computer Science & Engineering (Data Science) from Brainware University in July 2025 with a GPA of 8.6. He's currently working as a Full Stack Developer at House Of MUSA, building scalable web applications with React.js and Node.js.",
  },

  // ── Current job / company ────────────────────────────────────────
  {
    tags: ["house of musa", "current job", "current company", "current role", "currently working", "current work", "where does he work"],
    response:
      "Srijon is currently a Full Stack Developer at House Of MUSA (Kolkata, April 2025 – Present). He designs and maintains full-stack apps with React.js and Node.js, builds RESTful APIs with MongoDB, and leads feature delivery end-to-end — from system design to deployment.",
  },

  // ── Previous job ─────────────────────────────────────────────────
  {
    tags: ["webguru", "previous job", "past job", "past company", "intern", "internship", "python developer"],
    response:
      "Before his current role, Srijon worked as a Python Developer Intern at Webguru Infosystem (Salt Lake, Kolkata) from November 2024 to January 2025. He built Django-based dashboards, data-driven backend services, and collaborated with product and finance teams on survey workflows.",
  },

  // ── Experience general ───────────────────────────────────────────
  {
    tags: ["experience", "work history", "work experience", "career", "employment", "jobs", "companies"],
    response:
      "Srijon has two key roles on his resume:\n1. Full Stack Developer at House Of MUSA (April 2025 – Present) — React.js, Node.js, MongoDB, REST APIs, auth, RBAC.\n2. Python Developer Intern at Webguru Infosystem (Nov 2024 – Jan 2025) — Django dashboards and backend workflows.\nHe also has a strong project portfolio spanning full-stack, 3D, and ERP-style systems.",
  },

  // ── Education ───────────────────────────────────────────────────
  {
    tags: ["education", "university", "college", "degree", "studied", "study", "graduate", "gpa", "brainware", "btech", "b.tech", "academic", "qualification", "cgpa", "marks"],
    response:
      "Srijon completed his B.Tech in Computer Science & Engineering (Data Science specialization) from Brainware University, Barasat, Kolkata — graduating in July 2025 with a GPA of 8.6.",
  },

  // ── Tech stack / general skills ──────────────────────────────────
  {
    tags: ["tech stack", "what can he do", "what does he know", "skills", "technologies", "tools", "expertise", "abilities", "good at"],
    response:
      "Srijon's full tech stack:\n• Frontend: React.js, Next.js, JavaScript, TypeScript, HTML, CSS, GSAP, Three.js\n• Backend: Node.js, Express, Django, NestJS, REST APIs, JWT Auth, RBAC\n• Databases: MongoDB, PostgreSQL, MySQL\n• Languages: Python, JavaScript, TypeScript, Java, C\n• Other: Supabase, Git, Vite, Tailwind CSS, Blender, Cannon.js\n• Soft skills: Communication, Leadership, Quick learner, Problem Solving",
  },

  // ── Frontend ─────────────────────────────────────────────────────
  {
    tags: ["frontend", "react", "javascript", "html", "css", "ui", "user interface", "typescript", "next.js", "nextjs", "gsap", "animation", "three.js", "threejs", "tailwind"],
    response:
      "For frontend, Srijon works with React.js, Next.js, JavaScript, and TypeScript. He builds responsive, mobile-first interfaces with HTML, CSS, and Tailwind CSS, and adds motion with GSAP and Three.js for 3D/WebGL experiences.",
  },

  // ── Backend ──────────────────────────────────────────────────────
  {
    tags: ["backend", "node.js", "nodejs", "django", "nestjs", "api", "rest api", "server", "express", "authentication", "auth", "jwt", "rbac", "role-based"],
    response:
      "On the backend, Srijon is proficient with Node.js (Express), Django, and NestJS. He designs RESTful APIs, implements JWT authentication, role-based access control, data validation, and deploys to production with performance in mind.",
  },

  // ── Database ─────────────────────────────────────────────────────
  {
    tags: ["database", "mongodb", "postgresql", "mysql", "sql", "nosql", "db", "data"],
    response:
      "Srijon works with MongoDB, PostgreSQL, MySQL, and Supabase. He designs schemas, builds data-driven dashboards, and implements validation for production-grade database systems.",
  },

  // ── Python ───────────────────────────────────────────────────────
  {
    tags: ["python", "django", "automation", "data science", "machine learning", "ml", "ai background"],
    response:
      "Srijon has solid Python skills — used in his Django-based internship role and his Data Science degree track. He built data-driven backend applications, dashboards, and backend processing workflows.",
  },

  // ── Projects general ─────────────────────────────────────────────
  {
    tags: ["projects", "portfolio", "what has he built", "what did he build", "his work", "show me projects", "work samples"],
    response:
      "Srijon's key projects:\n1. Cloud-based Code Editor — React + Node.js, auth, persistent storage\n2. Online Tool System — Media download platform (toolit-y4pd.onrender.com)\n3. Online Testing Portal — NestJS proctoring + RBAC (snv-etester.onrender.com)\n4. Restaurant Website — React + Node.js (resturang.onrender.com)\n5. Agency Portfolio — (senevon.in)\n6. Cricket Game (App & Web) — Three.js + TypeScript + Cannon.js + Blender (pov-cricket.onrender.com)\n7. Sports Management System — Multi-role ERP (esm-9x3l.onrender.com)",
  },

  // ── Code editor project ──────────────────────────────────────────
  {
    tags: ["code editor", "online editor", "cloud editor", "compiler"],
    response:
      "The Cloud-based Code Editor is a full-stack project built with React and Node.js. It lets users write, learn, and practice code with secure authentication and database-backed storage. Srijon built both the REST APIs and the backend code execution services.",
  },

  // ── Tool system project ──────────────────────────────────────────
  {
    tags: ["tool system", "online tool", "media download", "video download", "toolit"],
    response:
      "The Online Tool System (toolit-y4pd.onrender.com) is a React + Node.js web app for downloading social media videos and audio. Srijon implemented backend processing, URL validation, and secure file handling.",
  },

  // ── Testing portal project ───────────────────────────────────────
  {
    tags: ["testing portal", "proctoring", "exam", "test system", "snv", "etester"],
    response:
      "The Online Testing Portal (snv-etester.onrender.com) is built with NestJS — a proctoring system to manage tests and assignments with role-based authentication and secure data handling.",
  },

  // ── Cricket project ──────────────────────────────────────────────
  {
    tags: ["cricket", "3d game", "three.js game", "game", "cannon", "blender", "pov"],
    response:
      "The Cricket Game (pov-cricket.onrender.com) is a 3D cricket experience built with Three.js, TypeScript, Cannon.js for physics, and Blender for 3D modeling — both a web and app experience.",
  },

  // ── Sports management project ────────────────────────────────────
  {
    tags: ["sports management", "erp", "multi-role", "sport club", "esm"],
    response:
      "The Sports Management System (esm-9x3l.onrender.com) is a multi-role ERP-style platform for managing sports clubs with admin workflows and structured access control.",
  },

  // ── Restaurant project ───────────────────────────────────────────
  {
    tags: ["restaurant", "food", "resturang"],
    response:
      "The Restaurant Website (resturang.onrender.com) is a modern interactive site built with React and Node.js, focused on clean presentation and smooth user flow.",
  },

  // ── Agency portfolio project ─────────────────────────────────────
  {
    tags: ["agency portfolio", "senevon", "agency site"],
    response:
      "The Agency Portfolio (senevon.in) is a dynamic portfolio site built to showcase services and brand identity with a strong visual rhythm and presentation focus.",
  },

  // ── Contact ──────────────────────────────────────────────────────
  {
    tags: ["contact", "reach out", "email", "linkedin", "phone", "get in touch", "connect", "message him", "reach him"],
    response:
      "You can reach Srijon at:\n• Email: srijonkarmakar.dev@gmail.com\n• LinkedIn: linkedin.com/in/srijon-karmakar\n• Phone: +91 7439498882\n• Website: srijons.onrender.com",
  },

  // ── Hire / availability ──────────────────────────────────────────
  {
    tags: ["hire", "hiring", "available", "availability", "freelance", "full-time", "open to work", "job opportunity", "looking for", "recruit", "opportunity"],
    response:
      "Srijon is open to full-time roles, freelance projects, and collaborations — especially where he can contribute to scalable, impactful digital products. Reach him at srijonkarmakar.dev@gmail.com or on LinkedIn (linkedin.com/in/srijon-karmakar).",
  },

  // ── Location ─────────────────────────────────────────────────────
  {
    tags: ["location", "where", "based", "city", "kolkata", "india", "from"],
    response:
      "Srijon is based in Kolkata, India.",
  },

  // ── Soft skills ──────────────────────────────────────────────────
  {
    tags: ["soft skill", "communication", "leadership", "team", "collaboration", "management"],
    response:
      "Beyond technical skills, Srijon's strengths include Communication, Leadership, being a Quick Learner, and Problem Solving. He's worked cross-functionally with product, design, finance, and customer success teams.",
  },

  // ── Interests / hobbies ─────────────────────────────────────────
  {
    tags: ["interest", "hobby", "hobbies", "outside work", "free time", "passion", "explore", "workshop", "graphic", "design"],
    response:
      "Outside of coding, Srijon enjoys attending workshops and exhibitions, open-source contributions, graphic design, and exploring new places.",
  },

  // ── Salary / rate ────────────────────────────────────────────────
  {
    tags: ["salary", "rate", "cost", "price", "charge", "pay"],
    response:
      "I don't have information on Srijon's rates or salary expectations — it's best to discuss that directly with him. Reach out at srijonkarmakar.dev@gmail.com.",
  },

  // ── Resume / CV ──────────────────────────────────────────────────
  {
    tags: ["resume", "cv", "download", "pdf"],
    response:
      "You can learn everything about Srijon's experience and skills right here on this portfolio. For his full resume, reach out via email: srijonkarmakar.dev@gmail.com.",
  },

  // ── TypeScript / Next.js ─────────────────────────────────────────
  {
    tags: ["typescript", "next js", "nextjs"],
    response:
      "Yes, Srijon's technical skills include TypeScript and Next.js, listed as part of his core frontend capabilities alongside React.js and JavaScript.",
  },
];

/**
 * Match user input against rules and return the best response.
 */
export function getRuleBasedReply(message) {
  const lower = message.toLowerCase().trim();

  let bestMatch = null;
  let bestScore = 0;

  for (const rule of rules) {
    for (const tag of rule.tags) {
      if (lower.includes(tag.trim())) {
        const score = tag.length; // longer match = more specific
        if (score > bestScore) {
          bestScore = score;
          bestMatch = rule;
        }
      }
    }
  }

  if (bestMatch) return bestMatch.response;

  // Default fallback
  return "I can answer questions about Srijon's skills, experience, projects, education, or how to contact him. What would you like to know?";
}
