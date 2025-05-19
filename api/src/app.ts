import express, { Request, Response } from "express";
import cors from "cors";
import { AIRouter } from "./features/api/AI-Route";
import { IEnvSchema } from "./lib/config";
import OpenAI from "openai";
import { createGlobalErrorMiddleware } from "./lib/middleware/GlobalErrorMiddleware";

export type options = {
  config: IEnvSchema;
  clientGtp: OpenAI;
};

export async function App(options: options) {
  const app = express();
  app.use(express.json());
  app.use(cors({ origin: options.config.CORS_ORIGIN }));
  app.use("/api", AIRouter(options));

  app.use("/", (req: Request, res: Response) => {
    res.send("testing");
  });

  app.use(createGlobalErrorMiddleware(options.config.NODE_ENV));
  return app;
}
