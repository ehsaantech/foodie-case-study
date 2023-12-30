import { CacheModuleAsyncOptions } from "@nestjs/cache-manager";
import { redisStore } from "cache-manager-redis-store";

export const RedisOptions: CacheModuleAsyncOptions = {
    isGlobal: true,
    useFactory: async () => {
      const store = await redisStore({
        socket: {
          host: process.env.REDIS_HOST,
          port: parseInt(process.env.REDIS_PORT),
        },
      });
      return {
        store: () => store,
      };
    },
  };