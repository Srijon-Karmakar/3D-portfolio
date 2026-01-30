import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import app from "./app.js";

const PORT = process.env.PORT || 5000;

async function start() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("✅ MongoDB connected");

  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}

start().catch((e) => {
  console.error("Server start failed:", e);
  process.exit(1);
});
