import { Router } from "express";
import { chat } from "../controllers/chatController.js";
import rateLimit from "express-rate-limit";

const chatLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, message: "Too many messages. Please wait a moment." },
});

const router = Router();

router.post("/chat", chatLimiter, chat);

export default router;
