import prisma from "../lib/prisma.js";

const dmService = {
  async getConversations(userId: string) {
    const data = await prisma.conversation.findMany({
      where: { participants: { some: { userId } } },
      include: {
        participants: {
          where: { userId: { not: userId } },
          include: { user: { select: {
            id: true,
            name: true,
            username: true,
            image: true
          }}}
        },
        messages: {
          orderBy: { createdAt: "desc" },
          take: 1
        }
      },
      orderBy: { updatedAt: "desc" }
    });
    return data;
  },

  async isUserInConvo(userId: string, conversationId: string) {
    const data = await prisma.conversationParticipant.findUnique({
      where: {
        userId_conversationId: {
          userId,
          conversationId
        }
      }
    });
    return data;
  },

  async getMessages(conversationId: string) {
    const data = await prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: "asc" }
    });
    return data;
  }
};

export default dmService;
