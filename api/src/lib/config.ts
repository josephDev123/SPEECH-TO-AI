import { number, z } from "zod";
import dotenv from "dotenv";
dotenv.config();

const envSchema = z.object({
  PORT: z.string().min(4).max(5).default("1000"),
  CHATGPT_SECRET: z.string(),
  OPENAI_BASEURL: z.string(),
  NODE_ENV: z.enum(["dev", "prod"]),
  CORS_ORIGIN: z.string().url(),
  REDIS_PORT: z.string(),
  REDIS_PASSWORD: z.string(),
  REDIS_HOST: z.string(),
  REDIS_USERNAME: z.string(),
});
export type IEnvSchema = z.infer<typeof envSchema>;

export const config = envSchema.parse(process.env);
