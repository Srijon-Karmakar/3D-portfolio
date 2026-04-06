function getSupabaseUrl() {
  return process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
}

function getSupabaseKey() {
  return (
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.VITE_SUPABASE_ANON_KEY
  );
}

function getSupabaseContactTable() {
  return process.env.SUPABASE_CONTACT_TABLE || "contact_messages";
}

function getSupabaseHeaders() {
  const supabaseUrl = getSupabaseUrl();
  const supabaseKey = getSupabaseKey();

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase is not configured. Missing Supabase URL or key.");
  }

  return {
    apikey: supabaseKey,
    Authorization: `Bearer ${supabaseKey}`,
    "Content-Type": "application/json",
  };
}

export function validateSupabaseConfig() {
  if (!getSupabaseUrl() || !getSupabaseKey()) {
    throw new Error("Missing Supabase URL or key.");
  }
}

export async function insertContactMessage(payload) {
  const url = new URL(`/rest/v1/${getSupabaseContactTable()}`, getSupabaseUrl());
  const createdAt = new Date().toISOString();
  const row = {
    ...payload,
    created_at: createdAt,
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      ...getSupabaseHeaders(),
      Prefer: "return=minimal",
    },
    body: JSON.stringify([row]),
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new Error(data?.message || data?.error || "Supabase insert failed.");
  }

  return row;
}
