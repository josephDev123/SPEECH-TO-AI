import { NextFunction, Request, Response, Router } from "express";
import { IEnvSchema } from "../plugin/config";

export function AIRouter(config: IEnvSchema) {
  const AIroutes = Router();
  AIroutes.post(
    "/",
    function (req: Request, res: Response, next: NextFunction) {
      res.send("hello world");
      return;
    }
  );

  return AIroutes;
}
