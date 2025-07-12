import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ChatRepository {
  async saveMessage(
    userId: string,
    question: string,
    answer: string
  ) {
    return prisma.chatMessage.create({
      data: { userId, question, answer }
    });
  }
}
