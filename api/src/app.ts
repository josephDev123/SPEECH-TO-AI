import express, { Request, Response } from "express";
import { AIRouter } from "./features/api/AI-Route";
import { IEnvSchema } from "./lib/config";
import OpenAI from "openai";

export type options = {
  config: IEnvSchema;
  clientGtp: OpenAI;
};

export async function App(options: options) {
  const app = express();
  app.use(express.json());

  app.use("/api", AIRouter(options));

  app.use("/", (req: Request, res: Response) => {
    res.send("testing");
  });
  return app;
}
