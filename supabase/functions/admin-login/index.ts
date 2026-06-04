type LoginPayload = {
  key?: unknown;
};

function getCorsHeaders(req: Request) {
  const configuredOrigin = Deno.env.get("CLIENT_ORIGIN")?.trim();
  const requestOrigin = req.headers.get("origin")?.trim();

  return {
    "Access-Control-Allow-Origin": configuredOrigin || requestOrigin || "*",
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type, x-admin-session",
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

function getAdminAccessKey() {
  return Deno.env.get("ADMIN_ACCESS_KEY") || "";
}

function bytesToBase64Url(bytes: Uint8Array) {
  return btoa(String.fromCharCode(...bytes))
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
}

function stringToBytes(value: string) {
  return new TextEncoder().encode(value);
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

function timingSafeEqual(a: string, b: string) {
  const left = stringToBytes(a);
  const right = stringToBytes(b);
  const maxLength = Math.max(left.length, right.length);
  let mismatch = left.length ^ right.length;

  for (let i = 0; i < maxLength; i += 1) {
    mismatch |= (left[i] || 0) ^ (right[i] || 0);
  }

  return mismatch === 0;
}

async function createSessionToken(secret: string) {
  const expiresAt = new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString();
  const payload = {
    scope: "admin-dashboard",
    exp: Date.parse(expiresAt),
  };
  const encodedPayload = bytesToBase64Url(
    stringToBytes(JSON.stringify(payload))
  );
  const signature = await signValue(encodedPayload, secret);

  return {
    token: `${encodedPayload}.${signature}`,
    expires_at: expiresAt,
  };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return emptyResponse(req);
  }

  if (req.method !== "POST") {
    return jsonResponse(req, { ok: false, message: "Method not allowed." }, 405);
  }

  let payload: LoginPayload;

  try {
    payload = await req.json();
  } catch {
    return jsonResponse(req, { ok: false, message: "Invalid JSON body." }, 400);
  }

  const key = typeof payload.key === "string" ? payload.key.trim() : "";
  const adminAccessKey = getAdminAccessKey();

  if (!adminAccessKey) {
    return jsonResponse(
      req,
      { ok: false, message: "ADMIN_ACCESS_KEY is not configured." },
      500
    );
  }

  if (!key) {
    return jsonResponse(req, { ok: false, message: "Access key is required." }, 400);
  }

  if (!timingSafeEqual(key, adminAccessKey)) {
    return jsonResponse(req, { ok: false, message: "Invalid access key." }, 401);
  }

  const session = await createSessionToken(adminAccessKey);
  return jsonResponse(req, {
    ok: true,
    ...session,
  });
});
