import type { Server, Socket } from "socket.io";
import logger from "../utils/logger.js";
import { boolean } from "zod";
import socketService from "./services.js";

export default function setupSockets(io: Server) {
  io.on("connection", (socket: Socket) => {
    logger.info(`⚡ Real-time client connected: ${socket.id}`);

    socket.on("join_conversation", (conversationId: string) => {
      socket.join(`room:${conversationId}`);
      logger.info(`👤 Socket ${socket.id} joined conversation room: ${conversationId}`);
    });

    socket.on("typing", ({ conversationId, username, isTyping }: {
      conversationId: string;
      username: string;
      isTyping: boolean
    }) => {
      socket.to(`room:${conversationId}`).emit("user_typing", {
        username,
        isTyping
      });
    });

    socket.on("send_message", async ({ conversationId, senderId, content }: {
      conversationId: string;
      senderId: string;
      content: string
    }) => {
      try {
        const newMessage = await socketService.newMessage(conversationId, senderId, content);
        await socketService.updateTimestamp(conversationId);
        io.to(`room:${conversationId}`).emit("receive_message", newMessage);
      } catch (error) {
        socket.emit("message_error", { error: "Failed to deliver message" });
      }
    });

    socket.on("disconnect", () => {
      logger.info(`🔴 Real-time client disconnected: ${socket.id}`);
    });
  });
}
