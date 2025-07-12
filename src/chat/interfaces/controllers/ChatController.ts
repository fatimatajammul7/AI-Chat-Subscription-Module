import { Request, Response } from "express";
import { AIService } from "../../domain/services/AIService";
import { ChatRepository } from "../../domain/repositories/ChatRepository";
import { UsageRepository } from "../../domain/repositories/UsageRepository";
import { SubscriptionRepository } from "../../../subscriptions/domain/repositories/SubscriptionRepository";

export class ChatController {
  private aiService = new AIService();
  private chatRepo = new ChatRepository();
  private usageRepo = new UsageRepository();
  private subscriptionRepo = new SubscriptionRepository();

  sendQuestion = async (req: Request, res: Response) => {
    const { userId, question } = req.body;

    let usage = await this.usageRepo.getUsage(userId);
    if (!usage) {
      usage = await this.usageRepo.createUsage(userId);
    }

    if (usage.freeQuotaUsed < 3) {
      await this.usageRepo.incrementFreeUsage(userId);
    } else {
      const subscription = await this.subscriptionRepo.getActiveSubscription(userId);

      if (subscription) {
        if (usage.bundleQuotaUsed < 10) {
          await this.usageRepo.incrementBundleUsage(userId);
        } else {
          return res.status(403).json({
            error: "Bundle quota exceeded. Please renew your subscription!"
          });
        }
      } else {
        return res.status(403).json({
          error: "Quota exceeded. Please subscribe to continue using the service!"
        });
      }
    }

    const answer = await this.aiService.generateResponse(question);
    await this.chatRepo.saveMessage(userId, question, answer);

    res.json({ answer });
  };
}
