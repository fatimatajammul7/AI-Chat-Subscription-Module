import { Request, Response } from 'express';
import { SubscriptionService } from '../../domain/services/SubscriptionService';

export class SubscriptionController {
  private service = new SubscriptionService();

  createSubscription =  async (req: Request, res: Response)=> {
    const { userId, plan, autoRenew } = req.body;

    const sub = await this.service.createSubscription(userId, plan, autoRenew);

    res.json({
      message: 'Subscription created!',
      subscription: sub
    });
  };
}
