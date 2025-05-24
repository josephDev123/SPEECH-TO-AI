import { RedisClientType } from "redis";

export interface IRedisClientAdapter {
  get: (key: string) => Promise<string | null>;
  set: (
    key: string,
    value: string,
    options?: { EX?: number; NX?: boolean }
  ) => Promise<void>;
  incr: (key: string) => Promise<void>;
}

export class RedisClientAdapter implements IRedisClientAdapter {
  constructor(private readonly client: any) {}
  async get(key: string): Promise<string | null> {
    const value = await this.client.get(key);
    return value;
  }
  async set(
    key: string,
    value: string,
    options?: { EX?: number; NX?: boolean }
  ): Promise<void> {
    if (options) {
      await this.client.set(key, value, options);
    } else {
      await this.client.set(key, value);
    }
  }
  async incr(key: string): Promise<void> {
    await this.client.incr(key);
  }
}
