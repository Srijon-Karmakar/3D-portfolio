/**
 * Frontend rule-based fallback — activates when the backend server
 * is unreachable (network error, server down, etc.)
 * Built from Srijon's CV and portfolio context.
 */

const rules = [
  {
    tags: ["hello", "hi ", "hey ", "hey!", "howdy", "good morning", "good evening", "what's up", "sup ", "yo "],
    response: "Hey! I'm Srijon's AI assistant. Ask me about his skills, projects, experience, or how to get in touch!",
  },
  {
    tags: ["who is srijon", "tell me about srijon", "about srijon", "introduce", "who are you", "about yourself", "about him"],
    response:
      "Srijon Karmakar is a Full Stack Developer based in Kolkata, India. He graduated with a B.Tech in Computer Science & Engineering (Data Science) from Brainware University in July 2025 with a GPA of 8.6. He's currently working at House Of MUSA, building scalable web apps with React.js and Node.js.",
  },
  {
    tags: ["house of musa", "current job", "current company", "current role", "currently working", "where does he work"],
    response:
      "Srijon currently works as a Full Stack Developer at House Of MUSA (Kolkata, April 2025 – Present). He builds full-stack apps with React.js and Node.js, designs REST APIs with MongoDB, and handles end-to-end feature delivery.",
  },
  {
    tags: ["webguru", "previous job", "past job", "intern", "internship", "python developer"],
    response:
      "Previously, Srijon was a Python Developer Intern at Webguru Infosystem (Salt Lake, Kolkata) from November 2024 to January 2025, where he built Django-based dashboards and backend workflows.",
  },
  {
    tags: ["experience", "work history", "career", "employment", "jobs", "companies"],
    response:
      "Srijon has worked as:\n1. Full Stack Developer at House Of MUSA (April 2025 – Present)\n2. Python Developer Intern at Webguru Infosystem (Nov 2024 – Jan 2025)\nHe also has a strong project portfolio spanning full-stack, 3D, and ERP-style systems.",
  },
  {
    tags: ["education", "university", "degree", "studied", "graduate", "gpa", "brainware", "btech", "b.tech", "academic", "cgpa"],
    response:
      "Srijon completed his B.Tech in Computer Science & Engineering (Data Science) from Brainware University, Barasat, Kolkata — graduating in July 2025 with a GPA of 8.6.",
  },
  {
    tags: ["tech stack", "skills", "technologies", "tools", "expertise", "what can he do", "what does he know", "abilities", "good at"],
    response:
      "Srijon's tech stack:\n• Frontend: React.js, Next.js, JavaScript, TypeScript, HTML, CSS, GSAP, Three.js\n• Backend: Node.js, Express, Django, NestJS, REST APIs, JWT, RBAC\n• Databases: MongoDB, PostgreSQL, MySQL, Supabase\n• Languages: Python, JavaScript, TypeScript, Java, C\n• Other: Git, Vite, Tailwind CSS, Blender, Cannon.js",
  },
  {
    tags: ["frontend", "react", "javascript", "html", "css", "ui", "typescript", "next.js", "nextjs", "gsap", "three.js", "tailwind"],
    response:
      "Srijon's frontend skills include React.js, Next.js, JavaScript, TypeScript, HTML, CSS, and Tailwind CSS. He adds motion and 3D with GSAP and Three.js for rich interactive experiences.",
  },
  {
    tags: ["backend", "node.js", "nodejs", "django", "nestjs", "api", "rest api", "server", "express", "authentication", "auth", "jwt", "rbac"],
    response:
      "Srijon builds backends with Node.js (Express), Django, and NestJS. He designs REST APIs, implements JWT auth, role-based access control, and data validation for production systems.",
  },
  {
    tags: ["database", "mongodb", "postgresql", "mysql", "sql", "nosql", "supabase"],
    response:
      "Srijon works with MongoDB, PostgreSQL, MySQL, and Supabase. He designs schemas and builds data-driven applications with solid validation practices.",
  },
  {
    tags: ["python", "automation", "data science", "django"],
    response:
      "Srijon has solid Python skills — used in Django applications and grounded in his Data Science degree track. He built data-driven dashboards and backend processing workflows.",
  },
  {
    tags: ["projects", "portfolio", "what has he built", "his work", "show me projects", "work samples"],
    response:
      "Srijon's key projects:\n1. Cloud-based Code Editor (React + Node.js)\n2. Online Tool System — toolit-y4pd.onrender.com\n3. Online Testing Portal — snv-etester.onrender.com\n4. Restaurant Website — resturang.onrender.com\n5. Agency Portfolio — senevon.in\n6. Cricket Game (3D) — pov-cricket.onrender.com\n7. Sports Management System — esm-9x3l.onrender.com",
  },
  {
    tags: ["code editor", "online editor", "cloud editor", "compiler"],
    response:
      "The Cloud-based Code Editor is a full-stack React + Node.js project where users can write, learn, and practice code with authentication and database-backed storage.",
  },
  {
    tags: ["tool system", "online tool", "media download", "toolit"],
    response:
      "The Online Tool System (toolit-y4pd.onrender.com) is a React + Node.js platform for downloading social media videos and audio, with URL validation and secure file handling.",
  },
  {
    tags: ["testing portal", "proctoring", "exam portal", "etester"],
    response:
      "The Online Testing Portal (snv-etester.onrender.com) is a NestJS-based proctoring system with role-based authentication, managing tests and assignments securely.",
  },
  {
    tags: ["cricket", "3d game", "game", "cannon", "blender", "pov"],
    response:
      "The Cricket Game (pov-cricket.onrender.com) is a 3D experience built with Three.js, TypeScript, Cannon.js for physics, and Blender for 3D modeling.",
  },
  {
    tags: ["sports management", "erp", "sport club", "esm"],
    response:
      "The Sports Management System (esm-9x3l.onrender.com) is a multi-role ERP-style platform for managing sports clubs with admin workflows and structured access.",
  },
  {
    tags: ["restaurant", "food", "resturang"],
    response:
      "The Restaurant Website (resturang.onrender.com) is a modern React + Node.js site focused on clean presentation and smooth user experience.",
  },
  {
    tags: ["agency", "senevon"],
    response:
      "The Agency Portfolio (senevon.in) is a dynamic site showcasing services and brand identity with strong visual rhythm.",
  },
  {
    tags: ["contact", "reach out", "email", "linkedin", "phone", "get in touch", "connect", "message him"],
    response:
      "Contact Srijon:\n• Email: srijonkarmakar.dev@gmail.com\n• LinkedIn: linkedin.com/in/srijon-karmakar\n• Phone: +91 7439498882",
  },
  {
    tags: ["hire", "hiring", "available", "availability", "freelance", "full-time", "open to work", "job opportunity", "recruit"],
    response:
      "Srijon is open to full-time roles, freelance projects, and collaborations. Contact him at srijonkarmakar.dev@gmail.com or LinkedIn (linkedin.com/in/srijon-karmakar).",
  },
  {
    tags: ["location", "where", "based", "city", "kolkata", "india", "from"],
    response: "Srijon is based in Kolkata, India.",
  },
  {
    tags: ["soft skill", "communication", "leadership", "team", "collaboration"],
    response:
      "Srijon's soft skills include Communication, Leadership, Quick Learning, and Problem Solving — honed through cross-functional work with product, design, and business teams.",
  },
  {
    tags: ["interest", "hobby", "hobbies", "outside work", "free time", "passion", "explore", "workshop", "graphic design"],
    response:
      "Outside of coding, Srijon enjoys attending workshops and exhibitions, open-source contributions, graphic design, and exploring new places.",
  },
  {
    tags: ["salary", "rate", "cost", "price", "charge", "pay"],
    response:
      "I don't have info on rates — reach Srijon directly at srijonkarmakar.dev@gmail.com to discuss.",
  },
  {
    tags: ["resume", "cv", "download", "pdf"],
    response:
      "For Srijon's full resume, reach out via email: srijonkarmakar.dev@gmail.com.",
  },
  {
    tags: ["typescript", "next js", "nextjs"],
    response:
      "Yes — TypeScript and Next.js are part of Srijon's frontend skill set, alongside React.js and JavaScript.",
  },
];

/**
 * Match user input against rules and return the best response.
 * @param {string} message
 * @returns {string}
 */
export function getRuleBasedReply(message) {
  const lower = message.toLowerCase().trim();

  let bestMatch = null;
  let bestScore = 0;

  for (const rule of rules) {
    for (const tag of rule.tags) {
      if (lower.includes(tag.trim())) {
        const score = tag.trim().length;
        if (score > bestScore) {
          bestScore = score;
          bestMatch = rule;
        }
      }
    }
  }

  if (bestMatch) return bestMatch.response;

  return "I can answer questions about Srijon's skills, experience, projects, education, or how to contact him. What would you like to know?";
}
