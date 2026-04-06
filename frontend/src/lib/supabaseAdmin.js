const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const contactTable = import.meta.env.VITE_SUPABASE_CONTACT_TABLE || "contact_messages";

function ensureSupabaseConfig() {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase is not configured in the frontend environment.");
  }
}

function buildUrl(path) {
  ensureSupabaseConfig();
  return new URL(path, supabaseUrl).toString();
}

function getBaseHeaders(token) {
  return {
    apikey: supabaseAnonKey,
    Authorization: `Bearer ${token || supabaseAnonKey}`,
    "Content-Type": "application/json",
  };
}

export async function signInAdmin(email, password) {
  const response = await fetch(buildUrl("/auth/v1/token?grant_type=password"), {
    method: "POST",
    headers: getBaseHeaders(),
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.msg || data?.message || "Admin sign-in failed.");
  }

  return data;
}

export async function refreshAdminSession(refreshToken) {
  const response = await fetch(buildUrl("/auth/v1/token?grant_type=refresh_token"), {
    method: "POST",
    headers: getBaseHeaders(),
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.msg || data?.message || "Session refresh failed.");
  }

  return data;
}

export async function fetchAdminContacts(accessToken) {
  const query = `/rest/v1/${contactTable}?select=id,name,email,message,status,user_agent,created_at&order=created_at.desc`;
  const response = await fetch(buildUrl(query), {
    method: "GET",
    headers: getBaseHeaders(accessToken),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || data?.error_description || data?.error || "Failed to load contacts.");
  }

  return Array.isArray(data) ? data : [];
}

export async function signOutAdmin(accessToken) {
  const response = await fetch(buildUrl("/auth/v1/logout"), {
    method: "POST",
    headers: getBaseHeaders(accessToken),
  });

  if (!response.ok && response.status !== 204) {
    const data = await response.json().catch(() => null);
    throw new Error(data?.message || data?.error || "Sign-out failed.");
  }
}
