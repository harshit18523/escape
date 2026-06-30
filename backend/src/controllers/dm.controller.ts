import type { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler.js";
import dmService from "../services/dm.service.js";
import ApiResponse from "../utils/apiResponse.js";

export const getConversations = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userId = req.user.id;
  const conversations = await dmService.getConversations(userId);
  ApiResponse.success(res, "Chats of current user fetched", conversations);
});

export const getMessages = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userId = req.user.id;
  const { conversationId } = req.params;
  const isParticipant = await dmService.isUserInConvo(userId, conversationId as string);
  if (!isParticipant) {
    ApiResponse.error(res, "Not authorized to view this convo", 403);
    return;
  }
  const messages = await dmService.getMessages(conversationId as string);
  ApiResponse.success(res, "Chat history fetched", messages);
});
