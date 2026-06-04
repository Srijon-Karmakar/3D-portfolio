import {
  buildSupabaseFunctionUrl,
  getSupabaseHeaders,
} from "./supabaseConfig";

export async function invokeSupabaseFunction(
  name,
  { method = "POST", body, accessToken, timeoutMs = 10000 } = {}
) {
  const response = await fetch(buildSupabaseFunctionUrl(name), {
    method,
    headers: {
      ...getSupabaseHeaders(accessToken),
      ...(body === undefined ? {} : { "Content-Type": "application/json" }),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
    signal: AbortSignal.timeout(timeoutMs),
  });

  const raw = await response.text();
  let data = null;

  try {
    data = raw ? JSON.parse(raw) : null;
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new Error(
      data?.message || `Supabase function "${name}" request failed.`
    );
  }

  return data;
}
