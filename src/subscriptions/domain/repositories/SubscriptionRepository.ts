import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class SubscriptionRepository {
  async createSubscription(
    userId: string,
    plan: string,
    autoRenew: boolean,
    startDate: Date,
    endDate: Date
  ) {
    return prisma.subscription.create({
      data: { userId, plan, autoRenew, startDate, endDate }
    });
  }

  async getActiveSubscription(userId: string) {
    const now = new Date();
  
    return prisma.subscription.findFirst({
      where: {
        userId,
        endDate: { gt: now }
      },
      orderBy: {
        endDate: "desc"
      }
    });
  }

  async getAllSubscribedUserIds(): Promise<string[]> {
    const subs = await prisma.subscription.findMany({
      where: {
        autoRenew: true,
        endDate: {
          lt: new Date(),
        }
      },
      select: {
        userId: true,
      }
    });
  
    const uniqueUserIds = [...new Set(subs.map((s: { userId: any; }) => s.userId))];
    return uniqueUserIds as string[];
  }
}
  
