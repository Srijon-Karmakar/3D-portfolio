export function getCorsHeaders(req: Request) {
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

export function jsonResponse(
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

export function emptyResponse(req: Request, status = 204) {
  return new Response(null, {
    status,
    headers: getCorsHeaders(req),
  });
}
