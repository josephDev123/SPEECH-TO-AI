import { z } from "zod";
import dotenv from "dotenv";
dotenv.config();

const envSchema = z.object({
  PORT: z.string().min(4).max(5).default("1000"),
});
export type IEnvSchema = z.infer<typeof envSchema>;

export const config = envSchema.parse(process.env);
