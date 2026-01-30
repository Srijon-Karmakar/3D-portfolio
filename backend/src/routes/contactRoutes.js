import { Router } from "express";
import { submitContact } from "../controllers/contactController.js";
import { contactLimiter } from "../middleware/rateLimit.js";

const router = Router();

router.post("/contact", contactLimiter, submitContact);

export default router;
