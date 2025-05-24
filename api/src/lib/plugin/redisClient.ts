import { createClient, RedisClientType } from "redis";
import { GlobalError } from "./GlobalErrorHandler";

interface IRedisClientOptions {
  username: string;
  password: string;
  host: string;
  port: number;
}

export async function createRedisClient({
  password,
  host,
  port,
  username,
}: IRedisClientOptions) {
  const client = createClient({
    username: username,
    password: password,
    socket: {
      host: host,
      port: port,
    },
  });

  client.on("error", (err) => {
    throw new GlobalError(err.name, err.message, 500, true);
  });
  client.on("ready", () => console.log("Redis Client ready"));
  client.on("connect", () => console.log("Redis Client connected"));

  await client.connect();
  return client;
}
