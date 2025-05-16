import express from "express";
import { AIRouter } from "./Routes/AI-Route";
import { IEnvSchema } from "./plugin/config";
export async function App(config: IEnvSchema) {
  const app = express();
  app.use("v1/api", AIRouter(config));
  return app;
}
