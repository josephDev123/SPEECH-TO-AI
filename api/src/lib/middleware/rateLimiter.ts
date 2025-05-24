import { NextFunction, Request, Response } from "express";
import { IRedisClientAdapter } from "../patterns/RedisClientAdapter";
import { GlobalError } from "../plugin/GlobalErrorHandler";

interface IRateLimiter {
  client: IRedisClientAdapter;
  limit: number;
  windowInSeconds: number;
}

export async function rateLimiter({
  client,
  limit,
  windowInSeconds,
}: IRateLimiter) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ip = req.ip;
      const key = `rate-limit:${ip}`;
      const current = await client.get(key);
      console.log("count :" + Number(current));
      if (current && Number(current) >= limit) {
        res.status(429).json({
          error: "Rate limit exceeded",
          message: `You have exceeded the rate limit of ${limit} requests per ${windowInSeconds} seconds.`,
        });
        return;
      }

      if (current) {
        await client.incr(key);
      } else {
        await client.set(key, "1", {
          EX: windowInSeconds,
          NX: true,
        });
      }
      next();
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
  };
}
