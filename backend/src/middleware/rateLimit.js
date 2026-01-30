import rateLimit from "express-rate-limit";

export const contactLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 min
  max: 10, // 10 requests per 10 min per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, message: "Too many requests. Please try again later." },
});
