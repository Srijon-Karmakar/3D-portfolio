const GEMINI_MODEL = "gemini-2.0-flash-lite";

function getCorsHeaders(req: Request) {
  const configuredOrigin = Deno.env.get("CLIENT_ORIGIN")?.trim();
  const requestOrigin = req.headers.get("origin")?.trim();

  return {
    "Access-Control-Allow-Origin": configuredOrigin || requestOrigin || "*",
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function jsonResponse(
  req: Request,
  body: unknown,
  status = 200,
  extraHeaders: Record<string, string> = {}
) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...getCorsHeaders(req),
      "Content-Type": "application/json",
      ...extraHeaders,
    },
  });
}

function emptyResponse(req: Request, status = 204) {
  return new Response(null, {
    status,
    headers: getCorsHeaders(req),
  });
}

const rules = [
  {
    tags: [
      "hello",
      "hi ",
      "hey ",
      "hey!",
      "howdy",
      "good morning",
      "good evening",
      "what's up",
      "sup ",
      "yo ",
    ],
    response:
      "Hey! I'm Srijon's AI assistant. Ask me about his skills, projects, experience, or how to get in touch!",
  },
  {
    tags: [
      "who is srijon",
      "tell me about srijon",
      "about srijon",
      "introduce",
      "who are you",
      "about yourself",
      "about him",
    ],
    response:
      "Srijon Karmakar is a Full Stack Developer based in Kolkata, India. He graduated with a B.Tech in Computer Science & Engineering (Data Science) from Brainware University in July 2025 with a GPA of 8.6. He's currently working at House Of MUSA, building scalable web apps with React.js and Node.js.",
  },
  {
    tags: [
      "house of musa",
      "current job",
      "current company",
      "current role",
      "currently working",
      "where does he work",
    ],
    response:
      "Srijon currently works as a Full Stack Developer at House Of MUSA (Kolkata, April 2025 - Present). He builds full-stack apps with React.js and Node.js, designs REST APIs with MongoDB, and handles end-to-end feature delivery.",
  },
  {
    tags: [
      "webguru",
      "previous job",
      "past job",
      "intern",
      "internship",
      "python developer",
    ],
    response:
      "Previously, Srijon was a Python Developer Intern at Webguru Infosystem (Salt Lake, Kolkata) from November 2024 to January 2025, where he built Django-based dashboards and backend workflows.",
  },
  {
    tags: ["experience", "work history", "career", "employment", "jobs", "companies"],
    response:
      "Srijon has worked as:\n1. Full Stack Developer at House Of MUSA (April 2025 - Present)\n2. Python Developer Intern at Webguru Infosystem (Nov 2024 - Jan 2025)\nHe also has a strong project portfolio spanning full-stack, 3D, and ERP-style systems.",
  },
  {
    tags: [
      "education",
      "university",
      "degree",
      "studied",
      "graduate",
      "gpa",
      "brainware",
      "btech",
      "b.tech",
      "academic",
      "cgpa",
    ],
    response:
      "Srijon completed his B.Tech in Computer Science & Engineering (Data Science) from Brainware University, Barasat, Kolkata - graduating in July 2025 with a GPA of 8.6.",
  },
  {
    tags: [
      "tech stack",
      "skills",
      "technologies",
      "tools",
      "expertise",
      "what can he do",
      "what does he know",
      "abilities",
      "good at",
    ],
    response:
      "Srijon's tech stack:\n- Frontend: React.js, Next.js, JavaScript, TypeScript, HTML, CSS, GSAP, Three.js\n- Backend: Node.js, Express, Django, NestJS, REST APIs, JWT, RBAC\n- Databases: MongoDB, PostgreSQL, MySQL, Supabase\n- Languages: Python, JavaScript, TypeScript, Java, C\n- Other: Git, Vite, Tailwind CSS, Blender, Cannon.js",
  },
  {
    tags: [
      "frontend",
      "react",
      "javascript",
      "html",
      "css",
      "ui",
      "typescript",
      "next.js",
      "nextjs",
      "gsap",
      "three.js",
      "tailwind",
    ],
    response:
      "Srijon's frontend skills include React.js, Next.js, JavaScript, TypeScript, HTML, CSS, and Tailwind CSS. He adds motion and 3D with GSAP and Three.js for rich interactive experiences.",
  },
  {
    tags: [
      "backend",
      "node.js",
      "nodejs",
      "django",
      "nestjs",
      "api",
      "rest api",
      "server",
      "express",
      "authentication",
      "auth",
      "jwt",
      "rbac",
    ],
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
      "Srijon has solid Python skills - used in Django applications and grounded in his Data Science degree track. He built data-driven dashboards and backend processing workflows.",
  },
  {
    tags: [
      "projects",
      "portfolio",
      "what has he built",
      "his work",
      "show me projects",
      "work samples",
    ],
    response:
      "Srijon's key projects:\n1. Cloud-based Code Editor (React + Node.js)\n2. Online Tool System - toolit-y4pd.onrender.com\n3. Online Testing Portal - snv-etester.onrender.com\n4. Restaurant Website - resturang.onrender.com\n5. Agency Portfolio - senevon.in\n6. Cricket Game (3D) - pov-cricket.onrender.com\n7. Sports Management System - esm-9x3l.onrender.com",
  },
  {
    tags: ["contact", "reach out", "email", "linkedin", "phone", "get in touch", "connect", "message him"],
    response:
      "Contact Srijon:\n- Email: srijonkarmakar.dev@gmail.com\n- LinkedIn: linkedin.com/in/srijon-karmakar\n- Phone: +91 7439498882",
  },
  {
    tags: [
      "hire",
      "hiring",
      "available",
      "availability",
      "freelance",
      "full-time",
      "open to work",
      "job opportunity",
      "recruit",
    ],
    response:
      "Srijon is open to full-time roles, freelance projects, and collaborations. Contact him at srijonkarmakar.dev@gmail.com or LinkedIn (linkedin.com/in/srijon-karmakar).",
  },
  {
    tags: ["location", "where", "based", "city", "kolkata", "india", "from"],
    response: "Srijon is based in Kolkata, India.",
  },
];

function getRuleBasedReply(message: string) {
  const lower = message.toLowerCase().trim();

  let bestMatch: { response: string } | null = null;
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

const SYSTEM_PROMPT = `You are an AI assistant embedded on Srijon Karmakar's portfolio website. Your sole purpose is to answer visitor questions about Srijon - his skills, experience, projects, education, and availability. Be concise (2-4 sentences), warm, and professional.

About Srijon Karmakar:
- Role: Full Stack Developer
- Location: Kolkata, India
- Education: B.Tech in Computer Science & Engineering (Data Science), Brainware University - Graduated July 2025, GPA 8.6

Work Experience:
1. House Of MUSA - Full Stack Developer (April 2025 - Present, Kolkata)
   Built scalable React.js + Node.js apps, REST APIs with MongoDB, JWT auth, RBAC, and delivered features end-to-end.
2. Webguru Infosystem - Python Developer (Nov 2024 - Jan 2025, Salt Lake, Kolkata)
   Django-based applications, survey workflows, and dashboard-driven backend systems.

Technical Skills:
- Frontend: React.js, Next.js, JavaScript, TypeScript, HTML, CSS, Responsive Design, UI/UX, GSAP, Three.js
- Backend: Node.js, Express, Django, NestJS, REST APIs, JWT Auth, RBAC
- Databases: MongoDB, PostgreSQL, MySQL, Supabase
- Languages: JavaScript, TypeScript, Python, Java, C
- Other: Git, Vite, Tailwind CSS, WebGL, Blender, Cannon.js

Projects:
1. Cloud-based Code Editor - React + Node.js, authentication, persistent storage
2. Online Tool System - Media processing platform (toolit-y4pd.onrender.com)
3. Online Testing Portal - NestJS proctoring system with RBAC (snv-etester.onrender.com)
4. Restaurant Website - React + Node.js, modern UI (resturang.onrender.com)
5. Agency Portfolio - Branding & presentation (senevon.in)
6. Cricket Game App - 3D game: Three.js, TypeScript, Cannon-es, Blender (pov-cricket.onrender.com)
7. Sports Management System - ERP multi-role platform (esm-9x3l.onrender.com)

Contact & Availability:
- Email: srijonkarmakar.dev@gmail.com
- LinkedIn: linkedin.com/in/srijon-karmakar
- Phone: +91 7439498882
- Open to: full-time roles, freelance projects, collaborations

Soft Skills: Communication, Leadership, Quick Learner, Problem Solving
Interests: Workshops, exhibitions, open-source contributions, graphic design, exploring places.

Rules:
- Never invent information not listed above.
- If asked something unrelated to Srijon, respond: "I can only answer questions about Srijon. Feel free to ask about his skills, experience, or projects!"
- For hiring or collaboration questions, share his email and LinkedIn.
- Keep answers short and direct.`;

async function callGemini(message: string, history: unknown[], apiKey: string) {
  const safeHistory = Array.isArray(history) ? history.slice(-6) : [];

  const contents = [
    ...safeHistory.map((turn) => {
      const role =
        turn && typeof turn === "object" && "role" in turn && turn.role === "user"
          ? "user"
          : "model";
      const text =
        turn && typeof turn === "object" && "text" in turn
          ? String(turn.text).slice(0, 500)
          : "";

      return {
        role,
        parts: [{ text }],
      };
    }),
    { role: "user", parts: [{ text: message.trim() }] },
  ];

  const url =
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents,
      generationConfig: { maxOutputTokens: 300, temperature: 0.7 },
    }),
    signal: AbortSignal.timeout(8000),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(`Gemini error: ${response.status} ${JSON.stringify(err)}`);
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error("Empty Gemini response");
  }

  return String(text).trim();
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return emptyResponse(req);
  }

  if (req.method !== "POST") {
    return jsonResponse(req, { ok: false, message: "Method not allowed." }, 405);
  }

  let payload: { message?: unknown; history?: unknown[] };

  try {
    payload = await req.json();
  } catch {
    return jsonResponse(req, { ok: false, message: "Invalid JSON body." }, 400);
  }

  const message =
    typeof payload.message === "string" ? payload.message.trim() : "";
  const history = Array.isArray(payload.history) ? payload.history : [];

  if (!message) {
    return jsonResponse(req, { ok: false, message: "Message is required." }, 400);
  }

  if (message.length > 500) {
    return jsonResponse(req, { ok: false, message: "Message too long." }, 400);
  }

  const apiKey = Deno.env.get("GEMINI_API_KEY");

  if (apiKey) {
    try {
      const reply = await callGemini(message, history, apiKey);
      return jsonResponse(req, { ok: true, reply, source: "ai" });
    } catch (error) {
      console.warn("Gemini unavailable, falling back to rule engine:", error);
    }
  }

  const reply = getRuleBasedReply(message);
  return jsonResponse(req, { ok: true, reply, source: "rules" });
});
