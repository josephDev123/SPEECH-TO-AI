import express, { Request, Response } from "express";
import cors from "cors";
import { AIRouter } from "./features/api/AI-Route";
import { createGlobalErrorMiddleware } from "./lib/middleware/GlobalErrorMiddleware";
import { RedisClientAdapter } from "./lib/patterns/RedisClientAdapter";
import { rateLimiter } from "./lib/middleware/rateLimiter";
import { options } from ".";
import { createRedisClient } from "./lib/plugin/redisClient";

export async function App(options: options) {
  const app = express();
  app.use(express.json());
  app.use(cors({ origin: options.config.CORS_ORIGIN }));
  const redisClientInstance = await createRedisClient({
    host: options.config.REDIS_HOST,
    port: Number(options.config.REDIS_PORT),
    password: options.config.REDIS_PASSWORD,
    username: options.config.REDIS_USERNAME,
  });
  const redisClientAdapter = new RedisClientAdapter(redisClientInstance);

  app.use(
    await rateLimiter({
      client: redisClientAdapter,
      limit: 3,
      windowInSeconds: 120,
    })
  );
  app.use("/api", AIRouter(options));

  app.use("/", (req: Request, res: Response) => {
    res.send("testing");
  });

  app.use(createGlobalErrorMiddleware(options.config.NODE_ENV));
  return app;
}
