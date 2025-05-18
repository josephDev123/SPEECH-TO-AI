import { z } from "zod";
import dotenv from "dotenv";
dotenv.config();

const envSchema = z.object({
  PORT: z.string().min(4).max(5).default("1000"),
  CHATGPT_SECRET: z.string(),
  OPENAI_BASEURL: z.string(),
  NODE_ENV: z.enum(["dev", "prod"]),
});
export type IEnvSchema = z.infer<typeof envSchema>;

export const config = envSchema.parse(process.env);
