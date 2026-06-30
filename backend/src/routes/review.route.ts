import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import { getUserReviews, logMovie, reviewSchema } from "../controllers/review.controller.js";

const router = Router();

router.post("/", authMiddleware, validate(reviewSchema), logMovie);
router.get("/:username", getUserReviews);

export default router;
