import { getRuleBasedReply } from "../utils/ruleEngine.js";

const GEMINI_MODEL = "gemini-2.0-flash-lite";

const SYSTEM_PROMPT = `You are an AI assistant embedded on Srijon Karmakar's portfolio website. Your sole purpose is to answer visitor questions about Srijon — his skills, experience, projects, education, and availability. Be concise (2–4 sentences), warm, and professional.

About Srijon Karmakar:
• Role: Full Stack Developer
• Location: Kolkata, India
• Education: B.Tech in Computer Science & Engineering (Data Science), Brainware University — Graduated July 2025, GPA 8.6

Work Experience:
1. House Of MUSA — Full Stack Developer (April 2025 – Present, Kolkata)
   Built scalable React.js + Node.js apps, REST APIs with MongoDB, JWT auth, RBAC, and delivered features end-to-end.
2. Webguru Infosystem — Python Developer (Nov 2024 – Jan 2025, Salt Lake, Kolkata)
   Django-based applications, survey workflows, and dashboard-driven backend systems.

Technical Skills:
• Frontend: React.js, Next.js, JavaScript, TypeScript, HTML, CSS, Responsive Design, UI/UX, GSAP, Three.js
• Backend: Node.js, Express, Django, NestJS, REST APIs, JWT Auth, RBAC
• Databases: MongoDB, PostgreSQL, MySQL, Supabase
• Languages: JavaScript, TypeScript, Python, Java, C
• Other: Git, Vite, Tailwind CSS, WebGL, Blender, Cannon.js

Projects:
1. Cloud-based Code Editor — React + Node.js, authentication, persistent storage
2. Online Tool System — Media processing platform (toolit-y4pd.onrender.com)
3. Online Testing Portal — NestJS proctoring system with RBAC (snv-etester.onrender.com)
4. Restaurant Website — React + Node.js, modern UI (resturang.onrender.com)
5. Agency Portfolio — Branding & presentation (senevon.in)
6. Cricket Game App — 3D game: Three.js, TypeScript, Cannon-es, Blender (pov-cricket.onrender.com)
7. Sports Management System — ERP multi-role platform (esm-9x3l.onrender.com)

Contact & Availability:
• Email: srijonkarmakar.dev@gmail.com
• LinkedIn: linkedin.com/in/srijon-karmakar
• Phone: +91 7439498882
• Open to: full-time roles, freelance projects, collaborations

Soft Skills: Communication, Leadership, Quick Learner, Problem Solving
Interests: Workshops, exhibitions, open-source contributions, graphic design, exploring places.

Rules:
- Never invent information not listed above.
- If asked something unrelated to Srijon, respond: "I can only answer questions about Srijon. Feel free to ask about his skills, experience, or projects!"
- For hiring or collaboration questions, share his email and LinkedIn.
- Keep answers short and direct.`;

async function callGemini(message, history, apiKey) {
  const safeHistory = Array.isArray(history) ? history.slice(-6) : [];

  const contents = [
    ...safeHistory.map((turn) => ({
      role: turn.role === "user" ? "user" : "model",
      parts: [{ text: String(turn.text).slice(0, 500) }],
    })),
    { role: "user", parts: [{ text: message.trim() }] },
  ];

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents,
      generationConfig: { maxOutputTokens: 300, temperature: 0.7 },
    }),
    signal: AbortSignal.timeout(8000), // 8s timeout
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    const status = response.status;
    // 429 = quota exceeded, 503 = service unavailable — both should fallback
    throw Object.assign(new Error("Gemini error"), { status, geminiError: err });
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Empty Gemini response");

  return text.trim();
}

export async function chat(req, res) {
  const { message, history = [] } = req.body;

  if (!message || typeof message !== "string" || message.trim().length === 0) {
    return res.status(400).json({ ok: false, message: "Message is required." });
  }

  if (message.trim().length > 500) {
    return res.status(400).json({ ok: false, message: "Message too long." });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  // ── Layer 1: Gemini AI ───────────────────────────────────────────
  if (apiKey) {
    try {
      const reply = await callGemini(message.trim(), history, apiKey);
      return res.json({ ok: true, reply, source: "ai" });
    } catch (error) {
      // Log but don't crash — fall through to rule engine
      console.warn("Gemini unavailable, falling back to rule engine:", error.message);
    }
  }

  // ── Layer 2: Rule-based engine ───────────────────────────────────
  const reply = getRuleBasedReply(message.trim());
  return res.json({ ok: true, reply, source: "rules" });
}
