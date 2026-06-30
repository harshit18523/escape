import * as z from "zod";
import asyncHandler from "../utils/asyncHandler.js";
import type { Request, Response } from "express";
import reviewService from "../services/review.service.js";
import ApiResponse from "../utils/apiResponse.js";

export const reviewSchema = z.object({
  body: z.object({
    movieId: z.number(),
    title: z.string(),
    posterPath: z.string().nullable().optional(),
    rating: z.number().min(0.5).max(5).optional(),
    content: z.string().optional(),
    watchedOn: z.iso.datetime().optional()
  })
});

export const logMovie = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userId = req.user.id;
  const { movieId, title, posterPath, rating, content, watchedOn } = req.body;
  await reviewService.upsertMovie(movieId, title, posterPath);
  const review = await reviewService.createReview(userId, movieId, rating, content, watchedOn);
  ApiResponse.success(res, "Movie logged successfully", review);
});

export const getUserReviews = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { username } = req.params;
  const reviews = await reviewService.getUserReviews(username as string);
  ApiResponse.success(res, "Fetched User reviews", reviews);
});
