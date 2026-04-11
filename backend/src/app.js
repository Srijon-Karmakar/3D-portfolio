import express from "express";
import cors from "cors";
import contactRoutes from "./routes/contactRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

const app = express();

app.use(cors({ origin: process.env.CLIENT_ORIGIN, credentials: true }));
app.use(express.json({ limit: "100kb" }));

app.get("/health", (req, res) => res.json({ ok: true }));

app.use("/api", contactRoutes);
app.use("/api", chatRoutes);

export default app;
