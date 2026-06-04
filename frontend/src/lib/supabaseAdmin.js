import {
  buildSupabaseFunctionUrl,
  getSupabaseHeaders,
} from "./supabaseConfig";

function getFunctionHeaders(extraHeaders = {}) {
  return {
    ...getSupabaseHeaders(),
    ...extraHeaders,
  };
}

export async function signInAdmin(accessKey) {
  const response = await fetch(buildSupabaseFunctionUrl("admin-login"), {
    method: "POST",
    headers: {
      ...getFunctionHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ key: accessKey }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || "Admin access denied.");
  }

  return data;
}

export async function fetchAdminContacts(sessionToken) {
  const response = await fetch(buildSupabaseFunctionUrl("admin-contacts"), {
    method: "GET",
    headers: getFunctionHeaders({
      "x-admin-session": sessionToken,
    }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || "Failed to load contacts.");
  }

  return Array.isArray(data?.contacts) ? data.contacts : [];
}

export async function signOutAdmin() {
  return;
}
