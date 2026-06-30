import express from "express";
import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import auth from "./lib/auth.js";
import movieRoutes from "./routes/movie.route.js";
import reviewRoutes from "./routes/review.route.js";
import dmRoutes from "./routes/dm.route.js";

const app = express();

// Mount express json middleware after Better Auth handler
// or only apply it to routes that don't interact with Better Auth
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

app.all('/api/auth/{*any}', toNodeHandler(auth));

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "escape api is running"
  });
});

app.use("/api/movies", movieRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/dms", dmRoutes);

export default app;
