import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { getConversations, getMessages } from "../controllers/dm.controller.js";

const router = Router();

router.use(authMiddleware);

router.get("/conversations", getConversations);
router.get("/conversations/:conversationId/messages", getMessages);

export default router;
