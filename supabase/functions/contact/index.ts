import { createClient } from "npm:@supabase/supabase-js@2";
import nodemailer from "npm:nodemailer";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
};

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

function getSupabaseUrl() {
  return Deno.env.get("SUPABASE_URL");
}

function getSupabaseKey() {
  return Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
}

function getContactTable() {
  return Deno.env.get("SUPABASE_CONTACT_TABLE") || "contact_messages";
}

function getSupabaseAdminClient() {
  const supabaseUrl = getSupabaseUrl();
  const supabaseKey = getSupabaseKey();

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing Supabase URL or key for the contact function.");
  }

  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function buildTransporter() {
  const host = Deno.env.get("MAIL_HOST");
  const port = Number(Deno.env.get("MAIL_PORT") || 465);
  const secure = String(Deno.env.get("MAIL_SECURE") || "true") === "true";
  const user = Deno.env.get("MAIL_USER");
  const pass = Deno.env.get("MAIL_PASS");

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });
}

async function sendNotifications(row: {
  name: string;
  email: string;
  message: string;
  ip: string;
  user_agent: string;
  created_at: string;
}) {
  const transporter = buildTransporter();
  const adminEmail = Deno.env.get("ADMIN_EMAIL");
  const mailUser = Deno.env.get("MAIL_USER");

  if (!transporter || !adminEmail || !mailUser) {
    return;
  }

  const userHtml = `
    <div style="font-family:Arial,sans-serif;line-height:1.5">
      <h2>Thanks for contacting us, ${escapeHtml(row.name)}!</h2>
      <p>We received your message and will get back to you soon.</p>
      <hr />
      <p><b>Your message:</b></p>
      <p style="white-space:pre-wrap">${escapeHtml(row.message)}</p>
      <p style="margin-top:16px;color:#666">- Team</p>
    </div>
  `;

  const adminHtml = `
    <div style="font-family:Arial,sans-serif;line-height:1.5">
      <h2>New Contact Form Submission</h2>
      <p><b>Name:</b> ${escapeHtml(row.name)}</p>
      <p><b>Email:</b> ${escapeHtml(row.email)}</p>
      <p><b>Time:</b> ${escapeHtml(new Date(row.created_at).toLocaleString())}</p>
      <p><b>IP:</b> ${escapeHtml(row.ip || "-")}</p>
      <p><b>User Agent:</b> ${escapeHtml(row.user_agent || "-")}</p>
      <hr />
      <p><b>Message:</b></p>
      <p style="white-space:pre-wrap">${escapeHtml(row.message)}</p>
    </div>
  `;

  await Promise.allSettled([
    transporter.sendMail({
      from: `"Website Contact" <${mailUser}>`,
      to: row.email,
      subject: "We received your message",
      html: userHtml,
    }),
    transporter.sendMail({
      from: `"Website Contact" <${mailUser}>`,
      to: adminEmail,
      subject: `New contact: ${row.name}`,
      html: adminHtml,
      replyTo: row.email,
    }),
  ]);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return emptyResponse(req);
  }

  if (req.method !== "POST") {
    return jsonResponse(req, { ok: false, message: "Method not allowed." }, 405);
  }

  let payload: ContactPayload;

  try {
    payload = await req.json();
  } catch {
    return jsonResponse(req, { ok: false, message: "Invalid JSON body." }, 400);
  }

  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const email =
    typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
  const message =
    typeof payload.message === "string" ? payload.message.trim() : "";

  if (!name || !email || !message) {
    return jsonResponse(
      req,
      { ok: false, message: "All fields are required." },
      400
    );
  }

  if (!isEmail(email)) {
    return jsonResponse(
      req,
      { ok: false, message: "Invalid email address." },
      400
    );
  }

  try {
    const client = getSupabaseAdminClient();
    const row = {
      name,
      email,
      message,
      ip:
        req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        req.headers.get("x-real-ip")?.trim() ||
        "",
      user_agent: req.headers.get("user-agent") || "",
      status: "new",
      created_at: new Date().toISOString(),
    };

    const { error } = await client.from(getContactTable()).insert(row);

    if (error) {
      throw new Error(error.message);
    }

    await sendNotifications(row);

    return jsonResponse(req, {
      ok: true,
      message: "Message sent successfully.",
    });
  } catch (error) {
    console.error("contact function failed:", error);
    return jsonResponse(
      req,
      {
        ok: false,
        message: error instanceof Error ? error.message : "Server error.",
      },
      500
    );
  }
});
