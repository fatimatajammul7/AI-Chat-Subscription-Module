import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class UsageRepository {
  async getUsage(userId: string) {
    return prisma.userUsage.findUnique({
      where: { userId }
    });
  }

  async createUsage(userId: string) {
    return prisma.userUsage.create({
      data: { userId, freeQuotaUsed: 0, bundleQuotaUsed: 0 }
    });
  }

  async incrementFreeUsage(userId: string): Promise<void> {
    await prisma.userUsage.update({
      where: { userId },
      data: { freeQuotaUsed: { increment: 1 } }
    });
  }

  async incrementBundleUsage(userId: string): Promise<void> {
    await prisma.userUsage.update({
      where: { userId },
      data: { bundleQuotaUsed: { increment: 1 } }
    });
  }
}
