import { createClient } from "npm:@supabase/supabase-js@2";

function getCorsHeaders(req: Request) {
  const configuredOrigin = Deno.env.get("CLIENT_ORIGIN")?.trim();
  const requestOrigin = req.headers.get("origin")?.trim();

  return {
    "Access-Control-Allow-Origin": configuredOrigin || requestOrigin || "*",
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type, x-admin-session",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
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

function getSupabaseAdminClient() {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing Supabase URL or service role key.");
  }

  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

function getContactTable() {
  return Deno.env.get("SUPABASE_CONTACT_TABLE") || "contact_messages";
}

function getAdminAccessKey() {
  return Deno.env.get("ADMIN_ACCESS_KEY") || "";
}

function stringToBytes(value: string) {
  return new TextEncoder().encode(value);
}

function bytesToString(bytes: Uint8Array) {
  return new TextDecoder().decode(bytes);
}

function base64UrlToBytes(value: string) {
  const normalized = value.replaceAll("-", "+").replaceAll("_", "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
  const binary = atob(padded);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

function bytesToBase64Url(bytes: Uint8Array) {
  return btoa(String.fromCharCode(...bytes))
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
}

async function signValue(value: string, secret: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    stringToBytes(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign("HMAC", key, stringToBytes(value));
  return bytesToBase64Url(new Uint8Array(signature));
}

async function verifySessionToken(token: string, secret: string) {
  const [payloadPart, signaturePart] = token.split(".");

  if (!payloadPart || !signaturePart) {
    throw new Error("Invalid session token.");
  }

  const expectedSignature = await signValue(payloadPart, secret);
  if (expectedSignature !== signaturePart) {
    throw new Error("Invalid session token.");
  }

  let payload: { scope?: string; exp?: number };

  try {
    payload = JSON.parse(bytesToString(base64UrlToBytes(payloadPart)));
  } catch {
    throw new Error("Invalid session payload.");
  }

  if (payload.scope !== "admin-dashboard") {
    throw new Error("Invalid session scope.");
  }

  if (!payload.exp || Date.now() > payload.exp) {
    throw new Error("Session expired.");
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return emptyResponse(req);
  }

  if (req.method !== "GET") {
    return jsonResponse(req, { ok: false, message: "Method not allowed." }, 405);
  }

  const adminAccessKey = getAdminAccessKey();
  const sessionToken = req.headers.get("x-admin-session")?.trim() || "";

  if (!adminAccessKey) {
    return jsonResponse(
      req,
      { ok: false, message: "ADMIN_ACCESS_KEY is not configured." },
      500
    );
  }

  if (!sessionToken) {
    return jsonResponse(req, { ok: false, message: "Missing admin session." }, 401);
  }

  try {
    await verifySessionToken(sessionToken, adminAccessKey);
    const client = getSupabaseAdminClient();
    const { data, error } = await client
      .from(getContactTable())
      .select("id,name,email,message,status,user_agent,created_at")
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return jsonResponse(req, {
      ok: true,
      contacts: Array.isArray(data) ? data : [],
    });
  } catch (error) {
    return jsonResponse(
      req,
      {
        ok: false,
        message: error instanceof Error ? error.message : "Access denied.",
      },
      401
    );
  }
});
