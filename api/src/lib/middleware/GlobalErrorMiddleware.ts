import { NextFunction, Request, Response } from "express";
import { GlobalError } from "../plugin/GlobalErrorHandler";
import { IEnvSchema } from "../config";

type ICreateGlobalErrorMiddleware = "dev" | "prod";

export const createGlobalErrorMiddleware = (
  options: ICreateGlobalErrorMiddleware
) => {
  const devStage = options;

  return (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error("error", err);
    // console.error("stack", err.stack);
    // console.error("error message", err.message);

    if (err instanceof GlobalError) {
      if (err.operational) {
        res.status(err.statusCode).json({
          name: err.name,
          message: err.message,
        });
      } else {
        res.status(500).json({
          name: err.name,
          message: devStage === "dev" ? err.message : " Something went wrong",
        });
      }
    } else {
      res.status(500).json({
        name: "UnknownError",
        message: devStage === "dev" ? err.message : "Internal Server Error",
      });
    }
  };
};
