const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const contactTable =
  import.meta.env.VITE_SUPABASE_CONTACT_TABLE || "contact_messages";

export function ensureSupabaseConfig() {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase is not configured in the frontend environment.");
  }
}

export function buildSupabaseUrl(path) {
  ensureSupabaseConfig();
  return new URL(path, supabaseUrl).toString();
}

export function buildSupabaseFunctionUrl(name) {
  return buildSupabaseUrl(`/functions/v1/${name}`);
}

export function getSupabaseHeaders(token) {
  ensureSupabaseConfig();

  return {
    apikey: supabaseAnonKey,
    Authorization: `Bearer ${token || supabaseAnonKey}`,
  };
}
