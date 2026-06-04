import { invokeSupabaseFunction } from "./supabaseFunctions";

export async function insertContactMessage(payload) {
  const data = await invokeSupabaseFunction("contact", {
    body: {
      name: payload.name,
      email: payload.email,
      message: payload.message,
    },
  });

  if (!data?.ok) {
    throw new Error(data?.message || "Message submission failed.");
  }

  return data;
}
