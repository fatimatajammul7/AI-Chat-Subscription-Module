# AI Chat App with Subscription and Usage Quotas

A Node.js/TypeScript backend service for an AI chat app. Users can send questions to OpenAI’s GPT-3.5 Turbo and manage usage quotas. The app supports subscription plans with auto-renew functionality.

---

## ✨ Features

✅ Chat with OpenAI’s GPT-3.5 Turbo via API  
✅ Usage quotas for free and subscribed users  
✅ Monthly and yearly subscription plans  
✅ Auto-renewing subscriptions via daily cron job  
✅ PostgreSQL database managed with Prisma ORM  
✅ Fully typed with TypeScript

---

## ⚙️ Tech Stack

- Node.js + Express
- TypeScript
- OpenAI API
- PostgreSQL
- Prisma ORM
- node-cron (for scheduled tasks)

---

## 🔑 Environment Variables
Create a `.env` file in your root:


`DATABASE_URL="postgresql://postgres:password@localhost:5432/ai_chat_db"`
`OPENAI_API_KEY="your_openai_api_key_here"`

## 🚀 Getting Started

1. **Install Dependencies**:
    ```bash
   npm install
2. **Run Migrations (Ensure PostgreSQL is running locally, then execute):
    ```bash
   npx prisma migrate dev --name init
3. **Start the Server**:
   ```bash
   nmp run dev

💬 API Endpoints

1. **POST /chat/send-question**:
Request body:
    ```bash
    {
      "userId": "user-123",
      "question": "What is AI?"
    }

2. **POST /subscriptions**:
Request body:
    ```bash
    {
      "userId": "user-123",
      "plan": "MONTHLY",
      "autoRenew": true
    }

If you encounter any issues or have questions, please feel free to reach out for assistance. Happy coding!






