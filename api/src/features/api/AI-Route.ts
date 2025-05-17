import { Router } from "express";
import { options } from "../../app";
import { AI } from "./controller";

export function AIRouter(options: options) {
  const AIroutes = Router();
  const AIController = new AI(options.clientGtp);

  AIroutes.post("/ai/chat", AIController.processResponse.bind(AIController));

  return AIroutes;
}
