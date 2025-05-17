import { NextFunction, Request, Response } from "express";
import OpenAI from "openai";

export class AI {
  constructor(private readonly GptClient: OpenAI) {}
  async processResponse(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.body;
      const result = await this.GptClient.chat.completions.create({
        model: "openai/gpt-4.1",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant.",
          },
          {
            role: "user",
            content: "which country has the most nuclear power?",
          },
        ],
      });
      res.status(200).json({ msg: result.choices[0].message });
      return;
    } catch (error) {
      console.log(error);
    }
  }
}
