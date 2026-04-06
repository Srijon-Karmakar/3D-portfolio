import { insertContactMessage } from "../lib/supabase.js";
import { sendMail } from "../utils/mailer.js";

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || "").trim());

export async function submitContact(req, res) {
  try {
    const { name, email, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({ ok: false, message: "All fields are required." });
    }
    if (!isEmail(email)) {
      return res.status(400).json({ ok: false, message: "Invalid email address." });
    }

    // Save to Supabase for insights
    const doc = await insertContactMessage({
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      message: String(message).trim(),
      ip: req.headers["x-forwarded-for"]?.toString().split(",")[0]?.trim() || req.socket?.remoteAddress || "",
      user_agent: req.headers["user-agent"] || "",
      status: "new",
    });

    // 1) Email to user (confirmation)
    const userHtml = `
      <div style="font-family:Arial,sans-serif;line-height:1.5">
        <h2>Thanks for contacting us, ${doc.name}!</h2>
        <p>We received your message and will get back to you soon.</p>
        <hr/>
        <p><b>Your message:</b></p>
        <p style="white-space:pre-wrap">${escapeHtml(doc.message)}</p>
        <p style="margin-top:16px;color:#666">— Team</p>
      </div>
    `;

    // 2) Email to admin (notification)
    const adminHtml = `
      <div style="font-family:Arial,sans-serif;line-height:1.5">
        <h2>New Contact Form Submission</h2>
        <p><b>Name:</b> ${escapeHtml(doc.name)}</p>
        <p><b>Email:</b> ${escapeHtml(doc.email)}</p>
        <p><b>Time:</b> ${new Date(doc.created_at).toLocaleString()}</p>
        <p><b>IP:</b> ${escapeHtml(doc.ip || "-")}</p>
        <p><b>User Agent:</b> ${escapeHtml(doc.user_agent || "-")}</p>
        <hr/>
        <p><b>Message:</b></p>
        <p style="white-space:pre-wrap">${escapeHtml(doc.message)}</p>
      </div>
    `;

    // send both emails (don’t block DB save)
    await Promise.allSettled([
      sendMail({
        to: doc.email,
        subject: "We received your message",
        html: userHtml,
      }),
      sendMail({
        to: process.env.ADMIN_EMAIL,
        subject: `New contact: ${doc.name}`,
        html: adminHtml,
        replyTo: doc.email, // so you can reply directly
      }),
    ]);

    return res.status(201).json({ ok: true, message: "Message sent successfully." });
  } catch (err) {
    console.error("submitContact error:", err);
    const message =
      err?.message === "fetch failed"
        ? "Could not reach Supabase. Check backend network access and Supabase configuration."
        : err?.message || "Server error.";

    return res.status(500).json({ ok: false, message });
  }
}

// Basic HTML escaping for emails
function escapeHtml(str) {
  return String(str || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
