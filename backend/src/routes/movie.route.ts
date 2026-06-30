import { Router } from "express";
import { getTrendingMovies, searchMovies } from "../controllers/movie.controller.js";

const router = Router();

router.get("/trending", getTrendingMovies);
router.get("/search", searchMovies);

export default router;
