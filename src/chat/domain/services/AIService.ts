import OpenAI from "openai";

export class AIService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generateResponse(question: string): Promise<string> {
    const completion = await this.openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: question },
      ],
    });

    const answer = completion.choices[0].message.content;
    return answer || "Sorry, I couldn't generate a response.";
  }
}
