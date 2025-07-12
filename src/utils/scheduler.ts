import cron from "node-cron";
import { SubscriptionService } from "../subscriptions/domain/services/SubscriptionService";

const subscriptionService = new SubscriptionService();

export const setupSubscriptionRenewalJob = () => {
  cron.schedule("0 0 * * *", async () => {
    console.log("Running daily subscription renewal check...");

    const allUserIds = await subscriptionService.getAllSubscribedUserIds();

    for (const userId of allUserIds) {
      await subscriptionService.renewSubscription(userId);
    }
  });
};
