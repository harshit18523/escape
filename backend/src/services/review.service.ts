import prisma from "../lib/prisma.js";

const reviewService = {
  async upsertMovie(movieId: number, title: string, posterPath: string) {
    const data = await prisma.movie.upsert({
      where: { id: movieId },
      update: {},
      create: {
        id: movieId,
        title,
        posterPath
      }
    });
    return data;
  },

  async createReview(userId: string, movieId: number, rating: number, content: string, watchedOn: Date) {
    const data = await prisma.review.create({
      data: {
        userId,
        movieId,
        rating,
        content,
        watchedOn: watchedOn ? new Date(watchedOn) : new Date()
      }
    });
    return data;
  },

  async getUserReviews(username: string) {
    const data = await prisma.review.findMany({
      where: { user: { username } },
      include: { movie: true },
      orderBy: { watchedOn: "desc" }
    });
    return data;
  }
};

export default reviewService;
