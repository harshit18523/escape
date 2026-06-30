import { create } from "axios";

const tmdbClient = create({
  baseURL: process.env.TMDB_BASE_URL || "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
    "Content-Type": "application/json"
  }
});

const tmdbService = {
  async getTrending(page: number = 1) {
    const response = await tmdbClient.get(`/trending/movie/week?language=en-US&page=${page}`);
    return response.data;
  },

  async searchMovies(query: string, page: number = 1) {
    // console.log(encodeURIComponent(query));
    const response = await tmdbClient.get(`/search/movie?query=${encodeURIComponent(query)}&language=en-US&page=${page}`);
    return response.data;
  },

  async getMovieDetails(movieId: string) {
    const response = await tmdbClient.get(`/movie/${movieId}?append_to_response=credits,similiar&language=en-US`);
    return response.data;
  }
};

export default tmdbService;
