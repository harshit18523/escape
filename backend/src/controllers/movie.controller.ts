import type { Request, Response } from "express";
import tmdbService from "../services/tmdb.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";

export const getTrendingMovies = asyncHandler(async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const data = await tmdbService.getTrending(page);
  ApiResponse.success(res, "Fetched trending movies", data)
});

export const searchMovies = asyncHandler(async (req: Request, res: Response) => {
  const query = req.query.q as string;
  if (!query) {
    return ApiResponse.error(res, "Search query is required");
  }
  const page = parseInt(req.query.page as string) || 1;
  const data = await tmdbService.searchMovies(query, page);
  ApiResponse.success(res, "Searched movies with query", data);
});
