import { SubscriptionRepository } from '../repositories/SubscriptionRepository';

export type Plan = 'MONTHLY' | 'YEARLY';

export class SubscriptionService {
  private repo = new SubscriptionRepository();

  async createSubscription(
    userId: string,
    plan: Plan,
    autoRenew: boolean
  ) {
    const startDate = new Date();
    const days = plan === 'MONTHLY' ? 30 : 365;
    const endDate = new Date(startDate.getTime() + days * 86400000);

    // ✅ Mock payment logic
    const paymentSuccess = Math.random() > 0.1; // 90% chance payment succeeds

    if (!paymentSuccess) {
      throw new Error('Payment failed. Please try again.');
    }

    console.log(`Mock payment processed for user ${userId}`);

    return this.repo.createSubscription(
      userId,
      plan,
      autoRenew,
      startDate,
      endDate
    );
  }

  async renewSubscription(userId: string) {
    const subscription = await this.repo.getActiveSubscription(userId);
  
    if (!subscription) {
      console.log(`No active subscription found for user ${userId}. Skipping renewal.`);
      return;
    }
  
    if (!subscription.autoRenew) {
      console.log(`Auto-renew is disabled for user ${userId}.`);
      return;
    }
  
    const now = new Date();
    if (subscription.endDate < now) {
      // mock payment
      const paymentSuccess = Math.random() > 0.1;
  
      if (!paymentSuccess) {
        console.log(`Payment failed for user ${userId} during auto-renew.`);
        return;
      }
  
      const days = subscription.plan === "MONTHLY" ? 30 : 365;
      const newStartDate = now;
      const newEndDate = new Date(
        newStartDate.getTime() + days * 86400000
      );
  
      await this.repo.createSubscription(
        userId,
        subscription.plan,
        true,
        newStartDate,
        newEndDate
      );
  
      console.log(
        `Subscription auto-renewed for user ${userId} until ${newEndDate}.`
      );
    } else {
      console.log(`Subscription for user ${userId} is still active. No renewal needed.`);
    }
  }

  async getAllSubscribedUserIds(): Promise<string[]> {
    return this.repo.getAllSubscribedUserIds();
  }
}
