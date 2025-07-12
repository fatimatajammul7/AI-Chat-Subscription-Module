import express from 'express';
import { ChatController } from './chat/interfaces/controllers/ChatController';
import { SubscriptionController } from './subscriptions/interfaces/controllers/SubscriptionController';
import { setupSubscriptionRenewalJob } from './utils/scheduler';

const app = express();
app.use(express.json());

const chatController = new ChatController();
const subscriptionController = new SubscriptionController();

app.post('/chat/send-question', chatController.sendQuestion);
app.post('/subscriptions', subscriptionController.createSubscription);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

setupSubscriptionRenewalJob();