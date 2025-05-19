import { NextFunction, Request, Response } from "express";
import OpenAI from "openai";
import { GlobalError } from "../../lib/plugin/GlobalErrorHandler";

export class AI {
  constructor(private readonly GptClient: OpenAI) {}
  async processResponse(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.body;
      console.log("payload", payload);

      const stream = await this.GptClient.chat.completions.create({
        model: "openai/gpt-4.1",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant.",
          },
          {
            role: "user",
            content: payload.transcript,
          },
        ],

        stream: true,
      });

      // Set headers to enable streaming
      res.setHeader("Content-Type", "text/plain");
      res.setHeader("Transfer-Encoding", "chunked");
      res.setHeader("Cache-Control", "no-cache");

      for await (let chunk of stream) {
        const content = chunk.choices[0]?.delta?.content;
        if (content) {
          process.stdout.write(content || "");
          res.write(content);
        }
      }

      res.end();
    } catch (error) {
      if (error instanceof GlobalError) {
        if (error.operational) {
          next(
            new GlobalError(
              error.name,
              error.message,
              error.statusCode,
              error.operational
            )
          );
          return;
        } else {
          next(
            new GlobalError(
              error.name,
              "Something went wrong",
              error.statusCode,
              false
            )
          );
          return;
        }
      }

      if (error instanceof Error) {
        next(new GlobalError(error.name, error?.message, 500, false));
        return;
      }

      next(new GlobalError("UnknownError", "Something went wrong", 500, false));
      return;
    }
  }
}
