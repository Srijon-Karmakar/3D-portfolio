import { invokeSupabaseFunction } from "./supabaseFunctions";

export async function sendPortfolioChatMessage(message, history = []) {
  const data = await invokeSupabaseFunction("chat", {
    body: {
      message,
      history,
    },
  });

  if (!data?.ok || !data?.reply) {
    throw new Error(data?.message || "Chat request failed.");
  }

  return data;
}
