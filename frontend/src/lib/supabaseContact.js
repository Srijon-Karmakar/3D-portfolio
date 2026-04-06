const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const contactTable = import.meta.env.VITE_SUPABASE_CONTACT_TABLE || "contact_messages";

function getSupabaseInsertUrl() {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase is not configured in the frontend environment.");
  }

  return new URL(`/rest/v1/${contactTable}`, supabaseUrl).toString();
}

export async function insertContactMessage(payload) {
  const response = await fetch(getSupabaseInsertUrl(), {
    method: "POST",
    headers: {
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${supabaseAnonKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify([
      {
        name: payload.name,
        email: payload.email,
        message: payload.message,
        user_agent: navigator.userAgent || "",
        status: "new",
      },
    ]),
  });

  const raw = await response.text();
  let data = null;

  try {
    data = raw ? JSON.parse(raw) : null;
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new Error(data?.message || data?.error_description || data?.error || "Supabase insert failed.");
  }

  return data;
}
