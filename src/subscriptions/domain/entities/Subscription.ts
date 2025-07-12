export interface Subscription {
    id: string;
    userId: string;
    plan: string;
    autoRenew: boolean;
    startDate: Date;
    endDate: Date;
  }
  