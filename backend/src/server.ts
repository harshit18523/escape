import dotenv from "dotenv";
dotenv.config();
import { createServer } from "http";
import { Server } from "socket.io";
import { createClient } from "redis";
import { createAdapter } from "@socket.io/redis-adapter";
import app from "./app.js";
import logger from "./utils/logger.js";
import setupSockets from "./sockets/index.js";

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true
  }
});

const pubClient = createClient({ url: process.env.REDIS_URL || "" });
const subClient = pubClient.duplicate();

async function startServer() {
  try {
    await Promise.all([pubClient.connect(), subClient.connect()]);
    io.adapter(createAdapter(pubClient, subClient));
    logger.info("🟢 Redis Adapter connected successfully.");
    setupSockets(io);

    server.listen(process.env.PORT, () => {
      logger.info(`🚀 Server running on http:localhost:${process.env.PORT}`);
    });
  } catch (error) {
    logger.error("❌ Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
