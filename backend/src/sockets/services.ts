import prisma from "../lib/prisma.js";
import logger from "../utils/logger.js";

const socketService = {
  async newMessage(conversationId: string, senderId: string, content: string) {
    try {
      const data = await prisma.message.create({
        data: {
          conversationId,
          senderId,
          content
        },
        include: { sender: { select: {
          id: true,
          name: true,
          username: true,
          image: true
        }}}
      });
      return data;
    } catch (error) {
      logger.error("❌ Error creating new message:", error);
    }
  },

  async updateTimestamp(conversationId: string) {
    try {
      const data = await prisma.conversation.update({
        where: { id: conversationId },
        data: { updatedAt: new Date() }
      });
      return data;
    } catch (error) {
      logger.error("❌ Error updating updatedAt:", error);
    }
  }
};

export default socketService;
