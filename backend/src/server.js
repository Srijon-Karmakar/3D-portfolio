import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { validateSupabaseConfig } from "./lib/supabase.js";

const PORT = process.env.PORT || 5000;

async function start() {
  validateSupabaseConfig();
  console.log("Supabase backend configured");

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

start().catch((e) => {
  console.error("Server start failed:", e);
  process.exit(1);
});
